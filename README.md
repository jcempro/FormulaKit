# FormulaKit

Biblioteca TypeScript universal de funções utilitárias, granular por escopo e nível, para navegador, Node.js e runtimes ECMAScript compatíveis.

[![Status](https://img.shields.io/badge/status-implementado-success)](./RCF.md)
[![Licença](https://img.shields.io/badge/licen%C3%A7a-MPL--2.0-blue)](./LICENSE)

## Uso

A versão `0.1.0` está publicada no npm. Instale com:

```sh
npm install @jeancarloem/formulakit
```

```ts
import { clamp } from "@jeancarloem/formulakit/math/basic";
import { factorial } from "@jeancarloem/formulakit/math/advanced";
import { and, orValue } from "@jeancarloem/formulakit/logic";
import { applyMask } from "@jeancarloem/formulakit/text";

clamp(15, 0, 10); // 10
factorial(5); // 120
and(true, true, false); // false
orValue(undefined, "resultado"); // "resultado"
applyMask("12345678901", "###.###.###-##");
```

O pacote oferece ESM e CommonJS com os mesmos exports e tipos. O entry point raiz retorna os namespaces dos 11 escopos; imports granulares evitam carregar escopos alheios.

## Escopos e níveis

Os escopos disponíveis são `math`, `logic`, `text`, `statistics`, `finance`, `datetime`, `collections`, `validation`, `conversion`, `spreadsheet` e `br`.

- `basic`: subconjunto essencial;
- `advanced`: contém integralmente `basic` e acrescenta operações avançadas;
- subpath sem nível, como `@jeancarloem/formulakit/math`: alias de `advanced`.

Exemplo de cumulatividade:

```ts
import { add } from "@jeancarloem/formulakit/math/basic";
import { add as sameAdd, factorial } from "@jeancarloem/formulakit/math/advanced";
```

Bundles combinados `core`, `data` e `business`, bundle completo, builds individuais e fontes TypeScript consumíveis são gerados em `dist/`. A matriz produz `.js`, `.mjs`, `.cjs`, `.d.ts` e sourcemaps quando aplicáveis, usando target ES2024, calculado pela política normativa de dois anos antes da edição ECMAScript publicada mais recente registrada.

## Máscaras declarativas

O compilador de máscaras é limitado, cacheável e não avalia código. A sintaxe compacta inclui:

| Sintaxe                  | Significado                                      |
| ------------------------ | ------------------------------------------------ |
| `#`, `A`, `X`, `@`       | dígito, letra, alfanumérico e qualquer caractere |
| `?`, `+`, `{n}`, `{n,m}` | opcional e repetições                            |
| `(…)`, `\|`              | grupo e alternativas ordenadas                   |
| `>`, `<`                 | transformação para maiúsculas e minúsculas       |
| `~c{n}`                  | preenchimento com o caractere `c`                |
| `\c`                     | literal escapado                                 |

`compileMask` permite reutilizar a máscara compilada; `applyMask` oferece o caminho direto. Limites de entrada, saída, profundidade e estados protegem contra execução abusiva.

## Validação e lógica

O escopo `validation` inclui validadores de e-mail, UUID, IPv4, URL HTTP(S), Luhn e comprimento, além de regex fornecida pelo consumidor, composição `allOf`/`anyOf`/`oneOf`/`notRule`, retorno booleano e diagnóstico com motivo/posição. Regex potencialmente abusiva é rejeitada por padrão.

O escopo `logic` separa variantes estritas (`and`, `or`, `xor`), truthy (`andTruthy`, `orTruthy`, `xorTruthy`), orientadas a valor (`andValue`, `orValue`, `exactlyOneValue`) e lazy (`lazyAnd`, `lazyOr`, `lazyXor`). Assim, coerção e curto-circuito nunca ficam implícitos.

## Assinatura de cada artefato

Cada arquivo de código, tipo ou fonte consumível gerado incorpora um bloco `FormulaKitSignature/v1` exclusivo da própria superfície. A assinatura ultracompacta omite nomes dispensáveis de parâmetros e contém somente identidade, exports, tipos estruturais indispensáveis e hash canônico. `dist/manifest.json` associa cada artefato ao SHA-256 de seus bytes, tamanho, formato, target e assinatura.

Builds de navegador registram apenas a própria assinatura em `globalThis.FormulaKit.manifests`. A consulta retorna snapshots ordenados, de protótipo nulo e profundamente congelados; registros anteriores não são substituídos e qualquer colisão de identidade falha antes de alterar o conjunto.

```js
await import("@jeancarloem/formulakit/browser");
const manifests = globalThis.FormulaKit.manifests;
Object.keys(manifests); // identidades em ordem determinística
Object.isFrozen(manifests); // true
```

## Desenvolvimento e verificação

```sh
npm ci --ignore-scripts
npm run check
npm pack --dry-run
```

`npm run check` compila, testa funções e distribuição, verifica equivalência das assinaturas e gera a medição determinística de tamanhos. Qualquer divergência entre fonte, `.d.ts`, exports, assinatura embutida, registro do navegador ou manifesto superior invalida o gate.

## Release

A primeira publicação de `@jeancarloem/formulakit` no npm é manual. Depois dela, o Trusted Publisher do npm deve apontar para a organização `jcempro`, repositório `FormulaKit` e workflow `release.yml` (nome visível: `Release do pacote FormulaKit`), sem environment.

Somente após esse vínculo, `npm run release:trigger -- 0.1.0` cria o arquivo-gatilho `release`. O workflow valida e empacota uma única vez, publica ou confirma bytes idênticos no npm, cria o GitHub Release `v0.1.0`, remove o gatilho e converge `dev` em `main`.

A primeira publicação foi concluída: [pacote npm](https://www.npmjs.com/package/@jeancarloem/formulakit) e [GitHub Release v0.1.0](https://github.com/jcempro/FormulaKit/releases/tag/v0.1.0).

- [Referência da API](./docs/API.md)
- [RCF](./RCF.md): contratos normativos e critérios de aceite.
- [AGENTS.md](./AGENTS.md): processo e precedência operacional.
- [handoff.md](./handoff.md): estado operacional derivado.

## Autoria e licença

- JeanCarloEM — [https://jeancarloem.com](https://www.jeancarloem.com)
- Repositório: [jcempro/FormulaKit](https://github.com/jcempro/FormulaKit)
- [Mozilla Public License 2.0](./LICENSE) — uso, cópia, modificação e distribuição conforme seus termos.
