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

## Checkpoint de publicação

- `origin/dev`: `96da455f6badbb443a3aa5a6e9bb85f38b989d6e`.
- npm: pacote ausente (`E404`) e sessão local não autenticada (`E401`).
- GitHub: tag e release `v0.1.0` ausentes antes da mutação.
- tarball único: `jcempro-formulakit-0.1.0.tgz`, 963.025 bytes.
- SHA-256: `424539F8711D1D8BA56E27AD8928ABFBBA5DB71F51D39E7D3FEA511651A4DCA5`.
- SHA-1 npm: `53d1b0efd2932090b06aa00b1c5026918194242e`.
- integridade npm: `sha512-VQAS5FSkiZfOsQTcboc+MOR4MEnu6elWSalMonjemvKBIedWPaQNESlJqNOukvDjxZ0Vt7adSqg3M1N+DSKFPQ==`.
- A tentativa de `npm login --auth-type=web` expirou sem autenticação; `npm whoami` continua em `E401`. Nenhuma publicação, tag ou release foi criada.
