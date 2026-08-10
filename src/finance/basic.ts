// Autor: JeanCarloEM.com | https://jeancarloem.com
// Repositório: https://github.com/jcempro/FormulaKit
// Licença: MPL-2.0 | https://www.mozilla.org/MPL/2.0/
// RCF: ./RCF.md

import { finite, integer } from "../internal.js";

/** Calcula juros simples com taxa fracionária por período. */
export const simpleInterest = (principal: number, rate: number, periods: number): number => finite(principal) * finite(rate) * finite(periods);
/** Calcula montante composto com taxa fracionária por período. */
export const compoundAmount = (principal: number, rate: number, periods: number): number => finite(principal) * (1 + finite(rate)) ** finite(periods);
/** Calcula somente os juros compostos. */
export const compoundInterest = (principal: number, rate: number, periods: number): number => compoundAmount(principal, rate, periods) - principal;
/** Converte pontos percentuais em taxa fracionária. */
export const percentRate = (percentagePoints: number): number => finite(percentagePoints) / 100;
/** Converte taxa fracionária em pontos percentuais. */
export const percentagePoints = (rate: number): number => finite(rate) * 100;
/** Calcula valor futuro com pagamentos no fim de cada período. */
export function futureValue(rate: number, periods: number, payment: number, present = 0): number { finite(rate); integer(periods, "periods", 0); finite(payment); finite(present); return rate === 0 ? -(present + payment * periods) : -(present * (1 + rate) ** periods + payment * ((1 + rate) ** periods - 1) / rate); }
/** Calcula valor presente com pagamentos no fim de cada período. */
export function presentValue(rate: number, periods: number, payment: number, future = 0): number { finite(rate); integer(periods, "periods", 0); finite(payment); finite(future); return rate === 0 ? -future - payment * periods : -(future + payment * ((1 + rate) ** periods - 1) / rate) / (1 + rate) ** periods; }

