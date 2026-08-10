# API pública do FormulaKit

> Arquivo gerado automaticamente. Não edite manualmente. Fonte: comentários TSDoc em `src/`.

Versão documentada: `0.1.0`. Declarações próprias documentadas: 166. Os níveis `advanced` também reexportam integralmente `basic`.

## math

Níveis cumulativos: `basic ⊆ advanced`.

Exports de `basic` (19): `abs`, `add`, `average`, `ceil`, `clamp`, `divide`, `floor`, `gcd`, `lcm`, `max`, `min`, `mod`, `multiply`, `percentage`, `percentOf`, `round`, `sign`, `subtract`, `sum`.

Exports de `advanced` (30): `abs`, `add`, `approximatelyEqual`, `average`, `cbrt`, `ceil`, `clamp`, `combinations`, `divide`, `factorial`, `floor`, `gcd`, `lcm`, `lerp`, `max`, `min`, `mod`, `multiply`, `normalizeRange`, `percentage`, `percentOf`, `permutations`, `power`, `round`, `sign`, `sqrt`, `subtract`, `sum`, `toDegrees`, `toRadians`.

### `abs`

Retorna o valor absoluto.

```ts
abs(value: number): number
```

Parâmetros:

- `value`: Valor de entrada.

Retorno: O valor absoluto.


### `add`

Soma dois números finitos.

```ts
add(left: number, right: number): number
```

Parâmetros:

- `left`: Operando ou coleção à esquerda.
- `right`: Operando ou coleção à direita.

Retorno: Resultado correspondente à finalidade documentada: soma dois números finitos.


### `average`

Calcula média aritmética e rejeita coleção vazia.

```ts
average(values: readonly number[]): number
```

Parâmetros:

- `values`: Valores de entrada, preservados na ordem fornecida.

Retorno: Resultado correspondente à finalidade documentada: calcula média aritmética e rejeita coleção vazia.

Falhas:

- Quando a entrada viola o contrato da operação (`RangeError`).


### `ceil`

Arredonda para cima.

```ts
ceil(value: number): number
```

Parâmetros:

- `value`: Valor de entrada.

Retorno: Resultado correspondente à finalidade documentada: arredonda para cima.


### `clamp`

Limita um número ao intervalo fechado.

```ts
clamp(value: number, minimum: number, maximum: number): number
```

Parâmetros:

- `value`: Valor de entrada.
- `minimum`: Limite inferior inclusivo.
- `maximum`: Limite superior inclusivo.

Retorno: Resultado correspondente à finalidade documentada: limita um número ao intervalo fechado.

Falhas:

- Quando a entrada viola o contrato da operação (`RangeError`).

Exemplo:

```ts
clamp(15, 0, 10); // 10
```

### `divide`

Divide números finitos e rejeita divisor zero.

```ts
divide(dividend: number, divisor: number): number
```

Parâmetros:

- `dividend`: Número que será dividido.
- `divisor`: Divisor finito da operação.

Retorno: Resultado correspondente à finalidade documentada: divide números finitos e rejeita divisor zero.

Falhas:

- Quando a entrada viola o contrato da operação (`RangeError`).


### `floor`

Arredonda para baixo.

```ts
floor(value: number): number
```

Parâmetros:

- `value`: Valor de entrada.

Retorno: Resultado correspondente à finalidade documentada: arredonda para baixo.


### `gcd`

Calcula o máximo divisor comum de inteiros seguros.

```ts
gcd(left: number, right: number): number
```

Parâmetros:

- `left`: Operando ou coleção à esquerda.
- `right`: Operando ou coleção à direita.

Retorno: Resultado correspondente à finalidade documentada: calcula o máximo divisor comum de inteiros seguros.


### `lcm`

Calcula o mínimo múltiplo comum de inteiros seguros.

```ts
lcm(left: number, right: number): number
```

Parâmetros:

- `left`: Operando ou coleção à esquerda.
- `right`: Operando ou coleção à direita.

Retorno: Resultado correspondente à finalidade documentada: calcula o mínimo múltiplo comum de inteiros seguros.


### `max`

Retorna o maior número finito.

```ts
max(values: readonly number[]): number
```

Parâmetros:

- `values`: Valores de entrada, preservados na ordem fornecida.

Retorno: O maior número finito.

Falhas:

- Quando a entrada viola o contrato da operação (`RangeError`).


### `min`

Retorna o menor número finito.

```ts
min(values: readonly number[]): number
```

Parâmetros:

- `values`: Valores de entrada, preservados na ordem fornecida.

Retorno: O menor número finito.

Falhas:

- Quando a entrada viola o contrato da operação (`RangeError`).


### `mod`

Calcula módulo matemático não negativo para divisor positivo.

```ts
mod(value: number, divisor: number): number
```

Parâmetros:

- `value`: Valor de entrada.
- `divisor`: Divisor finito da operação.

Retorno: Resultado correspondente à finalidade documentada: calcula módulo matemático não negativo para divisor positivo.

Falhas:

- Quando a entrada viola o contrato da operação (`RangeError`).


### `multiply`

Multiplica dois números finitos.

```ts
multiply(left: number, right: number): number
```

Parâmetros:

- `left`: Operando ou coleção à esquerda.
- `right`: Operando ou coleção à direita.

Retorno: Resultado correspondente à finalidade documentada: multiplica dois números finitos.


### `percentage`

Calcula qual porcentagem uma parte representa do total.

```ts
percentage(part: number, total: number): number
```

Parâmetros:

- `part`: Parcela do total.
- `total`: Valor total da operação.

Retorno: Resultado correspondente à finalidade documentada: calcula qual porcentagem uma parte representa do total.


### `percentOf`

Calcula uma porcentagem de um total.

```ts
percentOf(percentage: number, total: number): number
```

Parâmetros:

- `percentage`: Percentual em pontos percentuais.
- `total`: Valor total da operação.

Retorno: Resultado correspondente à finalidade documentada: calcula uma porcentagem de um total.


### `round`

Arredonda com quantidade decimal explícita e faixa segura.

```ts
round(value: number, digits?: number): number
```

Parâmetros:

- `value`: Valor de entrada.
- `digits`: Quantidade de casas ou dígitos permitida.

Retorno: Resultado correspondente à finalidade documentada: arredonda com quantidade decimal explícita e faixa segura.


### `sign`

Retorna o sinal -1, 0 ou 1.

```ts
sign(value: number): 0 | 1 | -1
```

Parâmetros:

- `value`: Valor de entrada.

Retorno: O sinal -1, 0 ou 1.


### `subtract`

Subtrai o segundo número finito do primeiro.

```ts
subtract(left: number, right: number): number
```

Parâmetros:

- `left`: Operando ou coleção à esquerda.
- `right`: Operando ou coleção à direita.

Retorno: Resultado correspondente à finalidade documentada: subtrai o segundo número finito do primeiro.


### `sum`

Soma uma coleção sem coerção.

```ts
sum(values: readonly number[]): number
```

Parâmetros:

- `values`: Valores de entrada, preservados na ordem fornecida.

Retorno: Resultado correspondente à finalidade documentada: soma uma coleção sem coerção.


### `approximatelyEqual`

Compara números por tolerância absoluta e relativa explícitas.

```ts
approximatelyEqual(left: number, right: number, absoluteTolerance?: number, relativeTolerance?: number): boolean
```

Parâmetros:

- `left`: Operando ou coleção à esquerda.
- `right`: Operando ou coleção à direita.
- `absoluteTolerance`: Tolerância absoluta não negativa.
- `relativeTolerance`: Tolerância relativa não negativa.

Retorno: Resultado correspondente à finalidade documentada: compara números por tolerância absoluta e relativa explícitas.

Falhas:

- Quando a entrada viola o contrato da operação (`RangeError`).


### `cbrt`

Calcula raiz cúbica real.

```ts
cbrt(value: number): number
```

Parâmetros:

- `value`: Valor de entrada.

Retorno: Resultado correspondente à finalidade documentada: calcula raiz cúbica real.


### `combinations`

Calcula combinações de n elementos em k posições.

```ts
combinations(n: number, k: number): number
```

Parâmetros:

- `n`: Quantidade total de elementos.
- `k`: Quantidade de posições escolhidas.

Retorno: Resultado correspondente à finalidade documentada: calcula combinações de n elementos em k posições.


### `factorial`

