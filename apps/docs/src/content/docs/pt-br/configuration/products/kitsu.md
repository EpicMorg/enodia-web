---
title: Kitsu
description: Como configurar o enodia para sondar o Kitsu (o frontend de acompanhamento de produção da CG-Wire).
---

"Kitsu" é a marca mais conhecida da stack de acompanhamento de produção
da CG-Wire, mas o Kitsu em si é um frontend Vue.js **sem endpoint de
versão próprio**. Quem de fato responde a `GET /api/status` — confirmado
ao vivo, inclusive em um host literalmente chamado "kitsu" no DNS — é o
[Zou](/pt-br/configuration/products/zou/), o backend de API com o qual o
Kitsu conversa. Aponte `address` para esse mesmo backend, exatamente como
faria para `product: zou` — não existe uma URL separada do "Kitsu" para
configurar.

```yaml
targets:
  - id: kitsu-main
    product: kitsu
    address: https://kitsu.example.com
```

## Autenticação

Nenhuma — o endpoint não aceita nenhum tipo de credencial.

## Por que `kitsu` é um produto separado de `zou`, e não um alias

Ambos apontam para o mesmo backend Zou e o mesmo endpoint, mas precisam
de **resolvedores de ciclo de vida diferentes**: o repositório GitHub do
próprio `cgwire/zou` publica apenas tags git simples (confirmado ao vivo
— a sua API de Releases retorna uma lista vazia), que o resolvedor de
GitHub Releases do enodia não consegue ler. O `cgwire/kitsu` tem GitHub
Releases de verdade, e é o que uma implantação que se vê como "rodando o
Kitsu" realmente quer acompanhar. Os números de versão dos dois
repositórios de fato divergem (o backend Zou está à frente do Kitsu),
então comparar sob o nome `zou`, "tecnicamente mais preciso",
compararia silenciosamente com os números do componente errado — daí dois
produtos registrados compartilhando uma única implementação de sonda, e
não um produto com um alias.

## Campos registrados

- `version`
- `extra.databaseUp`, `extra.keyValueStoreUp`, `extra.eventStreamUp`,
  `extra.jobQueueUp`, `extra.indexerUp` — indicadores de saúde dos
  componentes, `"true"`/`"false"`

## Correlação de CVEs

Sem correlação — nenhum dos dois bancos de dados tem dados utilizáveis para ele. Consulte [Correlação de CVEs](/pt-br/cve/#quais-produtos-têm-correspondência).

## Resolvedor de ciclo de vida

`github:cgwire/kitsu` — apenas o release mais recente do GitHub; sem
dados de eol/support/lts (o GitHub não tem opinião sobre política de
ciclo de vida, apenas sobre "qual é a tag mais recente").
