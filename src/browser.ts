// Autor: JeanCarloEM.com | https://jeancarloem.com
// Repositório: https://github.com/jcempro/FormulaKit
// Licença: MPL-2.0 | https://www.mozilla.org/MPL/2.0/
// RCF: ./RCF.md

export * from "./index.js";
export type { ArtifactSignature, ManifestSnapshot } from "./manifest.js";

declare global {
  /** Namespace público de consulta instalado pelos artefatos de navegador. */
  var FormulaKit: Readonly<{ readonly manifests: import("./manifest.js").ManifestSnapshot }>;
}
