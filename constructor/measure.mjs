// Autor: JeanCarloEM.com | https://jeancarloem.com
// Repositório: https://github.com/jcempro/FormulaKit
// Licença: MPL-2.0 | https://www.mozilla.org/MPL/2.0/
// RCF: ./RCF.md

import { brotliCompressSync, gzipSync } from "node:zlib";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifest = JSON.parse(await readFile(path.join(root, "dist", "manifest.json"), "utf8"));
const measurements = [];
for (const artifact of manifest.artifacts.filter((entry) => /\.(?:js|mjs|cjs)$/u.test(entry.file))) { const bytes = await readFile(path.join(root, artifact.file)); measurements.push({ file: artifact.file, raw: bytes.length, gzip: gzipSync(bytes, { level: 9, mtime: 0 }).length, brotli: brotliCompressSync(bytes).length }); }
measurements.sort((left, right) => left.file.localeCompare(right.file)); await writeFile(path.join(root, "dist", "sizes.json"), `${JSON.stringify({ schema: "formulakit-sizes/v1", measurements }, null, 2)}\n`); console.log(JSON.stringify({ code: "FORMULAKIT_SIZE_OK", artifacts: measurements.length }));
