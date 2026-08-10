// Autor: JeanCarloEM.com | https://jeancarloem.com
// Repositório: https://github.com/jcempro/FormulaKit
// Licença: MPL-2.0 | https://www.mozilla.org/MPL/2.0/
// RCF: ./RCF.md

import { createHash } from "node:crypto";
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { TSDocParser } from "@microsoft/tsdoc";
import { marked } from "marked";
import ts from "typescript-api";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE_ROOT = path.join(ROOT, "src");
const MARKDOWN_PATH = path.join(ROOT, "docs", "API.md");
const SITE_ROOT = path.join(ROOT, ".tmp", "docs-site");
const SCOPES = Object.freeze(["math", "logic", "text", "statistics", "finance", "datetime", "collections", "validation", "conversion", "spreadsheet", "br"]);
const parser = new TSDocParser();

const PARAMETER_DESCRIPTIONS = Object.freeze({
  absoluteTolerance: "Tolerância absoluta não negativa.", algorithm: "Algoritmo de dígito verificador.", amount: "Proporção usada na interpolação.",
  base: "Valor-base da operação.", caseSensitive: "Indica se a comparação diferencia caixa.", cashFlows: "Fluxos financeiros em ordem temporal.", character: "Caractere que será convertido.",
  checkDigit: "Dígito verificador esperado.", collections: "Coleções de entrada, na ordem fornecida.", column: "Índice de coluna baseado em zero.",
  date: "Data de entrada, que não é modificada.", days: "Quantidade inteira de dias.", degrees: "Ângulo expresso em graus.", depth: "Profundidade atual da análise sintática.",
  digits: "Quantidade de casas ou dígitos permitida.", dividend: "Número que será dividido.", divisor: "Divisor finito da operação.",
  earlier: "Instante cronologicamente anterior.", end: "Limite final exclusivo.", entries: "Pares de chave e valor pesquisáveis.", exponent: "Expoente finito.", fallback: "Valor ou operação usada quando não há resultado principal.",
  fill: "Texto usado no preenchimento.", form: "Forma de normalização Unicode.", future: "Valor financeiro futuro.", holidays: "Datas UTC bloqueadas no formato YYYY-MM-DD.",
  index: "Índice da posição solicitada.", input: "Texto de entrada a processar.", inputOptions: "Limites opcionais do processamento.",
  fromPeriods: "Quantidade de períodos da taxa de origem.", issue: "Diagnóstico estável associado à rejeição.", iterations: "Número máximo de iterações.", k: "Quantidade de posições escolhidas.", key: "Chave procurada.", later: "Instante cronologicamente posterior.", length: "Comprimento máximo ou desejado.",
  left: "Operando ou coleção à esquerda.", locale: "Locale BCP 47 explícito.", mapTenAndElevenToZero: "Indica se resultados dez e onze são convertidos em zero.",
  mask: "Máscara textual ou plano previamente compilado.", max: "Limite superior inclusivo.", maximum: "Limite superior inclusivo.", maxStates: "Quantidade máxima de estados simultâneos.", message: "Mensagem estável do diagnóstico.", min: "Limite inferior inclusivo.", minimum: "Limite inferior inclusivo.",
  month: "Mês gregoriano numerado de 1 a 12.", months: "Quantidade inteira de meses.", n: "Quantidade total de elementos.", name: "Nome do argumento usado no diagnóstico.", node: "Nó da árvore sintática a avaliar.", operation: "Operação adiada que será avaliada.", operations: "Operações adiadas, avaliadas em ordem.",
  options: "Opções explícitas da operação.", part: "Parcela do total.", pattern: "Expressão regular fornecida pelo consumidor.", payment: "Pagamento periódico.",
  percentage: "Percentual em pontos percentuais.", percentagePoints: "Taxa expressa em pontos percentuais.", periods: "Quantidade de períodos.",
  predicate: "Predicado aplicado a cada valor e índice.", present: "Valor financeiro presente.", principal: "Capital principal.", probability: "Probabilidade entre zero e um.",
  radians: "Ângulo expresso em radianos.", rate: "Taxa fracionária por período.", registry: "Registro interno de assinaturas já aceitas.", relativeTolerance: "Tolerância relativa não negativa.", replacement: "Texto substituto.", required: "Indica se o quantificador é obrigatório.",
  right: "Operando ou coleção à direita.", row: "Índice de linha baseado em zero.", rule: "Validador aplicado ao valor.", rules: "Validadores compostos, avaliados em ordem.",
  sample: "Indica cálculo amostral em vez de populacional.", search: "Texto literal procurado.", selector: "Função que projeta chave ou valor.", signature: "Assinatura individual do artefato.", size: "Tamanho positivo de cada bloco.",
  source: "Texto-fonte declarativo.", start: "Limite inicial inclusivo.", state: "Estado corrente da aplicação da máscara.", states: "Estados candidatos produzidos pela avaliação.", step: "Incremento finito da progressão.", suffix: "Sufixo incluído quando houver truncamento.",
  table: "Matriz usada na busca.", timeZone: "Fuso horário IANA explícito.", tolerance: "Tolerância numérica de convergência.", total: "Valor total da operação.",
  toPeriods: "Quantidade de períodos da taxa de destino.", transform: "Transformação de caixa aplicada à saída.", trusted: "Indica que o padrão foi previamente confiado pelo consumidor.", value: "Valor de entrada.", values: "Valores de entrada, preservados na ordem fornecida.",
  weights: "Pesos inteiros aplicados aos dígitos.", year: "Ano gregoriano.",
});

