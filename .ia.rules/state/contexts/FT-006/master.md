# FT-006 — Primeira publicação remota do FormulaKit

## Autoridade e ordem

O prompt de retomada autoriza expressamente a publicação remota. A primeira versão npm exige bootstrap manual; portanto, a ordem vinculante é validação local, tarball único, publicação manual npm, confirmação do registro, tag/GitHub Release e convergência Git.

## Identidade

- pacote: `@jcempro/formulakit`
- versão: `0.1.0`
- tag: `v0.1.0`
- desenvolvimento: `dev`
- primária: `main`
- remoto: `origin`

## Gate e interrupção segura

Mutação no npm não recebe retry implícito. Colisão de pacote, versão, tag ou release bloqueia sem sobrescrita. O GitHub Release não precede a confirmação npm. O gate gerenciado incompatível permanece declarado pela FT-005 e não pode ser reportado como aprovado.