Calcula fatorial exato enquanto o resultado permanece seguro.

```ts
factorial(value: number): number
```

Parâmetros:

- `value`: Valor de entrada.

Retorno: Resultado correspondente à finalidade documentada: calcula fatorial exato enquanto o resultado permanece seguro.


### `lerp`

Interpola linearmente entre dois valores.

```ts
lerp(start: number, end: number, amount: number): number
```

Parâmetros:

- `start`: Limite inicial inclusivo.
- `end`: Limite final exclusivo.
- `amount`: Proporção usada na interpolação.

Retorno: Resultado correspondente à finalidade documentada: interpola linearmente entre dois valores.


### `normalizeRange`

Normaliza valor para a proporção de um intervalo.

```ts
normalizeRange(value: number, start: number, end: number): number
```

Parâmetros:

- `value`: Valor de entrada.
- `start`: Limite inicial inclusivo.
- `end`: Limite final exclusivo.

Retorno: Resultado correspondente à finalidade documentada: normaliza valor para a proporção de um intervalo.

Falhas:

- Quando a entrada viola o contrato da operação (`RangeError`).


### `permutations`

Calcula permutações sem repetição.

```ts
permutations(n: number, k: number): number
```

Parâmetros:

- `n`: Quantidade total de elementos.
- `k`: Quantidade de posições escolhidas.

Retorno: Resultado correspondente à finalidade documentada: calcula permutações sem repetição.


### `power`

Eleva uma base finita ao expoente finito.

```ts
power(base: number, exponent: number): number
```

Parâmetros:

- `base`: Valor-base da operação.
- `exponent`: Expoente finito.

Retorno: Resultado correspondente à finalidade documentada: eleva uma base finita ao expoente finito.


### `sqrt`

Calcula raiz quadrada real não negativa.

```ts
sqrt(value: number): number
```

Parâmetros:

- `value`: Valor de entrada.

Retorno: Resultado correspondente à finalidade documentada: calcula raiz quadrada real não negativa.

Falhas:

- Quando a entrada viola o contrato da operação (`RangeError`).


### `toDegrees`

Converte radianos em graus.

```ts
toDegrees(radians: number): number
```

Parâmetros:

- `radians`: Ângulo expresso em radianos.

Retorno: Resultado correspondente à finalidade documentada: converte radianos em graus.


### `toRadians`

Converte graus em radianos.

```ts
toRadians(degrees: number): number
```

Parâmetros:

- `degrees`: Ângulo expresso em graus.

Retorno: Resultado correspondente à finalidade documentada: converte graus em radianos.


## logic

Níveis cumulativos: `basic ⊆ advanced`.

Exports de `basic` (8): `and`, `andTruthy`, `exactlyOne`, `not`, `or`, `orTruthy`, `xor`, `xorTruthy`.

Exports de `advanced` (14): `and`, `andTruthy`, `andValue`, `exactlyOne`, `exactlyOneValue`, `lazyAnd`, `lazyOr`, `lazyXor`, `not`, `or`, `orTruthy`, `orValue`, `xor`, `xorTruthy`.

### `and`

Exige operandos booleanos e retorna conjunção; identidade vazia é true.

```ts
and(...values: readonly boolean[]): boolean
```

Parâmetros:

- `values`: Valores de entrada, preservados na ordem fornecida.

Retorno: Resultado correspondente à finalidade documentada: exige operandos booleanos e retorna conjunção; identidade vazia é true.

Falhas:

- Quando a entrada viola o contrato da operação (`TypeError`).

Exemplo:

```ts
and(true, true, false); // false
```

### `andTruthy`

Avalia conjunção por truthiness explicitamente escolhida.

```ts
andTruthy(...values: readonly unknown[]): boolean
```

Parâmetros:

- `values`: Valores de entrada, preservados na ordem fornecida.

Retorno: Resultado correspondente à finalidade documentada: avalia conjunção por truthiness explicitamente escolhida.


### `exactlyOne`

Retorna true somente quando exatamente um booleano é true.

```ts
exactlyOne(...values: readonly boolean[]): boolean
```

Parâmetros:

- `values`: Valores de entrada, preservados na ordem fornecida.

Retorno: True somente quando exatamente um booleano é true.

Falhas:

- Quando a entrada viola o contrato da operação (`TypeError`).


### `not`

Inverte um booleano estrito.

```ts
not(value: boolean): boolean
```

Parâmetros:

- `value`: Valor de entrada.

Retorno: Resultado correspondente à finalidade documentada: inverte um booleano estrito.

Falhas:

- Quando a entrada viola o contrato da operação (`TypeError`).


### `or`

Exige operandos booleanos e retorna disjunção; identidade vazia é false.

```ts
or(...values: readonly boolean[]): boolean
```

Parâmetros:

- `values`: Valores de entrada, preservados na ordem fornecida.

Retorno: Resultado correspondente à finalidade documentada: exige operandos booleanos e retorna disjunção; identidade vazia é false.

Falhas:

- Quando a entrada viola o contrato da operação (`TypeError`).


### `orTruthy`

Avalia disjunção por truthiness explicitamente escolhida.

```ts
orTruthy(...values: readonly unknown[]): boolean
```

Parâmetros:

- `values`: Valores de entrada, preservados na ordem fornecida.

Retorno: Resultado correspondente à finalidade documentada: avalia disjunção por truthiness explicitamente escolhida.


### `xor`

Exige operandos booleanos e retorna paridade ímpar; identidade vazia é false.

```ts
xor(...values: readonly boolean[]): boolean
```

Parâmetros:

- `values`: Valores de entrada, preservados na ordem fornecida.

Retorno: Resultado correspondente à finalidade documentada: exige operandos booleanos e retorna paridade ímpar; identidade vazia é false.

Falhas:

- Quando a entrada viola o contrato da operação (`TypeError`).

Exemplo:

```ts
xor(true, false, true); // false
```

### `xorTruthy`

Avalia paridade ímpar por truthiness explicitamente escolhida.

```ts
xorTruthy(...values: readonly unknown[]): boolean
```

Parâmetros:

- `values`: Valores de entrada, preservados na ordem fornecida.

Retorno: Resultado correspondente à finalidade documentada: avalia paridade ímpar por truthiness explicitamente escolhida.


### `andValue`

Retorna o primeiro valor falsy ou o último valor, como && variádico inequívoco.

```ts
andValue<T>(...values: readonly T[]): T | undefined
```

Parâmetros:

- `values`: Valores de entrada, preservados na ordem fornecida.

Retorno: O primeiro valor falsy ou o último valor, como && variádico inequívoco.


### `exactlyOneValue`

Retorna o único valor truthy ou diagnóstico discriminado.

```ts
exactlyOneValue<T>(...values: readonly T[]): { ok: true; value: T; index: number; } | { ok: false; count: number; }
```

Parâmetros:

- `values`: Valores de entrada, preservados na ordem fornecida.

Retorno: O único valor truthy ou diagnóstico discriminado.


### `lazyAnd`

Avalia thunks booleanos em curto-circuito estrito da esquerda para a direita.

```ts
lazyAnd(...operations: readonly (() => boolean)[]): boolean
```

Parâmetros:

- `operations`: Operações adiadas, avaliadas em ordem.

Retorno: Resultado correspondente à finalidade documentada: avalia thunks booleanos em curto-circuito estrito da esquerda para a direita.

Falhas:

- Quando a entrada viola o contrato da operação (`TypeError`).


### `lazyOr`

Avalia thunks booleanos em curto-circuito estrito da esquerda para a direita.

```ts
lazyOr(...operations: readonly (() => boolean)[]): boolean
```

Parâmetros:

- `operations`: Operações adiadas, avaliadas em ordem.

Retorno: Resultado correspondente à finalidade documentada: avalia thunks booleanos em curto-circuito estrito da esquerda para a direita.

Falhas:

- Quando a entrada viola o contrato da operação (`TypeError`).


### `lazyXor`

Executa XOR lazy integralmente porque paridade exige todos os operandos.

```ts
lazyXor(...operations: readonly (() => boolean)[]): boolean
```

Parâmetros:

- `operations`: Operações adiadas, avaliadas em ordem.

Retorno: Resultado correspondente à finalidade documentada: executa XOR lazy integralmente porque paridade exige todos os operandos.

Falhas:

- Quando a entrada viola o contrato da operação (`TypeError`).


### `orValue`

