// Autor: JeanCarloEM.com | https://jeancarloem.com
// Repositório: https://github.com/jcempro/FormulaKit
// Licença: MPL-2.0 | https://www.mozilla.org/MPL/2.0/
// RCF: ./RCF.md

import { integer } from "../internal.js";

/** Remove duplicatas preservando a primeira ordem. */
export const unique = <T>(values: readonly T[]): T[] => [...new Set(values)];
/** Divide uma coleção em blocos não vazios. */
export function chunk<T>(values: readonly T[], size: number): T[][] { integer(size, "size", 1); const result: T[][] = []; for (let index = 0; index < values.length; index += size) result.push(values.slice(index, index + size)); return result; }
/** Achata exatamente um nível. */
export const flatten = <T>(values: readonly (T | readonly T[])[]): T[] => values.flat() as T[];
/** Particiona conforme predicado sem mutar a entrada. */
export function partition<T>(values: readonly T[], predicate: (value: T, index: number) => boolean): [T[], T[]] { const yes: T[] = []; const no: T[] = []; values.forEach((value, index) => (predicate(value, index) ? yes : no).push(value)); return [yes, no]; }
/** Remove somente null e undefined, preservando falsy válidos. */
export const compact = <T>(values: readonly (T | null | undefined)[]): T[] => values.filter((value): value is T => value != null);
/** Retorna diferença SameValueZero. */
export const difference = <T>(left: readonly T[], right: readonly T[]): T[] => left.filter((value) => !new Set(right).has(value));
/** Retorna interseção única SameValueZero. */
export const intersection = <T>(left: readonly T[], right: readonly T[]): T[] => unique(left.filter((value) => new Set(right).has(value)));
/** Retorna união única SameValueZero. */
export const union = <T>(...collections: readonly (readonly T[])[]): T[] => unique(collections.flat());
/** Combina posições até a menor coleção. */
export function zip<T, U>(left: readonly T[], right: readonly U[]): [T, U][] { return left.slice(0, right.length).map((value, index) => [value, right[index]!]); }

