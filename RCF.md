# RCF global — FormulaKit

## 1. Autoridade, escopo e conformidade

Este RCF define o contrato funcional, arquitetural e público do FormulaKit e complementa `./AGENTS.md`; processamento da IA, FTs, Git e operação do repositório permanecem sob a Norma Operacional superior.

A ordem normativa do produto é `./RCF.md` → sub-RCF aplicável → manifesto público canônico → `./README.md`; implementação, tipos, build, pacote, manifesto ou documentação divergente constituem não conformidade e NÃO redefinem este RCF. [PENDENTE-CODIGO]

Aplicam-se os contratos comuns de `./.ia.rules/core/contracts.md` e a linguagem normativa de `./.ia.rules/core/concepts/microconceitos.md`, especialmente MN-2119, MN-DENS, MN-PRES, MN-REF e MN-VAL.

Sub-RCF PODE especializar somente seu domínio, DEVE referenciar este arquivo e NÃO PODE reduzir força, cobertura, compatibilidade, segurança ou verificabilidade. [PENDENTE-CODIGO]

## 2. Finalidade, estado e limites

FormulaKit DEVE ser uma biblioteca TypeScript universal de funções utilitárias independentes, importáveis, composáveis e preferencialmente puras, consumível em client-side e server-side por API padronizada e estável. [PENDENTE-CODIGO]

O catálogo DEVE cobrir operações generalizáveis de texto, número, matemática, estatística, finanças, data e hora, coleções, validação, formatação, codificação, conversão, planilhas e padrões brasileiros, sem converter a estimativa inicial de aproximadamente 200 funções em meta, limite ou justificativa para duplicação. [PENDENTE-CODIGO]

Equivalência com Excel, LibreOffice ou utilitários existentes significa reproduzir a funcionalidade pretendida por contrato idiomático JS/TS; nome, erro histórico, coerção peculiar, arredondamento legado ou comportamento acidental só PODE ser preservado quando deliberado, documentado, testado e justificado por compatibilidade. [PENDENTE-CODIGO]

Estado documental em 2026-08-09: governança, licença, RCF e plano técnico existem; catálogo, implementação, dependências de produto, testes, build, pacote npm e release do FormulaKit permanecem pendentes. Capacidade futura NÃO DEVE ser anunciada como disponível. [PENDENTE-CODIGO]

O núcleo NÃO DEVE incorporar DOM, framework, rede, armazenamento, processo, sistema de arquivos ou estado global quando a operação puder ser expressa como transformação determinística de entradas. [PENDENTE-CODIGO]

## 3. Taxonomia e catálogo canônico

- **função pública**: operação estável exportada por entry point documentado e coberta por contrato, tipo e teste; [PENDENTE-CODIGO]
- **família**: agrupamento por semântica e vocabulário, não por conveniência física; [PENDENTE-CODIGO]
- **primitiva interna**: implementação compartilhada sem estabilidade pública e sem exportação acidental; [PENDENTE-CODIGO]
- **adaptador**: integração segregada com ambiente, locale, runtime ou recurso externo; [PENDENTE-CODIGO]
- **wrapper**: fachada mínima sobre capacidade nativa suficiente, mantida para uniformizar nome, assinatura, tipo e importação; [PENDENTE-CODIGO]
- **build**: artefato derivado para consumidor, runtime, formato e entry point declarados; [PENDENTE-CODIGO]
- **manifesto público**: inventário verificável de funções, contratos, estabilidade, imports e compatibilidade; [PENDENTE-CODIGO]
- **vetor canônico**: caso offline compartilhado que fixa entrada, opções, resultado ou falha e efeitos observáveis. [PENDENTE-CODIGO]

### 3.1 Escopos funcionais e níveis de capacidade

Cada família funcional DEVE constituir um **escopo** público, rastreável e importável, com identificador estável, namespace compartilhado, catálogo próprio e vínculo explícito aos artefatos; os escopos iniciais previstos incluem `math`, `logic`, `text`, `statistics`, `finance`, `datetime`, `collections`, `validation`, `conversion`, `spreadsheet` e `br`. [PENDENTE-CODIGO]

Escopo com volume suficiente DEVE expor níveis cumulativos `basic` e `advanced`; `basic` contém o subconjunto essencial e sustentável, enquanto `advanced` contém integralmente a mesma API de `basic` e acrescenta capacidades avançadas sem redefinir ou divergir das anteriores. [PENDENTE-CODIGO]

Um terceiro nível canônico `specialized` só PODE existir quando métricas de volume, complexidade, dependência, tamanho ou perfil de consumidor demonstrarem benefício objetivo; ele DEVE conter integralmente `advanced`, registrar a justificativa no manifesto e preservar a cadeia `basic ⊆ advanced ⊆ specialized`. [PENDENTE-CODIGO]

Escopo pequeno PODE declarar nível único; nesse caso, o nível canônico é `basic`, o import do escopo raiz é projeção equivalente e a futura adição de `advanced` NÃO DEVE alterar a semântica ou os tipos existentes. [PENDENTE-CODIGO]

