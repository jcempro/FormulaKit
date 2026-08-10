// Autor: JeanCarloEM.com | https://jeancarloem.com
// Repositório: https://github.com/jcempro/FormulaKit
// Licença: MPL-2.0 | https://www.mozilla.org/MPL/2.0/
// RCF: ./RCF.md

export * from "./basic.js";
import { finite, integer } from "../internal.js";

/** Calcula pagamento periódico com fluxos de sinal oposto. */
export function payment(rate: number, periods: number, present: number, future = 0): number { finite(rate); integer(periods, "periods", 1); finite(present); finite(future); return rate === 0 ? -(present + future) / periods : -(rate * (present * (1 + rate) ** periods + future)) / ((1 + rate) ** periods - 1); }
/** Calcula valor presente líquido de fluxos igualmente espaçados. */
export function netPresentValue(rate: number, cashFlows: readonly number[]): number { finite(rate); if (rate <= -1) throw new RangeError("rate must exceed -1"); return cashFlows.reduce((total, flow, index) => total + finite(flow) / (1 + rate) ** index, 0); }
/** Aproxima taxa interna de retorno por bisseção limitada. */
export function internalRateOfReturn(cashFlows: readonly number[], tolerance = 1e-9, iterations = 200): number { if (cashFlows.length < 2 || !cashFlows.some((v) => v < 0) || !cashFlows.some((v) => v > 0)) throw new RangeError("cash flows require opposite signs"); let low = -0.999999; let high = 10; for (let index = 0; index < integer(iterations, "iterations", 1, 10_000); index += 1) { const mid = (low + high) / 2; const value = netPresentValue(mid, cashFlows); if (Math.abs(value) <= tolerance) return mid; if (netPresentValue(low, cashFlows) * value <= 0) high = mid; else low = mid; } throw new RangeError("IRR did not converge"); }
/** Converte taxa efetiva entre quantidades de períodos. */
export function convertEffectiveRate(rate: number, fromPeriods: number, toPeriods: number): number { finite(rate); integer(fromPeriods, "fromPeriods", 1); integer(toPeriods, "toPeriods", 1); if (rate <= -1) throw new RangeError("rate must exceed -1"); return (1 + rate) ** (fromPeriods / toPeriods) - 1; }
/** Calcula parcela de amortização constante SAC. */
export function constantAmortization(principal: number, periods: number): number { finite(principal); integer(periods, "periods", 1); return principal / periods; }

