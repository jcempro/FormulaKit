// Autor: JeanCarloEM.com | https://jeancarloem.com
// Repositório: https://github.com/jcempro/FormulaKit
// Licença: MPL-2.0 | https://www.mozilla.org/MPL/2.0/
// RCF: ./RCF.md

export * from "./basic.js";
export * from "./mask.js";
import { normalizeWhitespace } from "./basic.js";

/** Remove marcas diacríticas após normalização NFD. */
export const stripDiacritics = (value: string): string => value.normalize("NFD").replace(/\p{M}+/gu, "");
/** Normaliza Unicode na forma solicitada. */
export const normalizeUnicode = (value: string, form: "NFC" | "NFD" | "NFKC" | "NFKD" = "NFC"): string => value.normalize(form);
/** Converte palavras para título sem regras linguísticas implícitas. */
export const titleCase = (value: string): string => normalizeWhitespace(value).split(" ").map((word) => word ? word[0]!.toLocaleUpperCase() + word.slice(1).toLocaleLowerCase() : word).join(" ");
/** Gera slug ASCII minúsculo e determinístico. */
export const slugify = (value: string): string => stripDiacritics(value).toLocaleLowerCase("en-US").replace(/[^a-z0-9]+/gu, "-").replace(/^-|-$/gu, "");
/** Converte palavras para camelCase. */
export const camelCase = (value: string): string => { const words = slugify(value).split("-").filter(Boolean); return (words[0] ?? "") + words.slice(1).map((word) => word[0]!.toUpperCase() + word.slice(1)).join(""); };
/** Converte palavras para snake_case. */
export const snakeCase = (value: string): string => slugify(value).replace(/-/gu, "_");
/** Escapa cinco caracteres de HTML sem interpretar marcação. */
export const escapeHtml = (value: string): string => value.replace(/[&<>"']/gu, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]!);
/** Decodifica apenas entidades produzidas por escapeHtml. */
export const unescapeHtml = (value: string): string => value.replace(/&(amp|lt|gt|quot|#39);/gu, (entity) => ({ "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'" })[entity]!);