Cumulatividade significa inclusão integral de exports, assinaturas, tipos, documentação, vetores e comportamento, mas NÃO exige duplicação física: reexportação, composição de chunks e compartilhamento interno DEVEM impedir código repetido e preservar tree-shaking. [PENDENTE-CODIGO]

O import de nível DEVE usar subpath estável equivalente a `<pacote>/<escopo>/<nível>`; `<pacote>/<escopo>` DEVE resolver ao maior nível estável declarado para o escopo, e qualquer mudança desse default exige compatibilidade SemVer e manifesto explícito. [PENDENTE-CODIGO]

RCF, README, `exports`, `.d.ts` e manifesto público DEVEM declarar para cada escopo seus níveis, relação cumulativa, funções acrescentadas por nível, entry points, formatos, targets, bundles e estado; divergência entre essas projeções bloqueia build e publicação. [PENDENTE-CODIGO]

Nome, casing e identidade de função DEVEM permanecer iguais entre níveis do mesmo escopo e entre import granular, bundle combinado e bundle completo; adaptação ambiental PODE alterar somente o invólucro autorizado, nunca o contrato funcional. [PENDENTE-CODIGO]

Cada função candidata DEVE demonstrar utilidade generalizável, diferença semântica material, assinatura previsível e família proprietária antes de integrar o catálogo; aliases só PODEM existir por compatibilidade comprovada e DEVEM apontar para um contrato único. [PENDENTE-CODIGO]

Capacidade nativa suficiente DEVE ser usada internamente; quando a operação integrar o catálogo, um wrapper mínimo DEVE manter a superfície uniforme sem duplicar algoritmo ou mascarar a semântica da plataforma. [PENDENTE-CODIGO]

O catálogo canônico DEVE registrar nome, família, finalidade, assinatura, parâmetros, retorno, mutabilidade, coerção, locale, precisão, erros, sincronismo, estabilidade, disponibilidade ambiental, importação e referência normativa. [PENDENTE-CODIGO]

## 4. Semântica transversal das funções

Função pública DEVE possuir nome idiomático JS/TS, parâmetros ordenados consistentemente dentro da família, tipos estritos e retorno determinístico para a mesma entrada e contexto explícito. [PENDENTE-CODIGO]

Entrada NÃO DEVE ser mutada, salvo operação cuja mutação seja intrínseca, esteja indicada pelo nome e tipo e seja documentada; a alternativa imutável DEVERIA ser a superfície preferencial. [PENDENTE-CODIGO]

Coerção implícita é proibida por padrão; função que aceite representação alternativa DEVE declarar conversão, precedência, perda possível, locale e falha, sem depender de truthiness ou conversão textual incidental. [PENDENTE-CODIGO]

`null`, `undefined`, `NaN`, infinitos, vazio, Unicode inválido, valor fora da faixa e tipo incompatível DEVEM possuir tratamento explícito por função ou família; silêncio documental NÃO autoriza aceitação nem fallback. [PENDENTE-CODIGO]

Opções DEVERIAM usar objeto final tipado quando houver duas ou mais escolhas independentes; defaults DEVEM ser estáveis, documentados e materializados sem depender de estado global. [PENDENTE-CODIGO]

Funções semanticamente relacionadas DEVEM compartilhar primitivas internas, política de nomes, opções e falhas; duplicação de lógica ou contratos quase equivalentes com diferenças acidentais é proibida. [PENDENTE-CODIGO]

## 5. Texto, normalização, busca e formatação

A família de texto DEVE distinguir comparação, busca, substituição, recorte, composição, normalização Unicode, caixa, espaços e formatação, preservando índices e unidade de medida documentados. [PENDENTE-CODIGO]

Operação sensível a caracteres DEVE declarar se mede unidades de código UTF-16, pontos de código ou grafemas; o default NÃO PODE variar entre runtimes. [PENDENTE-CODIGO]

Normalização Unicode DEVE exigir forma explícita ou default documentado entre NFC, NFD, NFKC e NFKD; normalização, remoção de diacríticos e transliteração NÃO são equivalentes. [PENDENTE-CODIGO]

Busca, comparação e ordenação dependentes de locale DEVEM receber locale/opções explícitos ou usar política canônica fixa; locale do processo, navegador ou sistema NÃO DEVE alterar resultado silenciosamente. [PENDENTE-CODIGO]

Substituição textual DEVE diferenciar literal e expressão regular, tratar `$`, barras e grupos sem interpolação acidental e impedir execução dinâmica. [PENDENTE-CODIGO]

### 5.1 Máscaras declarativas

O escopo `text` DEVE oferecer compilação e aplicação de máscaras declarativas mais gerais que máscaras convencionais de planilha, separando parse/compilação, aplicação, validação e diagnóstico para permitir reutilização e cache. [PENDENTE-CODIGO]

