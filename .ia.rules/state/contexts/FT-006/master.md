# FT-006 — Primeira publicação remota do FormulaKit

## Autoridade e ordem

O prompt de retomada autoriza expressamente a publicação remota. A primeira versão npm exige bootstrap manual; portanto, a ordem vinculante é validação local, tarball único, publicação manual npm, confirmação do registro, tag/GitHub Release e convergência Git.

## Identidade

- pacote: `@jeancarloem/formulakit`
- versão: `0.1.0`
- tag: `v0.1.0`
- desenvolvimento: `dev`
- primária: `main`
- remoto: `origin`

## Gate e interrupção segura

Mutação no npm não recebe retry implícito. Colisão de pacote, versão, tag ou release bloqueia sem sobrescrita. O GitHub Release não precede a confirmação npm. O gate gerenciado incompatível permanece declarado pela FT-005 e não pode ser reportado como aprovado.

## Evidência de conclusão

- npm: `@jeancarloem/formulakit@0.1.0`, dist-tag `latest=0.1.0`.
- tarball canônico: `jeancarloem-formulakit-0.1.0.tgz`, 962.626 bytes.
- SHA-256: `3946ACE01D5828BCB051CE3802B99C30D924DE98DF4A633914B77DE36516D383`.
- SHA-1 npm: `df480f5896a56e37e75d886005f167f9057af017`.
- integridade npm: `sha512-DUEiXZrFfPLXFR7Nx36ilb78z1fJ/QjLr/yM8kZ4T00b2br6cksz19aTAPoiLdTFTsBZDmU0Z6sXiDyJuEc9HA==`.
- GitHub Release: `v0.1.0`, publicado, não rascunho e não prerelease, com asset de SHA-256 idêntico ao tarball npm.
- workflow: execução `31351906325` concluída com sucesso; o pacote npm preexistente foi confirmado e seus bytes imutáveis foram reutilizados no Release.
- convergência: tag no commit `6e784220ce81f09ff00d7912006fcc3f8d8a8a62`; `origin/dev` e `origin/main` em `1053e16430346c11ce2ed47ab1e4ff98d2514a2a`; gatilho removido.

## Histórico do bloqueio superado

Antes da publicação manual, o pacote retornava `E404`, a sessão npm local retornava `E401` e tag/Release estavam ausentes. A publicação manual realizada pelo mantenedor superou esse bootstrap sem retry automatizado nem exposição de credencial.
