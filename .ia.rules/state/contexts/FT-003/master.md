# Contexto-mestre — FT-003

## Identidade e objetivo

- Fonte: `.ia.rules/state/requests/FT-003/request.md`, SHA-256 `d298f6fe933fc3f78815ff88fa13621d3faf0c2bdd78b310bd33dacb7905747e`.
- Objetivo: ampliar a norma do FormulaKit por escopo e nível cumulativo, incluindo distribuição granular, máscaras declarativas, validação reutilizável e operadores lógicos variádicos.
- Relação: FT-003 especializa a norma produzida pela FT-001 e atualiza o plano técnico da FT-002.

## Equalização e arquitetura

1. Família funcional passa a ser escopo rastreável e importável sem perder a taxonomia já definida.
2. `basic` é o subconjunto essencial; `advanced` contém integralmente `basic`; terceiro nível exige justificativa mensurável; escopo pequeno pode ser nível único.
3. Cumulatividade é semântica, tipada, manifestada e testável, não mera cópia física.
4. Builds individuais, combinados e completo são projeções da mesma fonte e do mesmo manifesto, preservando imports públicos, tipos e tree-shaking.
5. Máscaras pertencem ao escopo de texto/formatação e usam linguagem declarativa própria, limitada e segura, sem avaliação de código.
6. Validação separa predicado booleano de diagnóstico estruturado e trata regex do consumidor como entrada não confiável.
7. Operadores lógicos distinguem avaliação estrita, truthiness opt-in e variante orientada a valor; nomes finais permanecem decisão de catálogo na FT-002.

## Ordem e integração

FT-003 executa RCF → README → mapa causal → validação → commit/push. A FT-002 permanece pendente e recebe etapas explícitas para materializar os novos contratos somente após nova autorização humana posterior à conclusão normativa.

## Restrições e fora de escopo

- Preservar integralmente contratos anteriores e o item `equalizer` perene.
- Não alterar a Norma Operacional gerenciada.
- Não implementar código, dependência, build, teste executável, workflow, pacote ou release.
- Não fixar terceiro nível, nomes finais ou formatos sem justificativa de catálogo/consumidor.

## Estado e aceite

- Estado: FT-003 em andamento; FT-002 conciliada e pendente.
- Aceite: cobertura integral da fonte; relações cumulativas inequívocas; compatibilidade entre imports, bundles, tipos e manifestos; contratos seguros de máscara/validação/lógica; rastreabilidade válida; publicação comprovada.