Retorna o primeiro valor truthy ou o último valor, como || variádico inequívoco.

```ts
orValue<T>(...values: readonly T[]): T | undefined
```

Parâmetros:

- `values`: Valores de entrada, preservados na ordem fornecida.

Retorno: O primeiro valor truthy ou o último valor, como || variádico inequívoco.

Exemplo:

```ts
orValue(undefined, "resultado"); // "resultado"
```

## text

Níveis cumulativos: `basic ⊆ advanced`.

Exports de `basic` (12): `capitalize`, `contains`, `countOccurrences`, `lower`, `normalizeWhitespace`, `padEnd`, `padStart`, `replaceAll`, `reverse`, `trim`, `truncate`, `upper`.

Exports de `advanced` (27): `applyMask`, `camelCase`, `capitalize`, `clearMaskCache`, `compileMask`, `contains`, `countOccurrences`, `escapeHtml`, `lower`, `MaskDiagnostic`, `MaskOptions`, `MaskPlan`, `MaskResult`, `normalizeUnicode`, `normalizeWhitespace`, `padEnd`, `padStart`, `replaceAll`, `reverse`, `slugify`, `snakeCase`, `stripDiacritics`, `titleCase`, `trim`, `truncate`, `unescapeHtml`, `upper`.

### `capitalize`

Coloca em maiúscula o primeiro grafema aproximado por ponto de código.

```ts
capitalize(value: string, locale?: string | readonly string[] | undefined): string
```

Parâmetros:

- `value`: Valor de entrada.
- `locale`: Locale BCP 47 explícito.

Retorno: Resultado correspondente à finalidade documentada: coloca em maiúscula o primeiro grafema aproximado por ponto de código.


### `contains`

Testa inclusão literal com opção de caixa.

```ts
contains(value: string, search: string, caseSensitive?: boolean): boolean
```

Parâmetros:

- `value`: Valor de entrada.
- `search`: Texto literal procurado.
- `caseSensitive`: Indica se a comparação diferencia caixa.

Retorno: `true` quando inclusão literal com opção de caixa; caso contrário, `false`.


### `countOccurrences`

Conta ocorrências literais não sobrepostas.

```ts
countOccurrences(value: string, search: string): number
```

Parâmetros:

- `value`: Valor de entrada.
- `search`: Texto literal procurado.

Retorno: Resultado correspondente à finalidade documentada: conta ocorrências literais não sobrepostas.

Falhas:

- Quando a entrada viola o contrato da operação (`RangeError`).


### `lower`

Converte para minúsculas com locale opcional explícito.

```ts
lower(value: string, locale?: string | readonly string[] | undefined): string
```

Parâmetros:

- `value`: Valor de entrada.
- `locale`: Locale BCP 47 explícito.

Retorno: Resultado correspondente à finalidade documentada: converte para minúsculas com locale opcional explícito.


### `normalizeWhitespace`

Colapsa sequências de espaços Unicode em um espaço.

```ts
normalizeWhitespace(value: string): string
```

Parâmetros:

- `value`: Valor de entrada.

Retorno: Resultado correspondente à finalidade documentada: colapsa sequências de espaços Unicode em um espaço.


### `padEnd`

Preenche o fim com contrato nativo uniforme.

```ts
padEnd(value: string, length: number, fill?: string): string
```

Parâmetros:

- `value`: Valor de entrada.
- `length`: Comprimento máximo ou desejado.
- `fill`: Texto usado no preenchimento.

Retorno: Resultado correspondente à finalidade documentada: preenche o fim com contrato nativo uniforme.


### `padStart`

Preenche o início com contrato nativo uniforme.

```ts
padStart(value: string, length: number, fill?: string): string
```

Parâmetros:

- `value`: Valor de entrada.
- `length`: Comprimento máximo ou desejado.
- `fill`: Texto usado no preenchimento.

Retorno: Resultado correspondente à finalidade documentada: preenche o início com contrato nativo uniforme.


### `replaceAll`

Substitui todas as ocorrências literais.

```ts
replaceAll(value: string, search: string, replacement: string): string
```

Parâmetros:

- `value`: Valor de entrada.
- `search`: Texto literal procurado.
- `replacement`: Texto substituto.

Retorno: Resultado correspondente à finalidade documentada: substitui todas as ocorrências literais.

Falhas:

- Quando a entrada viola o contrato da operação (`RangeError`).


### `reverse`

Inverte por pontos de código Unicode sem quebrar pares substitutos.

```ts
reverse(value: string): string
```

Parâmetros:

- `value`: Valor de entrada.

Retorno: Resultado correspondente à finalidade documentada: inverte por pontos de código Unicode sem quebrar pares substitutos.


### `trim`

Remove espaços Unicode nas extremidades.

```ts
trim(value: string): string
```

Parâmetros:

- `value`: Valor de entrada.

Retorno: Resultado correspondente à finalidade documentada: remove espaços Unicode nas extremidades.


### `truncate`

Trunca por pontos de código e acrescenta sufixo dentro do limite.

```ts
truncate(value: string, length: number, suffix?: string): string
```

Parâmetros:

- `value`: Valor de entrada.
- `length`: Comprimento máximo ou desejado.
- `suffix`: Sufixo incluído quando houver truncamento.

Retorno: Resultado correspondente à finalidade documentada: trunca por pontos de código e acrescenta sufixo dentro do limite.


### `upper`

Converte para maiúsculas com locale opcional explícito.

```ts
upper(value: string, locale?: string | readonly string[] | undefined): string
```

Parâmetros:

- `value`: Valor de entrada.
- `locale`: Locale BCP 47 explícito.

Retorno: Resultado correspondente à finalidade documentada: converte para maiúsculas com locale opcional explícito.


### `camelCase`

Converte palavras para camelCase.

```ts
camelCase(value: string): string
```

Parâmetros:

- `value`: Valor de entrada.

Retorno: Resultado correspondente à finalidade documentada: converte palavras para camelCase.


### `escapeHtml`

Escapa cinco caracteres de HTML sem interpretar marcação.

```ts
escapeHtml(value: string): string
```

Parâmetros:

- `value`: Valor de entrada.

Retorno: Resultado correspondente à finalidade documentada: escapa cinco caracteres de HTML sem interpretar marcação.


### `normalizeUnicode`

Normaliza Unicode na forma solicitada.

```ts
normalizeUnicode(value: string, form?: "NFC" | "NFD" | "NFKC" | "NFKD"): string
```

Parâmetros:

- `value`: Valor de entrada.
- `form`: Forma de normalização Unicode.

Retorno: Resultado correspondente à finalidade documentada: normaliza Unicode na forma solicitada.


### `slugify`

Gera slug ASCII minúsculo e determinístico.

```ts
slugify(value: string): string
```

Parâmetros:

- `value`: Valor de entrada.

Retorno: Resultado correspondente à finalidade documentada: gera slug ASCII minúsculo e determinístico.


### `snakeCase`

Converte palavras para snake_case.

```ts
snakeCase(value: string): string
```

Parâmetros:

- `value`: Valor de entrada.

Retorno: Resultado correspondente à finalidade documentada: converte palavras para snake_case.


### `stripDiacritics`

Remove marcas diacríticas após normalização NFD.

```ts
stripDiacritics(value: string): string
```

Parâmetros:

- `value`: Valor de entrada.

Retorno: Resultado correspondente à finalidade documentada: remove marcas diacríticas após normalização NFD.


### `titleCase`

Converte palavras para título sem regras linguísticas implícitas.

```ts
titleCase(value: string): string
```

Parâmetros:

- `value`: Valor de entrada.

Retorno: Resultado correspondente à finalidade documentada: converte palavras para título sem regras linguísticas implícitas.


### `unescapeHtml`

Decodifica apenas entidades produzidas por escapeHtml.

```ts
unescapeHtml(value: string): string
```

Parâmetros:

- `value`: Valor de entrada.

Retorno: Resultado correspondente à finalidade documentada: decodifica apenas entidades produzidas por escapeHtml.


### `applyMask`

Aplica uma máscara compilada ou textual e retorna diagnóstico estruturado.

```ts
applyMask(input: string, mask: string | MaskPlan, options?: MaskOptions | undefined): MaskResult
```

Parâmetros:

- `input`: Texto de entrada a processar.
- `mask`: Máscara textual ou plano previamente compilado.
- `options`: Opções explícitas da operação.

