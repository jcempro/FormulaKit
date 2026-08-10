// Autor: JeanCarloEM.com | https://jeancarloem.com
// Repositório: https://github.com/jcempro/FormulaKit
// Licença: MPL-2.0 | https://www.mozilla.org/MPL/2.0/
// RCF: ./RCF.md

import { brotliCompressSync, gzipSync } from "node:zlib";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifest = JSON.parse(await readFile(path.join(root, "dist", "manifest.json"), "utf8"));
const baseline = JSON.parse(await readFile(path.join(root, "dist", "sizes.json"), "utf8"));
const measurements = [];
for (const artifact of manifest.artifacts.filter((entry) => /\.(?:js|mjs|cjs)$/u.test(entry.file))) { const bytes = await readFile(path.join(root, artifact.file)); measurements.push({ brotli: brotliCompressSync(bytes).length, file: artifact.file, gzip: gzipSync(bytes, { level: 9, mtime: 0 }).length, raw: bytes.length }); }
measurements.sort((left, right) => left.file.localeCompare(right.file)); if (JSON.stringify(measurements) !== JSON.stringify(baseline.measurements)) throw new Error("SIZE_BASELINE_DIVERGENT"); console.log(JSON.stringify({ code: "FORMULAKIT_SIZE_OK", artifacts: measurements.length }));
