// Autor: JeanCarloEM.com | https://jeancarloem.com
// Repositório: https://github.com/jcempro/FormulaKit
// Licença: MPL-2.0 | https://www.mozilla.org/MPL/2.0/
// RCF: ./RCF.md

export * from "./basic.js";
import { finite, integer } from "../internal.js";

/** Eleva uma base finita ao expoente finito. */
export const power = (base: number, exponent: number): number => finite(base, "base") ** finite(exponent, "exponent");
/** Calcula raiz quadrada real não negativa. */
export function sqrt(value: number): number { finite(value); if (value < 0) throw new RangeError("value must be non-negative"); return Math.sqrt(value); }
/** Calcula raiz cúbica real. */
export const cbrt = (value: number): number => Math.cbrt(finite(value));
/** Calcula fatorial exato enquanto o resultado permanece seguro. */
export function factorial(value: number): number {
  integer(value, "value", 0, 18); let result = 1;
  for (let index = 2; index <= value; index += 1) result *= index;
  return result;
}
/** Calcula combinações de n elementos em k posições. */
export function combinations(n: number, k: number): number {
  integer(n, "n", 0, 1_000); integer(k, "k", 0, n); const size = Math.min(k, n - k); let result = 1;
  for (let index = 1; index <= size; index += 1) result = result * (n - size + index) / index;
  return result;
}
/** Calcula permutações sem repetição. */
export function permutations(n: number, k: number): number {
  integer(n, "n", 0, 170); integer(k, "k", 0, n); let result = 1;
  for (let index = 0; index < k; index += 1) result *= n - index;
  return result;
}
/** Interpola linearmente entre dois valores. */
export const lerp = (start: number, end: number, amount: number): number => finite(start) + (finite(end) - start) * finite(amount);
/** Normaliza valor para a proporção de um intervalo. */
export function normalizeRange(value: number, start: number, end: number): number {
  finite(value); finite(start); finite(end); if (start === end) throw new RangeError("range must not be empty"); return (value - start) / (end - start);
}
/** Converte graus em radianos. */
export const toRadians = (degrees: number): number => finite(degrees) * Math.PI / 180;
/** Converte radianos em graus. */
export const toDegrees = (radians: number): number => finite(radians) * 180 / Math.PI;
/** Compara números por tolerância absoluta e relativa explícitas. */
export function approximatelyEqual(left: number, right: number, absoluteTolerance = 1e-12, relativeTolerance = 1e-9): boolean {
  finite(left); finite(right); finite(absoluteTolerance); finite(relativeTolerance);
  if (absoluteTolerance < 0 || relativeTolerance < 0) throw new RangeError("tolerances must be non-negative");
  return Math.abs(left - right) <= Math.max(absoluteTolerance, relativeTolerance * Math.max(Math.abs(left), Math.abs(right)));
}

