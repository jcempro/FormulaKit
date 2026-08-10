// Autor: JeanCarloEM.com | https://jeancarloem.com
// Repositório: https://github.com/jcempro/FormulaKit
// Licença: MPL-2.0 | https://www.mozilla.org/MPL/2.0/
// RCF: ./RCF.md

export * from "./basic.js";

/** Localiza chave exata em pares e retorna fallback opcional. */
export function lookup<K, V>(key: K, entries: readonly (readonly [K, V])[], fallback?: V): V | undefined { for (const [candidate, value] of entries) if (Object.is(candidate, key) || candidate === key) return value; return fallback; }
/** Localiza chave na primeira coluna e retorna coluna baseada em zero. */
export function vlookup<T>(key: T, table: readonly (readonly unknown[])[], column: number): unknown { if (!Number.isSafeInteger(column) || column < 0) throw new RangeError("invalid column"); const row = table.find((candidate) => Object.is(candidate[0], key) || candidate[0] === key); if (!row || column >= row.length) throw new RangeError("lookup not found"); return row[column]; }
/** Localiza chave na primeira linha e retorna linha baseada em zero. */
export function hlookup<T>(key: T, table: readonly (readonly unknown[])[], row: number): unknown { if (!table.length || !Number.isSafeInteger(row) || row < 0 || row >= table.length) throw new RangeError("invalid row"); const column = table[0]!.findIndex((candidate) => Object.is(candidate, key) || candidate === key); if (column < 0) throw new RangeError("lookup not found"); return table[row]![column]; }
/** Retorna índice baseado em zero de correspondência exata. */
export const match = <T>(value: T, values: readonly T[]): number => values.findIndex((candidate) => Object.is(candidate, value) || candidate === value);

