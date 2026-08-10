# Contexto-mestre — FT-004

## Identidade e objetivo

- Fonte: `.ia.rules/state/requests/FT-004/request.md`, SHA-256 `db7758b17380a4a04fccbf27ae515babc568a2248b9309057848b7c4c3b348b6`.
- Objetivo: normatizar uma assinatura pública ultracompacta por artefato e seu registro global seguro no navegador, integrando-a à distribuição já planejada.
- Relação: FT-004 especializa a distribuição definida pelas FTs 001 e 003 e amplia a FT-002, cuja implementação foi expressamente autorizada no mesmo prompt.

## Equalização e arquitetura

1. Cada arquivo distribuído terá identidade de artefato e assinatura exclusiva correspondente exatamente à sua superfície efetiva.
2. A assinatura será derivada do contrato tipado canônico, estrutural e mínima, sem documentação duplicada.
3. Builds de navegador comporão uma consulta global compartilhada, somente leitura, sem sobrescrever registros nem depender da ordem de carga.
4. Colisão ou divergência entre fonte, tipos, exportações, assinatura e registro será erro bloqueante.
5. O mecanismo será integrado ao build e aos entry points sem criar estado global mutável de negócio.
6. `h` assina a forma canônica da superfície sem o próprio campo; o manifesto superior assina os bytes do arquivo, evitando autorreferência criptográfica.

## Ordem e integração

Executar captura/FT → RCF/README → validação normativa → commit → FT-002 técnica → commits materiais → sincronização causal → integração final.

## Restrições e fora de escopo

- Preservar integralmente os contratos vigentes e o item `equalizer` perene.
- Não alterar a Norma Operacional gerenciada.
- Não publicar npm/GitHub Release real sem credenciais e aceite externo comprovável; construir e validar localmente todos os artefatos publicáveis.
- Não expor API mutável no namespace global nem incluir descrições, exemplos ou nomes dispensáveis na assinatura compacta.

## Estado e aceite

- Estado: FT-004 concluída no commit `ce1f473`; FT-002 em andamento sob autorização humana expressa.
- Aceite global: rastreabilidade completa da fonte ao RCF, implementação e artefatos; composição determinística e imutável; equivalência automatizada entre assinatura, registro, `.d.ts`, exports e código; build/release invalidado em divergência.
