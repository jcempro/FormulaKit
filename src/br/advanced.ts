// Autor: JeanCarloEM.com | https://jeancarloem.com
// Repositório: https://github.com/jcempro/FormulaKit
// Licença: MPL-2.0 | https://www.mozilla.org/MPL/2.0/
// RCF: ./RCF.md

export * from "./basic.js";
import { mod10Digit, mod11Digit, onlyDigits } from "./basic.js";

const CNPJ_WEIGHTS_1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2] as const;
const CNPJ_WEIGHTS_2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2] as const;

/**
 * Converte caractere da base alfanumérica oficial em valor ASCII menos 48.
 *
 * @param character - Caractere que será convertido.
 * @returns Resultado correspondente à finalidade documentada: converte caractere da base alfanumérica oficial em valor ASCII menos 48.
 * @throws Quando a entrada viola o contrato da operação (`RangeError`).
 */
function cnpjValue(character: string): number { if (!/^[0-9A-Z]$/u.test(character)) throw new RangeError("invalid CNPJ character"); return character.charCodeAt(0) - 48; }
/**
 * Calcula um dígito CNPJ por módulo 11.
 *
 * @param base - Valor-base da operação.
 * @param weights - Pesos inteiros aplicados aos dígitos.
 * @returns Resultado correspondente à finalidade documentada: calcula um dígito CNPJ por módulo 11.
 */
function cnpjDigit(base: string, weights: readonly number[]): number { const total = [...base].reduce((sum, character, index) => sum + cnpjValue(character) * weights[index]!, 0); const remainder = total % 11; return remainder < 2 ? 0 : 11 - remainder; }
/**
 * Calcula os dois dígitos de CNPJ numérico ou alfanumérico de base 12.
 *
 * @param base - Valor-base da operação.
 * @returns Resultado correspondente à finalidade documentada: calcula os dois dígitos de CNPJ numérico ou alfanumérico de base 12.
 * @throws Quando a entrada viola o contrato da operação (`RangeError`).
 */
export function cnpjCheckDigits(base: string): string { const normalized = base.toUpperCase().replace(/[^0-9A-Z]/gu, ""); if (!/^[0-9A-Z]{12}$/u.test(normalized)) throw new RangeError("CNPJ base must contain 12 alphanumeric characters"); const first = cnpjDigit(normalized, CNPJ_WEIGHTS_1); return `${first}${cnpjDigit(normalized + first, CNPJ_WEIGHTS_2)}`; }
/**
 * Valida CNPJ atual numérico ou padrão alfanumérico de 12 posições e dois DVs.
 *
 * @param value - Valor de entrada.
 * @returns `true` quando CNPJ atual numérico ou padrão alfanumérico de 12 posições e dois DVs; caso contrário, `false`.
 */
export function isCnpj(value: string): boolean { const normalized = value.toUpperCase().replace(/[^0-9A-Z]/gu, ""); if (!/^[0-9A-Z]{12}\d{2}$/u.test(normalized) || /^(\w)\1{13}$/u.test(normalized)) return false; return normalized.slice(12) === cnpjCheckDigits(normalized.slice(0, 12)); }
/**
 * Formata CNPJ sem ocultar letras do padrão alfanumérico.
 *
 * @param value - Valor de entrada.
 * @returns Resultado correspondente à finalidade documentada: formata CNPJ sem ocultar letras do padrão alfanumérico.
 * @throws Quando a entrada viola o contrato da operação (`RangeError`).
 */
export function formatCnpj(value: string): string { const normalized = value.toUpperCase().replace(/[^0-9A-Z]/gu, ""); if (!isCnpj(normalized)) throw new RangeError("invalid CNPJ"); return normalized.replace(/^(.{2})(.{3})(.{3})(.{4})(.{2})$/u, "$1.$2.$3/$4-$5"); }
/**
 * Formata telefone brasileiro validado em padrão nacional.
 *
 * @param value - Valor de entrada.
 * @returns Resultado correspondente à finalidade documentada: formata telefone brasileiro validado em padrão nacional.
 * @throws Quando a entrada viola o contrato da operação (`RangeError`).
 */
export function formatBrazilianPhone(value: string): string { const digits = onlyDigits(value); if (!/^[1-9]{2}(?:[2-5]\d{7}|9\d{8})$/u.test(digits)) throw new RangeError("invalid Brazilian phone"); const split = digits.length === 11 ? 7 : 6; return `(${digits.slice(0, 2)}) ${digits.slice(2, split)}-${digits.slice(split)}`; }
/**
 * Valida conta por módulo escolhido e pesos explícitos quando usar módulo 11.
 *
 * @param base - Valor-base da operação.
 * @param checkDigit - Dígito verificador esperado.
 * @param algorithm - Algoritmo de dígito verificador.
 * @param weights - Pesos inteiros aplicados aos dígitos.
 * @returns `true` quando conta por módulo escolhido e pesos explícitos quando usar módulo 11; caso contrário, `false`.
 */
export function validateBankAccount(base: string, checkDigit: number, algorithm: "mod10" | "mod11", weights?: readonly number[]): boolean { const digits = onlyDigits(base); if (!/^\d+$/u.test(digits) || !Number.isSafeInteger(checkDigit) || checkDigit < 0 || checkDigit > 9) return false; return algorithm === "mod10" ? mod10Digit(digits) === checkDigit : Array.isArray(weights) && mod11Digit(digits, weights) === checkDigit; }

