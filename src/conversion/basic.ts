// Autor: JeanCarloEM.com | https://jeancarloem.com
// Repositório: https://github.com/jcempro/FormulaKit
// Licença: MPL-2.0 | https://www.mozilla.org/MPL/2.0/
// RCF: ./RCF.md

/** Converte string decimal canônica ou número em número finito. */
export function toNumber(value: string | number): number { const result = typeof value === "number" ? value : value.trim() === "" ? Number.NaN : Number(value); if (!Number.isFinite(result)) throw new TypeError("value is not a finite number"); return result; }
/** Converte para inteiro seguro sem truncamento implícito. */
export function toInteger(value: string | number): number { const result = toNumber(value); if (!Number.isSafeInteger(result)) throw new TypeError("value is not a safe integer"); return result; }
/** Converte booleano ou literais true/false, 1/0 estritamente. */
export function toBoolean(value: boolean | string | number): boolean { if (typeof value === "boolean") return value; if (value === 1 || value === "1" || value === "true") return true; if (value === 0 || value === "0" || value === "false") return false; throw new TypeError("value is not a canonical boolean"); }
/** Converte bytes para hexadecimal minúsculo. */
export const bytesToHex = (value: Uint8Array): string => [...value].map((byte) => byte.toString(16).padStart(2, "0")).join("");
/** Converte hexadecimal par em bytes. */
export function hexToBytes(value: string): Uint8Array { if (!/^(?:[0-9a-f]{2})*$/iu.test(value)) throw new TypeError("invalid hexadecimal"); return Uint8Array.from(value.match(/.{2}/gu)?.map((byte) => Number.parseInt(byte, 16)) ?? []); }
/** Converte graus Celsius em Fahrenheit. */
export const celsiusToFahrenheit = (value: number): number => value * 9 / 5 + 32;
/** Converte graus Fahrenheit em Celsius. */
export const fahrenheitToCelsius = (value: number): number => (value - 32) * 5 / 9;