const EXAMPLES = Object.freeze({
  and: "and(true, true, false); // false",
  applyMask: "applyMask(\"12345678901\", \"###.###.###-##\");",
  clamp: "clamp(15, 0, 10); // 10",
  compileMask: "const cpf = compileMask(\"###.###.###-##\");\ncpf.format(\"12345678901\");",
  orValue: "orValue(undefined, \"resultado\"); // \"resultado\"",
  regex: "regex(/^[A-Z]+$/u).test(\"ABC\"); // true",
  xor: "xor(true, false, true); // false"
});

/** Retorna o comentário TSDoc imediatamente associado a uma declaração. */
function documentationRange(sourceFile, node) {
  const ranges = ts.getLeadingCommentRanges(sourceFile.text, node.getFullStart()) ?? [];
  return ranges.filter((range) => sourceFile.text.slice(range.pos, range.end).startsWith("/**")).at(-1);
}

/** Converte nós TSDoc em texto Markdown compacto. */
function renderDocNode(node) {
  if (typeof node.text === "string") return node.text;
  if (typeof node.code === "string") return `\`${node.code}\``;
  return node.getChildNodes().map(renderDocNode).join("");
}

/** Retorna metadados documentais e rejeita qualquer diagnóstico do parser. */
function parseDocumentation(raw, identity) {
  const context = parser.parseString(raw);
  if (context.log.messages.length) {
    throw new Error(`DOC_TSDOC_INVALIDO:${identity}:${context.log.messages.map((message) => message.unformattedText).join(" | ")}`);
  }
  const doc = context.docComment;
  return {
    summary: renderDocNode(doc.summarySection).trim(),
    params: new Map(doc.params.blocks.map((block) => [block.parameterName, renderDocNode(block.content).trim()])),
    returns: doc.returnsBlock ? renderDocNode(doc.returnsBlock.content).trim() : "",
    throws: doc.customBlocks.filter((block) => block.blockTag.tagName === "@throws").map((block) => renderDocNode(block.content).trim()),
    examples: doc.customBlocks.filter((block) => block.blockTag.tagName === "@example").map((block) => renderDocNode(block.content).trim())
  };
}

/** Identifica declarações de função representadas por function ou const arrow. */
function callableDeclaration(node) {
  if (ts.isFunctionDeclaration(node) || ts.isMethodDeclaration(node) || ts.isConstructorDeclaration(node)) return node;
  if (ts.isVariableStatement(node) && node.declarationList.declarations.length === 1) {
    const declaration = node.declarationList.declarations[0];
    if (declaration && declaration.initializer && (ts.isArrowFunction(declaration.initializer) || ts.isFunctionExpression(declaration.initializer))) return declaration.initializer;
  }
  return undefined;
}

/** Obtém o nome estável de uma declaração documentável. */
function declarationName(node) {
  if (ts.isVariableStatement(node)) return node.declarationList.declarations[0]?.name.getText() ?? "anonymous";
  if (ts.isConstructorDeclaration(node)) return "constructor";
  return node.name?.getText() ?? "anonymous";
}

/** Produz descrição curta e semântica para um parâmetro. */
function describeParameter(name) {
  return PARAMETER_DESCRIPTIONS[name] ?? `Valor de \`${name}\` conforme o contrato tipado.`;
}

