# Solicitação fonte — FT-004

- Origem: prompt humano no Codex.
- Capturado em: 2026-08-09T21:46:02-03:00.
- Identidade: assinatura pública individual e registro global de artefatos.
- RCF de destino: `/RCF.md`.
- FTs vinculadas: FT-004 normativa e FT-002 técnica.
- Estado de incorporação: pendente.

## Conteúdo integral

autorizo expressamente a prosseguir para implemensação do código, incluindo quanto ao que vou solicitar de ajuste normativo a seguir. Não precisa voltar a pergunta, apenas faça commit antes, e já prossiga para a fase de implementação do código até a completa conclusão. Ajuste o RCF e a FT:

Acrescente ao RCF e à distribuição:

- Cada arquivo individual publicado em Release/npm — bundle ou não — DEVE possuir um **manifesto/assinatura próprio e exclusivo de sua superfície pública efetiva**, claramente delimitado e identificável no artefato.

- No navegador, cada artefato `.js`, `.mjs` ou equivalente DEVE registrar seu manifesto em uma estrutura global pública, unificada e compartilhada entre todos, somente para consulta, imutável externamente e compartilhada entre os artefatos da biblioteca. Como múltiplos arquivos PODEM coexistir na mesma página:
  - cada artefato DEVE acrescentar exclusivamente seu próprio manifesto;
  - registros preexistentes NÃO PODEM ser sobrescritos, removidos ou redefinidos;
  - colisões DEVEM falhar de forma segura, nunca substituir silenciosamente informação;
  - a composição DEVE permanecer determinística independentemente da ordem de carregamento;
  - bibliotecas terceiras DEVEM poder consultar os manifestos sem obter capacidade de mutá-los.

- O manifesto DEVE ser ultrassucinto, conceitualmente equivalente a um `.d.ts`, porém limitado ao conteúdo daquele artefato, e:
  - corresponder exatamente aos seus exports reais;
  - declarar funções, overloads, retornos e tipos customizados necessários;
  - omitir nomes de parâmetros, preservando apenas ordem e tipagem;
  - minimizar também a nominalidade de campos e tipos customizados;
  - declarar nomes somente quando indispensáveis ao uso prático, resolução/inferência de tipos, interoperabilidade ou semântica pública;
  - ser determinístico, gerado/validado automaticamente e permanecer sincronizado com fonte, `.d.ts` canônico e artefato;
  - NÃO duplicar documentação, exemplos ou informação descritiva disponível em níveis superiores.

- Tipos customizados DEVEM seguir o mesmo princípio de **mínima nominalidade**, priorizando representação estrutural puramente tipada e introduzindo identificadores somente quando sua ausência prejudicar consumo, composição, referência, inferência ou interoperabilidade.

- A estrutura global de consulta, seu namespace, mecanismo de composição, imutabilidade e representação compacta DEVEM ser normatizados no RCF, sem introduzir estado global mutável ou efeitos colaterais incompatíveis com os builds/imports existentes.

- Qualquer divergência entre manifesto individual, registro global, `.d.ts`, exports ou implementação DEVE invalidar o build/release.
