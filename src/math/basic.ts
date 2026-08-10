// Autor: JeanCarloEM.com | https://jeancarloem.com
// Repositório: https://github.com/jcempro/FormulaKit
// Licença: MPL-2.0 | https://www.mozilla.org/MPL/2.0/
// RCF: ./RCF.md

import { finite, integer } from "../internal.js";

/**
 * Soma dois números finitos.
 *
 * @param left - Operando ou coleção à esquerda.
 * @param right - Operando ou coleção à direita.
 * @returns Resultado correspondente à finalidade documentada: soma dois números finitos.
 */
export const add = (left: number, right: number): number => finite(left, "left") + finite(right, "right");
/**
 * Subtrai o segundo número finito do primeiro.
 *
 * @param left - Operando ou coleção à esquerda.
 * @param right - Operando ou coleção à direita.
 * @returns Resultado correspondente à finalidade documentada: subtrai o segundo número finito do primeiro.
 */
export const subtract = (left: number, right: number): number => finite(left, "left") - finite(right, "right");
/**
 * Multiplica dois números finitos.
 *
 * @param left - Operando ou coleção à esquerda.
 * @param right - Operando ou coleção à direita.
 * @returns Resultado correspondente à finalidade documentada: multiplica dois números finitos.
 */
export const multiply = (left: number, right: number): number => finite(left, "left") * finite(right, "right");
/**
 * Divide números finitos e rejeita divisor zero.
 *
 * @param dividend - Número que será dividido.
 * @param divisor - Divisor finito da operação.
 * @returns Resultado correspondente à finalidade documentada: divide números finitos e rejeita divisor zero.
 * @throws Quando a entrada viola o contrato da operação (`RangeError`).
 */
export function divide(dividend: number, divisor: number): number {
  finite(dividend, "dividend"); finite(divisor, "divisor");
  if (divisor === 0) throw new RangeError("divisor must not be zero");
  return dividend / divisor;
}
/**
 * Soma uma coleção sem coerção.
 *
 * @param values - Valores de entrada, preservados na ordem fornecida.
 * @returns Resultado correspondente à finalidade documentada: soma uma coleção sem coerção.
 */
export const sum = (values: readonly number[]): number => values.reduce((total, value) => total + finite(value), 0);
/**
 * Calcula média aritmética e rejeita coleção vazia.
 *
 * @param values - Valores de entrada, preservados na ordem fornecida.
 * @returns Resultado correspondente à finalidade documentada: calcula média aritmética e rejeita coleção vazia.
 * @throws Quando a entrada viola o contrato da operação (`RangeError`).
 */
export function average(values: readonly number[]): number {
  if (values.length === 0) throw new RangeError("values must not be empty");
  return sum(values) / values.length;
}
/**
 * Retorna o menor número finito.
 *
 * @param values - Valores de entrada, preservados na ordem fornecida.
 * @returns O menor número finito.
 * @throws Quando a entrada viola o contrato da operação (`RangeError`).
 */
export function min(values: readonly number[]): number {
  if (values.length === 0) throw new RangeError("values must not be empty");
  return Math.min(...values.map((value) => finite(value)));
}
/**
 * Retorna o maior número finito.
 *
 * @param values - Valores de entrada, preservados na ordem fornecida.
 * @returns O maior número finito.
 * @throws Quando a entrada viola o contrato da operação (`RangeError`).
 */
export function max(values: readonly number[]): number {
  if (values.length === 0) throw new RangeError("values must not be empty");
  return Math.max(...values.map((value) => finite(value)));
}
/**
 * Limita um número ao intervalo fechado.
 *
 * @param value - Valor de entrada.
 * @param minimum - Limite inferior inclusivo.
 * @param maximum - Limite superior inclusivo.
 * @returns Resultado correspondente à finalidade documentada: limita um número ao intervalo fechado.
 * @throws Quando a entrada viola o contrato da operação (`RangeError`).
 * @example
 * `clamp(15, 0, 10); // 10`
 */
