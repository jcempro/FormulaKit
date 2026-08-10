// Autor: JeanCarloEM.com | https://jeancarloem.com
// Repositório: https://github.com/jcempro/FormulaKit
// Licença: MPL-2.0 | https://www.mozilla.org/MPL/2.0/
// RCF: ./RCF.md

/** Assegura número finito para contratos matemáticos determinísticos. */
export function finite(value: number, name = "value"): number {
  if (!Number.isFinite(value)) throw new TypeError(`${name} must be finite`);
  return value;
}

/** Assegura inteiro seguro dentro de limites opcionais. */
export function integer(value: number, name = "value", min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER): number {
  if (!Number.isSafeInteger(value) || value < min || value > max) throw new RangeError(`${name} must be a safe integer between ${min} and ${max}`);
  return value;
}

/** Retorna uma cópia profundamente congelada, incluindo arrays e objetos sem protótipo. */
export function deepFreeze<T>(value: T): Readonly<T> {
  if (value !== null && typeof value === "object" && !Object.isFrozen(value)) {
    for (const child of Object.values(value as Record<string, unknown>)) deepFreeze(child);
    Object.freeze(value);
  }
  return value;
}

/** Compara valores primitivos com igualdade SameValueZero. */
export function sameValueZero<T>(left: T, right: T): boolean {
  return left === right || (left !== left && right !== right);
}

