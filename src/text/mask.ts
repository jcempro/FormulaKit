// Autor: JeanCarloEM.com | https://jeancarloem.com
// Repositório: https://github.com/jcempro/FormulaKit
// Licença: MPL-2.0 | https://www.mozilla.org/MPL/2.0/
// RCF: ./RCF.md

import { deepFreeze, integer } from "../internal.js";

/**
 * Opções limitadas do compilador de máscaras.
 *
 */
export interface MaskOptions { readonly maxInputLength?: number; readonly maxOutputLength?: number; readonly maxDepth?: number; readonly maxStates?: number; }
/**
 * Diagnóstico posicional seguro de uma máscara.
 *
 */
export interface MaskDiagnostic { readonly code: "MASK_SYNTAX" | "MASK_INPUT" | "MASK_LIMIT"; readonly position: number; readonly message: string; }
/**
 * Resultado estruturado de aplicação e validação.
 *
 */
export type MaskResult = Readonly<{ ok: true; value: string; consumed: number } | { ok: false; value: string; consumed: number; error: MaskDiagnostic }>;
/**
 * Plano compilado imutável e reutilizável.
 *
 */
export interface MaskPlan { readonly source: string; readonly format: (input: string) => MaskResult; readonly validate: (input: string) => boolean; }

type Transform = "none" | "upper" | "lower";
type Node = Readonly<
  | { k: "literal"; value: string }
  | { k: "class"; value: "digit" | "letter" | "alphanumeric" | "any" }
  | { k: "sequence"; nodes: readonly Node[] }
  | { k: "alternative"; nodes: readonly Node[] }
  | { k: "repeat"; node: Node; min: number; max: number }
  | { k: "transform"; node: Node; transform: Transform }
  | { k: "fill"; value: string; count: number }
>;
type State = Readonly<{ index: number; output: string }>;

const DEFAULTS = Object.freeze({ maxInputLength: 4096, maxOutputLength: 8192, maxDepth: 32, maxStates: 256 });
const cache = new Map<string, MaskPlan>();
const CACHE_LIMIT = 128;

/**
 * Analisa a gramática compacta sem avaliação dinâmica.
 *
 * @throws Quando a entrada viola o contrato da operação (`SyntaxError`).
 */
