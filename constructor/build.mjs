// Autor: JeanCarloEM.com | https://jeancarloem.com
// Repositório: https://github.com/jcempro/FormulaKit
// Licença: MPL-2.0 | https://www.mozilla.org/MPL/2.0/
// RCF: ./RCF.md

import crypto from "node:crypto";
import childProcess from "node:child_process";
import fs from "node:fs";
import { mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { brotliCompressSync, gzipSync } from "node:zlib";
import { build as esbuild } from "esbuild";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceRoot = path.join(root, "src");
const targetRoot = path.join(root, "dist");
const config = JSON.parse(await readFile(path.join(root, "config", "build.json"), "utf8"));
const packageData = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"));
const BANNER = "/* Autor: JeanCarloEM.com | https://jeancarloem.com | Repositório: https://github.com/jcempro/FormulaKit | Licença: MPL-2.0 | https://www.mozilla.org/MPL/2.0/ | RCF: ./RCF.md */";
const manifest = { schema: "formulakit-distribution/v1", package: packageData.name, version: packageData.version, target: `ES${config.ecmascript.resolved}`, formula: config.ecmascript.formula, artifacts: [] };

/** Retorna SHA-256 hexadecimal de bytes ou texto UTF-8. */
function sha256(value) { return crypto.createHash("sha256").update(value).digest("hex"); }
/** Ordena recursivamente objetos para serialização independente da ordem de inserção. */
function canonical(value) { if (Array.isArray(value)) return value.map(canonical); if (value && typeof value === "object") return Object.fromEntries(Object.keys(value).sort().map((key) => [key, canonical(value[key])])); return value; }
/** Normaliza path de manifesto para barras portáveis. */
function relative(file) { return path.relative(root, file).replaceAll("\\", "/"); }
/** Enumera arquivos por ordem lexical sem seguir links. */
async function files(directory, extension) { const result = []; for (const entry of (await readdir(directory, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name))) { const child = path.join(directory, entry.name); if (entry.isDirectory()) result.push(...await files(child, extension)); else if (!extension || child.endsWith(extension)) result.push(child); } return result; }
/** Escreve arquivo após criar somente seu diretório pai. */
async function output(file, content) { await mkdir(path.dirname(file), { recursive: true }); await writeFile(file, content); }

const now = new Date();
const published = config.ecmascript.publishedEditions.filter((year) => year <= now.getUTCFullYear());
const latest = Math.max(...published);
if (latest - 2 !== config.ecmascript.resolved) throw new Error(`TARGET_ECMA_DIVERGENT:${latest - 2}`);
if (path.dirname(targetRoot) !== root || path.basename(targetRoot) !== "dist") throw new Error("BUILD_TARGET_INVALID");
await rm(targetRoot, { force: true, recursive: true });
await mkdir(targetRoot, { recursive: true });

const tsc = childProcess.spawnSync(process.execPath, [path.join(root, "node_modules", "typescript", "bin", "tsc"), "--project", path.join(root, "tsconfig.json"), "--noEmit", "false", "--declaration", "true", "--declarationMap", "true", "--emitDeclarationOnly", "true", "--outDir", path.join(targetRoot, "types")], { cwd: root, encoding: "utf8", shell: false });
if (tsc.status !== 0) throw new Error(`TYPES_EMIT_FAILED:\n${tsc.stdout}\n${tsc.stderr}`);
const descriptionCache = new Map();

/** Separa lista tipada sem quebrar estruturas aninhadas. */
function splitTopLevel(value) { const result = []; let start = 0; let depth = 0; for (let index = 0; index < value.length; index += 1) { const character = value[index]; if ("<([{\"'".includes(character)) depth += 1; else if (">)]}\"'".includes(character)) depth = Math.max(0, depth - 1); else if (character === "," && depth === 0) { result.push(value.slice(start, index).trim()); start = index + 1; } } const tail = value.slice(start).trim(); if (tail) result.push(tail); return result; }
/** Remove nomes de parâmetros preservando posição, rest, opcionalidade e tipo. */
function positional(parameters) { return splitTopLevel(parameters).map((parameter) => { const match = /^(\.\.\.)?[A-Za-z_$][\w$]*(\?)?:\s*([\s\S]+)$/u.exec(parameter); return match ? `${match[1] ?? ""}${match[3]}${match[2] ?? ""}` : parameter; }); }
/** Compacta declaração estrutural e remove nomes de parâmetros internos. */
function structural(value) { return value.replace(/\/\*[\s\S]*?\*\//gu, "").replace(/\/\/[^\n]*/gu, "").replace(/([A-Za-z_$][\w$]*)\(([^()]*)\)\s*:/gu, (_, name, parameters) => `${name}(${positional(parameters).join(",")}):`).replace(/\(([^()]*)\)\s*=>/gu, (_, parameters) => `(${positional(parameters).join(",")})=>`).replace(/\s+/gu, " ").replace(/\s*([{}:;,|<>?])\s*/gu, "$1").trim(); }
/** Extrai tipos públicos completos sem reter o nome já usado como chave. */
function customTypes(content) {
  const result = {}; const clean = content.replace(/\/\*[\s\S]*?\*\//gu, "").replace(/\/\/[^\n]*/gu, ""); const pattern = /export\s+(?:declare\s+)?(interface|type|class|enum)\s+([A-Za-z_$][\w$]*)/gu; let match;
  while ((match = pattern.exec(clean))) { const kind = match[1]; const name = match[2]; let cursor = pattern.lastIndex; let angle = 0; let round = 0; let square = 0; let brace = 0; let quote = ""; let end = cursor;
    for (; end < clean.length; end += 1) { const character = clean[end]; if (quote) { if (character === quote && clean[end - 1] !== "\\") quote = ""; continue; } if (character === '"' || character === "'") { quote = character; continue; } if (character === "<") angle += 1; else if (character === ">") angle = Math.max(0, angle - 1); else if (character === "(") round += 1; else if (character === ")") round = Math.max(0, round - 1); else if (character === "[") square += 1; else if (character === "]") square = Math.max(0, square - 1); else if (character === "{") brace += 1; else if (character === "}") { brace = Math.max(0, brace - 1); if (brace === 0 && kind !== "type") { end += 1; break; } } else if (character === ";" && angle === 0 && round === 0 && square === 0 && brace === 0) { end += 1; break; } }
    result[name] = [kind[0], structural(clean.slice(cursor, end).replace(/;\s*$/u, ""))]; pattern.lastIndex = end;
  }
  return result;
}
/** Resolve specifier JavaScript de declaração para o `.d.ts` emitido correspondente. */
function resolveDeclaration(from, specifier) { const candidate = path.resolve(path.dirname(from), specifier).replace(/\.(?:m?js|cjs)$/u, ".d.ts"); if (!candidate.startsWith(path.join(targetRoot, "types") + path.sep)) throw new Error(`TYPE_REFERENCE_INVALID:${specifier}`); return candidate; }
/** Produz assinatura mínima a partir do `.d.ts` canônico emitido. */
function describeDeclaration(file) {
  const cached = descriptionCache.get(file); if (cached) return cached; const x = {}; const t = {}; const result = { x, t }; descriptionCache.set(file, result); const content = fs.readFileSync(file, "utf8"); const imports = new Map();
  for (const match of content.matchAll(/import \{([^}]+)\} from ["']([^"']+)["'];/gu)) { const target = describeDeclaration(resolveDeclaration(file, match[2])); for (const item of splitTopLevel(match[1])) { const parts = item.split(/\s+as\s+/u).map((part) => part.trim()); imports.set(parts[1] ?? parts[0], { name: parts[0], target }); } }
  for (const match of content.matchAll(/export \* from ["']([^"']+)["'];/gu)) Object.assign(x, describeDeclaration(resolveDeclaration(file, match[1])).x), Object.assign(t, describeDeclaration(resolveDeclaration(file, match[1])).t);
  for (const match of content.matchAll(/export \* as ([A-Za-z_$][\w$]*) from ["']([^"']+)["'];/gu)) x[match[1]] = ["v", "namespace"];
  for (const match of content.matchAll(/export \{([^}]+)\} from ["']([^"']+)["'];/gu)) { const target = describeDeclaration(resolveDeclaration(file, match[2])); for (const item of splitTopLevel(match[1])) { const parts = item.split(/\s+as\s+/u).map((part) => part.trim()); const original = parts[0]; const alias = parts[1] ?? original; if (target.x[original]) x[alias] = target.x[original]; if (target.t[original]) t[alias] = target.t[original]; } }
  for (const match of content.matchAll(/export \{([^}]+)\};/gu)) { for (const item of splitTopLevel(match[1])) { const parts = item.split(/\s+as\s+/u).map((part) => part.trim()); const original = parts[0]; const alias = parts[1] ?? original; const imported = imports.get(original); if (imported?.target.x[imported.name]) x[alias] = imported.target.x[imported.name]; if (imported?.target.t[imported.name]) t[alias] = imported.target.t[imported.name]; } }
  for (const match of content.matchAll(/export declare function ([A-Za-z_$][\w$]*)(?:<([^>]*)>)?\(([\s\S]*?)\):\s*([^;]+);/gu)) { const overload = [(match[2] ? splitTopLevel(match[2]).length : 0), positional(match[3]), match[4].trim()]; const current = x[match[1]]; if (current?.[0] === "f") current[1].push(overload); else x[match[1]] = ["f", [overload]]; }
  for (const match of content.matchAll(/export declare const ([A-Za-z_$][\w$]*):\s*([^;]+);/gu)) { const name = match[1]; const type = match[2].trim(); const arrow = /^(?:<([^>]*)>)?\((.*)\)\s*=>\s*(.+)$/u.exec(type); x[name] = arrow ? ["f", [[arrow[1] ? splitTopLevel(arrow[1]).length : 0, positional(arrow[2]), arrow[3].trim()]]] : ["v", type]; }
  Object.assign(t, customTypes(content));
  return canonical(result);
}
/** Mapeia fonte TypeScript ao arquivo de declaração emitido. */
function describe(sourceFile) { return describeDeclaration(path.join(targetRoot, "types", sourceFile.replace(/\.ts$/u, ".d.ts"))); }
/** Cria assinatura autoconsistente da superfície, sem hash circular do arquivo. */
function signature(id, description) { const unsigned = canonical({ v: 1, id, x: description.x, t: description.t }); return Object.freeze(canonical({ ...unsigned, h: sha256(JSON.stringify(unsigned)) })); }
/** Delimita assinatura embutida sem duplicar documentação. */
function signed(content, value) { const marker = `/*# FormulaKitSignature/v1\n${JSON.stringify(value)}\n#*/`; const map = /\n\/\/# sourceMappingURL=.*$/u.exec(content); return map ? `${content.slice(0, map.index)}\n${marker}${map[0]}\n` : `${content.trimEnd()}\n${marker}\n`; }
/** Registra arquivo materializado e seu hash byte a byte no manifesto superior. */
async function record(file, identity, surface, format, scope, level, container) { const bytes = await readFile(file); manifest.artifacts.push(canonical({ file: relative(file), format, hash: sha256(bytes), id: identity, level, scope, signature: surface, size: bytes.length, ...(container ? { container: relative(container) } : {}) })); }
/** Materializa JSON auxiliar com superfície vazia e vínculo verificável. */
async function auxiliaryJson(file, data, name, format, scope = "distribution", level = "metadata", container) { const id = `${packageData.name}@${packageData.version}/${name}#${format}:es${config.ecmascript.resolved}`; const surface = signature(id, { x: {}, t: {} }); await output(file, `${JSON.stringify(canonical({ ...data, x_formulakit_signature: surface }), null, format === "sourcemap" ? 0 : 2)}\n`); await record(file, id, surface, format, scope, level, container); }
/** Incorpora superfície vazia em sourcemap JSON e o vincula ao arquivo mapeado. */
async function signedMap(file, bytes, container, scope, level) { await auxiliaryJson(file, JSON.parse(Buffer.from(bytes).toString("utf8")), relative(file).replace(/^dist\//u, ""), "sourcemap", scope, level, container); }
const entries = [];
for (const scope of config.scopes) {
  entries.push({ key: `${scope}/basic`, source: `${scope}/basic.ts`, scope, level: "basic" });
  entries.push({ key: `${scope}/advanced`, source: `${scope}/advanced.ts`, scope, level: "advanced" });
  entries.push({ key: scope, source: `${scope}/index.ts`, scope, level: "advanced" });
}
entries.push({ key: "index", source: "index.ts", scope: "full", level: "advanced" });
entries.push({ key: "provenance", source: "provenance.ts", scope: "provenance", level: "single" });

/** Constrói um módulo ou bundle em formato declarado e incorpora assinatura exclusiva. */
async function bundle(entry, outfile, format, browser = false) {
  const description = entry.description ?? (browser && entry.key === "index" ? describe("browser.ts") : describe(entry.source)); const id = `${packageData.name}@${packageData.version}/${entry.key}#${browser ? "browser-" : ""}${format}:es${config.ecmascript.resolved}`; const surface = signature(id, description);
  const stdin = browser ? { contents: `import { registerArtifactManifest } from "./src/manifest.ts";\nregisterArtifactManifest(${JSON.stringify(surface)});\nexport * from "./src/${entry.source}";`, resolveDir: root, sourcefile: `browser-${entry.key.replaceAll("/", "-")}.ts`, loader: "ts" } : entry.virtual ? { contents: entry.virtual, resolveDir: root, sourcefile: `${entry.key}.ts`, loader: "ts" } : undefined;
  const result = await esbuild({ absWorkingDir: root, banner: { js: BANNER }, bundle: true, entryPoints: stdin ? undefined : [path.join(sourceRoot, entry.source)], format: "esm", legalComments: "inline", minify: true, outfile, platform: "neutral", sourcemap: "external", stdin, target: `es${config.ecmascript.resolved}`, treeShaking: true, write: false });
  const code = result.outputFiles.find((file) => !file.path.endsWith(".map")); const map = result.outputFiles.find((file) => file.path.endsWith(".map")); if (!code) throw new Error(`BUILD_OUTPUT_MISSING:${entry.key}`);
  let text = code.text; let mapBytes = map?.contents; if (format === "cjs") { const cjs = await esbuild({ absWorkingDir: root, banner: { js: BANNER }, bundle: true, entryPoints: stdin ? undefined : [path.join(sourceRoot, entry.source)], format: "cjs", legalComments: "inline", minify: true, outfile, platform: "node", sourcemap: "external", stdin, target: `es${config.ecmascript.resolved}`, treeShaking: true, write: false }); const cjsCode = cjs.outputFiles.find((file) => !file.path.endsWith(".map")); if (!cjsCode) throw new Error(`BUILD_CJS_MISSING:${entry.key}`); text = cjsCode.text; mapBytes = cjs.outputFiles.find((file) => file.path.endsWith(".map"))?.contents; }
  await output(outfile, signed(text, surface)); await record(outfile, id, surface, browser ? "browser-esm" : format, entry.scope, entry.level); if (mapBytes) await signedMap(`${outfile}.map`, mapBytes, outfile, entry.scope, entry.level); return surface;
}

const sourceFiles = await files(sourceRoot, ".ts");
for (const sourceFile of sourceFiles) describe(path.relative(sourceRoot, sourceFile));
for (const declaration of await files(path.join(targetRoot, "types"), ".d.ts")) { const relativeType = path.relative(path.join(targetRoot, "types"), declaration).replaceAll("\\", "/"); const description = describeDeclaration(declaration); const id = `${packageData.name}@${packageData.version}/types/${relativeType}#types:es${config.ecmascript.resolved}`; const surface = signature(id, description); await output(declaration, signed(await readFile(declaration, "utf8"), surface)); await record(declaration, id, surface, "canonical-types", relativeType.split("/")[0], "types"); const mapFile = `${declaration}.map`; if (fs.existsSync(mapFile)) await signedMap(mapFile, await readFile(mapFile), declaration, relativeType.split("/")[0], "types"); }

for (const entry of entries) {
  const base = entry.key === "index" ? path.join(targetRoot, "index") : path.join(targetRoot, entry.key);
  for (const [extension, format] of [["js", "esm-js"], ["mjs", "esm-mjs"], ["cjs", "cjs"]]) await bundle(entry, entry.key === "index" ? `${base}.${extension}` : path.join(base, `index.${extension}`), format);
  const description = describe(entry.source); const id = `${packageData.name}@${packageData.version}/${entry.key}#types:es${config.ecmascript.resolved}`; const surface = signature(id, description); const depth = entry.key === "index" ? "./types/index.js" : entry.key.includes("/") ? `../../types/${entry.source.replace(/\.ts$/u, ".js")}` : `../types/${entry.source.replace(/\.ts$/u, ".js")}`; const typeFile = entry.key === "index" ? path.join(targetRoot, "index.d.ts") : path.join(targetRoot, entry.key, "index.d.ts"); await output(typeFile, signed(`${BANNER}\nexport * from ${JSON.stringify(depth)};\n`, surface)); await record(typeFile, id, surface, "types", entry.scope, entry.level);
  for (const extension of ["js", "mjs"]) { const browserFile = entry.key === "index" ? path.join(targetRoot, "browser", `index.${extension}`) : path.join(targetRoot, "browser", entry.key, `index.${extension}`); await bundle(entry, browserFile, `esm-${extension}`, true); }
}

{ const description = describe("browser.ts"); const id = `${packageData.name}@${packageData.version}/browser/index#types:es${config.ecmascript.resolved}`; const surface = signature(id, description); const file = path.join(targetRoot, "browser", "index.d.ts"); await output(file, signed(`${BANNER}\nexport * from "../types/browser.js";\n`, surface)); await record(file, id, surface, "types", "full", "advanced"); }

for (const [name, scopes] of Object.entries(config.combinations)) {
  const virtual = scopes.map((scope) => `export * as ${scope} from "./src/${scope}/index.ts";`).join("\n"); const description = { x: Object.fromEntries(scopes.sort().map((scope) => [scope, ["v", `typeof ${scope}`]])), t: {} }; const entry = { key: `combinations/${name}`, virtual, source: "index.ts", scope: scopes.join("+"), level: "advanced", description };
  for (const [extension, format] of [["js", "esm-js"], ["mjs", "esm-mjs"], ["cjs", "cjs"]]) await bundle(entry, path.join(targetRoot, "combinations", `${name}.${extension}`), format);
  { const id = `${packageData.name}@${packageData.version}/${entry.key}#types:es${config.ecmascript.resolved}`; const surface = signature(id, description); const file = path.join(targetRoot, "combinations", `${name}.d.ts`); const exports = scopes.map((scope) => `export * as ${scope} from "../types/${scope}/index.js";`).join("\n"); await output(file, signed(`${BANNER}\n${exports}\n`, surface)); await record(file, id, surface, "types", entry.scope, entry.level); }
  for (const extension of ["js", "mjs"]) await bundle(entry, path.join(targetRoot, "browser", "combinations", `${name}.${extension}`), `esm-${extension}`, true);
}

for (const sourceFile of sourceFiles) { const relativeSource = path.relative(sourceRoot, sourceFile); const description = describe(relativeSource); const id = `${packageData.name}@${packageData.version}/source/${relativeSource.replaceAll("\\", "/")}#typescript:es${config.ecmascript.resolved}`; const surface = signature(id, description); const destination = path.join(targetRoot, "source", relativeSource); await output(destination, signed(await readFile(sourceFile, "utf8"), surface)); await record(destination, id, surface, "typescript", relativeSource.split(path.sep)[0], "source"); }

manifest.artifacts.sort((left, right) => left.file.localeCompare(right.file));
const measurements = [];
for (const artifact of manifest.artifacts.filter((entry) => /\.(?:js|mjs|cjs)$/u.test(entry.file))) { const bytes = await readFile(path.join(root, artifact.file)); measurements.push({ file: artifact.file, raw: bytes.length, gzip: gzipSync(bytes, { level: 9, mtime: 0 }).length, brotli: brotliCompressSync(bytes).length }); }
measurements.sort((left, right) => left.file.localeCompare(right.file));
await auxiliaryJson(path.join(targetRoot, "sizes.json"), { schema: "formulakit-sizes/v1", measurements }, "sizes.json", "size-baseline");
await auxiliaryJson(path.join(targetRoot, "build-meta.json"), { schema: "formulakit-build-meta/v1", target: config.ecmascript.resolved, formula: config.ecmascript.formula, publishedEditions: config.ecmascript.publishedEditions, toolchain: { esbuild: packageData.devDependencies.esbuild, node: packageData.engines.node, typescript: packageData.devDependencies.typescript }, artifacts: manifest.artifacts.length + 1 }, "build-meta.json", "build-metadata");
manifest.artifacts.sort((left, right) => left.file.localeCompare(right.file));
await output(path.join(targetRoot, "manifest.json"), `${JSON.stringify(canonical(manifest), null, 2)}\n`);
console.log(JSON.stringify({ code: "FORMULAKIT_BUILD_OK", artifacts: manifest.artifacts.length, target: `ES${config.ecmascript.resolved}` }));
