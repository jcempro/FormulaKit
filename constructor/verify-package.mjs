// Autor: JeanCarloEM.com | https://jeancarloem.com
// Repositório: https://github.com/jcempro/FormulaKit
// Licença: MPL-2.0 | https://www.mozilla.org/MPL/2.0/
// RCF: ./RCF.md

import childProcess from "node:child_process";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const packageData = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"));
const npmCli = process.env.npm_execpath;
if (!npmCli) throw new Error("PACKAGE_NPM_CLI_UNAVAILABLE");
const packed = childProcess.spawnSync(process.execPath, [npmCli, "--ignore-scripts", "pack", "--dry-run", "--json"], {
  cwd: root,
  encoding: "utf8",
  env: { ...process.env, npm_config_cache: path.join(root, ".npm-cache"), npm_config_ignore_scripts: "true" },
  shell: false,
});
if (packed.error || packed.status !== 0) throw new Error(`PACKAGE_DRY_RUN_FAILED:${packed.error?.message || packed.stderr || packed.stdout}`);
const json = /\[\s*\{[\s\S]*\]\s*$/u.exec(packed.stdout)?.[0];
if (!json) throw new Error("PACKAGE_DRY_RUN_JSON_MISSING");
const [result] = JSON.parse(json);
if (result?.name !== packageData.name || result?.version !== packageData.version) throw new Error("PACKAGE_IDENTITY_DIVERGENT");
if (!Array.isArray(result.files) || result.files.length === 0) throw new Error("PACKAGE_FILES_EMPTY");
const prohibited = [".github/", ".ia.rules/", "constructor/", "src/", "tests/"];
const leaked = result.files.map((entry) => String(entry.path || "")).filter((file) => prohibited.some((prefix) => file === prefix.slice(0, -1) || file.startsWith(prefix)));
if (leaked.length) throw new Error(`PACKAGE_INTERNAL_FILE:${leaked.join(",")}`);
for (const file of ["provenance/keys/v1.json", "dist/provenance/index.mjs", "dist/provenance/index.d.ts"]) if (!result.files.some((entry) => entry.path === file)) throw new Error(`PACKAGE_PROVENANCE_MISSING:${file}`);
console.log(JSON.stringify({ code: "FORMULAKIT_PACKAGE_OK", files: result.files.length, name: result.name, version: result.version }));
