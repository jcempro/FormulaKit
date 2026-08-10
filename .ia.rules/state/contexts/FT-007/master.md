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