/** Deriva texto de retorno da finalidade humana sem repetir a assinatura tipada. */
function describeReturn(summary) {
  const returned = /^Retorna (.+)$/u.exec(summary);
  if (returned) return returned[1][0].toLocaleUpperCase("pt-BR") + returned[1].slice(1);
  const booleanResult = /^(?:Valida|Informa se|Testa) (.+)$/u.exec(summary);
  if (booleanResult) return `\`true\` quando ${booleanResult[1].replace(/\.$/u, "")}; caso contrário, \`false\`.`;
  return `Resultado correspondente à finalidade documentada: ${summary[0].toLocaleLowerCase("pt-BR")}${summary.slice(1)}`;
}

/** Produz bloco TSDoc completo a partir da descrição humana já existente. */
function normalizedComment(node, sourceFile, raw) {
  const summary = /^\/\*\*[^\r\n]*\*\/$/u.test(raw)
    ? raw.replace(/^\/\*\*\s*/u, "").replace(/\s*\*\/$/u, "").trim()
    : parseDocumentation(raw, declarationName(node)).summary;
  const callable = callableDeclaration(node);
  const lines = ["/**", ` * ${summary}`, " *"];
  for (const typeParameter of callable?.typeParameters ?? []) lines.push(` * @typeParam ${typeParameter.name.text} - Tipo preservado pela operação.`);
  for (const parameter of callable?.parameters ?? []) {
    const name = parameter.name.getText(sourceFile).replace(/^\.\.\./u, "");
    lines.push(` * @param ${name} - ${describeParameter(name)}`);
  }
  if (callable && !ts.isConstructorDeclaration(callable) && callable.type?.getText(sourceFile) !== "void") lines.push(` * @returns ${describeReturn(summary)}`);
  const throws = [...new Set((node.getText(sourceFile).match(/throw new ([A-Za-z]+Error)/gu) ?? []).map((entry) => entry.slice(10)))];
  if (throws.length) lines.push(` * @throws Quando a entrada viola o contrato da operação (${throws.map((name) => `\`${name}\``).join(", ")}).`);
  const example = EXAMPLES[declarationName(node)];
  if (example) lines.push(" * @example", ...example.split("\n").map((line) => ` * \`${line}\``));
  lines.push(" */");
  return lines.join("\n");
}

/** Converte comentários sumários existentes sem alterar implementação. */
async function normalizeSources() {
  const files = (await collectSourceFiles(SOURCE_ROOT)).filter((file) => !file.endsWith(`${path.sep}index.ts`));
  let changed = 0;
  for (const file of files) {
    const text = await readFile(file, "utf8");
    const sourceFile = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
    const replacements = [];
    const visit = (node) => {
      const range = documentationRange(sourceFile, node);
      if (range) {
        const raw = text.slice(range.pos, range.end);
        if ((/^\/\*\*[^\r\n]*\*\/$/u.test(raw) || raw.includes("Resultado da operação descrita, com o tipo declarado na assinatura.") || raw.includes("conforme o contrato tipado.")) && (callableDeclaration(node) || ts.isInterfaceDeclaration(node) || ts.isTypeAliasDeclaration(node) || ts.isClassDeclaration(node))) {
          replacements.push({ start: range.pos, end: range.end, value: normalizedComment(node, sourceFile, raw) });
        }
      }
      ts.forEachChild(node, visit);
    };
    visit(sourceFile);
    if (!replacements.length) continue;
    let output = text;
    for (const replacement of replacements.sort((left, right) => right.start - left.start)) output = output.slice(0, replacement.start) + replacement.value + output.slice(replacement.end);
    await writeFile(file, output, "utf8");
    changed += replacements.length;
  }
  process.stdout.write(`FORMULAKIT_DOC_NORMALIZED:${changed}\n`);
}

/** Enumera fontes TypeScript por ordem lexical sem seguir diretórios externos. */
async function collectSourceFiles(directory) {
  const result = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) result.push(...await collectSourceFiles(fullPath));
    else if (entry.isFile() && entry.name.endsWith(".ts")) result.push(fullPath);
  }
  return result.sort();
}

/** Cria programa TypeScript usando exatamente a configuração canônica. */
function createTypeScriptProgram() {
  const configPath = path.join(ROOT, "tsconfig.json");
  const config = ts.readConfigFile(configPath, ts.sys.readFile);
  if (config.error) throw new Error(ts.flattenDiagnosticMessageText(config.error.messageText, "\n"));
  const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, ROOT);
  if (parsed.errors.length) throw new Error(ts.formatDiagnostics(parsed.errors, { getCanonicalFileName: (value) => value, getCurrentDirectory: () => ROOT, getNewLine: () => "\n" }));
  return ts.createProgram(parsed.fileNames, parsed.options);
}