A gramática canônica DEVE seguir `mask = alternative`, `alternative = sequence { "|" sequence }`, `sequence = { term }`, `term = atom [ quantifier ] [ transform ]`, `atom = quoted-literal | escaped-literal | class | "(" alternative ")"`, `quantifier = "?" | "*" | "+" | "{" min [ "," [ max ] ] "}"` e `transform = ":" name [ "(" arguments ")" ]`; espaços fora de literais são proibidos salvo opção lexical expressa. [PENDENTE-CODIGO]

Literais citados e escapados DEVEM representar conteúdo fixo, inclusive prefixos e sufixos; classes DEVEM cobrir ao menos dígito ASCII, letra Unicode, letra ou número Unicode, qualquer ponto de código permitido e classe explícita negável, sem interpretar conteúdo como código. [PENDENTE-CODIGO]

Opcionais, repetições, grupos e alternativas DEVEM possuir precedência e associatividade documentadas; repetição aberta é limitada pelo tamanho da entrada e pelo limite global de saída, e alternativa DEVE escolher deterministicamente por ordem declarada sem backtracking exponencial. [PENDENTE-CODIGO]

Transformações DEVEM usar allowlist versionada, inicialmente apta a caixa, trim, normalização Unicode e preenchimento inicial/final com largura e literal explícitos; transformação desconhecida, argumento inválido ou resultado acima do limite DEVE falhar na compilação ou aplicação com código estável. [PENDENTE-CODIGO]

A aplicação DEVE permitir política explícita para entrada excedente, incompleta e caractere incompatível e DEVE distinguir resultado formatado de resultado estruturado com validade, posição de entrada, posição da máscara, grupos e motivo seguro. [PENDENTE-CODIGO]

Compilação DEVE produzir plano imutável, serializável quando seguro e independente de runtime; cache DEVE usar chave composta pela máscara normalizada, versão da gramática e opções semânticas, possuir limite/evicção e nunca crescer globalmente sem controle. [PENDENTE-CODIGO]

O compilador NÃO DEVE usar `eval`, `Function`, regex dinâmica não auditada nem recursão/alocação ilimitada; comprimento, profundidade, alternativas, grupos, quantificadores e saída DEVEM possuir limites publicados no manifesto e testes de abuso. [PENDENTE-CODIGO]

## 6. Números, matemática e arredondamento

A família numérica DEVE separar número IEEE 754, inteiro seguro, `bigint` e representação decimal quando suas faixas ou semânticas diferirem; conversão com perda NÃO DEVE ser silenciosa. [PENDENTE-CODIGO]

Função matemática DEVE declarar domínio, unidade angular, faixa, precisão, estabilidade e tratamento de `NaN`, infinidade, zero assinado e overflow quando aplicáveis. [PENDENTE-CODIGO]

Arredondamento DEVE declarar casas ou incremento, direção e estratégia de empate; `half-up`, `half-even`, truncamento, piso e teto NÃO DEVEM ser tratados como sinônimos. [PENDENTE-CODIGO]

Resultado decimal que exija exatidão financeira NÃO DEVE depender apenas de operações binárias IEEE 754 sem política explícita de escala e arredondamento. [PENDENTE-CODIGO]

Módulos, máximo divisor comum, mínimo múltiplo comum, combinatória, trigonometria e demais operações DEVEM validar domínio e evitar coerção não contratada. [PENDENTE-CODIGO]

## 7. Estatística e coleções numéricas

A família estatística DEVE distinguir população e amostra, declarar tratamento de conjunto vazio, dados ausentes, pesos, empates, ordenação e estabilidade numérica. [PENDENTE-CODIGO]

Agregações DEVEM aceitar somente valores cobertos pelo tipo e pela política de coerção; itens inválidos NÃO DEVEM ser descartados silenciosamente. [PENDENTE-CODIGO]

Média, mediana, moda, quantil, percentil, variância, desvio, correlação e regressão DEVEM documentar algoritmo ou propriedade observável suficiente para reproduzir resultados e tolerâncias. [PENDENTE-CODIGO]

Operação sobre iterable DEVE declarar se consome uma única passagem, materializa valores, preserva ordem e aceita sequência infinita; consumo ilimitado sem limite explícito é proibido. [PENDENTE-CODIGO]

## 8. Porcentagem, juros e finanças

A família financeira DEVE distinguir taxa em fração de taxa em pontos percentuais, período nominal de efetivo, juros simples de compostos e fluxo de entrada de fluxo de saída. [PENDENTE-CODIGO]

Valor monetário DEVE declarar unidade, escala, arredondamento e convenção de sinal; moeda NÃO DEVE ser inferida de locale nem representada como decoração sem contrato. [PENDENTE-CODIGO]

Valor presente, valor futuro, prestação, taxa, prazo, VPL, TIR e operações correlatas DEVEM declarar convenção temporal, posição do pagamento, tolerância, limites iterativos e condição de não convergência. [PENDENTE-CODIGO]

Resultado financeiro iterativo DEVE ser determinístico dentro da tolerância publicada e falhar de modo tipado ao não convergir; loop ilimitado ou retorno numérico enganoso é proibido. [PENDENTE-CODIGO]

## 9. Datas, horários e durações