Retorno: Resultado correspondente à finalidade documentada: aplica uma máscara compilada ou textual e retorna diagnóstico estruturado.

Exemplo:

```ts
applyMask("12345678901", "###.###.###-##");
```

### `clearMaskCache`

Limpa o cache limitado para testes ou ciclo de vida controlado.

```ts
clearMaskCache(): void
```


### `compileMask`

Compila máscara declarativa cacheável com classes `#`, `A`, `X` e `@`; grupos, alternativas, quantificadores `?`, `+` e `{n,m}`; transformações `>` e `<`; literais e preenchimento `~c{n}`.

```ts
compileMask(source: string, inputOptions?: MaskOptions): MaskPlan
```

Parâmetros:

- `source`: Texto-fonte declarativo.
- `inputOptions`: Limites opcionais do processamento.

Retorno: Resultado correspondente à finalidade documentada: compila máscara declarativa cacheável com classes `#`, `A`, `X` e `@`; grupos, alternativas, quantificadores `?`, `+` e `{n,m}`; transformações `>` e `<`; literais e preenchimento `~c{n}`.

Falhas:

- Quando a entrada viola o contrato da operação (`RangeError`).

Exemplo:

```ts
const cpf = compileMask("###.###.###-##");cpf.format("12345678901");
```

### `MaskDiagnostic`

Diagnóstico posicional seguro de uma máscara.

```ts
export interface MaskDiagnostic { readonly code: "MASK_SYNTAX" | "MASK_INPUT" | "MASK_LIMIT"; readonly position: number; readonly message: string; }
```


### `MaskOptions`

Opções limitadas do compilador de máscaras.

```ts
export interface MaskOptions { readonly maxInputLength?: number; readonly maxOutputLength?: number; readonly maxDepth?: number; readonly maxStates?: number; }
```


### `MaskPlan`

Plano compilado imutável e reutilizável.

```ts
export interface MaskPlan { readonly source: string; readonly format: (input: string) => MaskResult; readonly validate: (input: string) => boolean; }
```


### `MaskResult`

Resultado estruturado de aplicação e validação.

```ts
export type MaskResult = Readonly<{ ok: true; value: string; consumed: number } | { ok: false; value: string; consumed: number; error: MaskDiagnostic }>;
```


## statistics

Níveis cumulativos: `basic ⊆ advanced`.

Exports de `basic` (7): `max`, `mean`, `median`, `min`, `modes`, `range`, `sum`.

Exports de `advanced` (12): `correlation`, `covariance`, `max`, `mean`, `median`, `min`, `modes`, `quantile`, `range`, `standardDeviation`, `sum`, `variance`.

### `median`

Calcula mediana sem mutar a entrada.

```ts
median(values: readonly number[]): number
```

Parâmetros:

- `values`: Valores de entrada, preservados na ordem fornecida.

Retorno: Resultado correspondente à finalidade documentada: calcula mediana sem mutar a entrada.

Falhas:

- Quando a entrada viola o contrato da operação (`RangeError`).


### `modes`

Retorna todas as modas em ordem crescente.

```ts
modes(values: readonly number[]): number[]
```

Parâmetros:

- `values`: Valores de entrada, preservados na ordem fornecida.

Retorno: Todas as modas em ordem crescente.


### `range`

Retorna amplitude máxima menos mínima.

```ts
range(values: readonly number[]): number
```

Parâmetros:

- `values`: Valores de entrada, preservados na ordem fornecida.

Retorno: Amplitude máxima menos mínima.


### `correlation`

Calcula correlação de Pearson; séries constantes são rejeitadas.

```ts
correlation(left: readonly number[], right: readonly number[]): number
```

Parâmetros:

- `left`: Operando ou coleção à esquerda.
- `right`: Operando ou coleção à direita.

Retorno: Resultado correspondente à finalidade documentada: calcula correlação de Pearson; séries constantes são rejeitadas.

Falhas:

- Quando a entrada viola o contrato da operação (`RangeError`).


### `covariance`

Calcula covariância populacional entre séries de mesmo tamanho.

```ts
covariance(left: readonly number[], right: readonly number[]): number
```

Parâmetros:

- `left`: Operando ou coleção à esquerda.
- `right`: Operando ou coleção à direita.

Retorno: Resultado correspondente à finalidade documentada: calcula covariância populacional entre séries de mesmo tamanho.

Falhas:

- Quando a entrada viola o contrato da operação (`RangeError`).


### `quantile`

Calcula quantil por interpolação linear inclusiva.

```ts
quantile(values: readonly number[], probability: number): number
```

Parâmetros:

- `values`: Valores de entrada, preservados na ordem fornecida.
- `probability`: Probabilidade entre zero e um.

Retorno: Resultado correspondente à finalidade documentada: calcula quantil por interpolação linear inclusiva.

Falhas:

- Quando a entrada viola o contrato da operação (`RangeError`).


### `standardDeviation`

Calcula desvio padrão populacional ou amostral.

```ts
standardDeviation(values: readonly number[], sample?: boolean): number
```

Parâmetros:

- `values`: Valores de entrada, preservados na ordem fornecida.
- `sample`: Indica cálculo amostral em vez de populacional.

Retorno: Resultado correspondente à finalidade documentada: calcula desvio padrão populacional ou amostral.


### `variance`

Calcula variância populacional ou amostral.

```ts
variance(values: readonly number[], sample?: boolean): number
```

Parâmetros:

- `values`: Valores de entrada, preservados na ordem fornecida.
- `sample`: Indica cálculo amostral em vez de populacional.

Retorno: Resultado correspondente à finalidade documentada: calcula variância populacional ou amostral.

Falhas:

- Quando a entrada viola o contrato da operação (`RangeError`).


## finance

Níveis cumulativos: `basic ⊆ advanced`.

Exports de `basic` (7): `compoundAmount`, `compoundInterest`, `futureValue`, `percentagePoints`, `percentRate`, `presentValue`, `simpleInterest`.

Exports de `advanced` (12): `compoundAmount`, `compoundInterest`, `constantAmortization`, `convertEffectiveRate`, `futureValue`, `internalRateOfReturn`, `netPresentValue`, `payment`, `percentagePoints`, `percentRate`, `presentValue`, `simpleInterest`.

### `compoundAmount`

Calcula montante composto com taxa fracionária por período.

```ts
compoundAmount(principal: number, rate: number, periods: number): number
```

Parâmetros:

- `principal`: Capital principal.
- `rate`: Taxa fracionária por período.
- `periods`: Quantidade de períodos.

Retorno: Resultado correspondente à finalidade documentada: calcula montante composto com taxa fracionária por período.


### `compoundInterest`

Calcula somente os juros compostos.

```ts
compoundInterest(principal: number, rate: number, periods: number): number
```

Parâmetros:

- `principal`: Capital principal.
- `rate`: Taxa fracionária por período.
- `periods`: Quantidade de períodos.

Retorno: Resultado correspondente à finalidade documentada: calcula somente os juros compostos.


### `futureValue`

Calcula valor futuro com pagamentos no fim de cada período.

```ts
futureValue(rate: number, periods: number, payment: number, present?: number): number
```

Parâmetros:

- `rate`: Taxa fracionária por período.
- `periods`: Quantidade de períodos.
- `payment`: Pagamento periódico.
- `present`: Valor financeiro presente.

Retorno: Resultado correspondente à finalidade documentada: calcula valor futuro com pagamentos no fim de cada período.


### `percentagePoints`

Converte taxa fracionária em pontos percentuais.

```ts
percentagePoints(rate: number): number
```

Parâmetros:

- `rate`: Taxa fracionária por período.

Retorno: Resultado correspondente à finalidade documentada: converte taxa fracionária em pontos percentuais.


### `percentRate`

Converte pontos percentuais em taxa fracionária.

```ts
percentRate(percentagePoints: number): number
```

Parâmetros:

- `percentagePoints`: Taxa expressa em pontos percentuais.

Retorno: Resultado correspondente à finalidade documentada: converte pontos percentuais em taxa fracionária.


### `presentValue`

Calcula valor presente com pagamentos no fim de cada período.

```ts
presentValue(rate: number, periods: number, payment: number, future?: number): number
```

Parâmetros:

- `rate`: Taxa fracionária por período.
- `periods`: Quantidade de períodos.
- `payment`: Pagamento periódico.
- `future`: Valor financeiro futuro.

