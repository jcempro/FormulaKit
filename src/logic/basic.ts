// Autor: JeanCarloEM.com | https://jeancarloem.com
// Repositório: https://github.com/jcempro/FormulaKit
// Licença: MPL-2.0 | https://www.mozilla.org/MPL/2.0/
// RCF: ./RCF.md

/**
 * Exige operandos booleanos e retorna conjunção; identidade vazia é true.
 *
 * @param values - Valores de entrada, preservados na ordem fornecida.
 * @returns Resultado correspondente à finalidade documentada: exige operandos booleanos e retorna conjunção; identidade vazia é true.
 * @throws Quando a entrada viola o contrato da operação (`TypeError`).
 * @example
 * `and(true, true, false); // false`
 */
export function and(...values: readonly boolean[]): boolean { return values.every((value) => { if (typeof value !== "boolean") throw new TypeError("and accepts booleans only"); return value; }); }
/**
 * Exige operandos booleanos e retorna disjunção; identidade vazia é false.
 *
 * @param values - Valores de entrada, preservados na ordem fornecida.
 * @returns Resultado correspondente à finalidade documentada: exige operandos booleanos e retorna disjunção; identidade vazia é false.
 * @throws Quando a entrada viola o contrato da operação (`TypeError`).
 */
export function or(...values: readonly boolean[]): boolean { return values.some((value) => { if (typeof value !== "boolean") throw new TypeError("or accepts booleans only"); return value; }); }
/**
 * Exige operandos booleanos e retorna paridade ímpar; identidade vazia é false.
 *
 * @param values - Valores de entrada, preservados na ordem fornecida.
 * @returns Resultado correspondente à finalidade documentada: exige operandos booleanos e retorna paridade ímpar; identidade vazia é false.
 * @throws Quando a entrada viola o contrato da operação (`TypeError`).
 * @example
 * `xor(true, false, true); // false`
 */
export function xor(...values: readonly boolean[]): boolean { let parity = false; for (const value of values) { if (typeof value !== "boolean") throw new TypeError("xor accepts booleans only"); parity = parity !== value; } return parity; }
/**
 * Inverte um booleano estrito.
 *
 * @param value - Valor de entrada.
 * @returns Resultado correspondente à finalidade documentada: inverte um booleano estrito.
 * @throws Quando a entrada viola o contrato da operação (`TypeError`).
 */
export function not(value: boolean): boolean { if (typeof value !== "boolean") throw new TypeError("not accepts a boolean only"); return !value; }
/**
 * Avalia conjunção por truthiness explicitamente escolhida.
 *
 * @param values - Valores de entrada, preservados na ordem fornecida.
 * @returns Resultado correspondente à finalidade documentada: avalia conjunção por truthiness explicitamente escolhida.
 */
export const andTruthy = (...values: readonly unknown[]): boolean => values.every(Boolean);
/**
 * Avalia disjunção por truthiness explicitamente escolhida.
 *
 * @param values - Valores de entrada, preservados na ordem fornecida.
 * @returns Resultado correspondente à finalidade documentada: avalia disjunção por truthiness explicitamente escolhida.
 */
export const orTruthy = (...values: readonly unknown[]): boolean => values.some(Boolean);
/**
 * Avalia paridade ímpar por truthiness explicitamente escolhida.
 *
 * @param values - Valores de entrada, preservados na ordem fornecida.
 * @returns Resultado correspondente à finalidade documentada: avalia paridade ímpar por truthiness explicitamente escolhida.
 */
export const xorTruthy = (...values: readonly unknown[]): boolean => values.reduce<boolean>((parity, value) => parity !== Boolean(value), false);
/**
 * Retorna true somente quando exatamente um booleano é true.
 *
 * @param values - Valores de entrada, preservados na ordem fornecida.
 * @returns True somente quando exatamente um booleano é true.
 * @throws Quando a entrada viola o contrato da operação (`TypeError`).
 */
export function exactlyOne(...values: readonly boolean[]): boolean { let count = 0; for (const value of values) { if (typeof value !== "boolean") throw new TypeError("exactlyOne accepts booleans only"); if (value && ++count > 1) return false; } return count === 1; }