Data civil, instante, horário local, fuso, duração e intervalo são conceitos distintos e NÃO DEVEM compartilhar representação ambígua na API pública. [PENDENTE-CODIGO]

Operação temporal DEVE declarar calendário, fuso, locale, unidade, inclusividade dos limites e política para horário inexistente ou duplicado por transição de fuso. [PENDENTE-CODIGO]

Parse DEVE exigir formato ou perfil aceito e rejeitar entrada parcialmente consumida; heurística dependente do runtime e interpretação automática ambígua de dia/mês são proibidas. [PENDENTE-CODIGO]

Formatação DEVE ser separada de cálculo e NÃO DEVE alterar o valor temporal; conversão de fuso DEVE preservar instante, enquanto substituição de fuso DEVE ser operação distinta. [PENDENTE-CODIGO]

Relógio atual e timezone default DEVEM entrar por parâmetro ou adaptador injetável para manter testes e resultados determinísticos. [PENDENTE-CODIGO]

## 10. Arrays, conjuntos, seleção e transformação

Operações de coleção DEVEM declarar preservação de ordem, estabilidade, igualdade usada, tratamento de buracos, duplicatas e mutabilidade. [PENDENTE-CODIGO]

União, interseção, diferença e unicidade DEVEM aceitar comparador ou seletor quando a igualdade padrão for insuficiente e NÃO DEVEM serializar objetos implicitamente como chave. [PENDENTE-CODIGO]

Ordenação DEVE ser estável, não mutante por padrão e determinística; comparador inválido, não transitivo ou dependente de estado DEVE ser tratado como violação contratual. [PENDENTE-CODIGO]

Agrupamento, indexação e associação DEVEM declarar comportamento diante de chave duplicada e proteger chaves especiais contra alteração de protótipo. [PENDENTE-CODIGO]

Seleção, paginação, janela, chunk, flatten e transformação DEVEM validar limites e profundidade, preservando o tipo mais específico que o contrato puder representar sem falsidade. [PENDENTE-CODIGO]

### 10.1 Operadores lógicos variádicos

O escopo `logic` DEVE disponibilizar operadores variádicos idiomáticos equivalentes a AND, OR e XOR, com quantidade arbitrária de operandos, retorno booleano e contratos separados para avaliação estrita, truthiness opt-in e retorno orientado a valor. [PENDENTE-CODIGO]

No perfil estrito, somente booleanos são válidos; `null`, `undefined` e qualquer outro tipo DEVEM falhar como entrada inválida, `all()` sem argumentos retorna `true`, `any()` sem argumentos retorna `false` e `xor()` sem argumentos retorna `false`. [PENDENTE-CODIGO]

`xor` variádico DEVE significar paridade ímpar de valores verdadeiros; a semântica “exatamente um” DEVE ser função distinta, para impedir ambiguidade quando três ou mais operandos forem verdadeiros. [PENDENTE-CODIGO]

O perfil truthiness DEVE ser selecionado explicitamente por função ou opção cujo nome o evidencie e aplicar exatamente `Boolean(value)` do ECMAScript homologado; ele NÃO DEVE contaminar defaults do perfil estrito. [PENDENTE-CODIGO]

Funções eager recebem valores já avaliados e PODEM interromper somente a inspeção interna; curto-circuito de avaliação DEVE usar variantes lazy com thunks tipados, invocados da esquerda para a direita e nunca após resultado conclusivo. [PENDENTE-CODIGO]

AND lazy PODE encerrar no primeiro falso e OR lazy no primeiro verdadeiro; XOR por paridade DEVE avaliar todos os operandos válidos, enquanto “exatamente um” PODE encerrar ao encontrar o segundo verdadeiro. [PENDENTE-CODIGO]

Variantes orientadas a valor DEVEM ser separadas das booleanas: `allValue` retorna o primeiro valor reprovado ou o último aprovado, `anyValue` retorna o primeiro aprovado ou o último reprovado e a variante de “exatamente um” DEVE retornar união discriminada que diferencie ausência, unicidade e multiplicidade; XOR de paridade NÃO DEVE retornar valor bruto ambíguo. [PENDENTE-CODIGO]

Nomes finais PODEM ser refinados no catálogo antes da implementação, mas semântica, namespace, imports, tipos e documentação DEVEM permanecer consistentes entre níveis e formatos. [PENDENTE-CODIGO]

## 11. Validação, formatação, codificação e conversão

Validador booleano DEVE retornar somente validade; função que precise explicar falhas DEVE oferecer resultado estruturado separado com código, caminho e mensagem segura. [PENDENTE-CODIGO]

O escopo `validation` DEVE fornecer validadores prontos para padrões comuns, validação por regex do consumidor, composição lógica e adaptadores para máscaras, documentos e predicados tipados, sem converter validação em coerção implícita. [PENDENTE-CODIGO]

Validador pronto DEVE declarar padrão, versão/fonte, normalização aceita, locale, limites e falsos pressupostos; regra regulatória ou externa mutável DEVE manter data de referência e vetores históricos. [PENDENTE-CODIGO]

