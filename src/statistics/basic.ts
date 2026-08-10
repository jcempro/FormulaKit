// Autor: JeanCarloEM.com | https://jeancarloem.com
// Repositório: https://github.com/jcempro/FormulaKit
// Licença: MPL-2.0 | https://www.mozilla.org/MPL/2.0/
// RCF: ./RCF.md

import { average, max, min, sum } from "../math/basic.js";
export { average as mean, max, min, sum };

/** Calcula mediana sem mutar a entrada. */
export function median(values: readonly number[]): number { if (!values.length) throw new RangeError("values must not be empty"); const sorted = [...values].sort((a, b) => a - b); const middle = Math.floor(sorted.length / 2); return sorted.length % 2 ? sorted[middle]! : (sorted[middle - 1]! + sorted[middle]!) / 2; }
/** Retorna todas as modas em ordem crescente. */
export function modes(values: readonly number[]): number[] { if (!values.length) return []; const counts = new Map<number, number>(); for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1); const peak = Math.max(...counts.values()); return [...counts].filter(([, count]) => count === peak).map(([value]) => value).sort((a, b) => a - b); }
/** Retorna amplitude máxima menos mínima. */
export const range = (values: readonly number[]): number => max(values) - min(values);

