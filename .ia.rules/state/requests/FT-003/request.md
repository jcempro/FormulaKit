# Solicitação fonte — FT-003

- Origem: prompt humano no Codex.
- Capturado em: 2026-08-09T21:31:38-03:00.
- Identidade: ampliação normativa por escopo e nível de capacidade.
- RCF de destino: `/RCF.md`.
- FTs vinculadas: FT-003 normativa e FT-002 técnica.
- Estado de incorporação: pendente.

## Conteúdo integral

Sim, prossiga mas antes de prossiga, faça o seguinte ajuste ao RCF e à FT:

Sem perder ou enfraquecer o que já está normatizado nem o rigor, amplie o RCF da biblioteca funcional para normatizar distribuição e transpilação **por escopo e nível de capacidade**, preservando todos os contratos anteriores.

* Cada família funcional DEVE constituir um **escopo** rastreável e importável, por exemplo: matemática, lógica, texto, validação, datas, financeiro, conversões etc.
* Dentro de cada escopo, a distribuição DEVE ser progressiva:
  * `basic`: subconjunto essencial;
  * `advanced`: DEVE incluir integralmente `basic` + funções avançadas;
  * terceiro nível somente quando o volume/complexidade justificar objetivamente;
  * escopos pequenos PODEM possuir nível único.
* A relação cumulativa entre níveis DEVE ser explícita no RCF, README, exports e manifestos.
* Todo escopo e nível DEVE preservar namespace/identidade compartilhada, nomenclatura consistente, rastreabilidade e compatibilidade entre imports, bundles e tipos.

## Distribuição

O Release DEVE disponibilizar, conforme aplicabilidade:

* builds individuais por escopo/nível;
* bundles combinando múltiplos escopos;
* bundle completo;
* múltiplos formatos/targets, inclusive `.js`, `.mjs` e demais formatos já normatizados;
* organização por diretórios quando isso aumentar clareza sem quebrar imports públicos.

O npm DEVE expor, por `exports`/subpaths ou mecanismo equivalente, toda granularidade tecnicamente suportável, permitindo consumir somente o necessário sem carregar escopos alheios.

A geração dos artefatos DEVE permanecer determinística, compatível com tree-shaking, tipos `.d.ts`, sourcemaps e política dinâmica de ECMAScript já definida.

## Texto e máscaras

O escopo de texto/formatação DEVE incluir mecanismo de mascaramento superior ao equivalente convencional de planilha, capaz de interpretar máscaras declarativas mais expressivas, incluindo, conforme contrato normatizado:

* literais;
* classes/caracteres permitidos;
* opcionais;
* repetições;
* grupos;
* alternativas;
* prefixos/sufixos;
* preenchimento;
* transformação e validação associada.

A sintaxe DEVE ser compacta, determinística, segura e compilável/cacheável para alto desempenho. NÃO limitar o recurso ao comportamento do Excel/LibreOffice quando uma abstração mais geral for tecnicamente superior.

## Validação

Disponibilizar funções de validação reutilizáveis baseadas em regex e mecanismos equivalentes, com:

* validadores prontos para padrões comuns;
* validação por regex fornecida pelo consumidor;
* composição de validadores;
* retorno booleano e, quando apropriado, resultado estruturado com motivo/posição;
* proteção contra padrões ou execução potencialmente abusivos quando aplicável.

## Operadores lógicos variádicos

Disponibilizar funções equivalentes a `AND`, `OR` e `XOR` aceitando quantidade arbitrária de argumentos.

Elas DEVEM possuir contratos claros para, no mínimo:

* avaliação booleana estrita;
* avaliação por truthiness quando explicitamente escolhida;
* retorno booleano;
* variante que retorne o valor relacionado ao resultado lógico quando isso for semanticamente útil, sem ambiguidade.

A semântica de curto-circuito, coerção, argumentos vazios, `null`, `undefined` e tipos inválidos DEVE ser normatizada e testada.

Nomes PODEM ser aprimorados para manter estilo idiomático JavaScript/TypeScript, desde que permaneçam consistentes entre funções, namespaces, imports e documentação.
