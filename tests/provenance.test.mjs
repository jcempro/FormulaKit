// Autor: JeanCarloEM.com | https://jeancarloem.com
// Repositório: https://github.com/jcempro/FormulaKit
// Licença: MPL-2.0 | https://www.mozilla.org/MPL/2.0/
// RCF: ./RCF.md

import assert from "node:assert/strict";
import crypto from "node:crypto";
import test from "node:test";
import { assertNoDuplicateJsonKeys, keyId, prepareHistory, readHistory, sha256, verifyAppendOnly, verifySignatures } from "../constructor/provenance.mjs";
import { verifyProvenanceHistory } from "@jeancarloem/formulakit/provenance";

/** Gera somente em memória um par de teste; nenhum material é gravado ou exibido. */
function ephemeralKey() {
  const pair = crypto.generateKeyPairSync("ed25519");
  return { publicKey: pair.publicKey.export({ format: "der", type: "spki" }).toString("base64"), privateKey: pair.privateKey.export({ format: "der", type: "pkcs8" }).toString("base64") };
}
/** Executa uma função com segredo de teste efêmero e restaura o ambiente imediatamente. */
function withKeys(current, predecessor, operation, options = {}) {
  const prior = { current: process.env.FORMULAKIT_PROVENANCE_PRIVATE_KEY, public: process.env.FORMULAKIT_PROVENANCE_PUBLIC_KEY, predecessor: process.env.FORMULAKIT_PROVENANCE_PREDECESSOR_PRIVATE_KEY, revoke: process.env.FORMULAKIT_PROVENANCE_REVOKE_KEY_ID, reason: process.env.FORMULAKIT_PROVENANCE_REVOCATION_REASON };
  process.env.FORMULAKIT_PROVENANCE_PRIVATE_KEY = current.privateKey; process.env.FORMULAKIT_PROVENANCE_PUBLIC_KEY = current.publicKey;
  if (predecessor) process.env.FORMULAKIT_PROVENANCE_PREDECESSOR_PRIVATE_KEY = predecessor.privateKey; else delete process.env.FORMULAKIT_PROVENANCE_PREDECESSOR_PRIVATE_KEY;
  if (options.revokeKeyId) { process.env.FORMULAKIT_PROVENANCE_REVOKE_KEY_ID = options.revokeKeyId; process.env.FORMULAKIT_PROVENANCE_REVOCATION_REASON = options.reason; } else { delete process.env.FORMULAKIT_PROVENANCE_REVOKE_KEY_ID; delete process.env.FORMULAKIT_PROVENANCE_REVOCATION_REASON; }
  try { return operation(); } finally { for (const [name, value] of [["FORMULAKIT_PROVENANCE_PRIVATE_KEY", prior.current], ["FORMULAKIT_PROVENANCE_PUBLIC_KEY", prior.public], ["FORMULAKIT_PROVENANCE_PREDECESSOR_PRIVATE_KEY", prior.predecessor], ["FORMULAKIT_PROVENANCE_REVOKE_KEY_ID", prior.revoke], ["FORMULAKIT_PROVENANCE_REVOCATION_REASON", prior.reason]]) if (value === undefined) delete process.env[name]; else process.env[name] = value; }
}

test("histórico inicial declara releases anteriores como não atestáveis", async () => {
  const history = await readHistory(); assert.equal(history.sequence, 0); assert.deepEqual(history.releases, [{ status: "not-attestable", version: "0.1.0" }]); verifySignatures(history);
});

test("rejeita JSON duplicado e segredo ausente sem vazar material", () => {
  assert.throws(() => assertNoDuplicateJsonKeys('{"schema":1,"schema":2}'), /PROVENANCE_JSON_DUPLICATE_KEY/u);
  assert.throws(() => prepareHistory({ schema: "FormulaKitKeyHistory/v1", sequence: 0, previous: null, keys: [], releases: [], signatures: [], x_formulakit_signature: { v: 1, id: "@jeancarloem/formulakit@0.1.0/provenance/keys/v1.json#json:es2024", x: {}, t: {}, h: "908ad41e2863a8242b3b0a09f11e907dad290b67381d695b54616898620b2e3d" } }, "0.1.1", "a".repeat(64)), /PROVENANCE_SECRET_UNAVAILABLE/u);
});

test("atesta release, rotação e consumo com trust anchor independente", async () => {
  const initial = await readHistory(); const first = ephemeralKey(); const firstId = keyId(first.publicKey); const artifactOne = sha256("manifesto-um");
  const one = withKeys(first, undefined, () => prepareHistory(initial, "0.1.1", artifactOne)); verifyAppendOnly(initial, one);
  assert.equal((await verifyProvenanceHistory(one, { [firstId]: first.publicKey }, { version: "0.1.1", artifactSha256: artifactOne, minimumSequence: 1 })).ok, true);
  const second = ephemeralKey(); const artifactTwo = sha256("manifesto-dois"); const two = withKeys(second, first, () => prepareHistory(one, "0.1.2", artifactTwo)); verifyAppendOnly(one, two);
  const verified = await verifyProvenanceHistory(two, { [firstId]: first.publicKey }, { version: "0.1.2", artifactSha256: artifactTwo, minimumSequence: 2 }); assert.deepEqual(verified, { ok: true, code: "PROVENANCE_OK", sequence: 2, keyId: keyId(second.publicKey) });
  const unattested = await verifyProvenanceHistory(two, { [firstId]: first.publicKey }, { version: "0.1.0", artifactSha256: artifactOne }); assert.equal(unattested.code, "PROVENANCE_ARTIFACT_UNATTESTED");
  const revoked = withKeys(second, undefined, () => prepareHistory(two, "0.1.3", sha256("manifesto-três")), { revokeKeyId: firstId, reason: "comprometimento confirmado" }); verifyAppendOnly(two, revoked);
  const revokedResult = await verifyProvenanceHistory(revoked, { [firstId]: first.publicKey }, { version: "0.1.1", artifactSha256: artifactOne }); assert.equal(revokedResult.code, "PROVENANCE_KEY_REVOKED");
});

test("recusa alteração, retrocesso e assinatura inválida", async () => {
  const initial = await readHistory(); const key = ephemeralKey(); const next = withKeys(key, undefined, () => prepareHistory(initial, "0.1.1", sha256("manifesto")));
  const altered = structuredClone(next); altered.releases[0].version = "9.9.9"; assert.throws(() => verifyAppendOnly(initial, altered), /PROVENANCE_(?:SIGNATURE|APPEND_ONLY)_INVALID/u);
  const invalid = structuredClone(next); invalid.signatures[0].signature = "AAAA"; assert.throws(() => verifySignatures(invalid), /PROVENANCE_SIGNATURE_INVALID/u);
});
