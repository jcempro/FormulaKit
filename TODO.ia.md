- [ ] [equalizer] Equalizar e executar as TO-DOs como frentes convergentes de um único objetivo
  - Este item rege todas as demais TO-DOs. Cada uma DEVE ser tratada como frente complementar de uma única execução, conciliada com as demais e convergente ao objetivo principal do projeto.

  - Contradições aparentes DEVEM ser presumidas como imprecisão redacional e resolvidas por equalização, sem perda de intenção, requisito, restrição ou nuance. Havendo evidência de conflito material não solucionável pelas normas e pelo contexto, o desenvolvedor DEVE ser consultado.

  - Considerações, comparações ou solicitações PODEM não ser plenamente aderentes ao projeto, especialmente quando previamente processadas por IA. Salvo dúvida material que exija confirmação, a IA DEVE interpretá-las conforme o contexto aplicável já normatizado no RCF e no `README.md`; persistindo ambiguidade ou incompatibilidade, DEVE consultar o desenvolvedor antes de prosseguir.

  - O `AGENTS.md` prevalece absolutamente; o RCF vigente prevalece sobre as demais fontes subordinadas. Toda alteração DEVE aprimorar o projeto, ampliar capacidades e recursos, preservar compatibilidade e força normativa e NÃO PODE introduzir regressão.

  - Antes de executar qualquer TO-DO:
    1. ler integralmente todas as TO-DOs e normas aplicáveis;
    2. equalizar objetivos, requisitos, dependências, precedências e terminologia;
    3. resolver incompatibilidades, ambiguidades, sobreposições e lacunas;
    4. adaptar, consolidar, desmembrar, reordenar ou eliminar itens somente quando isso aumentar coerência sem reduzir o objetivo material.

  - Toda TO-DO DEVE ser separada em:
    - **Normatização (RCF):** atualizar RCFs, contratos, precedências e documentação normativa necessária;
    - **Implementação:** executar código, migrações, testes, validações e alterações funcionais.

  - Após a equalização, a IA DEVE iniciar e concluir imediatamente a **Normatização RCF de todas as TO-DOs**, mantendo rastreabilidade entre cada regra e sua implementação futura.

  - Concluída a normatização, a IA DEVE INTERROMPER antes de qualquer implementação e solicitar autorização expressa do desenvolvedor, informando sucintamente:
    - implementações pendentes;
    - dependências e ordem recomendada;
    - impedimentos materiais identificados.

  - Toda alteração que implique em alteração no modo de codificar markdown, deve ser devidamente documentada em modo de uso.
  - Esta TO-DO é perene: NÃO PODE ser marcada como concluída nem removida e nem editada. Sua existência é perene; sua contabilização somente é necessária quando houver ao menos uma TO-DO por ela regida.

