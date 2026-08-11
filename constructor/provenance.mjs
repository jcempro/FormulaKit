// Autor: JeanCarloEM.com | https://jeancarloem.com
// Repositório: https://github.com/jcempro/FormulaKit
// Licença: MPL-2.0 | https://www.mozilla.org/MPL/2.0/
// RCF: ./RCF.md

import crypto from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const packageData = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"));
const buildConfig = JSON.parse(await readFile(path.join(root, "config", "build.json"), "utf8"));
export const HISTORY_PATH = path.join(root, "provenance", "keys", "v1.json");
const VERSION = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/u;
const KEY_ID = /^ed25519:[a-f0-9]{64}$/u;
const HASH = /^[a-f0-9]{64}$/u;

/** Produz SHA-256 hexadecimal de dados inequívocos. */
export function sha256(value) { return crypto.createHash("sha256").update(value).digest("hex"); }
/** Ordena recursivamente por ponto de código, sem depender do locale da máquina. */
export function canonical(value) {
  if (Array.isArray(value)) return value.map(canonical);
  if (value !== null && typeof value === "object") return Object.fromEntries(Object.keys(value).sort((left, right) => left < right ? -1 : left > right ? 1 : 0).map((key) => [key, canonical(value[key])]));
  return value;
}
/** Serializa em UTF-8 canônico, determinístico e sem espaços descritivos. */
export function canonicalJson(value) { return JSON.stringify(canonical(value)); }
/** Exclui apenas as assinaturas que envolvem o payload. */
export function signingPayload(history) { const { signatures: _signatures, x_formulakit_signature: _artifactSignature, ...payload } = history; return canonicalJson(payload); }
/** Converte uma chave pública DER/SPKI Base64 em identidade estável. */
export function keyId(publicKey) { return `ed25519:${sha256(Buffer.from(publicKey, "base64"))}`; }
/** Rejeita chaves JSON repetidas antes que JSON.parse possa mascará-las. */
export function assertNoDuplicateJsonKeys(source) {
  let index = 0;
  const space = () => { while (/\s/u.test(source[index] ?? "")) index += 1; };
  const string = () => { const start = index; if (source[index] !== '"') throw new Error("PROVENANCE_JSON_INVALID"); index += 1; let escaped = false; while (index < source.length) { const character = source[index++]; if (escaped) { escaped = false; continue; } if (character === "\\") { escaped = true; continue; } if (character === '"') return JSON.parse(source.slice(start, index)); } throw new Error("PROVENANCE_JSON_INVALID"); };
  const primitive = () => { const match = /^(?:-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?|true|false|null)/u.exec(source.slice(index)); if (!match) throw new Error("PROVENANCE_JSON_INVALID"); index += match[0].length; };
  const value = () => { space(); const token = source[index]; if (token === "{") { index += 1; const names = new Set(); space(); if (source[index] === "}") { index += 1; return; } while (true) { space(); const name = string(); if (names.has(name)) throw new Error(`PROVENANCE_JSON_DUPLICATE_KEY:${name}`); names.add(name); space(); if (source[index++] !== ":") throw new Error("PROVENANCE_JSON_INVALID"); value(); space(); if (source[index] === "}") { index += 1; return; } if (source[index++] !== ",") throw new Error("PROVENANCE_JSON_INVALID"); } } if (token === "[") { index += 1; space(); if (source[index] === "]") { index += 1; return; } while (true) { value(); space(); if (source[index] === "]") { index += 1; return; } if (source[index++] !== ",") throw new Error("PROVENANCE_JSON_INVALID"); } } if (token === '"') { string(); return; } primitive(); };
  value(); space(); if (index !== source.length) throw new Error("PROVENANCE_JSON_INVALID");
}
/** Carrega documento sem aceitar JSON ambíguo. */
export async function readHistory(file = HISTORY_PATH) { const text = await readFile(file, "utf8"); assertNoDuplicateJsonKeys(text); return JSON.parse(text); }
/** Confere forma, campos críticos, limites e identidades públicas. */
export function validateHistory(history) {
  const allowed = new Set(["schema", "sequence", "previous", "keys", "releases", "signatures", "x_formulakit_signature"]); if (!history || typeof history !== "object" || Object.keys(history).some((key) => !allowed.has(key))) throw new Error("PROVENANCE_SCHEMA_INVALID");
  if (history.schema !== "FormulaKitKeyHistory/v1" || !Number.isSafeInteger(history.sequence) || history.sequence < 0 || !(history.previous === null || HASH.test(history.previous)) || !Array.isArray(history.keys) || !Array.isArray(history.releases) || !Array.isArray(history.signatures)) throw new Error("PROVENANCE_SCHEMA_INVALID");
  const ids = new Set(); const versions = new Set();
  for (const key of history.keys) { const permitted = new Set(["keyId", "algorithm", "publicKey", "state", "firstRelease", "lastRelease", "predecessorKeyId", "successorKeyId", "revocation"]); if (!key || typeof key !== "object" || Object.keys(key).some((name) => !permitted.has(name)) || !KEY_ID.test(key.keyId) || key.algorithm !== "Ed25519" || keyId(key.publicKey) !== key.keyId || !["active", "retired", "revoked"].includes(key.state) || !VERSION.test(key.firstRelease) || ids.has(key.keyId)) throw new Error("PROVENANCE_KEY_INVALID"); if (key.lastRelease !== undefined && !VERSION.test(key.lastRelease)) throw new Error("PROVENANCE_KEY_INVALID"); if (key.predecessorKeyId !== undefined && !KEY_ID.test(key.predecessorKeyId)) throw new Error("PROVENANCE_KEY_INVALID"); if (key.successorKeyId !== undefined && !KEY_ID.test(key.successorKeyId)) throw new Error("PROVENANCE_KEY_INVALID"); if (key.state === "revoked" && (!key.revocation || typeof key.revocation.reason !== "string" || !Number.isSafeInteger(key.revocation.sequence) || !VERSION.test(key.revocation.effectiveRelease))) throw new Error("PROVENANCE_REVOCATION_INVALID"); ids.add(key.keyId); }
  for (const release of history.releases) { const permitted = new Set(["version", "status", "artifact", "signedBy"]); if (!release || typeof release !== "object" || Object.keys(release).some((name) => !permitted.has(name)) || !VERSION.test(release.version) || versions.has(release.version) || !["attested", "not-attestable"].includes(release.status)) throw new Error("PROVENANCE_RELEASE_INVALID"); if (release.status === "attested" && (!release.artifact || release.artifact.path !== "dist/manifest.json" || !HASH.test(release.artifact.sha256) || !ids.has(release.signedBy))) throw new Error("PROVENANCE_RELEASE_INVALID"); if (release.status === "not-attestable" && (release.artifact !== undefined || release.signedBy !== undefined)) throw new Error("PROVENANCE_RELEASE_INVALID"); versions.add(release.version); }
  const signers = new Set(); for (const signature of history.signatures) { const permitted = new Set(["keyId", "algorithm", "signature"]); if (!signature || typeof signature !== "object" || Object.keys(signature).some((name) => !permitted.has(name)) || !ids.has(signature.keyId) || signature.algorithm !== "Ed25519" || !/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/u.test(signature.signature) || signers.has(signature.keyId)) throw new Error("PROVENANCE_SIGNATURE_INVALID"); signers.add(signature.keyId); }
  if (!history.x_formulakit_signature || history.x_formulakit_signature.v !== 1 || !/^@jeancarloem\/formulakit@\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?\/provenance\/keys\/v1\.json#json:es\d+$/u.test(history.x_formulakit_signature.id) || !HASH.test(history.x_formulakit_signature.h)) throw new Error("PROVENANCE_ARTIFACT_SIGNATURE_INVALID"); const { h, ...unsignedArtifact } = history.x_formulakit_signature; if (sha256(canonicalJson(unsignedArtifact)) !== h) throw new Error("PROVENANCE_ARTIFACT_SIGNATURE_INVALID");
  if (history.sequence === 0 && (history.previous !== null || history.keys.length || history.signatures.length || history.releases.some((release) => release.status !== "not-attestable"))) throw new Error("PROVENANCE_GENESIS_INVALID");
  return history;
}
/** Verifica assinaturas Ed25519 contra as chaves declaradas, sem criar trust anchor implícita. */
export function verifySignatures(history) {
  validateHistory(history); const payload = Buffer.from(signingPayload(history), "utf8"); const keys = new Map(history.keys.map((entry) => [entry.keyId, entry]));
  for (const signature of history.signatures) { const key = keys.get(signature.keyId); const publicKey = crypto.createPublicKey({ key: Buffer.from(key.publicKey, "base64"), format: "der", type: "spki" }); if (!crypto.verify(null, payload, publicKey, Buffer.from(signature.signature, "base64"))) throw new Error(`PROVENANCE_SIGNATURE_INVALID:${signature.keyId}`); }
  return history;
}
/** Compara dois snapshots e aceita somente extensão append-only vinculada ao hash anterior. */
export function verifyAppendOnly(previous, next) {
  validateHistory(previous); verifySignatures(next); if (next.sequence !== previous.sequence + 1 || next.previous !== sha256(canonicalJson(previous))) throw new Error("PROVENANCE_CONTINUITY_INVALID");
  const oldKeys = previous.keys; const newKeys = next.keys; if (newKeys.length < oldKeys.length) throw new Error("PROVENANCE_APPEND_ONLY_INVALID");
  for (const [index, entry] of oldKeys.entries()) { const nextEntry = newKeys[index]; if (canonicalJson(entry) === canonicalJson(nextEntry)) continue; const permitted = { ...entry, state: "revoked", successorKeyId: nextEntry.successorKeyId, revocation: nextEntry.revocation }; if (entry.state === "revoked" || canonicalJson(permitted) !== canonicalJson(nextEntry) || !nextEntry.revocation || nextEntry.revocation.sequence !== next.sequence) throw new Error("PROVENANCE_APPEND_ONLY_INVALID"); }
  const oldReleases = previous.releases; if (next.releases.length < oldReleases.length || oldReleases.some((entry, index) => canonicalJson(entry) !== canonicalJson(next.releases[index]))) throw new Error("PROVENANCE_APPEND_ONLY_INVALID");
  const priorIds = new Set(previous.keys.map((entry) => entry.keyId)); for (const key of next.keys.slice(previous.keys.length)) { if (key.predecessorKeyId && !priorIds.has(key.predecessorKeyId)) throw new Error("PROVENANCE_ROTATION_INVALID"); if (key.predecessorKeyId && !next.signatures.some((signature) => signature.keyId === key.predecessorKeyId)) throw new Error("PROVENANCE_ROTATION_UNSIGNED"); }
  return next;
}
/** Converte segredo externo PKCS#8 Base64 em chave privada sem expor o material no diagnóstico. */
function externalPrivate(name) { const value = process.env[name]; if (!value) throw new Error(`PROVENANCE_SECRET_UNAVAILABLE:${name}`); try { return crypto.createPrivateKey({ key: Buffer.from(value, "base64"), format: "der", type: "pkcs8" }); } catch { throw new Error(`PROVENANCE_SECRET_INVALID:${name}`); } }
/** Assina o payload e retorna somente a assinatura pública codificada. */
function sign(key, payload) { return crypto.sign(null, Buffer.from(payload, "utf8"), key).toString("base64"); }
/** Acrescenta de modo idempotente o Release solicitado e sua cadeia de assinatura. */
export function prepareHistory(previous, version, artifactHash) {
  validateHistory(previous); if (!VERSION.test(version) || !HASH.test(artifactHash)) throw new Error("PROVENANCE_ARGUMENT_INVALID"); const existing = previous.releases.find((release) => release.version === version); if (existing) { if (existing.status !== "attested" || existing.artifact?.sha256 !== artifactHash) throw new Error("PROVENANCE_RELEASE_CONFLICT"); return previous; }
  const privateKey = externalPrivate("FORMULAKIT_PROVENANCE_PRIVATE_KEY"); const derivedPublic = crypto.createPublicKey(privateKey).export({ format: "der", type: "spki" }).toString("base64"); const publicKey = process.env.FORMULAKIT_PROVENANCE_PUBLIC_KEY; if (!publicKey || publicKey !== derivedPublic) throw new Error("PROVENANCE_PUBLIC_KEY_MISMATCH"); const activeKeyId = keyId(publicKey); const keys = previous.keys.map((entry) => ({ ...entry })); let introduced = false;
  if (!keys.some((entry) => entry.keyId === activeKeyId)) { const candidates = keys.filter((entry) => entry.state !== "revoked"); const configuredPredecessor = process.env.FORMULAKIT_PROVENANCE_PREDECESSOR_KEY_ID; const predecessor = configuredPredecessor ? candidates.find((entry) => entry.keyId === configuredPredecessor) : candidates.length === 1 ? candidates[0] : undefined; if (configuredPredecessor && !predecessor) throw new Error("PROVENANCE_PREDECESSOR_UNKNOWN"); if (candidates.length && !predecessor) throw new Error("PROVENANCE_PREDECESSOR_REQUIRED"); keys.push({ keyId: activeKeyId, algorithm: "Ed25519", publicKey, state: "active", firstRelease: version, ...(predecessor ? { predecessorKeyId: predecessor.keyId } : {}) }); introduced = true; }
  const sequence = previous.sequence + 1; const revokeKeyId = process.env.FORMULAKIT_PROVENANCE_REVOKE_KEY_ID; if (revokeKeyId) { const reason = process.env.FORMULAKIT_PROVENANCE_REVOCATION_REASON; const revoked = keys.find((entry) => entry.keyId === revokeKeyId); if (!revoked || revoked.keyId === activeKeyId || revoked.state === "revoked" || !reason || reason.length > 240) throw new Error("PROVENANCE_REVOCATION_INVALID"); revoked.state = "revoked"; revoked.successorKeyId = activeKeyId; revoked.revocation = { reason, sequence, effectiveRelease: version }; }
  const unsigned = { schema: "FormulaKitKeyHistory/v1", sequence, previous: sha256(canonicalJson(previous)), keys, releases: [...previous.releases, { version, status: "attested", artifact: { path: "dist/manifest.json", sha256: artifactHash }, signedBy: activeKeyId }] };
  const payload = signingPayload({ ...unsigned, signatures: [] }); const signatures = [{ keyId: activeKeyId, algorithm: "Ed25519", signature: sign(privateKey, payload) }];
  if (introduced && keys.length > 1) { const predecessor = keys.find((entry) => entry.keyId !== activeKeyId && entry.keyId === keys.find((key) => key.keyId === activeKeyId)?.predecessorKeyId); const predecessorPrivate = externalPrivate("FORMULAKIT_PROVENANCE_PREDECESSOR_PRIVATE_KEY"); const predecessorPublic = crypto.createPublicKey(predecessorPrivate).export({ format: "der", type: "spki" }).toString("base64"); if (!predecessor || predecessor.publicKey !== predecessorPublic) throw new Error("PROVENANCE_PREDECESSOR_MISMATCH"); signatures.push({ keyId: predecessor.keyId, algorithm: "Ed25519", signature: sign(predecessorPrivate, payload) }); }
  const next = canonical({ ...unsigned, signatures, x_formulakit_signature: artifactSignature(version) }); verifyAppendOnly(previous, next); return next;
}
/** Cria a assinatura individual do arquivo público sem integrar a cadeia criptográfica. */
function artifactSignature(version) { const id = `${packageData.name}@${version}/provenance/keys/v1.json#json:es${buildConfig.ecmascript.resolved}`; const unsigned = { v: 1, id, x: {}, t: {} }; return { ...unsigned, h: sha256(canonicalJson(unsigned)) }; }
/** Materializa o histórico canônico apenas após o build que produz seu hash atestado. */
export async function prepare(file = HISTORY_PATH, version, artifact = path.join(root, "dist", "manifest.json")) { const previous = await readHistory(file); const artifactHash = sha256(await readFile(artifact)); const next = prepareHistory(previous, version, artifactHash); if (canonicalJson(next) !== canonicalJson(previous)) await writeFile(file, `${JSON.stringify(canonical(next), null, 2)}\n`, "utf8"); return next; }
/** Valida o documento e, se informado, vincula-o ao hash local de `dist/manifest.json`. */
export async function check(file = HISTORY_PATH, version, artifact = path.join(root, "dist", "manifest.json")) { const history = await readHistory(file); verifySignatures(history); if (version) { const release = history.releases.find((entry) => entry.version === version); if (!release || release.status !== "attested" || release.artifact?.sha256 !== sha256(await readFile(artifact))) throw new Error("PROVENANCE_ARTIFACT_UNATTESTED"); } return history; }
/** Lê opção obrigatória sem aceitar flag duplicada ou valor ausente. */
function option(argumentsList, name) { const positions = argumentsList.map((value, index) => value === name ? index : -1).filter((index) => index >= 0); if (positions.length !== 1 || !argumentsList[positions[0] + 1]) throw new Error(`PROVENANCE_OPTION_INVALID:${name}`); return argumentsList[positions[0] + 1]; }

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  const [command, ...argumentsList] = process.argv.slice(2); if (!["prepare", "check"].includes(command)) throw new Error("PROVENANCE_COMMAND_INVALID"); const version = argumentsList.includes("--version") ? option(argumentsList, "--version") : undefined; const artifact = argumentsList.includes("--artifact") ? path.resolve(root, option(argumentsList, "--artifact")) : undefined;
  const history = command === "prepare" ? await prepare(HISTORY_PATH, version, artifact) : await check(HISTORY_PATH, version, artifact); console.log(JSON.stringify({ code: command === "prepare" ? "PROVENANCE_PREPARE_OK" : "PROVENANCE_CHECK_OK", sequence: history.sequence, releases: history.releases.length }));
}
