// Autor: JeanCarloEM.com | https://jeancarloem.com
// Repositório: https://github.com/jcempro/FormulaKit
// Licença: MPL-2.0 | https://www.mozilla.org/MPL/2.0/
// RCF: ./RCF.md

export * from "./basic.js";
import { addDays, daysInMonth } from "./basic.js";
import { finite, integer } from "../internal.js";

/** Soma meses em UTC limitando o dia ao mês de destino. */
export function addMonths(date: Date, months: number): Date { const copy = new Date(date.getTime()); if (Number.isNaN(copy.getTime())) throw new TypeError("invalid date"); integer(months, "months"); const day = copy.getUTCDate(); copy.setUTCDate(1); copy.setUTCMonth(copy.getUTCMonth() + months); copy.setUTCDate(Math.min(day, daysInMonth(copy.getUTCFullYear(), copy.getUTCMonth() + 1))); return copy; }
/** Retorna início do dia UTC. */
export const startOfDay = (date: Date): Date => new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
/** Retorna fim inclusivo do dia UTC. */
export const endOfDay = (date: Date): Date => new Date(startOfDay(addDays(date, 1)).getTime() - 1);
/** Conta dias úteis UTC com fim exclusivo e finais de semana configuráveis. */
export function businessDaysBetween(start: Date, end: Date, holidays: readonly string[] = []): number { const blocked = new Set(holidays); let count = 0; for (let cursor = startOfDay(start); cursor < end; cursor = addDays(cursor, 1)) { const day = cursor.getUTCDay(); if (day !== 0 && day !== 6 && !blocked.has(cursor.toISOString().slice(0, 10))) count += 1; } return count; }
/** Converte duração estrutural em milissegundos. */
export function durationToMilliseconds(value: Readonly<{ days?: number; hours?: number; minutes?: number; seconds?: number; milliseconds?: number }>): number { return finite(value.days ?? 0) * 86_400_000 + finite(value.hours ?? 0) * 3_600_000 + finite(value.minutes ?? 0) * 60_000 + finite(value.seconds ?? 0) * 1_000 + finite(value.milliseconds ?? 0); }
/** Formata instante via Intl com locale e timezone explícitos. */
export const formatDateTime = (date: Date, locale: string, timeZone: string, options: Intl.DateTimeFormatOptions = {}): string => new Intl.DateTimeFormat(locale, { ...options, timeZone }).format(date);

