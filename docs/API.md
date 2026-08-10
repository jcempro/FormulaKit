# API pública

A API estável inicial do FormulaKit é organizada em 11 escopos. Em cada escopo, `advanced` contém integralmente `basic`; o subpath do escopo sem nível é um alias tipado de `advanced`.

| Escopo | Exports em `advanced` | Responsabilidade |
| --- | ---: | --- |
| `math` | 30 | aritmética, arredondamento e combinatória |
| `logic` | 14 | lógica estrita, truthy, orientada a valor e lazy |
| `text` | 23 | texto, Unicode, HTML e máscaras declarativas |
| `statistics` | 12 | estatística descritiva, correlação e quantis |
| `finance` | 12 | juros, fluxos, taxas e amortização |
| `datetime` | 12 | datas, intervalos, duração e formatação explícita |
| `collections` | 15 | seleção, agrupamento, conjuntos e sequências |
| `validation` | 14 | validadores, regex segura, diagnóstico e composição |
| `conversion` | 12 | números, bases, bytes, temperaturas e ângulos |
| `spreadsheet` | 10 | equivalentes funcionais comuns de planilha |
| `br` | 13 | CPF, CNPJ alfanumérico, CEP, telefone e dígitos |

Os nomes, overloads, argumentos posicionais, retornos e tipos efetivos não são duplicados manualmente nesta página: cada arquivo publicado contém sua própria `FormulaKitSignature/v1`, gerada a partir do `.d.ts` canônico e validada contra os exports executáveis. O inventário superior está em `dist/manifest.json` e associa cada arquivo a assinatura, SHA-256, tamanho, target e identidade.

## Imports

```ts
import { clamp } from "@jeancarloem/formulakit/math/basic";
import { factorial } from "@jeancarloem/formulakit/math/advanced";
import { compileMask } from "@jeancarloem/formulakit/text";
import { regex, validate } from "@jeancarloem/formulakit/validation";
```

Os mesmos subpaths resolvem ESM (`.mjs`), CommonJS (`.cjs`) e tipos (`.d.ts`). Fontes TypeScript assinados são distribuídos em `dist/source/` e expostos pelo subpath `@jeancarloem/formulakit/source/*`; não há exposição de fontes brutos de desenvolvimento.

## Estabilidade

Todos os exports desta versão são `stable`. Não há export público `experimental`, `deprecated`, `planned` ou `unavailable`. A presença de arquivo interno no repositório ou no tarball não cria API pública: somente os subpaths de `package.json` e os manifestos derivados constituem superfície suportada.