Regex fornecida pelo consumidor DEVE ser clonada ou compilada sem mutar `lastIndex`, separar padrão de flags, rejeitar flag ou construção não homologada e distinguir perfil confiável de perfil não confiável. [PENDENTE-CODIGO]

Regex não confiável DEVE possuir limite de tamanho e complexidade, análise preventiva proporcional e execução em engine segura ou isolamento com timeout quando disponível; se o runtime não puder conter padrão potencialmente abusivo, a validação DEVE rejeitá-lo em vez de executá-lo sincronicamente sem limite. [PENDENTE-CODIGO]

Composição DEVE incluir equivalentes tipados a `allOf`, `anyOf`, `oneOf` e `not`, preservar ordem determinística, curto-circuito configurado e caminho do validador; composição cíclica ou profundidade acima do limite é inválida. [PENDENTE-CODIGO]

Cada validação DEVE possuir fachada booleana e, quando diagnóstico for material, resultado discriminado com `valid`, código, motivo seguro, posição/faixa, caminho e filhos; a fachada booleana DEVE derivar do mesmo núcleo sem executar a regra duas vezes. [PENDENTE-CODIGO]

Normalização NÃO DEVE ser confundida com validação: corrigir representação PODE preceder validação somente quando a transformação for explícita, reversível ou documentadamente lossy e coberta por teste. [PENDENTE-CODIGO]

Formatação de apresentação DEVE permanecer separada do valor canônico e declarar locale, símbolos, agrupamento, sinal e casas; saída formatada NÃO DEVE ser reutilizada como valor sem parse explícito. [PENDENTE-CODIGO]

Codificação e decodificação DEVEM declarar conjunto de caracteres, alfabeto, padding, normalização, tolerância e comportamento para sequência inválida; UTF-8 é o default textual quando o formato não impuser outro. [PENDENTE-CODIGO]

Conversão de unidade ou base DEVE declarar dimensão, fator, precisão e faixa e rejeitar combinações incompatíveis. [PENDENTE-CODIGO]

## 12. Planilhas e equivalências funcionais

Operação inspirada em planilha DEVE receber nome idiomático JS/TS e contrato independente, com matriz explícita de equivalência funcional e divergências relevantes. [PENDENTE-CODIGO]

Erros-célula, referência de célula, intervalo implícito e coerções de interface de planilha NÃO DEVEM vazar ao núcleo salvo capacidade especificamente normatizada. [PENDENTE-CODIGO]

Funções condicionais, de busca e de agregação DEVEM declarar igualdade, ordenação, correspondência aproximada, valor ausente e tratamento de matriz, sem reproduzir comportamento legado não intencional. [PENDENTE-CODIGO]

Compatibilidade alegada com Excel ou LibreOffice DEVE identificar versão/perfil avaliado, vetores comuns e divergências; sem essa evidência, a documentação DEVE usar apenas “equivalente funcional”. [PENDENTE-CODIGO]

## 13. Documentos e padrões brasileiros

A família brasileira DEVE separar limpeza, formatação, cálculo de dígito e validação estrutural; validação algorítmica NÃO comprova existência, titularidade, situação cadastral ou autenticidade documental. [PENDENTE-CODIGO]

CPF, CNPJ numérico atual, CNPJ alfanumérico quando vigente/aplicável, CEP, telefone/celular e conta-corrente DEVEM possuir contratos versionáveis com fonte pública da regra, data de referência, caracteres aceitos, máscara e limites. [PENDENTE-CODIGO]

Algoritmos de módulo 10 e módulo 11 DEVEM ser primitivas parametrizadas por pesos, direção, resto e mapeamento de dígito; CPF, CNPJ e outros documentos DEVEM compor essas primitivas sem duplicar lógica. [PENDENTE-CODIGO]

Conta-corrente e agência NÃO DEVEM ser validadas por regra universal inexistente; cada banco/perfil requer identificador e algoritmo comprovado, e perfil desconhecido DEVE falhar como não suportado. [PENDENTE-CODIGO]

Mudança regulatória DEVE atualizar fonte, data, vetores e versão compatível; suporte a padrão futuro NÃO DEVE alterar silenciosamente o contrato histórico. [PENDENTE-CODIGO]

## 14. Arquitetura, raízes e ambientes

TypeScript DEVE ser a fonte canônica do produto e JavaScript, declarações, maps, bundles e manifestos derivados DEVEM ser reproduzíveis a partir dela. [PENDENTE-CODIGO]

A raiz do repositório DEVE conter governança e documentação transversal; fontes do produto DEVEM residir em estrutura declarada, testes e fixtures em raízes próprias e artefatos publicados em saída gerada, sem expor configuração de desenvolvimento. [PENDENTE-CODIGO]

O núcleo DEVE ser agnóstico a DOM, Node.js, framework e ambiente; especialização necessária DEVE entrar por adaptador, subpath ou condição de exportação com consumidor comprovado. [PENDENTE-CODIGO]

