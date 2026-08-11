# FT-009 — Publicação automatizada do histórico de chaves

## Estado

Concluída localmente em 2026-08-11. O commit material é `dd5e74f40754d18396a7bc8c2c56728182d58a15`; rastreabilidade sincronizada. A configuração externa das chaves e qualquer Release permanecem fora desta FT.

## Plano executável

1. implementar esquema canônico, assinatura Ed25519 externa, verificador e testes de cadeia — concluído;
2. incluir snapshot no pacote, asset do Release e caminho canônico, bloqueando divergência — concluído;
3. documentar configuração externa e recuperar fontes sem tratá-las como trust anchor — concluído;
4. validar, sincronizar rastreabilidade e commitar; Release remoto permanece fora desta autorização — concluído.

## Evidência de aceite

- `npm run check`: 19/19 testes, build de 538 artefatos, documentação, distribuição e medição aprovados;
- `npm run validate:package`: 544 arquivos elegíveis, incluindo o histórico e o verificador público;
- `agent:rcf` e `rcf-trace validate`: aprovados com 180 entradas/179 sentenças materiais;
- `agent:verify`: `TYPECHECK_OK`, seguido do bloqueio gerenciado preexistente `MANIFESTO_FONTE_AUSENTE`, sem sucesso global inferido;
- nenhum segredo, Release, publicação npm ou configuração externa foi executado.

## Contrato de entrada esperado

- esquema `FormulaKitKeyHistory/v1` normatizado;
- âncora de confiança e rotação verificável definidas;
- localizações equivalentes e política de espelhamento aprovadas;
- política de revogação e anti-downgrade definida;
- critérios de publicação atômica após cada release definidos.
