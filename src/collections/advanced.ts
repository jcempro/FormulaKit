// Autor: JeanCarloEM.com | https://jeancarloem.com
// Repositório: https://github.com/jcempro/FormulaKit
// Licença: MPL-2.0 | https://www.mozilla.org/MPL/2.0/
// RCF: ./RCF.md

export * from "./basic.js";
import { finite, integer } from "../internal.js";

/** Agrupa por chave serializável sem prototype pollution. */
export function groupBy<T>(values: readonly T[], selector: (value: T, index: number) => PropertyKey): Map<PropertyKey, T[]> { const result = new Map<PropertyKey, T[]>(); values.forEach((value, index) => { const key = selector(value, index); const group = result.get(key) ?? []; group.push(value); result.set(key, group); }); return result; }
/** Indexa por chave e rejeita duplicatas. */
export function indexBy<T>(values: readonly T[], selector: (value: T) => PropertyKey): Map<PropertyKey, T> { const result = new Map<PropertyKey, T>(); for (const value of values) { const key = selector(value); if (result.has(key)) throw new Error("duplicate key"); result.set(key, value); } return result; }
/** Ordena por chave sem mutar a entrada e preserva estabilidade. */
export const sortBy = <T>(values: readonly T[], selector: (value: T) => number | string): T[] => [...values].sort((left, right) => { const a = selector(left); const b = selector(right); return a < b ? -1 : a > b ? 1 : 0; });
/** Soma projeções numéricas finitas. */
export const sumBy = <T>(values: readonly T[], selector: (value: T) => number): number => values.reduce((total, value) => total + finite(selector(value)), 0);
/** Cria progressão finita com fim exclusivo. */
export function sequence(start: number, end: number, step = 1): number[] { finite(start); finite(end); finite(step); if (step === 0 || Math.sign(end - start) !== Math.sign(step)) return []; const length = Math.ceil((end - start) / step); integer(length, "length", 0, 1_000_000); return Array.from({ length }, (_, index) => start + index * step); }
/** Conta ocorrências por identidade SameValueZero. */
export function frequencies<T>(values: readonly T[]): Map<T, number> { const result = new Map<T, number>(); for (const value of values) result.set(value, (result.get(value) ?? 0) + 1); return result; }

