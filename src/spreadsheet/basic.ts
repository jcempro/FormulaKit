// Autor: JeanCarloEM.com | https://jeancarloem.com
// Repositório: https://github.com/jcempro/FormulaKit
// Licença: MPL-2.0 | https://www.mozilla.org/MPL/2.0/
// RCF: ./RCF.md

/** Retorna fallback somente quando a operação lança. */
export function ifError<T>(operation: () => T, fallback: T | (() => T)): T { try { return operation(); } catch { return typeof fallback === "function" ? (fallback as () => T)() : fallback; } }
/** Escolhe item por índice baseado em um, conforme planilhas. */
export function choose<T>(index: number, ...values: readonly T[]): T { if (!Number.isSafeInteger(index) || index < 1 || index > values.length) throw new RangeError("index out of range"); return values[index - 1]!; }
/** Concatena valores por conversão String explícita. */
export const concatenate = (...values: readonly unknown[]): string => values.map(String).join("");
/** Conta valores que satisfazem predicado. */
export const countIf = <T>(values: readonly T[], predicate: (value: T, index: number) => boolean): number => values.reduce((count, value, index) => count + Number(predicate(value, index)), 0);
/** Soma números cuja posição satisfaz predicado. */
export const sumIf = (values: readonly number[], predicate: (value: number, index: number) => boolean): number => values.reduce((total, value, index) => total + (predicate(value, index) ? value : 0), 0);
/** Calcula média dos números aceitos e rejeita conjunto vazio. */
export function averageIf(values: readonly number[], predicate: (value: number, index: number) => boolean): number { const selected = values.filter(predicate); if (!selected.length) throw new RangeError("no matching values"); return selected.reduce((total, value) => total + value, 0) / selected.length; }

