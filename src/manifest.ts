// Autor: JeanCarloEM.com | https://jeancarloem.com
// Repositório: https://github.com/jcempro/FormulaKit
// Licença: MPL-2.0 | https://www.mozilla.org/MPL/2.0/
// RCF: ./RCF.md

import { deepFreeze } from "./internal.js";

/**
 * Descritor ultracompacto e estrutural de uma superfície pública.
 *
 */
export interface ArtifactSignature { readonly v: 1; readonly id: string; readonly x: Readonly<Record<string, readonly unknown[]>>; readonly t: Readonly<Record<string, unknown>>; readonly h: string; }
/**
 * Snapshot global de assinaturas indexado por identidade canônica.
 *
 */
export type ManifestSnapshot = Readonly<Record<string, ArtifactSignature>>;

const REGISTER = Symbol.for("jcempro.formulakit.manifest.register.v1");

/**
 * Valida forma mínima antes de registrar metadados produzidos pelo build.
 *
 * @param value - Valor de entrada.
 * @throws Quando a entrada viola o contrato da operação (`TypeError`).
 */
function assertSignature(value: ArtifactSignature): void { if (value.v !== 1 || !value.id || !/^[a-f0-9]{64}$/u.test(value.h) || value.x === null || value.t === null) throw new TypeError("FORMULAKIT_MANIFEST_INVALID"); }
/**
 * Cria snapshot ordenado, sem protótipo e profundamente congelado.
 *
 * @param registry - Registro interno de assinaturas já aceitas.
 * @returns Resultado correspondente à finalidade documentada: cria snapshot ordenado, sem protótipo e profundamente congelado.
 */
function snapshot(registry: ReadonlyMap<string, ArtifactSignature>): ManifestSnapshot { const result = Object.create(null) as Record<string, ArtifactSignature>; for (const id of [...registry.keys()].sort()) result[id] = registry.get(id)!; return deepFreeze(result); }

/**
 * Instala ou reutiliza o protocolo compartilhado e registra somente a assinatura recebida.
 *
 * @param signature - Assinatura individual do artefato.
 */
export function registerArtifactManifest(signature: ArtifactSignature): void {
  assertSignature(signature); const root = globalThis as typeof globalThis & Record<PropertyKey, unknown>;
  let register = root[REGISTER] as ((value: ArtifactSignature) => void) | undefined;
  if (!register) {
    const registry = new Map<string, ArtifactSignature>(); let current = snapshot(registry);
    const namespace = Object.create(null) as { readonly manifests: ManifestSnapshot };
    Object.defineProperty(namespace, "manifests", { configurable: false, enumerable: true, get: () => current }); Object.freeze(namespace);
    const existing = root.FormulaKit; if (existing !== undefined) throw new Error("FORMULAKIT_GLOBAL_COLLISION");
    Object.defineProperty(root, "FormulaKit", { configurable: false, enumerable: true, writable: false, value: namespace });
    register = (value): void => { assertSignature(value); if (registry.has(value.id)) throw new Error(`FORMULAKIT_MANIFEST_COLLISION:${value.id}`); registry.set(value.id, deepFreeze(structuredClone(value))); current = snapshot(registry); };
    Object.defineProperty(root, REGISTER, { configurable: false, enumerable: false, writable: false, value: register });
  }
  register(signature);
}