Retorno: Resultado correspondente à finalidade documentada: calcula valor presente com pagamentos no fim de cada período.


### `simpleInterest`

Calcula juros simples com taxa fracionária por período.

```ts
simpleInterest(principal: number, rate: number, periods: number): number
```

Parâmetros:

- `principal`: Capital principal.
- `rate`: Taxa fracionária por período.
- `periods`: Quantidade de períodos.

Retorno: Resultado correspondente à finalidade documentada: calcula juros simples com taxa fracionária por período.


### `constantAmortization`

Calcula parcela de amortização constante SAC.

```ts
constantAmortization(principal: number, periods: number): number
```

Parâmetros:

- `principal`: Capital principal.
- `periods`: Quantidade de períodos.

Retorno: Resultado correspondente à finalidade documentada: calcula parcela de amortização constante SAC.


### `convertEffectiveRate`

Converte taxa efetiva entre quantidades de períodos.

```ts
convertEffectiveRate(rate: number, fromPeriods: number, toPeriods: number): number
```

Parâmetros:

- `rate`: Taxa fracionária por período.
- `fromPeriods`: Quantidade de períodos da taxa de origem.
- `toPeriods`: Quantidade de períodos da taxa de destino.

Retorno: Resultado correspondente à finalidade documentada: converte taxa efetiva entre quantidades de períodos.

Falhas:

- Quando a entrada viola o contrato da operação (`RangeError`).


### `internalRateOfReturn`

Aproxima taxa interna de retorno por bisseção limitada.

```ts
internalRateOfReturn(cashFlows: readonly number[], tolerance?: number, iterations?: number): number
```

Parâmetros:

- `cashFlows`: Fluxos financeiros em ordem temporal.
- `tolerance`: Tolerância numérica de convergência.
- `iterations`: Número máximo de iterações.

Retorno: Resultado correspondente à finalidade documentada: aproxima taxa interna de retorno por bisseção limitada.

Falhas:

- Quando a entrada viola o contrato da operação (`RangeError`).


### `netPresentValue`

Calcula valor presente líquido de fluxos igualmente espaçados.

```ts
netPresentValue(rate: number, cashFlows: readonly number[]): number
```

Parâmetros:

- `rate`: Taxa fracionária por período.
- `cashFlows`: Fluxos financeiros em ordem temporal.

Retorno: Resultado correspondente à finalidade documentada: calcula valor presente líquido de fluxos igualmente espaçados.

Falhas:

- Quando a entrada viola o contrato da operação (`RangeError`).


### `payment`

Calcula pagamento periódico com fluxos de sinal oposto.

```ts
payment(rate: number, periods: number, present: number, future?: number): number
```

Parâmetros:

- `rate`: Taxa fracionária por período.
- `periods`: Quantidade de períodos.
- `present`: Valor financeiro presente.
- `future`: Valor financeiro futuro.

Retorno: Resultado correspondente à finalidade documentada: calcula pagamento periódico com fluxos de sinal oposto.


## datetime

Níveis cumulativos: `basic ⊆ advanced`.

Exports de `basic` (6): `addDays`, `daysInMonth`, `differenceInDays`, `formatIsoDate`, `isLeapYear`, `parseIsoDate`.

Exports de `advanced` (12): `addDays`, `addMonths`, `businessDaysBetween`, `daysInMonth`, `differenceInDays`, `durationToMilliseconds`, `endOfDay`, `formatDateTime`, `formatIsoDate`, `isLeapYear`, `parseIsoDate`, `startOfDay`.

### `addDays`

Soma dias civis em UTC sem mutar a data.

```ts
addDays(date: Date, days: number): Date
```

Parâmetros:

- `date`: Data de entrada, que não é modificada.
- `days`: Quantidade inteira de dias.

Retorno: Resultado correspondente à finalidade documentada: soma dias civis em UTC sem mutar a data.


### `daysInMonth`

Retorna dias do mês gregoriano, com mês de 1 a 12.

```ts
daysInMonth(year: number, month: number): number
```

Parâmetros:

- `year`: Ano gregoriano.
- `month`: Mês gregoriano numerado de 1 a 12.

Retorno: Dias do mês gregoriano, com mês de 1 a 12.


### `differenceInDays`

Retorna diferença inteira de dias UTC entre instantes.

```ts
differenceInDays(later: Date, earlier: Date): number
```

Parâmetros:

- `later`: Instante cronologicamente posterior.
- `earlier`: Instante cronologicamente anterior.

Retorno: Diferença inteira de dias UTC entre instantes.


### `formatIsoDate`

Formata data UTC como YYYY-MM-DD.

```ts
formatIsoDate(date: Date): string
```

Parâmetros:

- `date`: Data de entrada, que não é modificada.

Retorno: Resultado correspondente à finalidade documentada: formata data UTC como YYYY-MM-DD.


### `isLeapYear`

Informa se o ano gregoriano é bissexto.

```ts
isLeapYear(year: number): boolean
```

Parâmetros:

- `year`: Ano gregoriano.

Retorno: `true` quando o ano gregoriano é bissexto; caso contrário, `false`.


### `parseIsoDate`

Analisa estritamente YYYY-MM-DD em UTC.

```ts
parseIsoDate(value: string): Date
```

Parâmetros:

- `value`: Valor de entrada.

Retorno: Resultado correspondente à finalidade documentada: analisa estritamente YYYY-MM-DD em UTC.

Falhas:

- Quando a entrada viola o contrato da operação (`RangeError`).


### `addMonths`

Soma meses em UTC limitando o dia ao mês de destino.

```ts
addMonths(date: Date, months: number): Date
```

Parâmetros:

- `date`: Data de entrada, que não é modificada.
- `months`: Quantidade inteira de meses.

Retorno: Resultado correspondente à finalidade documentada: soma meses em UTC limitando o dia ao mês de destino.

Falhas:

- Quando a entrada viola o contrato da operação (`TypeError`).


### `businessDaysBetween`

Conta dias úteis UTC com fim exclusivo e finais de semana configuráveis.

```ts
businessDaysBetween(start: Date, end: Date, holidays?: readonly string[]): number
```

Parâmetros:

- `start`: Limite inicial inclusivo.
- `end`: Limite final exclusivo.
- `holidays`: Datas UTC bloqueadas no formato YYYY-MM-DD.

Retorno: Resultado correspondente à finalidade documentada: conta dias úteis UTC com fim exclusivo e finais de semana configuráveis.


### `durationToMilliseconds`

Converte duração estrutural em milissegundos.

```ts
durationToMilliseconds(value: Readonly<{ days?: number; hours?: number; minutes?: number; seconds?: number; milliseconds?: number; }>): number
```

Parâmetros:

- `value`: Valor de entrada.

Retorno: Resultado correspondente à finalidade documentada: converte duração estrutural em milissegundos.


### `endOfDay`

Retorna fim inclusivo do dia UTC.

```ts
endOfDay(date: Date): Date
```

Parâmetros:

- `date`: Data de entrada, que não é modificada.

Retorno: Fim inclusivo do dia UTC.


### `formatDateTime`

Formata instante via Intl com locale e timezone explícitos.

```ts
formatDateTime(date: Date, locale: string, timeZone: string, options?: DateTimeFormatOptions): string
```

Parâmetros:

- `date`: Data de entrada, que não é modificada.
- `locale`: Locale BCP 47 explícito.
- `timeZone`: Fuso horário IANA explícito.
- `options`: Opções explícitas da operação.

Retorno: Resultado correspondente à finalidade documentada: formata instante via Intl com locale e timezone explícitos.


### `startOfDay`

Retorna início do dia UTC.

```ts
startOfDay(date: Date): Date
```

Parâmetros:

- `date`: Data de entrada, que não é modificada.

Retorno: Início do dia UTC.


## collections

Níveis cumulativos: `basic ⊆ advanced`.

Exports de `basic` (9): `chunk`, `compact`, `difference`, `flatten`, `intersection`, `partition`, `union`, `unique`, `zip`.

Exports de `advanced` (15): `chunk`, `compact`, `difference`, `flatten`, `frequencies`, `groupBy`, `indexBy`, `intersection`, `partition`, `sequence`, `sortBy`, `sumBy`, `union`, `unique`, `zip`.

### `chunk`

Divide uma coleção em blocos não vazios.

```ts
chunk<T>(values: readonly T[], size: number): T[][]
```

Parâmetros:

