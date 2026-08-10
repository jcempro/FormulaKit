// Autor: JeanCarloEM.com | https://jeancarloem.com
// Repositório: https://github.com/jcempro/FormulaKit
// Licença: MPL-2.0 | https://www.mozilla.org/MPL/2.0/
// RCF: ./RCF.md

import assert from "node:assert/strict";
import childProcess from "node:child_process";
import fs from "node:fs";
import { createRequire } from "node:module";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifest = JSON.parse(await readFile(path.join(root, "dist", "manifest.json"), "utf8"));
const config = JSON.parse(await readFile(path.join(root, "config", "build.json"), "utf8"));
const require = createRequire(import.meta.url);

test("níveis avançados contêm integralmente basic e escopo raiz", async () => {
  for (const scope of config.scopes) {
    const basic = await import(pathToFileURL(path.join(root, "dist", scope, "basic", "index.mjs")));
    const advanced = await import(pathToFileURL(path.join(root, "dist", scope, "advanced", "index.mjs")));
    const scopeRoot = await import(pathToFileURL(path.join(root, "dist", scope, "index.mjs")));
    for (const name of Object.keys(basic)) assert.ok(name in advanced, `${scope}/advanced missing ${name}`);
    assert.deepEqual(Object.keys(scopeRoot).sort(), Object.keys(advanced).sort());
    const commonjs = require(path.join(root, "dist", scope, "advanced", "index.cjs")); assert.deepEqual(Object.keys(commonjs).sort(), Object.keys(advanced).sort());
  }
});

test("assinaturas individuais correspondem exatamente aos exports ESM e CJS", async () => {
  const executable = manifest.artifacts.filter((artifact) => /\/(?:basic|advanced)\/index\.(?:mjs|cjs)$/u.test(artifact.file) && !artifact.file.includes("/browser/"));
  for (const artifact of executable) {
    const file = path.join(root, artifact.file); const module = artifact.file.endsWith(".cjs") ? require(file) : await import(pathToFileURL(file));
    assert.deepEqual(Object.keys(module).sort(), Object.keys(artifact.signature.x).sort(), artifact.file);
    assert.equal(artifact.signature.v, 1); assert.match(artifact.signature.h, /^[a-f0-9]{64}$/u);
  }
});

test("tipos estruturais e sourcemaps permanecem assinados e inventariados", () => {
  const text = manifest.artifacts.find((artifact) => artifact.file === "dist/text/advanced/index.d.ts"); const maps = manifest.artifacts.filter((artifact) => artifact.format === "sourcemap");
  assert.ok(text.signature.t.MaskOptions[1].includes("maxInputLength?:number")); assert.ok(text.signature.t.MaskPlan[1].includes("format:(string)=>MaskResult"));
  assert.ok(maps.length > 0); for (const map of maps) { assert.deepEqual(map.signature.x, {}); assert.deepEqual(map.signature.t, {}); assert.ok(map.container); }
});

test("wrappers de tipos resolvem declarações canônicas existentes", async () => {
  const wrappers = manifest.artifacts.filter((artifact) => artifact.format === "types");
  for (const wrapper of wrappers) { const file = path.join(root, wrapper.file); const content = await readFile(file, "utf8"); for (const match of content.matchAll(/from\s+"([^"]+)"/gu)) { const resolved = path.resolve(path.dirname(file), match[1].replace(/\.js$/u, ".d.ts")); assert.ok(fs.existsSync(resolved), `${wrapper.file} -> ${match[1]}`); } }
});

test("registro global é ordenado, somente leitura e rejeita colisão sem perda", async () => {
  const basicUrl = pathToFileURL(path.join(root, "dist", "browser", "math", "basic", "index.mjs"));
  const logicUrl = pathToFileURL(path.join(root, "dist", "browser", "logic", "advanced", "index.mjs"));
  await import(logicUrl); await import(basicUrl);
  const before = globalThis.FormulaKit.manifests; const keys = Object.keys(before); assert.deepEqual(keys, [...keys].sort()); assert.ok(Object.isFrozen(before)); assert.ok(Object.isFrozen(before[keys[0]])); assert.equal(Object.getOwnPropertyDescriptor(globalThis, "FormulaKit").configurable, false);
  assert.throws(() => { before[keys[0]] = null; }, TypeError); assert.throws(() => { globalThis.FormulaKit = null; }, TypeError);
  await assert.rejects(import(`${basicUrl.href}?collision=1`), /FORMULAKIT_MANIFEST_COLLISION/u); assert.deepEqual(globalThis.FormulaKit.manifests, before);
});

test("ordem de carregamento não altera a composição observada", () => {
  const first = pathToFileURL(path.join(root, "dist", "browser", "collections", "basic", "index.mjs")).href;
  const second = pathToFileURL(path.join(root, "dist", "browser", "validation", "advanced", "index.mjs")).href;
  const program = (order) => `for (const url of ${JSON.stringify(order)}) await import(url); console.log(JSON.stringify(globalThis.FormulaKit.manifests));`;
  const left = childProcess.spawnSync(process.execPath, ["--input-type=module", "--eval", program([first, second])], { encoding: "utf8" });
  const right = childProcess.spawnSync(process.execPath, ["--input-type=module", "--eval", program([second, first])], { encoding: "utf8" });
  assert.equal(left.status, 0, left.stderr); assert.equal(right.status, 0, right.stderr); assert.equal(left.stdout.trim(), right.stdout.trim());
});
