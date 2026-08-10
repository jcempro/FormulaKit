// Autor: JeanCarloEM.com | https://jeancarloem.com
// Repositório: https://github.com/jcempro/FormulaKit
// Licença: MPL-2.0 | https://www.mozilla.org/MPL/2.0/
// RCF: ./RCF.md

export * from "./basic.js";
const TABLE = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

/** Codifica UTF-8 em Base64 sem depender de Node ou DOM. */
export function utf8ToBase64(value: string): string { const bytes = new TextEncoder().encode(value); let result = ""; for (let index = 0; index < bytes.length; index += 3) { const a = bytes[index]!; const b = bytes[index + 1]; const c = bytes[index + 2]; const bits = (a << 16) | ((b ?? 0) << 8) | (c ?? 0); result += TABLE[(bits >> 18) & 63]! + TABLE[(bits >> 12) & 63]! + (b === undefined ? "=" : TABLE[(bits >> 6) & 63]!) + (c === undefined ? "=" : TABLE[bits & 63]!); } return result; }
/** Decodifica Base64 canônico em UTF-8 estrito. */
export function base64ToUtf8(value: string): string { if (!/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/u.test(value)) throw new TypeError("invalid Base64"); const bytes: number[] = []; for (let index = 0; index < value.length; index += 4) { const chars = value.slice(index, index + 4); const bits = [...chars].reduce((total, character) => (total << 6) | Math.max(0, TABLE.indexOf(character)), 0); bytes.push((bits >> 16) & 255); if (chars[2] !== "=") bytes.push((bits >> 8) & 255); if (chars[3] !== "=") bytes.push(bits & 255); } return new TextDecoder("utf-8", { fatal: true }).decode(Uint8Array.from(bytes)); }
/** Formata quantidade de bytes em unidade binária explícita. */
export function formatBytes(value: number, digits = 2): string { if (!Number.isFinite(value) || value < 0 || !Number.isSafeInteger(digits) || digits < 0 || digits > 10) throw new RangeError("invalid byte format input"); const units = ["B", "KiB", "MiB", "GiB", "TiB"]; let size = value; let index = 0; while (size >= 1024 && index < units.length - 1) { size /= 1024; index += 1; } return `${size.toFixed(index === 0 ? 0 : digits)} ${units[index]}`; }
/** Converte radianos em graus. */
export const radiansToDegrees = (value: number): number => value * 180 / Math.PI;
/** Converte graus em radianos. */
export const degreesToRadians = (value: number): number => value * Math.PI / 180;