- `values`: Valores de entrada, preservados na ordem fornecida.
- `size`: Tamanho positivo de cada bloco.

Retorno: Resultado correspondente à finalidade documentada: divide uma coleção em blocos não vazios.


### `compact`

Remove somente null e undefined, preservando falsy válidos.

```ts
compact<T>(values: readonly (T | null | undefined)[]): T[]
```

Parâmetros:

- `values`: Valores de entrada, preservados na ordem fornecida.

Retorno: Resultado correspondente à finalidade documentada: remove somente null e undefined, preservando falsy válidos.


### `difference`

Retorna diferença SameValueZero.

```ts
difference<T>(left: readonly T[], right: readonly T[]): T[]
```

Parâmetros:

- `left`: Operando ou coleção à esquerda.
- `right`: Operando ou coleção à direita.

Retorno: Diferença SameValueZero.


### `flatten`

Achata exatamente um nível.

```ts
flatten<T>(values: readonly (T | readonly T[])[]): T[]
```

Parâmetros:

- `values`: Valores de entrada, preservados na ordem fornecida.

Retorno: Resultado correspondente à finalidade documentada: achata exatamente um nível.


### `intersection`

Retorna interseção única SameValueZero.

```ts
intersection<T>(left: readonly T[], right: readonly T[]): T[]
```

Parâmetros:

- `left`: Operando ou coleção à esquerda.
- `right`: Operando ou coleção à direita.

Retorno: Interseção única SameValueZero.


### `partition`

Particiona conforme predicado sem mutar a entrada.

```ts
partition<T>(values: readonly T[], predicate: (value: T, index: number) => boolean): [T[], T[]]
```

Parâmetros:

- `values`: Valores de entrada, preservados na ordem fornecida.
- `predicate`: Predicado aplicado a cada valor e índice.

Retorno: Resultado correspondente à finalidade documentada: particiona conforme predicado sem mutar a entrada.


### `union`

Retorna união única SameValueZero.

```ts
union<T>(...collections: readonly (readonly T[])[]): T[]
```

Parâmetros:

- `collections`: Coleções de entrada, na ordem fornecida.

Retorno: União única SameValueZero.


### `unique`

Remove duplicatas preservando a primeira ordem.

```ts
unique<T>(values: readonly T[]): T[]
```

Parâmetros:

- `values`: Valores de entrada, preservados na ordem fornecida.

Retorno: Resultado correspondente à finalidade documentada: remove duplicatas preservando a primeira ordem.


### `zip`

Combina posições até a menor coleção.

```ts
zip<T, U>(left: readonly T[], right: readonly U[]): [T, U][]
```

Parâmetros:

- `left`: Operando ou coleção à esquerda.
- `right`: Operando ou coleção à direita.

Retorno: Resultado correspondente à finalidade documentada: combina posições até a menor coleção.


### `frequencies`

Conta ocorrências por identidade SameValueZero.

```ts
frequencies<T>(values: readonly T[]): Map<T, number>
```

Parâmetros:

- `values`: Valores de entrada, preservados na ordem fornecida.

Retorno: Resultado correspondente à finalidade documentada: conta ocorrências por identidade SameValueZero.


### `groupBy`

Agrupa por chave serializável sem prototype pollution.

```ts
groupBy<T>(values: readonly T[], selector: (value: T, index: number) => PropertyKey): Map<PropertyKey, T[]>
```

Parâmetros:

- `values`: Valores de entrada, preservados na ordem fornecida.
- `selector`: Função que projeta chave ou valor.

Retorno: Resultado correspondente à finalidade documentada: agrupa por chave serializável sem prototype pollution.


### `indexBy`

Indexa por chave e rejeita duplicatas.

```ts
indexBy<T>(values: readonly T[], selector: (value: T) => PropertyKey): Map<PropertyKey, T>
```

Parâmetros:

- `values`: Valores de entrada, preservados na ordem fornecida.
- `selector`: Função que projeta chave ou valor.

Retorno: Resultado correspondente à finalidade documentada: indexa por chave e rejeita duplicatas.


### `sequence`

Cria progressão finita com fim exclusivo.

```ts
sequence(start: number, end: number, step?: number): number[]
```

Parâmetros:

- `start`: Limite inicial inclusivo.
- `end`: Limite final exclusivo.
- `step`: Incremento finito da progressão.

Retorno: Resultado correspondente à finalidade documentada: cria progressão finita com fim exclusivo.


### `sortBy`

Ordena por chave sem mutar a entrada e preserva estabilidade.

```ts
sortBy<T>(values: readonly T[], selector: (value: T) => string | number): T[]
```

Parâmetros:

- `values`: Valores de entrada, preservados na ordem fornecida.
- `selector`: Função que projeta chave ou valor.

Retorno: Resultado correspondente à finalidade documentada: ordena por chave sem mutar a entrada e preserva estabilidade.


### `sumBy`

Soma projeções numéricas finitas.

```ts
sumBy<T>(values: readonly T[], selector: (value: T) => number): number
```

Parâmetros:

- `values`: Valores de entrada, preservados na ordem fornecida.
- `selector`: Função que projeta chave ou valor.

Retorno: Resultado correspondente à finalidade documentada: soma projeções numéricas finitas.


## validation

Níveis cumulativos: `basic ⊆ advanced`.

Exports de `basic` (11): `email`, `httpUrl`, `inspect`, `ipv4`, `luhn`, `uuid`, `validate`, `ValidationIssue`, `ValidationResult`, `validator`, `Validator`.

Exports de `advanced` (18): `allOf`, `anyOf`, `email`, `httpUrl`, `inspect`, `ipv4`, `lengthBetween`, `luhn`, `notRule`, `oneOf`, `regex`, `RegexValidationOptions`, `uuid`, `validate`, `ValidationIssue`, `ValidationResult`, `validator`, `Validator`.

### `inspect`

Valida e retorna diagnóstico estruturado.

```ts
inspect<T>(value: T, rule: Validator<T>): ValidationResult
```

Parâmetros:

- `value`: Valor de entrada.
- `rule`: Validador aplicado ao valor.

Retorno: `true` quando e retorna diagnóstico estruturado; caso contrário, `false`.


### `validate`

Valida e retorna somente booleano.

```ts
validate<T>(value: T, rule: Validator<T>): boolean
```

Parâmetros:

- `value`: Valor de entrada.
- `rule`: Validador aplicado ao valor.

Retorno: `true` quando e retorna somente booleano; caso contrário, `false`.


### `ValidationIssue`

Diagnóstico reutilizável sem ecoar a entrada.

```ts
export interface ValidationIssue { readonly code: string; readonly message: string; readonly position?: number; }
```


### `ValidationResult`

Resultado discriminado de validação.

```ts
export type ValidationResult = Readonly<{ ok: true } | { ok: false; issues: readonly ValidationIssue[] }>;
```


### `validator`

Cria validador a partir de predicado total e diagnóstico estável.

```ts
validator<T>(predicate: (value: T) => boolean, issue: ValidationIssue): Validator<T>
```

Parâmetros:

- `predicate`: Predicado aplicado a cada valor e índice.
- `issue`: Diagnóstico estável associado à rejeição.

Retorno: Resultado correspondente à finalidade documentada: cria validador a partir de predicado total e diagnóstico estável.


### `Validator`

Contrato de validador booleano com diagnóstico associado.

```ts
export interface Validator<T> { readonly test: (value: T) => boolean; readonly inspect: (value: T) => ValidationResult; }
```


### `allOf`

Compõe conjunção em curto-circuito e agrega diagnóstico do primeiro erro.

```ts
allOf<T>(...rules: readonly Validator<T>[]): Validator<T>
```

Parâmetros:

- `rules`: Validadores compostos, avaliados em ordem.

Retorno: Resultado correspondente à finalidade documentada: compõe conjunção em curto-circuito e agrega diagnóstico do primeiro erro.


### `anyOf`

Compõe disjunção e agrega diagnósticos quando nenhuma regra aceita.

```ts
anyOf<T>(...rules: readonly Validator<T>[]): Validator<T>
```

Parâmetros:

- `rules`: Validadores compostos, avaliados em ordem.

Retorno: Resultado correspondente à finalidade documentada: compõe disjunção e agrega diagnósticos quando nenhuma regra aceita.


### `lengthBetween`

Valida comprimento por pontos de código Unicode.

