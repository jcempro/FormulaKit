// Autor: JeanCarloEM.com | https://jeancarloem.com
// Repositório: https://github.com/jcempro/FormulaKit
// Licença: MPL-2.0 | https://www.mozilla.org/MPL/2.0/
// RCF: ./RCF.md

/**
 * Retorna fallback somente quando a operação lança.
 *
 * @typeParam T - Tipo preservado pela operação.
 * @param operation - Operação adiada que será avaliada.
 * @param fallback - Valor ou operação usada quando não há resultado principal.
 * @returns Fallback somente quando a operação lança.
 */
export function ifError<T>(operation: () => T, fallback: T | (() => T)): T { try { return operation(); } catch { return typeof fallback === "function" ? (fallback as () => T)() : fallback; } }
/**
 * Escolhe item por índice baseado em um, conforme planilhas.
 *
 * @typeParam T - Tipo preservado pela operação.
 * @param index - Índice da posição solicitada.
 * @param values - Valores de entrada, preservados na ordem fornecida.
 * @returns Resultado correspondente à finalidade documentada: escolhe item por índice baseado em um, conforme planilhas.
 * @throws Quando a entrada viola o contrato da operação (`RangeError`).
 */
export function choose<T>(index: number, ...values: readonly T[]): T { if (!Number.isSafeInteger(index) || index < 1 || index > values.length) throw new RangeError("index out of range"); return values[index - 1]!; }
/**
 * Concatena valores por conversão String explícita.
 *
 * @param values - Valores de entrada, preservados na ordem fornecida.
 * @returns Resultado correspondente à finalidade documentada: concatena valores por conversão String explícita.
 */
export const concatenate = (...values: readonly unknown[]): string => values.map(String).join("");
/**
 * Conta valores que satisfazem predicado.
 *
 * @typeParam T - Tipo preservado pela operação.
 * @param values - Valores de entrada, preservados na ordem fornecida.
 * @param predicate - Predicado aplicado a cada valor e índice.
 * @returns Resultado correspondente à finalidade documentada: conta valores que satisfazem predicado.
 */
export const countIf = <T>(values: readonly T[], predicate: (value: T, index: number) => boolean): number => values.reduce((count, value, index) => count + Number(predicate(value, index)), 0);
/**
 * Soma números cuja posição satisfaz predicado.
 *
 * @param values - Valores de entrada, preservados na ordem fornecida.
 * @param predicate - Predicado aplicado a cada valor e índice.
 * @returns Resultado correspondente à finalidade documentada: soma números cuja posição satisfaz predicado.
 */
export const sumIf = (values: readonly number[], predicate: (value: number, index: number) => boolean): number => values.reduce((total, value, index) => total + (predicate(value, index) ? value : 0), 0);
/**
 * Calcula média dos números aceitos e rejeita conjunto vazio.
 *
 * @param values - Valores de entrada, preservados na ordem fornecida.
 * @param predicate - Predicado aplicado a cada valor e índice.
 * @returns Resultado correspondente à finalidade documentada: calcula média dos números aceitos e rejeita conjunto vazio.
 * @throws Quando a entrada viola o contrato da operação (`RangeError`).
 */
export function averageIf(values: readonly number[], predicate: (value: number, index: number) => boolean): number { const selected = values.filter(predicate); if (!selected.length) throw new RangeError("no matching values"); return selected.reduce((total, value) => total + value, 0) / selected.length; }

