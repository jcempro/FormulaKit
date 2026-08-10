// Autor: JeanCarloEM.com | https://jeancarloem.com
// Repositório: https://github.com/jcempro/FormulaKit
// Licença: MPL-2.0 | https://www.mozilla.org/MPL/2.0/
// RCF: ./RCF.md

/** Remove pontuação e preserva somente dígitos. */
export const onlyDigits = (value: string): string => value.replace(/\D+/gu, "");
/** Calcula dígito módulo 10 com pesos alternados 2/1 da direita. */
export function mod10Digit(value: string): number { const digits = onlyDigits(value); if (!digits) throw new RangeError("value must contain digits"); let total = 0; let weight = 2; for (let index = digits.length - 1; index >= 0; index -= 1) { const product = Number(digits[index]) * weight; total += product > 9 ? product - 9 : product; weight = weight === 2 ? 1 : 2; } return (10 - total % 10) % 10; }
/** Calcula módulo 11 com pesos cíclicos fornecidos da esquerda para a direita. */
export function mod11Digit(value: string, weights: readonly number[], mapTenAndElevenToZero = true): number { const digits = onlyDigits(value); if (!digits || weights.length !== digits.length || weights.some((weight) => !Number.isSafeInteger(weight) || weight < 2 || weight > 99)) throw new RangeError("invalid modulo 11 input"); const remainder = digits.split("").reduce((total, digit, index) => total + Number(digit) * weights[index]!, 0) % 11; const result = 11 - remainder; return mapTenAndElevenToZero && result >= 10 ? 0 : result; }
/** Valida CPF numérico, inclusive dígitos verificadores. */
export function isCpf(value: string): boolean { const digits = onlyDigits(value); if (!/^\d{11}$/u.test(digits) || /^(\d)\1{10}$/u.test(digits)) return false; const first = mod11Digit(digits.slice(0, 9), [10, 9, 8, 7, 6, 5, 4, 3, 2]); const second = mod11Digit(digits.slice(0, 9) + first, [11, 10, 9, 8, 7, 6, 5, 4, 3, 2]); return digits.endsWith(`${first}${second}`); }
/** Formata CPF somente após validar onze dígitos. */
export function formatCpf(value: string): string { const digits = onlyDigits(value); if (!isCpf(digits)) throw new RangeError("invalid CPF"); return digits.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/u, "$1.$2.$3-$4"); }
/** Valida CEP brasileiro de oito dígitos. */
export const isCep = (value: string): boolean => /^\d{8}$/u.test(onlyDigits(value));
/** Formata CEP brasileiro validado. */
export function formatCep(value: string): string { const digits = onlyDigits(value); if (!isCep(digits)) throw new RangeError("invalid CEP"); return `${digits.slice(0, 5)}-${digits.slice(5)}`; }
/** Valida telefone brasileiro com DDD e dez ou onze dígitos. */
export const isBrazilianPhone = (value: string): boolean => /^[1-9]{2}(?:[2-5]\d{7}|9\d{8})$/u.test(onlyDigits(value));
