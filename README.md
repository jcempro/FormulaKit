# FormulaKit

Biblioteca TypeScript universal de funções utilitárias para client-side e server-side, atualmente em fase normativa.

[![Status](https://img.shields.io/badge/status-normatizado-blue)](./RCF.md)
[![Licença](https://img.shields.io/badge/licen%C3%A7a-MPL--2.0-blue)](./LICENSE)

- [RCF.md](./RCF.md): normas, contratos e requisitos do produto.
- [AGENTS.md](./AGENTS.md): processo, precedência e atuação da IA.
- [handoff.md](./handoff.md): implementação planejada e estado operacional derivado.

Catálogo, código, testes, builds e pacotes ainda não foram implementados.

## Distribuição planejada

Cada família será um escopo importável — como matemática, lógica, texto, validação, datas, finanças e conversões — com identidade comum entre imports, tipos e bundles.

- `basic`: núcleo essencial do escopo;
- `advanced`: inclui integralmente `basic` e acrescenta funções avançadas;
- `specialized`: terceiro nível opcional, somente com justificativa objetiva;
- escopo pequeno: nível único `basic`.

O plano prevê subpaths npm por escopo/nível e, no GitHub Release, builds individuais, combinações declaradas e bundle completo nos formatos/targets homologados. Essas distribuições ainda não estão disponíveis.

## Autoria e licença

- JeanCarloEM — [site](https://jeancarloem.com) — [e-mail](mailto:jeancarlo@jeancarloem.com)
- Repositório: [jcempro/FormulaKit](https://github.com/jcempro/FormulaKit)
- [Mozilla Public License 2.0](./LICENSE) — uso, cópia, modificação e distribuição conforme seus termos.
