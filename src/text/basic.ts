// Autor: JeanCarloEM.com | https://jeancarloem.com
// Repositório: https://github.com/jcempro/FormulaKit
// Licença: MPL-2.0 | https://www.mozilla.org/MPL/2.0/
// RCF: ./RCF.md

import { integer } from "../internal.js";

/**
 * Remove espaços Unicode nas extremidades.
 *
 * @param value - Valor de entrada.
 * @returns Resultado correspondente à finalidade documentada: remove espaços Unicode nas extremidades.
 */
export const trim = (value: string): string => value.trim();
/**
 * Colapsa sequências de espaços Unicode em um espaço.
 *
 * @param value - Valor de entrada.
 * @returns Resultado correspondente à finalidade documentada: colapsa sequências de espaços Unicode em um espaço.
 */
export const normalizeWhitespace = (value: string): string => value.trim().replace(/\s+/gu, " ");
/**
 * Converte para maiúsculas com locale opcional explícito.
 *
 * @param value - Valor de entrada.
 * @param locale - Locale BCP 47 explícito.
 * @returns Resultado correspondente à finalidade documentada: converte para maiúsculas com locale opcional explícito.
 */
export const upper = (value: string, locale?: string | readonly string[]): string => locale === undefined ? value.toUpperCase() : value.toLocaleUpperCase(locale);
/**
 * Converte para minúsculas com locale opcional explícito.
 *
 * @param value - Valor de entrada.
 * @param locale - Locale BCP 47 explícito.
 * @returns Resultado correspondente à finalidade documentada: converte para minúsculas com locale opcional explícito.
 */
export const lower = (value: string, locale?: string | readonly string[]): string => locale === undefined ? value.toLowerCase() : value.toLocaleLowerCase(locale);
/**
 * Coloca em maiúscula o primeiro grafema aproximado por ponto de código.
 *
 * @param value - Valor de entrada.
 * @param locale - Locale BCP 47 explícito.
 * @returns Resultado correspondente à finalidade documentada: coloca em maiúscula o primeiro grafema aproximado por ponto de código.
 */
export const capitalize = (value: string, locale?: string | readonly string[]): string => { const [first = "", ...rest] = [...value]; return upper(first, locale) + rest.join(""); };
/**
 * Inverte por pontos de código Unicode sem quebrar pares substitutos.
 *
 * @param value - Valor de entrada.
 * @returns Resultado correspondente à finalidade documentada: inverte por pontos de código Unicode sem quebrar pares substitutos.
 */
export const reverse = (value: string): string => [...value].reverse().join("");
/**
 * Trunca por pontos de código e acrescenta sufixo dentro do limite.
 *
 * @param value - Valor de entrada.
 * @param length - Comprimento máximo ou desejado.
 * @param suffix - Sufixo incluído quando houver truncamento.
 * @returns Resultado correspondente à finalidade documentada: trunca por pontos de código e acrescenta sufixo dentro do limite.
 */
export function truncate(value: string, length: number, suffix = "…"): string { integer(length, "length", 0); const units = [...value]; if (units.length <= length) return value; const tail = [...suffix]; return units.slice(0, Math.max(0, length - tail.length)).join("") + tail.slice(0, length).join(""); }
/**
 * Testa inclusão literal com opção de caixa.
 *
 * @param value - Valor de entrada.
 * @param search - Texto literal procurado.
 * @param caseSensitive - Indica se a comparação diferencia caixa.
 * @returns `true` quando inclusão literal com opção de caixa; caso contrário, `false`.
 */
export const contains = (value: string, search: string, caseSensitive = true): boolean => caseSensitive ? value.includes(search) : value.toLocaleLowerCase().includes(search.toLocaleLowerCase());
/**
 * Conta ocorrências literais não sobrepostas.
 *
 * @param value - Valor de entrada.
 * @param search - Texto literal procurado.
 * @returns Resultado correspondente à finalidade documentada: conta ocorrências literais não sobrepostas.
 * @throws Quando a entrada viola o contrato da operação (`RangeError`).
 */
export function countOccurrences(value: string, search: string): number { if (!search) throw new RangeError("search must not be empty"); let count = 0; let index = 0; while ((index = value.indexOf(search, index)) >= 0) { count += 1; index += search.length; } return count; }
/**
 * Substitui todas as ocorrências literais.
 *
 * @param value - Valor de entrada.
 * @param search - Texto literal procurado.
 * @param replacement - Texto substituto.
 * @returns Resultado correspondente à finalidade documentada: substitui todas as ocorrências literais.
 * @throws Quando a entrada viola o contrato da operação (`RangeError`).
 */
export const replaceAll = (value: string, search: string, replacement: string): string => { if (!search) throw new RangeError("search must not be empty"); return value.split(search).join(replacement); };
/**
 * Preenche o início com contrato nativo uniforme.
 *
 * @param value - Valor de entrada.
 * @param length - Comprimento máximo ou desejado.
 * @param fill - Texto usado no preenchimento.
 * @returns Resultado correspondente à finalidade documentada: preenche o início com contrato nativo uniforme.
 */
export const padStart = (value: string, length: number, fill = " "): string => value.padStart(integer(length, "length", 0), fill);
/**
 * Preenche o fim com contrato nativo uniforme.
 *
 * @param value - Valor de entrada.
 * @param length - Comprimento máximo ou desejado.
 * @param fill - Texto usado no preenchimento.
 * @returns Resultado correspondente à finalidade documentada: preenche o fim com contrato nativo uniforme.
 */
export const padEnd = (value: string, length: number, fill = " "): string => value.padEnd(integer(length, "length", 0), fill);