class Parser {
  private index = 0;
  public constructor(private readonly source: string, private readonly maxDepth: number) {}
  /**
 * Produz a raiz e rejeita tokens residuais.
 *
 * @returns Resultado correspondente à finalidade documentada: produz a raiz e rejeita tokens residuais.
 */
  public parse(): Node { const node = this.alternative(0, ""); if (this.index !== this.source.length) this.fail("unexpected token"); return node; }
  /**
 * Analisa alternativas separadas por barra vertical.
 *
 * @param depth - Profundidade atual da análise sintática.
 * @param end - Limite final exclusivo.
 * @returns Resultado correspondente à finalidade documentada: analisa alternativas separadas por barra vertical.
 */
  private alternative(depth: number, end: string): Node { const branches: Node[] = [this.sequence(depth, end)]; while (this.source[this.index] === "|") { this.index += 1; branches.push(this.sequence(depth, end)); } return branches.length === 1 ? branches[0]! : { k: "alternative", nodes: branches }; }
  /**
 * Analisa sequência até delimitador, alternativa ou fim.
 *
 * @param depth - Profundidade atual da análise sintática.
 * @param end - Limite final exclusivo.
 * @returns Resultado correspondente à finalidade documentada: analisa sequência até delimitador, alternativa ou fim.
 */
  private sequence(depth: number, end: string): Node { if (depth > this.maxDepth) this.fail("maximum depth exceeded"); const nodes: Node[] = []; while (this.index < this.source.length && this.source[this.index] !== end && this.source[this.index] !== "|") nodes.push(this.atom(depth)); return nodes.length === 1 ? nodes[0]! : { k: "sequence", nodes }; }
  /**
 * Analisa átomo, transformação e quantificador.
 *
 * @param depth - Profundidade atual da análise sintática.
 * @returns Resultado correspondente à finalidade documentada: analisa átomo, transformação e quantificador.
 */
  private atom(depth: number): Node {
    const token = this.source[this.index++]; if (token === undefined) this.fail("missing atom"); let node: Node;
    if (token === "\\") { const value = this.source[this.index++]; if (value === undefined) this.fail("missing escaped literal"); node = { k: "literal", value }; }
    else if (token === "'") { let value = ""; while (this.index < this.source.length && this.source[this.index] !== "'") value += this.source[this.index++]; if (this.source[this.index++] !== "'") this.fail("unterminated literal"); node = { k: "literal", value }; }
    else if (token === "(") { node = this.alternative(depth + 1, ")"); if (this.source[this.index++] !== ")") this.fail("unterminated group"); }
    else if (token === "#" || token === "A" || token === "X" || token === "@") node = { k: "class", value: token === "#" ? "digit" : token === "A" ? "letter" : token === "X" ? "alphanumeric" : "any" };
    else if (token === ">" || token === "<") node = { k: "transform", node: this.atom(depth + 1), transform: token === ">" ? "upper" : "lower" };
    else if (token === "~") { const value = this.source[this.index++]; if (value === undefined) this.fail("missing fill character"); const [min, max] = this.quantifier(true); if (min !== max) this.fail("fill requires exact count"); return { k: "fill", value, count: min }; }
    else if (")|?+{}".includes(token)) this.fail("unexpected operator");
    else node = { k: "literal", value: token };
    if (this.source[this.index] === "?") { this.index += 1; return { k: "repeat", node, min: 0, max: 1 }; }
    if (this.source[this.index] === "+") { this.index += 1; return { k: "repeat", node, min: 1, max: DEFAULTS.maxInputLength }; }
    if (this.source[this.index] === "{") { const [min, max] = this.quantifier(false); return { k: "repeat", node, min, max }; }
    return node;
  }
  /**
 * Lê quantificador fechado e limitado.
 *
 * @param required - Indica se o quantificador é obrigatório.
 * @returns Resultado correspondente à finalidade documentada: lê quantificador fechado e limitado.
 */
  private quantifier(required: boolean): [number, number] { if (this.source[this.index] !== "{") { if (required) this.fail("missing fill count"); return [1, 1]; } this.index += 1; const match = /^(\d+)(?:,(\d+))?\}/u.exec(this.source.slice(this.index)); if (!match) this.fail("invalid quantifier"); this.index += match![0].length; const min = integer(Number(match![1]), "min", 0, DEFAULTS.maxInputLength); const max = integer(Number(match![2] ?? match![1]), "max", min, DEFAULTS.maxInputLength); return [min, max]; }
  /**
 * Lança erro sintático com posição estável.
 *
 * @param message - Mensagem estável do diagnóstico.
 * @returns Resultado correspondente à finalidade documentada: lança erro sintático com posição estável.
 * @throws Quando a entrada viola o contrato da operação (`SyntaxError`).
 */
  private fail(message: string): never { throw new SyntaxError(`MASK_SYNTAX:${this.index}:${message}`); }
}

/**
 * Deduplica e limita estados para conter alternativas adversariais.
 *
 * @param states - Estados candidatos produzidos pela avaliação.
 * @param maxStates - Quantidade máxima de estados simultâneos.
 * @returns Resultado correspondente à finalidade documentada: deduplica e limita estados para conter alternativas adversariais.
 * @throws Quando a entrada viola o contrato da operação (`RangeError`).
 */
function bounded(states: readonly State[], maxStates: number): State[] { const seen = new Set<string>(); const result: State[] = []; for (const state of states) { const key = `${state.index}\0${state.output}`; if (!seen.has(key)) { seen.add(key); result.push(state); if (result.length > maxStates) throw new RangeError("MASK_LIMIT:state limit exceeded"); } } return result; }
/**
 * Aplica nó da AST de modo finito e determinístico.
 *
 * @param node - Nó da árvore sintática a avaliar.
 * @param input - Texto de entrada a processar.
 * @param state - Estado corrente da aplicação da máscara.
 * @param options - Opções explícitas da operação.
 * @param transform - Transformação de caixa aplicada à saída.
 * @returns Resultado correspondente à finalidade documentada: aplica nó da AST de modo finito e determinístico.
 * @throws Quando a entrada viola o contrato da operação (`RangeError`).
 */