```ts
lengthBetween(minimum: number, maximum: number): Validator<string>
```

Parâmetros:

- `minimum`: Limite inferior inclusivo.
- `maximum`: Limite superior inclusivo.

Retorno: `true` quando comprimento por pontos de código Unicode; caso contrário, `false`.

Falhas:

- Quando a entrada viola o contrato da operação (`RangeError`).


### `notRule`

Inverte um validador sem absorver falha de configuração.

```ts
notRule<T>(rule: Validator<T>): Validator<T>
```

Parâmetros:

- `rule`: Validador aplicado ao valor.

Retorno: Resultado correspondente à finalidade documentada: inverte um validador sem absorver falha de configuração.


### `oneOf`

Exige aceitação por exatamente um validador.

```ts
oneOf<T>(...rules: readonly Validator<T>[]): Validator<T>
```

Parâmetros:

- `rules`: Validadores compostos, avaliados em ordem.

Retorno: Resultado correspondente à finalidade documentada: exige aceitação por exatamente um validador.


### `regex`

Constrói validador de regex com estado lastIndex isolado e modo seguro padrão.

```ts
regex(pattern: RegExp, options?: RegexValidationOptions): Validator<string>
```

Parâmetros:

- `pattern`: Expressão regular fornecida pelo consumidor.
- `options`: Opções explícitas da operação.

Retorno: Resultado correspondente à finalidade documentada: constrói validador de regex com estado lastIndex isolado e modo seguro padrão.

Exemplo:

```ts
regex(/^[A-Z]+$/u).test("ABC"); // true
```

### `RegexValidationOptions`

Opções para regex fornecida pelo consumidor.

```ts
export interface RegexValidationOptions { readonly trusted?: boolean; readonly maxPatternLength?: number; }
```


## conversion

Níveis cumulativos: `basic ⊆ advanced`.

Exports de `basic` (7): `bytesToHex`, `celsiusToFahrenheit`, `fahrenheitToCelsius`, `hexToBytes`, `toBoolean`, `toInteger`, `toNumber`.

Exports de `advanced` (12): `base64ToUtf8`, `bytesToHex`, `celsiusToFahrenheit`, `degreesToRadians`, `fahrenheitToCelsius`, `formatBytes`, `hexToBytes`, `radiansToDegrees`, `toBoolean`, `toInteger`, `toNumber`, `utf8ToBase64`.

### `bytesToHex`

Converte bytes para hexadecimal minúsculo.

```ts
bytesToHex(value: Uint8Array<ArrayBufferLike>): string
```

Parâmetros:

- `value`: Valor de entrada.

Retorno: Resultado correspondente à finalidade documentada: converte bytes para hexadecimal minúsculo.


### `celsiusToFahrenheit`

Converte graus Celsius em Fahrenheit.

```ts
celsiusToFahrenheit(value: number): number
```

Parâmetros:

- `value`: Valor de entrada.

Retorno: Resultado correspondente à finalidade documentada: converte graus Celsius em Fahrenheit.


### `fahrenheitToCelsius`

Converte graus Fahrenheit em Celsius.

```ts
fahrenheitToCelsius(value: number): number
```

Parâmetros:

- `value`: Valor de entrada.

Retorno: Resultado correspondente à finalidade documentada: converte graus Fahrenheit em Celsius.


### `hexToBytes`

Converte hexadecimal par em bytes.

```ts
hexToBytes(value: string): Uint8Array<ArrayBufferLike>
```

Parâmetros:

- `value`: Valor de entrada.

Retorno: Resultado correspondente à finalidade documentada: converte hexadecimal par em bytes.

Falhas:

- Quando a entrada viola o contrato da operação (`TypeError`).


### `toBoolean`

Converte booleano ou literais true/false, 1/0 estritamente.

```ts
toBoolean(value: string | number | boolean): boolean
```

Parâmetros:

- `value`: Valor de entrada.

Retorno: Resultado correspondente à finalidade documentada: converte booleano ou literais true/false, 1/0 estritamente.

Falhas:

- Quando a entrada viola o contrato da operação (`TypeError`).


### `toInteger`

Converte para inteiro seguro sem truncamento implícito.

```ts
toInteger(value: string | number): number
```

Parâmetros:

- `value`: Valor de entrada.

Retorno: Resultado correspondente à finalidade documentada: converte para inteiro seguro sem truncamento implícito.

Falhas:

- Quando a entrada viola o contrato da operação (`TypeError`).


### `toNumber`

Converte string decimal canônica ou número em número finito.

```ts
toNumber(value: string | number): number
```

Parâmetros:

- `value`: Valor de entrada.

Retorno: Resultado correspondente à finalidade documentada: converte string decimal canônica ou número em número finito.

Falhas:

- Quando a entrada viola o contrato da operação (`TypeError`).


### `base64ToUtf8`

Decodifica Base64 canônico em UTF-8 estrito.

```ts
base64ToUtf8(value: string): string
```

Parâmetros:

- `value`: Valor de entrada.

Retorno: Resultado correspondente à finalidade documentada: decodifica Base64 canônico em UTF-8 estrito.

Falhas:

- Quando a entrada viola o contrato da operação (`TypeError`).


### `degreesToRadians`

Converte graus em radianos.

```ts
degreesToRadians(value: number): number
```

Parâmetros:

- `value`: Valor de entrada.

Retorno: Resultado correspondente à finalidade documentada: converte graus em radianos.


### `formatBytes`

Formata quantidade de bytes em unidade binária explícita.

```ts
formatBytes(value: number, digits?: number): string
```

Parâmetros:

- `value`: Valor de entrada.
- `digits`: Quantidade de casas ou dígitos permitida.

Retorno: Resultado correspondente à finalidade documentada: formata quantidade de bytes em unidade binária explícita.

Falhas:

- Quando a entrada viola o contrato da operação (`RangeError`).


### `radiansToDegrees`

Converte radianos em graus.

```ts
radiansToDegrees(value: number): number
```

Parâmetros:

- `value`: Valor de entrada.

Retorno: Resultado correspondente à finalidade documentada: converte radianos em graus.


### `utf8ToBase64`

Codifica UTF-8 em Base64 sem depender de Node ou DOM.

```ts
utf8ToBase64(value: string): string
```

Parâmetros:

- `value`: Valor de entrada.

Retorno: Resultado correspondente à finalidade documentada: codifica UTF-8 em Base64 sem depender de Node ou DOM.


## spreadsheet

Níveis cumulativos: `basic ⊆ advanced`.

Exports de `basic` (6): `averageIf`, `choose`, `concatenate`, `countIf`, `ifError`, `sumIf`.

Exports de `advanced` (10): `averageIf`, `choose`, `concatenate`, `countIf`, `hlookup`, `ifError`, `lookup`, `match`, `sumIf`, `vlookup`.

### `averageIf`

Calcula média dos números aceitos e rejeita conjunto vazio.

```ts
averageIf(values: readonly number[], predicate: (value: number, index: number) => boolean): number
```

Parâmetros:

- `values`: Valores de entrada, preservados na ordem fornecida.
- `predicate`: Predicado aplicado a cada valor e índice.

Retorno: Resultado correspondente à finalidade documentada: calcula média dos números aceitos e rejeita conjunto vazio.

Falhas:

- Quando a entrada viola o contrato da operação (`RangeError`).


### `choose`

Escolhe item por índice baseado em um, conforme planilhas.

```ts
choose<T>(index: number, ...values: readonly T[]): T
```

Parâmetros:

- `index`: Índice da posição solicitada.
- `values`: Valores de entrada, preservados na ordem fornecida.

Retorno: Resultado correspondente à finalidade documentada: escolhe item por índice baseado em um, conforme planilhas.

Falhas:

- Quando a entrada viola o contrato da operação (`RangeError`).


### `concatenate`

Concatena valores por conversão String explícita.

```ts
concatenate(...values: readonly unknown[]): string
```

Parâmetros:

- `values`: Valores de entrada, preservados na ordem fornecida.

Retorno: Resultado correspondente à finalidade documentada: concatena valores por conversão String explícita.


### `countIf`

Conta valores que satisfazem predicado.

```ts
countIf<T>(values: readonly T[], predicate: (value: T, index: number) => boolean): number
```

Parâmetros:

- `values`: Valores de entrada, preservados na ordem fornecida.
- `predicate`: Predicado aplicado a cada valor e índice.

