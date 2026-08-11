// Autor: JeanCarloEM.com | https://jeancarloem.com
// Repositório: https://github.com/jcempro/FormulaKit
// Licença: MPL-2.0 | https://www.mozilla.org/MPL/2.0/
// RCF: ./RCF.md

/** Uma chave pública publicada no histórico de procedência. */
export interface ProvenanceKey { readonly keyId: string; readonly algorithm: "Ed25519"; readonly publicKey: string; readonly state: "active" | "retired" | "revoked"; readonly firstRelease: string; readonly lastRelease?: string; readonly predecessorKeyId?: string; readonly successorKeyId?: string; readonly revocation?: Readonly<{ readonly reason: string; readonly sequence: number; readonly effectiveRelease: string }>; }
/** Ligação assinada entre um Release e o manifesto de distribuição extraído do pacote. */
export interface ProvenanceRelease { readonly version: string; readonly status: "attested" | "not-attestable"; readonly artifact?: Readonly<{ readonly path: "dist/manifest.json"; readonly sha256: string }>; readonly signedBy?: string; }
/** Assinatura Ed25519 compacta do payload canônico do histórico. */
export interface ProvenanceSignature { readonly keyId: string; readonly algorithm: "Ed25519"; readonly signature: string; }
/** Snapshot append-only de chaves públicas e Releases atestados. */
export interface ProvenanceHistory { readonly schema: "FormulaKitKeyHistory/v1"; readonly sequence: number; readonly previous: string | null; readonly keys: readonly ProvenanceKey[]; readonly releases: readonly ProvenanceRelease[]; readonly signatures: readonly ProvenanceSignature[]; }
/** Material de confiança independente, fornecido pelo consumidor antes de qualquer descoberta. */
export type ProvenanceTrustAnchors = Readonly<Record<string, string>>;
/** Resultado estruturado e seguro da verificação de procedência. */
export interface ProvenanceVerification { readonly ok: boolean; readonly code: string; readonly sequence?: number; readonly keyId?: string; }

/** Serializa objetos em JSON canônico com chaves ordenadas por ponto de código Unicode. */
export function canonicalProvenanceJson(value: unknown): string {
  const canonical = (input: unknown): unknown => {
    if (Array.isArray(input)) return input.map(canonical);
    if (input !== null && typeof input === "object") {
      const record = input as Record<string, unknown>;
      return Object.fromEntries(Object.keys(record).sort((left, right) => left < right ? -1 : left > right ? 1 : 0).map((key) => [key, canonical(record[key])]));
    }
    return input;
  };
  return JSON.stringify(canonical(value));
}

/** Retorna o payload assinado, excluindo somente as assinaturas que o envolvem. */
export function provenanceSigningPayload(history: ProvenanceHistory): string {
  const { signatures: _signatures, x_formulakit_signature: _artifactSignature, ...payload } = history as ProvenanceHistory & Readonly<{ readonly x_formulakit_signature?: unknown }>;
  return canonicalProvenanceJson(payload);
}

/** Decodifica Base64 padrão sem aceitar alfabeto ou padding ambíguos. */
function bytes(value: string): Uint8Array<ArrayBuffer> | undefined {
  if (!/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/u.test(value)) return undefined;
  const decoded = atob(value); return Uint8Array.from(decoded, (character) => character.codePointAt(0)!) as Uint8Array<ArrayBuffer>;
}
/** Confere a forma pública mínima antes de efetuar operação criptográfica. */
function valid(history: ProvenanceHistory): boolean {
  if (history.schema !== "FormulaKitKeyHistory/v1" || !Number.isSafeInteger(history.sequence) || history.sequence < 0 || !Array.isArray(history.keys) || !Array.isArray(history.releases) || !Array.isArray(history.signatures)) return false;
  const ids = new Set<string>();
  for (const key of history.keys) {
    if (!/^ed25519:[a-f0-9]{64}$/u.test(key.keyId) || key.algorithm !== "Ed25519" || !bytes(key.publicKey) || !["active", "retired", "revoked"].includes(key.state) || ids.has(key.keyId)) return false;
    ids.add(key.keyId);
  }
  return history.signatures.every((signature) => ids.has(signature.keyId) && signature.algorithm === "Ed25519" && bytes(signature.signature) !== undefined);
}

/** Verifica o snapshot contra âncoras independentes, rotação e uma atestação de Release opcional. */
export async function verifyProvenanceHistory(history: ProvenanceHistory, anchors: ProvenanceTrustAnchors, expected?: Readonly<{ readonly version: string; readonly artifactSha256: string; readonly minimumSequence?: number }>): Promise<ProvenanceVerification> {
  if (!valid(history)) return { ok: false, code: "PROVENANCE_SCHEMA_INVALID" };
  if (expected?.minimumSequence !== undefined && history.sequence < expected.minimumSequence) return { ok: false, code: "PROVENANCE_DOWNGRADE" };
  const known = new Map<string, string>(Object.entries(anchors)); const byId = new Map(history.keys.map((key) => [key.keyId, key]));
  for (const key of history.keys) {
    if (key.predecessorKeyId && known.has(key.predecessorKeyId)) known.set(key.keyId, key.publicKey);
  }
  const payload = new TextEncoder().encode(provenanceSigningPayload(history)); let verified = false;
  for (const signature of history.signatures) {
    const publicKey = known.get(signature.keyId); const signatureBytes = bytes(signature.signature);
    if (!publicKey || !signatureBytes) continue;
    try { const key = await crypto.subtle.importKey("spki", bytes(publicKey)!, { name: "Ed25519" }, false, ["verify"]); if (await crypto.subtle.verify("Ed25519", key, signatureBytes, payload)) verified = true; } catch { return { ok: false, code: "PROVENANCE_SIGNATURE_INVALID" }; }
  }
  if (!verified) return { ok: false, code: "PROVENANCE_TRUST_UNSATISFIED" };
  if (!expected) return { ok: true, code: "PROVENANCE_OK", sequence: history.sequence };
  const release = history.releases.find((item) => item.version === expected.version);
  if (!release || release.status !== "attested" || release.artifact?.path !== "dist/manifest.json" || release.artifact.sha256 !== expected.artifactSha256 || !release.signedBy || !known.has(release.signedBy)) return { ok: false, code: "PROVENANCE_ARTIFACT_UNATTESTED" };
  const key = byId.get(release.signedBy); if (!key || key.state === "revoked") return { ok: false, code: "PROVENANCE_KEY_REVOKED", keyId: release.signedBy };
  return { ok: true, code: "PROVENANCE_OK", sequence: history.sequence, keyId: release.signedBy };
}
