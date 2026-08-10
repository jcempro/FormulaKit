// Autor: JeanCarloEM.com | https://jeancarloem.com
// Repositório: https://github.com/jcempro/FormulaKit
// Licença: MPL-2.0 | https://www.mozilla.org/MPL/2.0/
// RCF: ./RCF.md

import assert from "node:assert/strict";
import test from "node:test";
import * as br from "../dist/br/index.mjs";
import * as collections from "../dist/collections/index.mjs";
import * as conversion from "../dist/conversion/index.mjs";
import * as datetime from "../dist/datetime/index.mjs";
import * as finance from "../dist/finance/index.mjs";
import * as logic from "../dist/logic/index.mjs";
import * as math from "../dist/math/index.mjs";
import * as spreadsheet from "../dist/spreadsheet/index.mjs";
import * as statistics from "../dist/statistics/index.mjs";
import * as text from "../dist/text/index.mjs";
import * as validation from "../dist/validation/index.mjs";

test("matemática e estatística preservam contratos numéricos", () => {
  assert.equal(math.add(2, 3), 5); assert.equal(math.divide(8, 2), 4); assert.throws(() => math.divide(1, 0));
  assert.equal(math.round(1.005, 2), 1.01); assert.equal(math.gcd(54, 24), 6); assert.equal(math.combinations(5, 2), 10);
  assert.equal(statistics.median([3, 1, 2, 4]), 2.5); assert.deepEqual(statistics.modes([1, 2, 2, 3]), [2]); assert.equal(statistics.variance([1, 2, 3]), 2 / 3);
});

test("operadores lógicos distinguem estrito, truthiness, valor e lazy", () => {
  assert.equal(logic.and(), true); assert.equal(logic.or(), false); assert.equal(logic.xor(true, false, true), false); assert.throws(() => logic.and(true, 1));
  assert.equal(logic.andTruthy(1, "x"), true); assert.equal(logic.orValue(0, "ok", "later"), "ok"); assert.deepEqual(logic.exactlyOneValue(0, "ok", ""), { ok: true, value: "ok", index: 1 });
  let calls = 0; assert.equal(logic.lazyAnd(() => { calls += 1; return false; }, () => { calls += 1; return true; }), false); assert.equal(calls, 1);
});

test("máscaras suportam classes, grupos, alternativas, opcionais, repetição, transformação e preenchimento", () => {
  assert.deepEqual(text.applyMask("12345678901", "###.###.###-##"), { ok: true, value: "123.456.789-01", consumed: 11 });
  assert.equal(text.applyMask("abc", ">A{3}").value, "ABC"); assert.equal(text.applyMask("12", "('+'##|'00'##)").value, "+12"); assert.equal(text.applyMask("12", "~_{3}##").value, "___12");
  assert.equal(text.compileMask("##?#").validate("12"), true); assert.throws(() => text.compileMask("("), /MASK_SYNTAX/u);
});

test("validadores prontos, regex e composição retornam booleano e diagnóstico", () => {
  assert.equal(validation.email.test("a@example.com"), true); assert.equal(validation.ipv4.test("256.0.0.1"), false);
  const digits = validation.regex(/^\d+$/u); const short = validation.lengthBetween(2, 4); assert.equal(validation.allOf(digits, short).test("123"), true);
  assert.equal(validation.anyOf(validation.email, digits).inspect("x").ok, false); assert.throws(() => validation.regex(/(a+)+$/u), /REGEX_UNSAFE_PATTERN/u);
});

test("padrões brasileiros validam CPF, CNPJ atual e alfanumérico", () => {
  assert.equal(br.isCpf("529.982.247-25"), true); assert.equal(br.formatCpf("52998224725"), "529.982.247-25");
  assert.equal(br.isCnpj("04.252.011/0001-10"), true); const base = "12ABC34501DE"; const alpha = base + br.cnpjCheckDigits(base); assert.equal(br.isCnpj(alpha), true); assert.match(br.formatCnpj(alpha), /^[0-9A-Z]{2}\./u);
  assert.equal(br.isCep("01310-100"), true); assert.equal(br.validateBankAccount("12345", br.mod10Digit("12345"), "mod10"), true);
});

test("datas, finanças, coleções, conversões e planilhas são determinísticas", () => {
  assert.equal(datetime.isLeapYear(2024), true); assert.equal(datetime.formatIsoDate(datetime.addDays(datetime.parseIsoDate("2024-02-28"), 1)), "2024-02-29");
  assert.equal(finance.simpleInterest(1000, 0.1, 2), 200); assert.ok(Math.abs(finance.compoundAmount(1000, 0.1, 2) - 1210) < 1e-9); assert.ok(Math.abs(finance.internalRateOfReturn([-100, 110]) - 0.1) < 1e-8);
  assert.deepEqual(collections.chunk([1, 2, 3], 2), [[1, 2], [3]]); assert.deepEqual(collections.union([1, 2], [2, 3]), [1, 2, 3]); assert.equal(collections.sumBy([{ n: 2 }, { n: 3 }], (item) => item.n), 5);
  assert.equal(conversion.base64ToUtf8(conversion.utf8ToBase64("Olá 🌎")), "Olá 🌎"); assert.deepEqual([...conversion.hexToBytes("00ff")], [0, 255]);
  assert.equal(spreadsheet.lookup("b", [["a", 1], ["b", 2]]), 2); assert.equal(spreadsheet.sumIf([1, 2, 3], (value) => value > 1), 5);
});
