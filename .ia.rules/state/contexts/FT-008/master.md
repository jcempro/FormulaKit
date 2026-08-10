# FT-008 — Histórico público de chaves de procedência

## Objetivo

Normatizar como consumidores verificam a procedência de artefatos FormulaKit sem exigir que incorporem a lista de todos os releases: uma âncora de confiança conhecida valida um histórico público, assinado, versionado e append-only de `keyId` e chaves públicas.

## Decisões registradas

- Localização pública canônica futura: `https://raw.githubusercontent.com/jcempro/FormulaKit/main/provenance/keys/v1.json`; ela é independente do site de publicação e aponta diretamente ao conteúdo bruto da branch primária do repositório.
- O mesmo conteúdo canônico será espelhado em subpath público do pacote, asset do GitHub Release e tag/repositório; URL, npm, GitHub e cache local são vias de descoberta, nunca fontes únicas de confiança.
- A verificação parte de uma chave pública de confiança pré-fixada ou obtida por canal independente autenticado; o documento remoto não cria a própria confiança.
- Cada registro inclui `keyId`, algoritmo, chave pública, intervalo de validade, primeiro/último release aplicável, estado e vínculos de rotação/revogação. A introdução de chave sucessora deve ser assinada ou coassinada por chave anteriormente confiada, formando cadeia verificável.
- O consumidor da versão atual consulta apenas o histórico necessário, valida versão de schema, assinatura, continuidade append-only, cadeia de rotação e política anti-downgrade; não deve embutir todos os releases anteriores.
- Chave privada não integra repositório, pacote, Release, manifesto, log, fixture ou endpoint. Sua guarda e injeção pertencem à FT-009 e devem usar segredo externo autorizado.

## Escopo da fase atual

Criar e conciliar as FTs, preservar a solicitação e entregar uma instrução para a IA consumidora. Alterar RCF, workflow, release, pacote, endpoint, assinatura ou código depende da sequência normativa e autorização explícita posterior.

## Aceite da transição

FT-008 definirá o contrato completo e somente então FT-009 poderá ser autorizada para materializá-lo. A instrução entregue deve indicar a localização canônica futura em bloco de script e declarar explicitamente que ela não é a única forma de obter `keyId` ou chave pública.
