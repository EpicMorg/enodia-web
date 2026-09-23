---
title: Zou
description: Como configurar o enodia para sondar o Zou (backend de API da CG-Wire).
---

Lê `GET /api/status` para obter a versão — o backend de API real por trás
da stack de acompanhamento de produção da CG-Wire, mais conhecida pela
marca [Kitsu](/pt-br/configuration/products/kitsu/), o seu frontend Vue.js,
que não tem endpoint de versão próprio.

```yaml
targets:
  - id: zou-main
    product: zou
    address: https://kitsu.example.com
```

## Autenticação

Nenhuma — o endpoint não aceita nenhum tipo de credencial.

## Verificação da identidade do fornecedor

O campo `name` da resposta é comparado com `"Zou"` — o mesmo raciocínio
das sondas da Atlassian e do Jellyfin: nomear o produto explicitamente na
configuração serve para detectar uma URL apontada para o serviço errado.

## `zou` vs. `kitsu` — mesma sonda, resolvedores diferentes, não um alias

`product: kitsu` consulta o mesmo endpoint e a mesma implementação de
sonda — consulte [a página dele](/pt-br/configuration/products/kitsu/) para
saber por que os dois são registrados como produtos separados em vez de um
produto com um alias: o repositório GitHub do próprio `zou` não publica
Releases utilizáveis (apenas tags git simples, confirmado ao vivo), então
`product: zou` fica sem resolvedor, em vez de arriscar comparar com os
números de versão do componente errado.

## Campos registrados

- `version`
- `extra.databaseUp`, `extra.keyValueStoreUp`, `extra.eventStreamUp`,
  `extra.jobQueueUp`, `extra.indexerUp` — indicadores de saúde dos
  componentes, `"true"`/`"false"`

## Correlação de CVEs

Sem correlação — nenhum dos dois bancos de dados tem dados utilizáveis para ele. Consulte [Correlação de CVEs](/pt-br/cve/#quais-produtos-têm-correspondência).

## Resolvedor de ciclo de vida

Nenhum — o repositório GitHub `cgwire/zou` não tem Releases utilizáveis
para resolver (confirmado ao vivo: a sua API de Releases retorna uma lista
vazia — apenas tags git simples). Se você vê a sua implantação como
"rodando o Kitsu" em vez de "rodando o Zou", `product: kitsu` oferece um
resolvedor real contra `cgwire/kitsu`, apontado para exatamente este
mesmo backend.
