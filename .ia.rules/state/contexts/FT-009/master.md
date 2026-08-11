# FT-009 — Publicação automatizada do histórico de chaves

## Estado

Implementação técnica concluída localmente em 2026-08-11; validação, rastreabilidade e commit em encerramento. A configuração externa das chaves e qualquer Release permanecem fora desta FT.

## Plano executável

1. implementar esquema canônico, assinatura Ed25519 externa, verificador e testes de cadeia — concluído;
2. incluir snapshot no pacote, asset do Release e caminho canônico, bloqueando divergência — concluído;
3. documentar configuração externa e recuperar fontes sem tratá-las como trust anchor — concluído;
4. validar, sincronizar rastreabilidade e commitar; Release remoto permanece fora desta autorização — em encerramento.

## Contrato de entrada esperado

- esquema `FormulaKitKeyHistory/v1` normatizado;
- âncora de confiança e rotação verificável definidas;
- localizações equivalentes e política de espelhamento aprovadas;
- política de revogação e anti-downgrade definida;
- critérios de publicação atômica após cada release definidos.
