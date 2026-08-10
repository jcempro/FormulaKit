// Autor: JeanCarloEM.com | https://jeancarloem.com
// Repositório: https://github.com/jcempro/FormulaKit
// Licença: MPL-2.0 | https://www.mozilla.org/MPL/2.0/
// RCF: ./RCF.md

/** Exige operandos booleanos e retorna conjunção; identidade vazia é true. */
export function and(...values: readonly boolean[]): boolean { return values.every((value) => { if (typeof value !== "boolean") throw new TypeError("and accepts booleans only"); return value; }); }
/** Exige operandos booleanos e retorna disjunção; identidade vazia é false. */
export function or(...values: readonly boolean[]): boolean { return values.some((value) => { if (typeof value !== "boolean") throw new TypeError("or accepts booleans only"); return value; }); }
/** Exige operandos booleanos e retorna paridade ímpar; identidade vazia é false. */
export function xor(...values: readonly boolean[]): boolean { let parity = false; for (const value of values) { if (typeof value !== "boolean") throw new TypeError("xor accepts booleans only"); parity = parity !== value; } return parity; }
/** Inverte um booleano estrito. */
export function not(value: boolean): boolean { if (typeof value !== "boolean") throw new TypeError("not accepts a boolean only"); return !value; }
/** Avalia conjunção por truthiness explicitamente escolhida. */
export const andTruthy = (...values: readonly unknown[]): boolean => values.every(Boolean);
/** Avalia disjunção por truthiness explicitamente escolhida. */
export const orTruthy = (...values: readonly unknown[]): boolean => values.some(Boolean);
/** Avalia paridade ímpar por truthiness explicitamente escolhida. */
export const xorTruthy = (...values: readonly unknown[]): boolean => values.reduce<boolean>((parity, value) => parity !== Boolean(value), false);
/** Retorna true somente quando exatamente um booleano é true. */
export function exactlyOne(...values: readonly boolean[]): boolean { let count = 0; for (const value of values) { if (typeof value !== "boolean") throw new TypeError("exactlyOne accepts booleans only"); if (value && ++count > 1) return false; } return count === 1; }

