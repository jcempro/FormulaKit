// Autor: JeanCarloEM.com | https://jeancarloem.com
// Repositório: https://github.com/jcempro/FormulaKit
// Licença: MPL-2.0 | https://www.mozilla.org/MPL/2.0/
// RCF: ./RCF.md

export * from "./basic.js";

/** Retorna o primeiro valor falsy ou o último valor, como && variádico inequívoco. */
export function andValue<T>(...values: readonly T[]): T | undefined { for (const value of values) if (!value) return value; return values.at(-1); }
/** Retorna o primeiro valor truthy ou o último valor, como || variádico inequívoco. */
export function orValue<T>(...values: readonly T[]): T | undefined { for (const value of values) if (value) return value; return values.at(-1); }
/** Retorna o único valor truthy ou diagnóstico discriminado. */
export function exactlyOneValue<T>(...values: readonly T[]): { ok: true; value: T; index: number } | { ok: false; count: number } {
  let found: { value: T; index: number } | undefined; let count = 0;
  values.forEach((value, index) => { if (value) { count += 1; found ??= { value, index }; } });
  return count === 1 && found ? { ok: true, ...found } : { ok: false, count };
}
/** Avalia thunks booleanos em curto-circuito estrito da esquerda para a direita. */
export function lazyAnd(...operations: readonly (() => boolean)[]): boolean { for (const operation of operations) { const value = operation(); if (typeof value !== "boolean") throw new TypeError("lazyAnd thunks must return booleans"); if (!value) return false; } return true; }
/** Avalia thunks booleanos em curto-circuito estrito da esquerda para a direita. */
export function lazyOr(...operations: readonly (() => boolean)[]): boolean { for (const operation of operations) { const value = operation(); if (typeof value !== "boolean") throw new TypeError("lazyOr thunks must return booleans"); if (value) return true; } return false; }
/** Executa XOR lazy integralmente porque paridade exige todos os operandos. */
export function lazyXor(...operations: readonly (() => boolean)[]): boolean { let result = false; for (const operation of operations) { const value = operation(); if (typeof value !== "boolean") throw new TypeError("lazyXor thunks must return booleans"); result = result !== value; } return result; }

