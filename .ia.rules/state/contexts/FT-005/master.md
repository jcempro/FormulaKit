# FT-005 — Convergência do gate gerenciado

## Autoridade e objetivo

Esta FT executa a atualização oficial e o compartilhamento upstream no papel de Repositório Final. Não concede autoridade para editar ou tratar a Norma no upstream.

## Estado inicial comprovado

- `update:agents --check` detectou `release:v0.1.2`.
- `update:agents` aplicou o commit `01fdc32`, criou backup recuperável e falhou somente ao enviar por indisponibilidade de credencial Git no sandbox.
- O novo manifesto foi instalado na raiz operacional, mas `agent:verify` continua procurando o manifesto na árvore-fonte exclusiva do construtor da Norma e encerra em `MANIFESTO_FONTE_AUSENTE`.
- O merge do `package.json` substituiu scripts públicos pré-existentes do produto, contrariando a preservação exigida pelo próprio atualizador.

## Limites

A proposta deve abstrair o caso para qualquer consumidor com fonte/build próprios, sem expor nome, caminho, domínio ou hash do FormulaKit. A FT termina após registrar a proposta e preservar o produto; a incorporação upstream depende do mantenedor.
