// Autor: JeanCarloEM.com | https://jeancarloem.com
// Repositório: https://github.com/jcempro/FormulaKit
// Licença: MPL-2.0 | https://www.mozilla.org/MPL/2.0/
// RCF: ./RCF.md

export * from "./basic.js";
import type { ValidationIssue, ValidationResult, Validator } from "./basic.js";
import { validator } from "./basic.js";

/**
 * Opções para regex fornecida pelo consumidor.
 *
 */
export interface RegexValidationOptions { readonly trusted?: boolean; readonly maxPatternLength?: number; }

/**
 * Rejeita construções conhecidas por explosão de backtracking em modo não confiável.
 *
 * @param pattern - Expressão regular fornecida pelo consumidor.
 * @param options - Opções explícitas da operação.
 * @throws Quando a entrada viola o contrato da operação (`RangeError`, `SyntaxError`).
 */
function assertSafeRegex(pattern: RegExp, options: RegexValidationOptions): void {
  const limit = options.maxPatternLength ?? 512; if (pattern.source.length > limit) throw new RangeError("REGEX_PATTERN_TOO_LONG");
  if (!options.trusted && (/\([^)]*[+*][^)]*\)[+*{]/u.test(pattern.source) || /\\[1-9]/u.test(pattern.source) || /\(\?[=!<]/u.test(pattern.source))) throw new SyntaxError("REGEX_UNSAFE_PATTERN");
}
/**
 * Constrói validador de regex com estado lastIndex isolado e modo seguro padrão.
 *
 * @param pattern - Expressão regular fornecida pelo consumidor.
 * @param options - Opções explícitas da operação.
 * @returns Resultado correspondente à finalidade documentada: constrói validador de regex com estado lastIndex isolado e modo seguro padrão.
 * @example
 * `regex(/^[A-Z]+$/u).test("ABC"); // true`
 */
export function regex(pattern: RegExp, options: RegexValidationOptions = {}): Validator<string> { assertSafeRegex(pattern, options); const flags = pattern.flags.replace(/[gy]/gu, ""); const stable = new RegExp(pattern.source, flags); return validator((value) => stable.test(value), { code: "REGEX_MISMATCH", message: "value does not match pattern" }); }
/**
 * Compõe conjunção em curto-circuito e agrega diagnóstico do primeiro erro.
 *
 * @typeParam T - Tipo preservado pela operação.
 * @param rules - Validadores compostos, avaliados em ordem.
 * @returns Resultado correspondente à finalidade documentada: compõe conjunção em curto-circuito e agrega diagnóstico do primeiro erro.
 */
export function allOf<T>(...rules: readonly Validator<T>[]): Validator<T> { return Object.freeze({ test: (value: T) => rules.every((rule) => rule.test(value)), inspect: (value: T) => { for (const rule of rules) { const result = rule.inspect(value); if (!result.ok) return result; } return Object.freeze({ ok: true }); } }); }
/**
 * Compõe disjunção e agrega diagnósticos quando nenhuma regra aceita.
 *
 * @typeParam T - Tipo preservado pela operação.
 * @param rules - Validadores compostos, avaliados em ordem.
 * @returns Resultado correspondente à finalidade documentada: compõe disjunção e agrega diagnósticos quando nenhuma regra aceita.
 */
export function anyOf<T>(...rules: readonly Validator<T>[]): Validator<T> { return Object.freeze({ test: (value: T) => rules.some((rule) => rule.test(value)), inspect: (value: T) => { const issues: ValidationIssue[] = []; for (const rule of rules) { const result = rule.inspect(value); if (result.ok) return Object.freeze({ ok: true }); issues.push(...result.issues); } return Object.freeze({ ok: false, issues: Object.freeze(issues) }); } }); }
/**
 * Exige aceitação por exatamente um validador.
 *
 * @typeParam T - Tipo preservado pela operação.
 * @param rules - Validadores compostos, avaliados em ordem.
 * @returns Resultado correspondente à finalidade documentada: exige aceitação por exatamente um validador.
 */
export function oneOf<T>(...rules: readonly Validator<T>[]): Validator<T> { const evaluate = (value: T): ValidationResult => { const count = rules.reduce((total, rule) => total + Number(rule.test(value)), 0); return count === 1 ? Object.freeze({ ok: true }) : Object.freeze({ ok: false, issues: Object.freeze([{ code: "ONE_OF_INVALID", message: `expected one match, received ${count}` }]) }); }; return Object.freeze({ test: (value: T) => evaluate(value).ok, inspect: evaluate }); }
/**
 * Inverte um validador sem absorver falha de configuração.
 *
 * @typeParam T - Tipo preservado pela operação.
 * @param rule - Validador aplicado ao valor.
 * @returns Resultado correspondente à finalidade documentada: inverte um validador sem absorver falha de configuração.
 */
export function notRule<T>(rule: Validator<T>): Validator<T> { return validator((value) => !rule.test(value), { code: "NOT_INVALID", message: "negated validator matched" }); }
/**
 * Valida comprimento por pontos de código Unicode.
 *
 * @param minimum - Limite inferior inclusivo.
 * @param maximum - Limite superior inclusivo.
 * @returns `true` quando comprimento por pontos de código Unicode; caso contrário, `false`.
 * @throws Quando a entrada viola o contrato da operação (`RangeError`).
 */
export function lengthBetween(minimum: number, maximum: number): Validator<string> { if (!Number.isSafeInteger(minimum) || !Number.isSafeInteger(maximum) || minimum < 0 || minimum > maximum) throw new RangeError("invalid length range"); return validator((value) => { const size = [...value].length; return size >= minimum && size <= maximum; }, { code: "LENGTH_INVALID", message: "invalid length" }); }