function run(node: Node, input: readonly string[], state: State, options: Required<MaskOptions>, transform: Transform = "none"): State[] {
  if (state.output.length > options.maxOutputLength) throw new RangeError("MASK_LIMIT:output limit exceeded");
  if (node.k === "literal") return [{ ...state, output: state.output + node.value }];
  if (node.k === "fill") return [{ ...state, output: state.output + node.value.repeat(node.count) }];
  if (node.k === "transform") return run(node.node, input, state, options, node.transform);
  if (node.k === "class") { const value = input[state.index]; if (value === undefined) return []; const valid = node.value === "digit" ? /^\p{Nd}$/u.test(value) : node.value === "letter" ? /^\p{L}$/u.test(value) : node.value === "alphanumeric" ? /^[\p{L}\p{Nd}]$/u.test(value) : true; if (!valid) return []; const output = transform === "upper" ? value.toLocaleUpperCase() : transform === "lower" ? value.toLocaleLowerCase() : value; return [{ index: state.index + 1, output: state.output + output }]; }
  if (node.k === "alternative") return bounded(node.nodes.flatMap((branch) => run(branch, input, state, options, transform)), options.maxStates);
  if (node.k === "sequence") { let states: State[] = [state]; for (const child of node.nodes) states = bounded(states.flatMap((current) => run(child, input, current, options, transform)), options.maxStates); return states; }
  const layers: State[][] = [[state]]; for (let count = 1; count <= node.max; count += 1) { const next = bounded(layers[count - 1]!.flatMap((current) => run(node.node, input, current, options, transform)), options.maxStates); if (!next.length || next.every((candidate, index) => candidate.index === layers[count - 1]![index]?.index && candidate.output === layers[count - 1]![index]?.output)) break; layers.push(next); }
  return bounded(layers.slice(node.min).reverse().flat(), options.maxStates);
}

/**
 * Compila máscara declarativa cacheável com classes `#`, `A`, `X` e `@`; grupos, alternativas, quantificadores `?`, `+` e `{n,m}`; transformações `>` e `<`; literais e preenchimento `~c{n}`.
 *
 * @param source - Texto-fonte declarativo.
 * @param inputOptions - Limites opcionais do processamento.
 * @returns Resultado correspondente à finalidade documentada: compila máscara declarativa cacheável com classes `#`, `A`, `X` e `@`; grupos, alternativas, quantificadores `?`, `+` e `{n,m}`; transformações `>` e `<`; literais e preenchimento `~c{n}`.
 * @throws Quando a entrada viola o contrato da operação (`RangeError`).
 * @example
 * `const cpf = compileMask("###.###.###-##");`
 * `cpf.format("12345678901");`
 */
export function compileMask(source: string, inputOptions: MaskOptions = {}): MaskPlan {
  const options: Required<MaskOptions> = { ...DEFAULTS, ...inputOptions }; const key = JSON.stringify([source, options]); const cached = cache.get(key); if (cached) return cached;
  if (!source || source.length > 4096) throw new RangeError("MASK_LIMIT:source length"); const root = deepFreeze(new Parser(source, options.maxDepth).parse());
  const format = (input: string): MaskResult => { const units = [...input]; if (units.length > options.maxInputLength) return deepFreeze({ ok: false, value: "", consumed: 0, error: { code: "MASK_LIMIT" as const, position: options.maxInputLength, message: "input limit exceeded" } }); try { const states = run(root, units, { index: 0, output: "" }, options); const complete = states.find((state) => state.index === units.length); if (complete) return deepFreeze({ ok: true, value: complete.output, consumed: complete.index }); const best = states.reduce<State>((current, state) => state.index > current.index ? state : current, { index: 0, output: "" }); return deepFreeze({ ok: false, value: best.output, consumed: best.index, error: { code: "MASK_INPUT" as const, position: best.index, message: "input does not match mask" } }); } catch (error) { return deepFreeze({ ok: false, value: "", consumed: 0, error: { code: "MASK_LIMIT" as const, position: 0, message: error instanceof Error ? error.message : "mask limit" } }); } };
  const plan = deepFreeze<MaskPlan>({ source, format, validate: (input) => format(input).ok }); cache.set(key, plan); if (cache.size > CACHE_LIMIT) cache.delete(cache.keys().next().value!); return plan;
}

/**
 * Aplica uma máscara compilada ou textual e retorna diagnóstico estruturado.
 *
 * @param input - Texto de entrada a processar.
 * @param mask - Máscara textual ou plano previamente compilado.
 * @param options - Opções explícitas da operação.
 * @returns Resultado correspondente à finalidade documentada: aplica uma máscara compilada ou textual e retorna diagnóstico estruturado.
 * @example
 * `applyMask("12345678901", "###.###.###-##");`
 */
export const applyMask = (input: string, mask: string | MaskPlan, options?: MaskOptions): MaskResult => (typeof mask === "string" ? compileMask(mask, options) : mask).format(input);
/**
 * Limpa o cache limitado para testes ou ciclo de vida controlado.
 *
 */
export const clearMaskCache = (): void => { cache.clear(); };
