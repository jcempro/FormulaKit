// Autor: JeanCarloEM.com | https://jeancarloem.com
// Repositório: https://github.com/jcempro/FormulaKit
// Licença: MPL-2.0 | https://www.mozilla.org/MPL/2.0/
// RCF: ./RCF.md

export * from "./basic.js";
import { average } from "../math/basic.js";

/**
 * Calcula variância populacional ou amostral.
 *
 * @param values - Valores de entrada, preservados na ordem fornecida.
 * @param sample - Indica cálculo amostral em vez de populacional.
 * @returns Resultado correspondente à finalidade documentada: calcula variância populacional ou amostral.
 * @throws Quando a entrada viola o contrato da operação (`RangeError`).
 */
export function variance(values: readonly number[], sample = false): number { if (values.length <= Number(sample)) throw new RangeError("insufficient values"); const mean = average(values); return values.reduce((total, value) => total + (value - mean) ** 2, 0) / (values.length - Number(sample)); }
/**
 * Calcula desvio padrão populacional ou amostral.
 *
 * @param values - Valores de entrada, preservados na ordem fornecida.
 * @param sample - Indica cálculo amostral em vez de populacional.
 * @returns Resultado correspondente à finalidade documentada: calcula desvio padrão populacional ou amostral.
 */
export const standardDeviation = (values: readonly number[], sample = false): number => Math.sqrt(variance(values, sample));
/**
 * Calcula quantil por interpolação linear inclusiva.
 *
 * @param values - Valores de entrada, preservados na ordem fornecida.
 * @param probability - Probabilidade entre zero e um.
 * @returns Resultado correspondente à finalidade documentada: calcula quantil por interpolação linear inclusiva.
 * @throws Quando a entrada viola o contrato da operação (`RangeError`).
 */
export function quantile(values: readonly number[], probability: number): number { if (!values.length || probability < 0 || probability > 1) throw new RangeError("invalid quantile input"); const sorted = [...values].sort((a, b) => a - b); const index = (sorted.length - 1) * probability; const low = Math.floor(index); const fraction = index - low; return sorted[low]! + (sorted[Math.min(low + 1, sorted.length - 1)]! - sorted[low]!) * fraction; }
/**
 * Calcula covariância populacional entre séries de mesmo tamanho.
 *
 * @param left - Operando ou coleção à esquerda.
 * @param right - Operando ou coleção à direita.
 * @returns Resultado correspondente à finalidade documentada: calcula covariância populacional entre séries de mesmo tamanho.
 * @throws Quando a entrada viola o contrato da operação (`RangeError`).
 */
export function covariance(left: readonly number[], right: readonly number[]): number { if (!left.length || left.length !== right.length) throw new RangeError("series must have equal non-zero length"); const lm = average(left); const rm = average(right); return left.reduce((total, value, index) => total + (value - lm) * (right[index]! - rm), 0) / left.length; }
/**
 * Calcula correlação de Pearson; séries constantes são rejeitadas.
 *
 * @param left - Operando ou coleção à esquerda.
 * @param right - Operando ou coleção à direita.
 * @returns Resultado correspondente à finalidade documentada: calcula correlação de Pearson; séries constantes são rejeitadas.
 * @throws Quando a entrada viola o contrato da operação (`RangeError`).
 */
export function correlation(left: readonly number[], right: readonly number[]): number { const denominator = standardDeviation(left) * standardDeviation(right); if (denominator === 0) throw new RangeError("constant series has no correlation"); return covariance(left, right) / denominator; }