/** Extrai assinatura pública sem incorporar o corpo da função. */
function signatureOf(node, checker) {
  const callable = callableDeclaration(node);
  if (callable) {
    const signature = checker.getSignatureFromDeclaration(callable);
    if (!signature) throw new Error(`DOC_ASSINATURA_AUSENTE:${declarationName(node)}`);
    return `${declarationName(node)}${checker.signatureToString(signature, undefined, ts.TypeFormatFlags.NoTruncation)}`;
  }
  return node.getText().replace(/\s+/gu, " ");
}

/** Valida e coleta as declarações públicas próprias de um módulo. */
function documentedDeclarations(sourceFile, checker, scope, level) {
  const declarations = [];
  for (const node of sourceFile.statements) {
    const exported = node.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword);
    if (!exported || ts.isExportDeclaration(node)) continue;
    if (!(callableDeclaration(node) || ts.isInterfaceDeclaration(node) || ts.isTypeAliasDeclaration(node))) continue;
    const name = declarationName(node);
    const range = documentationRange(sourceFile, node);
    if (!range) throw new Error(`DOC_COMENTARIO_AUSENTE:${scope}/${level}:${name}`);
    const raw = sourceFile.text.slice(range.pos, range.end);
    const documentation = parseDocumentation(raw, `${scope}/${level}:${name}`);
    if (!documentation.summary) throw new Error(`DOC_RESUMO_AUSENTE:${scope}/${level}:${name}`);
    const callable = callableDeclaration(node);
    const parameters = (callable?.parameters ?? []).map((parameter) => parameter.name.getText(sourceFile).replace(/^\.\.\./u, ""));
    const documentedParameters = [...documentation.params.keys()];
    if (parameters.join("\0") !== documentedParameters.join("\0")) throw new Error(`DOC_PARAMETROS_DIVERGENTES:${scope}/${level}:${name}`);
    const signature = signatureOf(node, checker);
    const returnsVoid = callable && (callable.type?.getText(sourceFile) === "void" || signature.endsWith(": void"));
    if (callable && !ts.isConstructorDeclaration(callable) && !returnsVoid && !documentation.returns) throw new Error(`DOC_RETORNO_AUSENTE:${scope}/${level}:${name}`);
    declarations.push({ name, scope, level, signature, ...documentation });
  }
  return declarations.sort((left, right) => left.name.localeCompare(right.name, "en"));
}

