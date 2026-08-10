# FT-007 — Documentação pública automática

## Objetivo

Corrigir a dívida documental da API pública, substituir comentários sumários por TSDoc/JSDoc consumível por ferramentas, gerar referência navegável determinística e publicar a documentação automaticamente no GitHub Pages após cada GitHub Release publicado.

## Contratos

- A fonte TypeScript é a origem da referência de API.
- Toda declaração pública deve possuir bloco documental válido, finalidade, parâmetros aplicáveis e retorno aplicável; falhas, restrições e exemplos são obrigatórios quando materialmente relevantes.
- A geração deve usar biblioteca mantida, open source e compatível com Node.js 20+ e GitHub Actions.
- O gate local e de CI deve rejeitar comentário ausente/inválido e documentação que não possa ser gerada.
- O workflow de documentação deve ser separado do workflow de publicação do pacote, reagir a `release.published`, permitir despacho manual e publicar somente artefato gerado e validado.
- A automação não altera versão, pacote npm, tag, Release ou branches.

## Aceite

- RCF e README descrevem fonte, geração, validação, URL e gatilho.
- API pública documentada em TSDoc/JSDoc e referência HTML gerada por comando único.
- Testes cobrem o contrato documental e o workflow é sintaticamente válido.
- `npm run check`, geração documental, validação do pacote e gates RCF aplicáveis são executados.
- Commits normativo e técnico são publicados em `dev` e convergidos em `main`, sem criar novo Release.

## Implementação selecionada

- `@microsoft/tsdoc@0.16.0` analisa e valida os blocos documentais.
- `typescript-api`, alias fixo de TypeScript 6.0.2, fornece somente a API de compilador necessária ao gerador; o compilador canônico do produto permanece TypeScript 7.0.2, cuja distribuição não expõe a API estável antiga.
- `marked@18.0.9` converte a referência canônica em HTML estático autocontido.
- `yaml@2.9.0` valida estruturalmente o workflow nos testes.
- GitHub Pages usa somente actions oficiais e separa `build` de `deploy`.

## Evidência parcial

- `npm run check`: 15/15 testes, 524 artefatos, 185 medições e documentação de 166 declarações aprovada.
- `npm run validate:package`: 529 arquivos, pacote e versão corretos.
- `npm audit --audit-level=moderate`: zero vulnerabilidades.
- gerador: SHA-256 documental `e42f9d3ce67ccf485868c1c1f0f3f831d0f05c35e75a9a4ef3e0a62e415ace27`.
- o wrapper oficial `agent:git-add` retornou `COMMAND_DEGRADED` sem mutação; commits locais usam Git direto e preservam o fluxo, sem alteração no núcleo gerenciado.

## Evidência de conclusão

- commit material: `5e9136482f9ec1ba52680062d543cf73bb0902bd`.
- sincronização causal: `c6d84ebfefbaeb8873e5b8cf741cf83e807934a5`.
- workflow documental: execução `31353801539`, jobs `build` e `deploy` aprovados sobre `c6d84eb`.
- publicação: `http://formulakit.jcem.pro/` respondeu HTTP 200, com título `FormulaKit — API` e hash documental presente.
- HTTPS: o GitHub Pages ainda reporta certificado do domínio customizado no estado externo `new`; o provisionamento não altera nem invalida o artefato publicado.
- convergência intermediária necessária ao primeiro despacho: `dev` e `main` receberam `c6d84eb` antes da execução manual, porque o GitHub somente reconhece novo workflow após presença na branch padrão.