Retorno: Resultado correspondente à finalidade documentada: conta valores que satisfazem predicado.


### `ifError`

Retorna fallback somente quando a operação lança.

```ts
ifError<T>(operation: () => T, fallback: T | (() => T)): T
```

Parâmetros:

- `operation`: Operação adiada que será avaliada.
- `fallback`: Valor ou operação usada quando não há resultado principal.

Retorno: Fallback somente quando a operação lança.


### `sumIf`

Soma números cuja posição satisfaz predicado.

```ts
sumIf(values: readonly number[], predicate: (value: number, index: number) => boolean): number
```

Parâmetros:

- `values`: Valores de entrada, preservados na ordem fornecida.
- `predicate`: Predicado aplicado a cada valor e índice.

Retorno: Resultado correspondente à finalidade documentada: soma números cuja posição satisfaz predicado.


### `hlookup`

Localiza chave na primeira linha e retorna linha baseada em zero.

```ts
hlookup<T>(key: T, table: readonly (readonly unknown[])[], row: number): unknown
```

Parâmetros:

- `key`: Chave procurada.
- `table`: Matriz usada na busca.
- `row`: Índice de linha baseado em zero.

Retorno: Resultado correspondente à finalidade documentada: localiza chave na primeira linha e retorna linha baseada em zero.

Falhas:

- Quando a entrada viola o contrato da operação (`RangeError`).


### `lookup`

Localiza chave exata em pares e retorna fallback opcional.

```ts
lookup<K, V>(key: K, entries: readonly (readonly [K, V])[], fallback?: V | undefined): V | undefined
```

Parâmetros:

- `key`: Chave procurada.
- `entries`: Pares de chave e valor pesquisáveis.
- `fallback`: Valor ou operação usada quando não há resultado principal.

Retorno: Resultado correspondente à finalidade documentada: localiza chave exata em pares e retorna fallback opcional.


### `match`

Retorna índice baseado em zero de correspondência exata.

```ts
match<T>(value: T, values: readonly T[]): number
```

Parâmetros:

- `value`: Valor de entrada.
- `values`: Valores de entrada, preservados na ordem fornecida.

Retorno: Índice baseado em zero de correspondência exata.


### `vlookup`

Localiza chave na primeira coluna e retorna coluna baseada em zero.

```ts
vlookup<T>(key: T, table: readonly (readonly unknown[])[], column: number): unknown
```

Parâmetros:

- `key`: Chave procurada.
- `table`: Matriz usada na busca.
- `column`: Índice de coluna baseado em zero.

Retorno: Resultado correspondente à finalidade documentada: localiza chave na primeira coluna e retorna coluna baseada em zero.

Falhas:

- Quando a entrada viola o contrato da operação (`RangeError`).


## br

Níveis cumulativos: `basic ⊆ advanced`.

Exports de `basic` (8): `formatCep`, `formatCpf`, `isBrazilianPhone`, `isCep`, `isCpf`, `mod10Digit`, `mod11Digit`, `onlyDigits`.

Exports de `advanced` (13): `cnpjCheckDigits`, `formatBrazilianPhone`, `formatCep`, `formatCnpj`, `formatCpf`, `isBrazilianPhone`, `isCep`, `isCnpj`, `isCpf`, `mod10Digit`, `mod11Digit`, `onlyDigits`, `validateBankAccount`.

### `formatCep`

Formata CEP brasileiro validado.

```ts
formatCep(value: string): string
```

Parâmetros:

- `value`: Valor de entrada.

Retorno: Resultado correspondente à finalidade documentada: formata CEP brasileiro validado.

Falhas:

- Quando a entrada viola o contrato da operação (`RangeError`).


### `formatCpf`

Formata CPF somente após validar onze dígitos.

```ts
formatCpf(value: string): string
```

Parâmetros:

- `value`: Valor de entrada.

Retorno: Resultado correspondente à finalidade documentada: formata CPF somente após validar onze dígitos.

Falhas:

- Quando a entrada viola o contrato da operação (`RangeError`).


### `isBrazilianPhone`

Valida telefone brasileiro com DDD e dez ou onze dígitos.

```ts
isBrazilianPhone(value: string): boolean
```

Parâmetros:

- `value`: Valor de entrada.

Retorno: `true` quando telefone brasileiro com DDD e dez ou onze dígitos; caso contrário, `false`.


### `isCep`

Valida CEP brasileiro de oito dígitos.

```ts
isCep(value: string): boolean
```

Parâmetros:

- `value`: Valor de entrada.

Retorno: `true` quando CEP brasileiro de oito dígitos; caso contrário, `false`.


### `isCpf`

Valida CPF numérico, inclusive dígitos verificadores.

```ts
isCpf(value: string): boolean
```

Parâmetros:

- `value`: Valor de entrada.

Retorno: `true` quando CPF numérico, inclusive dígitos verificadores; caso contrário, `false`.


### `mod10Digit`

Calcula dígito módulo 10 com pesos alternados 2/1 da direita.

```ts
mod10Digit(value: string): number
```

Parâmetros:

- `value`: Valor de entrada.

Retorno: Resultado correspondente à finalidade documentada: calcula dígito módulo 10 com pesos alternados 2/1 da direita.

Falhas:

- Quando a entrada viola o contrato da operação (`RangeError`).


### `mod11Digit`

Calcula módulo 11 com pesos cíclicos fornecidos da esquerda para a direita.

```ts
mod11Digit(value: string, weights: readonly number[], mapTenAndElevenToZero?: boolean): number
```

Parâmetros:

- `value`: Valor de entrada.
- `weights`: Pesos inteiros aplicados aos dígitos.
- `mapTenAndElevenToZero`: Indica se resultados dez e onze são convertidos em zero.

Retorno: Resultado correspondente à finalidade documentada: calcula módulo 11 com pesos cíclicos fornecidos da esquerda para a direita.

Falhas:

- Quando a entrada viola o contrato da operação (`RangeError`).


### `onlyDigits`

Remove pontuação e preserva somente dígitos.

```ts
onlyDigits(value: string): string
```

Parâmetros:

- `value`: Valor de entrada.

Retorno: Resultado correspondente à finalidade documentada: remove pontuação e preserva somente dígitos.


### `cnpjCheckDigits`

Calcula os dois dígitos de CNPJ numérico ou alfanumérico de base 12.

```ts
cnpjCheckDigits(base: string): string
```

Parâmetros:

- `base`: Valor-base da operação.

Retorno: Resultado correspondente à finalidade documentada: calcula os dois dígitos de CNPJ numérico ou alfanumérico de base 12.

Falhas:

- Quando a entrada viola o contrato da operação (`RangeError`).


### `formatBrazilianPhone`

Formata telefone brasileiro validado em padrão nacional.

```ts
formatBrazilianPhone(value: string): string
```

Parâmetros:

- `value`: Valor de entrada.

Retorno: Resultado correspondente à finalidade documentada: formata telefone brasileiro validado em padrão nacional.

Falhas:

- Quando a entrada viola o contrato da operação (`RangeError`).


### `formatCnpj`

Formata CNPJ sem ocultar letras do padrão alfanumérico.

```ts
formatCnpj(value: string): string
```

Parâmetros:

- `value`: Valor de entrada.

Retorno: Resultado correspondente à finalidade documentada: formata CNPJ sem ocultar letras do padrão alfanumérico.

Falhas:

- Quando a entrada viola o contrato da operação (`RangeError`).


### `isCnpj`

Valida CNPJ atual numérico ou padrão alfanumérico de 12 posições e dois DVs.

```ts
isCnpj(value: string): boolean
```

Parâmetros:

- `value`: Valor de entrada.

Retorno: `true` quando CNPJ atual numérico ou padrão alfanumérico de 12 posições e dois DVs; caso contrário, `false`.


### `validateBankAccount`

Valida conta por módulo escolhido e pesos explícitos quando usar módulo 11.

```ts
validateBankAccount(base: string, checkDigit: number, algorithm: "mod10" | "mod11", weights?: readonly number[] | undefined): boolean
```

Parâmetros:

- `base`: Valor-base da operação.
- `checkDigit`: Dígito verificador esperado.
- `algorithm`: Algoritmo de dígito verificador.
- `weights`: Pesos inteiros aplicados aos dígitos.

Retorno: `true` quando conta por módulo escolhido e pesos explícitos quando usar módulo 11; caso contrário, `false`.
