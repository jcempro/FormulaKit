# Contexto-mestre — FT-002

## Identidade e objetivo

- Fonte principal: `TODO.ia.md`, SHA-256 `6a5d8097a69e7d86f8b38706b50710c309ea68faa534650d885d96b66745e0b7`.
- Ampliações: solicitações preservadas nas FTs 003 e 004.
- Objetivo: implementar a biblioteca universal FormulaKit, sua distribuição progressiva por escopo/nível e a assinatura pública exclusiva de cada artefato.

## Arquitetura materializada

1. Onze escopos públicos usam `basic ⊆ advanced`, com raiz equivalente a `advanced` e 167 funções nos níveis avançados agregados.
2. A matriz ES2024 gera ESM `.js`/`.mjs`, CommonJS `.cjs`, navegador, tipos, fontes assinadas, sourcemaps, três combinações e bundle completo.
3. `FormulaKitSignature/v1` deriva do `.d.ts` canônico, omite nomes de parâmetros e preserva tipos customizados em representação estrutural compacta.
4. Todo arquivo publicável de código/tipo/fonte possui assinatura; sourcemaps e metadados auxiliares possuem superfície vazia e vínculo inventariado.
5. `globalThis.FormulaKit.manifests` expõe snapshots ordenados, sem protótipo e profundamente congelados, preserva registros e rejeita colisões.
6. Máscaras, validação segura, lógica variádica, matemática, estatística, finanças, datas, coleções, conversões, planilhas e padrões brasileiros integram o catálogo inicial.

## Evidências de aceite

- `npm run check`: 12/12 testes, 524 artefatos verificados e 185 medições reproduzidas.
- RCF: `agent:rcf` e mapa causal aprovados com 162/162 sentenças materiais.
- Tarball: dry-run com 529 arquivos e 962598 bytes, sem `src/` bruto nem `release.json` de governança.
- Consumidor externo limpo: imports ESM e CommonJS, bundles combinados, tipos TypeScript e 299 arquivos de código assinados aprovados.
- Navegador real: dois artefatos coexistiram, registraram identidades ordenadas e produziram coleção/valores congelados.
- Cadeia: somente `esbuild` e TypeScript como dependências de desenvolvimento, lockfile fixado e auditoria npm sem vulnerabilidade observada.

## Limites e gates preservados

- Publicação remota no npm/GitHub Release não foi executada: é uma operação separada de release, condicionada a credenciais, ambiente, identidade npm ratificada e aceite externo.
- `agent:verify` não foi declarado aprovado: após `TYPECHECK_OK`, o runtime gerenciado exige `src/.ia.rules/distribution/source-manifest.json`, contrato próprio do construtor da Norma que passaria a reconstruir `dist` como payload de governança, não como FormulaKit. O gate foi registrado sem adaptar ou alterar a Norma gerenciada.
- O item `equalizer` permanece perene, intacto e não concluído conforme sua própria regra.

## Estado

- FT-002: concluída tecnicamente em `dev`.
- Commits materiais: `8c89028`, `5d361b0`; sincronizações causais: `e9cce3c`, `946a88a`.