Classes só PODEM representar estado, identidade, ciclo de vida ou estratégia substituível materialmente necessária; funções e composição DEVEM prevalecer quando reduzirem acoplamento, estado e custo de tree-shaking. [PENDENTE-CODIGO]

Estado global mutável, inicialização por import, detecção heurística de ambiente e dependência pública de path interno são proibidos. [PENDENTE-CODIGO]

Perfis previstos são `core`, `browser`, `worker`, `node`, `server`, `build` e `test`; cada entry point e build DEVE declarar os perfis incluídos e NÃO carregar código de outro ambiente sem necessidade. [PENDENTE-CODIGO]

## 15. API pública, tipos e erros

Cada export público DEVE constar no catálogo, possuir documentação TSDoc, tipo verificável, estabilidade e caminho de importação suportado; exportação acidental NÃO adquire estabilidade. [PENDENTE-CODIGO]

Exports de nível superior DEVEM ser união cumulativa verificável dos níveis inferiores do mesmo escopo, e os tipos de uma função compartilhada DEVEM possuir identidade estrutural e nominal compatível em todos os subpaths e bundles. [PENDENTE-CODIGO]

O pipeline DEVE rejeitar função presente em `advanced` e ausente em `basic` quando marcada como básica, símbolo duplicado com assinatura divergente, reexport circular, subpath sem tipos ou tipos que resolvam duas cópias incompatíveis da mesma identidade. [PENDENTE-CODIGO]

O `.d.ts` DEVE representar integralmente funções, overloads, generics, parâmetros, opções, retornos, falhas tipadas e deprecações e DEVE ser validado contra exports e implementação. [PENDENTE-CODIGO]

Se houver manifesto canônico separado, manifesto, `.d.ts` e exports reais DEVEM ter uma única autoridade derivável ou validação automática bidirecional; manutenção manual concorrente é proibida. [PENDENTE-CODIGO]

Falhas de contrato DEVEM usar códigos estáveis e mensagens seguras, sem segredo, dado pessoal, path local ou conteúdo integral da entrada; erro interno NÃO DEVE ser apresentado como resultado válido. [PENDENTE-CODIGO]

Predicados `is*` DEVEM retornar `false` para valor estruturalmente inválido dentro do domínio declarado e NÃO DEVEM ocultar erro de configuração, algoritmo ou dependência. [PENDENTE-CODIGO]

Depreciação DEVE indicar substituto, motivo, versão de início e versão mínima de remoção; remoção ou mudança incompatível exige versão major. [PENDENTE-CODIGO]

## 16. Precisão, locale, segurança e privacidade

Toda função sensível a precisão DEVE declarar modelo numérico, tolerância e arredondamento; teste aproximado DEVE usar tolerância explícita adequada à escala. [PENDENTE-CODIGO]

Locale, timezone, moeda, calendário, collation e relógio DEVEM ser entradas explícitas ou defaults canônicos documentados; configuração ambiental implícita não pode alterar semântica. [PENDENTE-CODIGO]

Entrada é não confiável: parse, regex, recursão, alocação e iteração DEVEM possuir limites proporcionais e evitar execução dinâmica, prototype pollution, negação de serviço e exposição de dados. [PENDENTE-CODIGO]

Expressão regular fornecida pelo consumidor DEVE ser distinguida de padrão interno; padrão interno vulnerável a backtracking catastrófico bloqueia publicação. [PENDENTE-CODIGO]

Função pura NÃO DEVE emitir telemetria; adaptador que observe execução DEVE ser opt-in, não alterar resultado e aplicar minimização e redação de dados. [PENDENTE-CODIGO]

## 17. ECMAScript, build e otimização

Cada build DEVE resolver `TARGET_ECMA = edição ECMAScript publicada mais recente - 2 anos`, usando ano civil UTC e uma tabela versionada de edições publicadas; a edição ainda não publicada NÃO integra o cálculo. [PENDENTE-CODIGO]

Compilador TypeScript, `lib`, transpilador, bundler e demais etapas dependentes DEVEM usar o mesmo target resolvido e registrar ano, fórmula, tabela e valor efetivo em metadado determinístico. [PENDENTE-CODIGO]

Toolchain que não reconheça o target calculado DEVE falhar explicitamente, sem downgrade, substituição por `latest` ou ajuste silencioso. [PENDENTE-CODIGO]

Build DEVE declarar consumidor, runtime, formato, entry point, tipos, externalizações, carregamento, compatibilidade, minificação, source map e estabilidade; formato sem consumidor ou validação é proibido. [PENDENTE-CODIGO]

Otimização DEVE preservar comportamento, nomes públicos, tipos, maps e licença e favorecer tree-shaking, eliminação de código morto, deduplicação e ausência de dependência acidental; `sideEffects` DEVE refletir efeitos reais por arquivo. [PENDENTE-CODIGO]

Artefatos relevantes DEVEM medir tamanho bruto, minificado, gzip e Brotli de modo reproduzível; budget só PODE ser fixado após baseline real aprovado e alterado com causa, quantificação e decisão explícita. [PENDENTE-CODIGO]