* [x] Derivar do `/_RCF.md` (equivalente ao "RCF atual" que será substituído pelo novo `/RCF.md`) um novo `/RCF.md` para biblioteca TypeScript de funções utilitárias universais
  - Usar o RCF atual como **base normativa, arquitetural e operacional**, preservando, naquilo que se aplica ao novo projeto, o mesmo rigor, força normativa, precedência documental, governança, modularização, contratos públicos, builds, distribuição, segurança, dependências, cadeia de suprimentos, versionamento, manifestos, documentação, testes, CI, observabilidade e modus operandi.

  - O novo RCF DEVE ser **equivalente em rigor e abrangência, mas não uma cópia**: remover integralmente especializações exclusivas da DSL — gramática, parser, seletores, resolução de expressões, fontes DSL e contratos correlatos — e substituir esse núcleo pela finalidade abaixo. Demais normas aplicáveis DEVEM ser adaptadas, não descartadas.

  ## Finalidade

  Criar uma biblioteca TypeScript, utilizável em **client-side e server-side**, composta por funções utilitárias independentes, importáveis e preferencialmente puras, com API padronizada e estável.

  A biblioteca DEVE fornecer equivalentes funcionais — **não necessariamente nominais** — às operações comumente oferecidas por Excel/LibreOffice e utilitários gerais JavaScript/TypeScript, usando nomenclatura idiomática JS/TS e parâmetros uniformes.

  O catálogo é estimado em aproximadamente **200 funções**, mas esse número NÃO constitui meta, limite nem requisito arbitrário: DEVEM existir tantas funções quanto forem justificadas pela cobertura funcional pretendida, sem duplicações semânticas artificiais.

  ## Superfície funcional

  Normatizar famílias coerentes, incluindo conforme aplicabilidade:
  - texto, normalização, busca, substituição e formatação;
  - números, matemática, trigonometria e arredondamento;
  - estatística e operações sobre coleções numéricas;
  - porcentagem, juros e cálculos financeiros;
  - datas, horários, durações e múltiplos formatos;
  - arrays, conjuntos, seleção, agregação e transformação;
  - validação e formatação;
  - codificação, conversões e representações;
  - funções equivalentes às operações úteis de planilhas;
  - documentos e padrões brasileiros, incluindo CPF, CNPJ atual e padrão alfanumérico quando aplicável, telefone/celular, CEP e conta-corrente;
  - cálculo/validação de dígitos verificadores, inclusive CPF/CNPJ e módulos `10` e `11`;
  - demais funções generalizáveis justificadas pelo domínio da biblioteca.

  Funções nativas da plataforma DEVEM ser preferidas internamente quando suficientes, mas isso NÃO elimina a obrigação de disponibilizar a função correspondente na API quando ela integrar o contrato da biblioteca: nesses casos, implementar wrapper/passthrough mínimo, permitindo contrato, nomenclatura, tipagem e importação uniformes.

  Funções DEVEM possuir nomes JS/TS-like consistentes, assinaturas previsíveis, parâmetros padronizados, tipos rigorosos, semântica determinística e ausência de efeitos colaterais salvo quando intrínsecos e expressamente documentados.

  ## Arquitetura
  - O núcleo DEVE permanecer agnóstico a DOM, Node.js, framework e ambiente sempre que a função não depender deles, preservando a segregação por adaptador/subpath/condição de exportação quando houver especialização ambiental, conforme o princípio arquitetural do RCF-base.
  - Favorecer funções puras, composição, baixo acoplamento, tree-shaking e importação granular.
  - É PROIBIDO criar classes, abstrações, dependências ou estados globais sem necessidade material.
  - Funções semanticamente relacionadas DEVEM compartilhar primitivas internas sem duplicar lógica.
  - A API pública NÃO DEVE depender de paths internos ou da estrutura física do repositório.

  ## TypeScript, JavaScript e ECMAScript

  TypeScript é a fonte canônica da implementação.

  O target ECMAScript NÃO PODE ficar fixado permanentemente. A cadeia de build DEVE resolver automaticamente:

  ```text
  TARGET_ECMA = edição ECMAScript publicada mais recente - 2 anos
  ```

  A cada nova edição ECMAScript publicada, o target efetivo DEVE avançar automaticamente para manter essa janela de `ESNEXT - 2 anos`.

  Compilador TypeScript, `lib`, transpilador, bundler e demais etapas que dependam do target DEVEM usar o mesmo valor resolvido. A resolução DEVE ser determinística, testável e registrada nos metadados do build; toolchain incompatível com o target calculado DEVE falhar explicitamente, nunca realizar downgrade silencioso.

  Esta regra substitui especificamente a política temporal de ECMAScript do RCF-base.

  ## Distribuição

  Disponibilizar a biblioteca por **npm e GitHub Release**, ambos contendo, conforme tecnicamente aplicável:
  - fontes TypeScript consumíveis;
  - JavaScript transpilado/executável;
  - declarações `.d.ts` completas;
  - source maps quando apropriados;
  - metadados, licença e manifestos necessários.

  Suportar múltiplas formas idiomáticas de importação quando tecnicamente justificadas, preferencialmente:
  - ESM;
  - CommonJS;
  - `.mjs`;
  - `.cjs`;
  - importação granular/subpaths;
  - browser/client-side;
  - Node/server-side;
  - bundle otimizado quando houver consumidor correspondente.

  Nenhum formato DEVE existir apenas por tradição; cada build DEVE declarar consumidor, runtime, entry point, formato, tipos, compatibilidade e finalidade. A distribuição DEVE preservar a disciplina já estabelecida no RCF-base.

  O npm e o Release DEVEM permitir consumo sem toolchain de desenvolvimento e sem importar código, runtime ou dependências não utilizados.

  ## Tipagem e manifesto público

  O `.d.ts` DEVE representar integralmente a superfície pública tipada: funções, overloads, parâmetros, retornos, generics, erros/condições e demais contratos aplicáveis.

  A superfície pública DEVE ser verificável contra a implementação; exportação acidental NÃO adquire estabilidade.

  Se mantido manifesto canônico separado, este e o `.d.ts` NÃO PODEM constituir fontes normativas independentes divergentes: um DEVE ser derivado ou validado automaticamente contra o outro e contra os exports reais, preservando o princípio de manifesto/schema do RCF-base.

  ## Build e otimização

  A transpilação/build de distribuição DEVE ser agressivamente otimizada para reduzir tamanho sem alterar semântica:
  - tree-shaking;
  - dead-code elimination;
  - deduplicação;
  - minificação;
  - imports granulares;
  - ausência de side effects indevidos;
  - eliminação de dependências acidentais.

  Medir de forma reproduzível tamanho bruto, minificado, gzip e Brotli dos artefatos relevantes e estabelecer budgets somente após baseline real, conforme a disciplina do RCF-base.

  ## Dependências e cadeia de suprimentos

  Replicar as exigências aplicáveis do RCF-base:
  - minimizar dependências e preferir recursos nativos adequados;
  - classificar corretamente dependências de runtime/dev/peer/opcional;
  - lockfile e builds reproduzíveis;
  - auditoria de licença, origem, proveniência, vulnerabilidades e scripts de instalação;
  - nenhum recurso remoto não fixado necessário ao build;
  - nenhum segredo em fonte, pacote, build, source map, teste, fixture ou log.

  ## Qualidade e compatibilidade

  Para cada função pública, normatizar e testar, conforme aplicável:
  - tipos aceitos;
  - coerção permitida ou proibida;
  - valores limites;
  - Unicode/UTF-8;
  - locale;
  - `null`/`undefined`;
  - `NaN`/infinito;
  - precisão numérica;
  - arredondamento;
  - mutabilidade;
  - determinismo;
  - erros;
  - browser e server;
  - equivalência entre builds e formatos de importação.

  Funções equivalentes às de Excel/LibreOffice DEVEM reproduzir a **funcionalidade pretendida**, não necessariamente peculiaridades históricas, nomenclatura ou erros dessas plataformas. Divergências relevantes DEVEM ser deliberadas, documentadas e testadas.

  ## Documentação, versionamento e validação

  Preservar as regras aplicáveis do RCF-base para documentação idiomática de todas as declarações, SemVer, cabeçalhos/licença, README, builds, exports, CI e testes.

  A validação DEVE abranger, no mínimo:
  - testes unitários por função/família;
  - vetores de borda e regressão;
  - consistência `.d.ts` × exports × implementação;
  - ESM/CommonJS e demais formatos publicados;
  - browser real e Node.js;
  - client/server;
  - tree-shaking e importação granular;
  - bundle e tamanhos;
  - build reproduzível;
  - pacote npm/tarball e Release;
  - instalação/consumo a partir de projeto externo limpo;
  - licença, dependências, proveniência e ausência de segredos.

  Teste não executado NÃO DEVE ser declarado aprovado, preservando a disciplina de validação e CI do RCF-base.

  ## Resultado

  Criar um novo RCF autossuficiente, de alta densidade informacional, tomando o RCF atual como matriz metodológica. Preservar tudo que seja transversal a um projeto TypeScript profissional e remover exclusivamente especializações inerentes à DSL, substituindo-as pelos contratos desta biblioteca funcional. NÃO simplificar requisitos apenas porque o novo domínio é conceitualmente menor.
