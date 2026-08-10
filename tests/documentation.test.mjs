// Autor: JeanCarloEM.com | https://jeancarloem.com
// Repositório: https://github.com/jcempro/FormulaKit
// Licença: MPL-2.0 | https://www.mozilla.org/MPL/2.0/
// RCF: ./RCF.md

import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { parse } from "yaml";

/** Executa o gerador pela mesma interface usada no CI. */
function documentation(command) {
  return execFileSync(process.execPath, ["constructor/documentation.mjs", command], { encoding: "utf8", windowsHide: true });
}

test("a referência versionada corresponde aos comentários TSDoc", () => {
  const result = /^FORMULAKIT_DOC_OK:(\d+):[a-f0-9]{64}/u.exec(documentation("check"));
  assert.ok(result);
  assert.ok(Number(result[1]) >= 160);
  const markdown = readFileSync("docs/API.md", "utf8");
  assert.match(markdown, /^# API pública do FormulaKit/u);
  assert.match(markdown, /### `compileMask`/u);
  assert.match(markdown, /Falhas:/u);
  assert.doesNotMatch(markdown, /Resultado da operação descrita, com o tipo declarado/u);
});

test("a saída HTML é autocontida e reproduzível", () => {
  assert.match(documentation("build"), /^FORMULAKIT_DOC_BUILT:\d+:[a-f0-9]{64}/u);
  const html = readFileSync(".tmp/docs-site/index.html", "utf8");
  assert.match(html, /<!doctype html>/u);
  assert.match(html, /FormulaKit — API/u);
  assert.match(html, /SHA-256 da referência/u);
  assert.doesNotMatch(html, /<script\b/iu);
});

test("o workflow publica Pages somente após release ou despacho manual", () => {
  const workflow = parse(readFileSync(".github/workflows/documentation.yml", "utf8"));
  assert.deepEqual(workflow.on.release.types, ["published"]);
  assert.deepEqual(workflow.on.workflow_dispatch, null);
  assert.equal(workflow.jobs.build.steps.find((step) => step.uses === "actions/setup-node@v6").with["node-version"], 24);
  assert.equal(workflow.jobs.deploy.needs, "build");
  assert.equal(workflow.jobs.deploy.permissions.pages, "write");
  assert.equal(workflow.jobs.deploy.permissions["id-token"], "write");
  assert.equal(workflow.jobs.deploy.environment.name, "github-pages");
  assert.ok(workflow.jobs.deploy.steps.some((step) => step.uses === "actions/deploy-pages@v4"));
});