/** Gera Markdown canônico e HTML autocontido para publicação estática. */
async function generateDocumentation() {
  const packageMetadata = JSON.parse(await readFile(path.join(ROOT, "package.json"), "utf8"));
  const program = createTypeScriptProgram();
  const checker = program.getTypeChecker();
  const diagnostics = ts.getPreEmitDiagnostics(program);
  if (diagnostics.length) throw new Error(ts.formatDiagnostics(diagnostics, { getCanonicalFileName: (value) => value, getCurrentDirectory: () => ROOT, getNewLine: () => "\n" }));
  const sections = [];
  let declarationCount = 0;
  for (const scope of SCOPES) {
    const files = [path.join(SOURCE_ROOT, scope, "basic.ts"), path.join(SOURCE_ROOT, scope, "advanced.ts")];
    if (scope === "text") files.push(path.join(SOURCE_ROOT, scope, "mask.ts"));
    const scopeDeclarations = [];
    const exportsByLevel = new Map();
    for (const file of files) {
      const sourceFile = program.getSourceFile(file);
      if (!sourceFile) throw new Error(`DOC_FONTE_AUSENTE:${path.relative(ROOT, file)}`);
      const level = path.basename(file, ".ts");
      scopeDeclarations.push(...documentedDeclarations(sourceFile, checker, scope, level));
      if (level === "basic" || level === "advanced") {
        const moduleSymbol = checker.getSymbolAtLocation(sourceFile);
        if (!moduleSymbol) throw new Error(`DOC_MODULO_AUSENTE:${scope}/${level}`);
        exportsByLevel.set(level, checker.getExportsOfModule(moduleSymbol).map((symbol) => symbol.name).sort((left, right) => left.localeCompare(right, "en")));
      }
    }
    const basicExports = exportsByLevel.get("basic") ?? [];
    const advancedExports = exportsByLevel.get("advanced") ?? [];
    if (basicExports.some((name) => !advancedExports.includes(name))) throw new Error(`DOC_NIVEL_NAO_CUMULATIVO:${scope}`);
    declarationCount += scopeDeclarations.length;
    const body = scopeDeclarations.map((declaration) => {
      const parameters = [...declaration.params].map(([name, description]) => `- \`${name}\`: ${description}`).join("\n");
      const examples = declaration.examples.map((example) => `\nExemplo:\n\n\`\`\`ts\n${example.replace(/`/gu, "")}\n\`\`\``).join("\n");
      const failures = declaration.throws.length ? `\nFalhas:\n\n${declaration.throws.map((failure) => `- ${failure}`).join("\n")}\n` : "";
      return `### \`${declaration.name}\`\n\n${declaration.summary}\n\n\`\`\`ts\n${declaration.signature}\n\`\`\`\n${parameters ? `\nParâmetros:\n\n${parameters}\n` : ""}${declaration.returns ? `\nRetorno: ${declaration.returns}\n` : ""}${failures}${examples}`;
    }).join("\n\n");
    sections.push(`## ${scope}\n\nNíveis cumulativos: \`basic ⊆ advanced\`.\n\nExports de \`basic\` (${basicExports.length}): ${basicExports.map((name) => `\`${name}\``).join(", ")}.\n\nExports de \`advanced\` (${advancedExports.length}): ${advancedExports.map((name) => `\`${name}\``).join(", ")}.\n\n${body}`);
  }
  const markdown = `# API pública do FormulaKit\n\n> Arquivo gerado automaticamente. Não edite manualmente. Fonte: comentários TSDoc em \`src/\`.\n\nVersão documentada: \`${packageMetadata.version}\`. Declarações próprias documentadas: ${declarationCount}. Os níveis \`advanced\` também reexportam integralmente \`basic\`.\n\n${sections.join("\n\n")}`.trimEnd() + "\n";
  const digest = createHash("sha256").update(markdown, "utf8").digest("hex");
  if (!declarationCount || markdown.length < 1_000) throw new Error("DOC_SAIDA_VAZIA");
  const htmlBody = await marked.parse(markdown, { gfm: true });
  const html = `<!doctype html>\n<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="generator" content="FormulaKit documentation"><title>FormulaKit — API</title><style>:root{color-scheme:light dark;font-family:Inter,ui-sans-serif,system-ui,sans-serif;line-height:1.55}body{max-width:76rem;margin:auto;padding:2rem}a{color:#5b8cff}code{font-family:ui-monospace,SFMono-Regular,Consolas,monospace}pre{overflow:auto;padding:1rem;border:1px solid #8886;border-radius:.5rem;background:#8881}h2{margin-top:3rem;border-bottom:1px solid #8885}h3{margin-top:2rem}.meta{font-size:.875rem;opacity:.75}</style></head><body><p class="meta">SHA-256 da referência: <code>${digest}</code></p>${htmlBody}</body></html>\n`;
  return { markdown, html, declarationCount, digest };
}

/** Materializa a documentação ou confirma que a cópia versionada está atual. */
async function main(command = process.argv[2] ?? "build") {
  if (command === "normalize") return normalizeSources();
  const generated = await generateDocumentation();
  if (command === "check") {
    const current = await readFile(MARKDOWN_PATH, "utf8");
    if (current !== generated.markdown) throw new Error("DOC_DESATUALIZADA:execute npm run docs");
    process.stdout.write(`FORMULAKIT_DOC_OK:${generated.declarationCount}:${generated.digest}\n`);
    return;
  }
  if (command !== "build") throw new Error(`DOC_COMANDO_INVALIDO:${command}`);
  await mkdir(path.dirname(MARKDOWN_PATH), { recursive: true });
  await mkdir(SITE_ROOT, { recursive: true });
  await writeFile(MARKDOWN_PATH, generated.markdown, "utf8");
  await writeFile(path.join(SITE_ROOT, "index.html"), generated.html, "utf8");
  await writeFile(path.join(SITE_ROOT, ".nojekyll"), "", "utf8");
  process.stdout.write(`FORMULAKIT_DOC_BUILT:${generated.declarationCount}:${generated.digest}\n`);
}

main().catch((error) => {
  process.stderr.write(`${error instanceof Error ? error.stack ?? error.message : String(error)}\n`);
  process.exitCode = 1;
});
