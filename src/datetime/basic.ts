// Autor: JeanCarloEM.com | https://jeancarloem.com
// Repositório: https://github.com/jcempro/FormulaKit
// Licença: MPL-2.0 | https://www.mozilla.org/MPL/2.0/
// RCF: ./RCF.md

import { integer } from "../internal.js";
const DAY = 86_400_000;

/** Informa se o ano gregoriano é bissexto. */
export const isLeapYear = (year: number): boolean => { integer(year, "year", 1, 9999); return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0); };
/** Retorna dias do mês gregoriano, com mês de 1 a 12. */
export function daysInMonth(year: number, month: number): number { integer(year, "year", 1, 9999); integer(month, "month", 1, 12); return new Date(Date.UTC(year, month, 0)).getUTCDate(); }
/** Soma dias civis em UTC sem mutar a data. */
export const addDays = (date: Date, days: number): Date => new Date(assertDate(date).getTime() + integer(days, "days") * DAY);
/** Retorna diferença inteira de dias UTC entre instantes. */
export const differenceInDays = (later: Date, earlier: Date): number => Math.trunc((assertDate(later).getTime() - assertDate(earlier).getTime()) / DAY);
/** Formata data UTC como YYYY-MM-DD. */
export const formatIsoDate = (date: Date): string => assertDate(date).toISOString().slice(0, 10);
/** Analisa estritamente YYYY-MM-DD em UTC. */
export function parseIsoDate(value: string): Date { if (!/^\d{4}-\d{2}-\d{2}$/u.test(value)) throw new RangeError("invalid ISO date"); const date = new Date(`${value}T00:00:00.000Z`); if (Number.isNaN(date.getTime()) || formatIsoDate(date) !== value) throw new RangeError("invalid ISO date"); return date; }
/** Assegura instância Date válida. */
function assertDate(value: Date): Date { if (!(value instanceof Date) || Number.isNaN(value.getTime())) throw new TypeError("invalid date"); return value; }