export function clamp(value: number, minimum: number, maximum: number): number {
  finite(value); finite(minimum, "minimum"); finite(maximum, "maximum");
  if (minimum > maximum) throw new RangeError("minimum must not exceed maximum");
  return Math.min(maximum, Math.max(minimum, value));
}
/**
 * Arredonda com quantidade decimal explícita e faixa segura.
 *
 * @param value - Valor de entrada.
 * @param digits - Quantidade de casas ou dígitos permitida.
 * @returns Resultado correspondente à finalidade documentada: arredonda com quantidade decimal explícita e faixa segura.
 */
export function round(value: number, digits = 0): number {
  finite(value); integer(digits, "digits", -15, 15);
  const factor = 10 ** digits;
  return Math.round((value + Number.EPSILON) * factor) / factor;
}
/**
 * Arredonda para baixo.
 *
 * @param value - Valor de entrada.
 * @returns Resultado correspondente à finalidade documentada: arredonda para baixo.
 */
export const floor = (value: number): number => Math.floor(finite(value));
/**
 * Arredonda para cima.
 *
 * @param value - Valor de entrada.
 * @returns Resultado correspondente à finalidade documentada: arredonda para cima.
 */
export const ceil = (value: number): number => Math.ceil(finite(value));
/**
 * Retorna o valor absoluto.
 *
 * @param value - Valor de entrada.
 * @returns O valor absoluto.
 */
export const abs = (value: number): number => Math.abs(finite(value));
/**
 * Retorna o sinal -1, 0 ou 1.
 *
 * @param value - Valor de entrada.
 * @returns O sinal -1, 0 ou 1.
 */
export const sign = (value: number): -1 | 0 | 1 => Math.sign(finite(value)) as -1 | 0 | 1;
/**
 * Calcula módulo matemático não negativo para divisor positivo.
 *
 * @param value - Valor de entrada.
 * @param divisor - Divisor finito da operação.
 * @returns Resultado correspondente à finalidade documentada: calcula módulo matemático não negativo para divisor positivo.
 * @throws Quando a entrada viola o contrato da operação (`RangeError`).
 */
export function mod(value: number, divisor: number): number {
  finite(value); finite(divisor, "divisor");
  if (divisor <= 0) throw new RangeError("divisor must be positive");
  return ((value % divisor) + divisor) % divisor;
}
/**
 * Calcula uma porcentagem de um total.
 *
 * @param percentage - Percentual em pontos percentuais.
 * @param total - Valor total da operação.
 * @returns Resultado correspondente à finalidade documentada: calcula uma porcentagem de um total.
 */
export const percentOf = (percentage: number, total: number): number => multiply(finite(percentage) / 100, total);
/**
 * Calcula qual porcentagem uma parte representa do total.
 *
 * @param part - Parcela do total.
 * @param total - Valor total da operação.
 * @returns Resultado correspondente à finalidade documentada: calcula qual porcentagem uma parte representa do total.
 */
export const percentage = (part: number, total: number): number => multiply(divide(part, total), 100);
/**
 * Calcula o máximo divisor comum de inteiros seguros.
 *
 * @param left - Operando ou coleção à esquerda.
 * @param right - Operando ou coleção à direita.
 * @returns Resultado correspondente à finalidade documentada: calcula o máximo divisor comum de inteiros seguros.
 */
export function gcd(left: number, right: number): number {
  let a = Math.abs(integer(left, "left")); let b = Math.abs(integer(right, "right"));
  while (b !== 0) [a, b] = [b, a % b];
  return a;
}
/**
 * Calcula o mínimo múltiplo comum de inteiros seguros.
 *
 * @param left - Operando ou coleção à esquerda.
 * @param right - Operando ou coleção à direita.
 * @returns Resultado correspondente à finalidade documentada: calcula o mínimo múltiplo comum de inteiros seguros.
 */
export const lcm = (left: number, right: number): number => left === 0 || right === 0 ? 0 : Math.abs(integer(left) * integer(right)) / gcd(left, right);

