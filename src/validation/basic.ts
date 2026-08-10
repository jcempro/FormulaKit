// Autor: JeanCarloEM.com | https://jeancarloem.com
// Repositório: https://github.com/jcempro/FormulaKit
// Licença: MPL-2.0 | https://www.mozilla.org/MPL/2.0/
// RCF: ./RCF.md

/** Diagnóstico reutilizável sem ecoar a entrada. */
export interface ValidationIssue { readonly code: string; readonly message: string; readonly position?: number; }
/** Resultado discriminado de validação. */
export type ValidationResult = Readonly<{ ok: true } | { ok: false; issues: readonly ValidationIssue[] }>;
/** Contrato de validador booleano com diagnóstico associado. */
export interface Validator<T> { readonly test: (value: T) => boolean; readonly inspect: (value: T) => ValidationResult; }

/** Cria validador a partir de predicado total e diagnóstico estável. */
export function validator<T>(predicate: (value: T) => boolean, issue: ValidationIssue): Validator<T> {
  const inspect = (value: T): ValidationResult => predicate(value) ? Object.freeze({ ok: true }) : Object.freeze({ ok: false, issues: Object.freeze([Object.freeze({ ...issue })]) });
  return Object.freeze({ test: predicate, inspect });
}
/** Valida e retorna somente booleano. */
export const validate = <T>(value: T, rule: Validator<T>): boolean => rule.test(value);
/** Valida e retorna diagnóstico estruturado. */
export const inspect = <T>(value: T, rule: Validator<T>): ValidationResult => rule.inspect(value);

/** Valida endereço de e-mail prático, sem alegar conformidade SMTP completa. */
export const email = validator<string>((value) => /^(?=.{3,254}$)[^\s@]+@[^\s@]+\.[^\s@]+$/u.test(value), { code: "EMAIL_INVALID", message: "invalid email" });
/** Valida UUID versões 1 a 8 e variante RFC. */
export const uuid = validator<string>((value) => /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/iu.test(value), { code: "UUID_INVALID", message: "invalid UUID" });
/** Valida IPv4 decimal sem zeros de preenchimento ambíguos. */
export const ipv4 = validator<string>((value) => { const parts = value.split("."); return parts.length === 4 && parts.every((part) => /^(?:0|[1-9]\d{0,2})$/u.test(part) && Number(part) <= 255); }, { code: "IPV4_INVALID", message: "invalid IPv4" });
/** Valida URL HTTP(S) absoluta por parser nativo. */
export const httpUrl = validator<string>((value) => { try { const url = new URL(value); return (url.protocol === "http:" || url.protocol === "https:") && Boolean(url.hostname); } catch { return false; } }, { code: "URL_INVALID", message: "invalid HTTP URL" });
/** Valida dígitos de cartão pelo algoritmo de Luhn. */
export const luhn = validator<string>((value) => { const digits = value.replace(/[ -]/gu, ""); if (!/^\d{12,19}$/u.test(digits)) return false; let total = 0; let double = false; for (let index = digits.length - 1; index >= 0; index -= 1) { let digit = Number(digits[index]); if (double && (digit *= 2) > 9) digit -= 9; total += digit; double = !double; } return total % 10 === 0; }, { code: "LUHN_INVALID", message: "invalid check digit" });