A matriz de transpilação DEVE cruzar escopo, nível, combinação, formato e target a partir de um grafo canônico único; duas células equivalentes NÃO DEVEM recompilar sem necessidade nem produzir conteúdo semanticamente divergente. [PENDENTE-CODIGO]

O target primário DEVE obedecer à fórmula ECMAScript dinâmica deste RCF; target adicional só PODE existir para consumidor comprovado, DEVE ser nomeado e manifestado e NÃO PODE rebaixar silenciosamente o target primário nem introduzir API/polyfill ausente nos demais builds. [PENDENTE-CODIGO]

Cada artefato por escopo/nível DEVE preservar tree-shaking, `.d.ts`, sourcemap, banner, hash e vínculo à fonte; bundle combinado e completo DEVEM reutilizar chunks sem importar escopo alheio ao conjunto declarado. [PENDENTE-CODIGO]

## 18. Distribuição, consumo e versionamento

FormulaKit DEVE ser distribuído por npm e GitHub Release com seleção equivalente e verificável de fontes TypeScript consumíveis, JavaScript executável, `.d.ts`, source maps apropriados, licença, metadados e manifestos. [PENDENTE-CODIGO]

O GitHub Release DEVE disponibilizar, conforme a matriz aplicável e sem artefato redundante, builds individuais por escopo/nível, bundles combinados por perfil de consumidor, bundle completo e formatos/targets homologados, inclusive `.js`, `.mjs` e `.cjs` quando seus módulos correspondentes forem materialmente distintos e testados. [PENDENTE-CODIGO]

Bundle combinado DEVE declarar lista ordenada de escopos e nível escolhido em cada um; bundle completo DEVE conter exatamente o maior nível estável de todos os escopos públicos, sem capacidades experimentais implícitas. [PENDENTE-CODIGO]

Diretórios PODEM organizar artefatos por escopo, nível, formato e target quando aumentarem clareza, mas path físico NÃO DEVE vazar como import público nem quebrar subpath estável; manifesto é a autoridade da projeção path→identidade. [PENDENTE-CODIGO]

O npm DEVE expor por `exports`/subpaths toda granularidade homologada, incluindo escopo raiz e nível, com condições e tipos correspondentes, permitindo consumir somente o necessário sem carregar inicialização ou código de escopo alheio. [PENDENTE-CODIGO]

O manifesto DEVE enumerar inclusões cumulativas, arquivos, hashes, tamanhos, entry points, formatos, targets, condições, tipos e sourcemaps de cada artefato e provar que npm e Release representam a mesma identidade funcional. [PENDENTE-CODIGO]

ESM, CommonJS, `.mjs`, `.cjs`, subpaths granulares, browser, Node e bundle otimizado PODEM integrar a distribuição somente quando consumidor, runtime e valor material forem comprovados; extensões redundantes que representem o mesmo formato sem necessidade são proibidas. [PENDENTE-CODIGO]

O pacote e o Release DEVEM permitir consumo sem toolchain de desenvolvimento, sem path interno e sem importar runtime, função ou dependência não utilizada; instalação a partir de tarball local em projeto externo limpo integra o aceite. [PENDENTE-CODIGO]

`exports`, `types`, arquivos publicados e entry points DEVEM ser allowlist positiva e impedir acesso acidental a fonte interna, testes, fixtures, cache, segredos e configuração do construtor. [PENDENTE-CODIGO]

O projeto DEVE usar SemVer: mudança incompatível de assinatura, tipo, coerção, resultado, erro, precisão, default, ordenação ou export é major; adição compatível é minor; correção preservadora é patch. [PENDENTE-CODIGO]

Nome definitivo do pacote npm e política de artefatos globais permanecem decisões humanas anteriores à primeira publicação; nenhum nome ou global é reservado por inferência. [PENDENTE-CODIGO]

## 19. Dependências e cadeia de suprimentos

Recursos nativos adequados DEVEM ser preferidos e dependência só PODE ser adicionada por capacidade material, manutenção sustentável e custo total inferior à solução local segura. [PENDENTE-CODIGO]

Dependência DEVE estar na categoria correspondente ao uso real; runtime, dev, peer e opcional NÃO são intercambiáveis. [PENDENTE-CODIGO]

Lockfile, licença, origem, integridade, proveniência, vulnerabilidades e scripts de instalação DEVEM ser auditáveis; build NÃO DEVE depender de recurso remoto não fixado. [PENDENTE-CODIGO]

Segredo, credencial, token, dado pessoal ou configuração privada NÃO DEVE integrar fonte, map, pacote, log, fixture, manifesto ou Release. [PENDENTE-CODIGO]

Atualização de dependência DEVE comprovar compatibilidade, diff de cadeia, testes e efeito em tamanho; alerta sem exploração aplicável NÃO autoriza mudança regressiva nem dispensa registro. [PENDENTE-CODIGO]

## 20. Testes, CI, observabilidade e aceite

Cada função pública DEVE possuir testes unitários, vetores de borda e regressão que cubram tipos, coerção, limites, Unicode, locale, nulos, `NaN`, infinidade, precisão, arredondamento, mutabilidade, determinismo e erros conforme aplicabilidade. [PENDENTE-CODIGO]

