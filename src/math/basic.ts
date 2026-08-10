// Autor: JeanCarloEM.com | https://jeancarloem.com
// Repositório: https://github.com/jcempro/FormulaKit
// Licença: MPL-2.0 | https://www.mozilla.org/MPL/2.0/
// RCF: ./RCF.md

import { finite, integer } from "../internal.js";

/** Soma dois números finitos. */
export const add = (left: number, right: number): number => finite(left, "left") + finite(right, "right");
/** Subtrai o segundo número finito do primeiro. */
export const subtract = (left: number, right: number): number => finite(left, "left") - finite(right, "right");
/** Multiplica dois números finitos. */
export const multiply = (left: number, right: number): number => finite(left, "left") * finite(right, "right");
/** Divide números finitos e rejeita divisor zero. */
export function divide(dividend: number, divisor: number): number {
  finite(dividend, "dividend"); finite(divisor, "divisor");
  if (divisor === 0) throw new RangeError("divisor must not be zero");
  return dividend / divisor;
}
/** Soma uma coleção sem coerção. */
export const sum = (values: readonly number[]): number => values.reduce((total, value) => total + finite(value), 0);
/** Calcula média aritmética e rejeita coleção vazia. */
export function average(values: readonly number[]): number {
  if (values.length === 0) throw new RangeError("values must not be empty");
  return sum(values) / values.length;
}
/** Retorna o menor número finito. */
export function min(values: readonly number[]): number {
  if (values.length === 0) throw new RangeError("values must not be empty");
  return Math.min(...values.map((value) => finite(value)));
}
/** Retorna o maior número finito. */
export function max(values: readonly number[]): number {
  if (values.length === 0) throw new RangeError("values must not be empty");
  return Math.max(...values.map((value) => finite(value)));
}
/** Limita um número ao intervalo fechado. */
export function clamp(value: number, minimum: number, maximum: number): number {
  finite(value); finite(minimum, "minimum"); finite(maximum, "maximum");
  if (minimum > maximum) throw new RangeError("minimum must not exceed maximum");
  return Math.min(maximum, Math.max(minimum, value));
}
/** Arredonda com quantidade decimal explícita e faixa segura. */
export function round(value: number, digits = 0): number {
  finite(value); integer(digits, "digits", -15, 15);
  const factor = 10 ** digits;
  return Math.round((value + Number.EPSILON) * factor) / factor;
}
/** Arredonda para baixo. */
export const floor = (value: number): number => Math.floor(finite(value));
/** Arredonda para cima. */
export const ceil = (value: number): number => Math.ceil(finite(value));
/** Retorna o valor absoluto. */
export const abs = (value: number): number => Math.abs(finite(value));
/** Retorna o sinal -1, 0 ou 1. */
export const sign = (value: number): -1 | 0 | 1 => Math.sign(finite(value)) as -1 | 0 | 1;
/** Calcula módulo matemático não negativo para divisor positivo. */
export function mod(value: number, divisor: number): number {
  finite(value); finite(divisor, "divisor");
  if (divisor <= 0) throw new RangeError("divisor must be positive");
  return ((value % divisor) + divisor) % divisor;
}
/** Calcula uma porcentagem de um total. */
export const percentOf = (percentage: number, total: number): number => multiply(finite(percentage) / 100, total);
/** Calcula qual porcentagem uma parte representa do total. */
export const percentage = (part: number, total: number): number => multiply(divide(part, total), 100);
/** Calcula o máximo divisor comum de inteiros seguros. */
export function gcd(left: number, right: number): number {
  let a = Math.abs(integer(left, "left")); let b = Math.abs(integer(right, "right"));
  while (b !== 0) [a, b] = [b, a % b];
  return a;
}
/** Calcula o mínimo múltiplo comum de inteiros seguros. */
export const lcm = (left: number, right: number): number => left === 0 || right === 0 ? 0 : Math.abs(integer(left) * integer(right)) / gcd(left, right);

