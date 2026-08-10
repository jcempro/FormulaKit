// Autor: JeanCarloEM.com | https://jeancarloem.com
// Repositório: https://github.com/jcempro/FormulaKit
// Licença: MPL-2.0 | https://www.mozilla.org/MPL/2.0/
// RCF: ./RCF.md

import crypto from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifest = JSON.parse(await readFile(path.join(root, "dist", "manifest.json"), "utf8"));
const ids = new Set();
for (const artifact of manifest.artifacts) {
  const file = path.resolve(root, artifact.file); if (!file.startsWith(path.join(root, "dist") + path.sep)) throw new Error(`DIST_PATH_INVALID:${artifact.file}`);
  const bytes = await readFile(file); const hash = crypto.createHash("sha256").update(bytes).digest("hex"); if (hash !== artifact.hash || bytes.length !== artifact.size) throw new Error(`DIST_INTEGRITY_INVALID:${artifact.file}`);
  const text = bytes.toString("utf8"); const match = /\/\*# FormulaKitSignature\/v1\n([^\n]+)\n#\*\//u.exec(text); if (!match) throw new Error(`DIST_SIGNATURE_MISSING:${artifact.file}`); const signature = JSON.parse(match[1]); if (JSON.stringify(signature) !== JSON.stringify(artifact.signature)) throw new Error(`DIST_SIGNATURE_DIVERGENT:${artifact.file}`);
  const { h, ...unsigned } = signature; const expected = crypto.createHash("sha256").update(JSON.stringify(unsigned)).digest("hex"); if (h !== expected) throw new Error(`DIST_SIGNATURE_HASH_INVALID:${artifact.file}`); if (ids.has(signature.id)) throw new Error(`DIST_ID_DUPLICATE:${signature.id}`); ids.add(signature.id);
}
console.log(JSON.stringify({ code: "FORMULAKIT_DIST_OK", artifacts: manifest.artifacts.length }));