Validação DEVE comparar TypeScript, JavaScript e todos os formatos publicados, incluindo exports, `.d.ts`, browser real, worker quando suportado, Node, client/server, tree-shaking, importação granular, tamanhos, build reproduzível e consumo externo. [PENDENTE-CODIGO]

Testes de distribuição DEVEM verificar para cada escopo `basic ⊆ advanced ⊆ specialized` quando aplicável, equivalência do escopo raiz, ausência de escopos alheios no bundle, paridade de tipos e resultados entre build individual, combinado e completo. [PENDENTE-CODIGO]

Máscaras DEVEM possuir vetores de gramática, precedência, literal, classe, opcional, repetição, grupo, alternativa, prefixo/sufixo, preenchimento, transformação, diagnóstico, cache, limites e entradas adversariais. [PENDENTE-CODIGO]

Validadores DEVEM testar padrões prontos, regex confiável/não confiável, composição, posição/motivo, curto-circuito e contenção de abuso; teste de segurança que dependa de isolamento inexistente DEVE bloquear a capacidade correspondente. [PENDENTE-CODIGO]

Operadores lógicos DEVEM testar aridade zero e arbitrária, estrito, truthiness, paridade XOR, exatamente um, valores orientados, `null`, `undefined`, tipo inválido e ordem/curto-circuito eager/lazy. [PENDENTE-CODIGO]

`npm test` DEVE orquestrar conjuntos determinísticos com mocks e fixtures locais; integração externa real DEVE ser opt-in e sua falha só PODE afetar o aceite quando demonstrar causa no produto. [PENDENTE-CODIGO]

Execução local e CI DEVEM preservar severidade, caso, duração e erro em estrutura estável; cor e animação são permitidas localmente, mas DEVEM ser desativadas em CI e nunca substituir dados parseáveis. [PENDENTE-CODIGO]

Workflow DEVE executar quando runtime, teste, fixture, manifesto, dependência, configuração lógica ou próprio workflow mudar; alteração exclusivamente documental NÃO DEVE disparar matriz técnica, e `workflow_dispatch` DEVE permitir execução manual. [PENDENTE-CODIGO]

Observabilidade de build DEVE registrar versões de runtime/toolchain, target ECMAScript, duração, contagem de testes, tamanhos e hashes sem segredos; métrica projetada DEVE ser distinguida de medição observada. [PENDENTE-CODIGO]

Teste não executado NÃO DEVE ser declarado aprovado; publicação exige todas as validações obrigatórias executadas no artefato efetivamente distribuído. [PENDENTE-CODIGO]

## 21. Documentação, licença e rastreabilidade

README, referência da API, exemplos, manifesto e changelog DEVEM acompanhar a superfície real e diferenciar `stable`, `experimental`, `deprecated`, `planned` e `unavailable`. [PENDENTE-CODIGO]

Documentação de função DEVE explicar finalidade, parâmetros, retorno, efeitos, falhas, precisão, locale, mutabilidade, complexidade ou restrição relevante e incluir exemplo mínimo quando reduzir ambiguidade. [PENDENTE-CODIGO]

Fonte humana editável e artefato comentável DEVEM manter cabeçalho conforme `./AGENTS.md` e `./.ia.rules/resources/traceability.md`; build minificado DEVE preservar banner ultrassucinto. [PENDENTE-CODIGO]

Licença do projeto: Mozilla Public License 2.0, conforme `./LICENSE`. Autor comprovado: JeanCarloEM. Repositório comprovado: `https://github.com/jcempro/FormulaKit`. Site comprovado: `https://jeancarloem.com`.

Sentenças implementáveis usam `[PENDENTE-CODIGO]` até a FT técnica produzir commit causal; a sincronização futura DEVE substituir somente marcadores materializados pelo hash abreviado validado e manter mapa bidirecional sentença→FT→artefato→commit. [PENDENTE-CODIGO]

## 22. Decisões e ordem de implementação

Antes da implementação material, decisão humana DEVE aprovar o nome do pacote npm, o catálogo mínimo da primeira versão e os formatos de distribuição que possuam consumidor comprovado. [PENDENTE-CODIGO]

A implementação DEVE seguir: decisões e catálogo → schemas/manifesto → escopos/níveis → primitivas → famílias priorizadas → máscaras/validação/lógica → API/exports/tipos → builds granulares/combinados/completo → testes multiformato → baseline/budgets → tarball consumidor → CI → publicação autorizada → sincronização causal. [PENDENTE-CODIGO]

Prioridade inicial DEVERIA favorecer contratos transversais e famílias com maior reutilização — texto, números, coleções, datas, validação e dígitos — antes de expandir a cobertura financeira ou equivalências extensas de planilhas. [PENDENTE-CODIGO]

A FT-002 permanece pendente e NÃO é autorizada por este RCF; criação de código, instalação de dependência, build, workflow, pacote ou publicação exige nova solicitação humana explícita após a conclusão normativa.
