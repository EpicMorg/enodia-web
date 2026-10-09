---
title: TorrServer
description: Como configurar o enodia para sondar o TorrServer.
---

Lê `GET /echo`, ao qual o TorrServer responde com a sua versão em texto
puro. O esquema padrão é `https`.

```yaml
targets:
  - id: torrserver-main
    product: torrserver
    address: https://torrserver.example.com
```

## Formato da versão

`/echo` responde, por exemplo, `MatriX.146` — um codinome e um número, na
mesma grafia das tags de lançamento do TorrServer no GitHub (`MatriX.146`,
`MatriX.145.2`). A versão é registrada como está; a comparação usa os
números depois do codinome, dos dois lados. Uma resposta que não tenha
esse formato (uma página HTML, por exemplo) é relatada como não
suportada.

## Autenticação

Opcional. `basic` é enviado se configurado, para uma instância com a sua
própria autenticação ativada; sem nenhuma configurada, a requisição é
anônima. `basic` é o único tipo aceito — desde a 2.2.0, qualquer outro
tipo é um erro de configuração. Consulte
[Configuração → Credenciais](/pt-br/configuration/#credenciais).

```yaml
credentials:
  torrserver-auth:
    kind: basic
    username: admin
    password: "${TORRSERVER_PASSWORD}"
```

## Campos registrados

Apenas `version` — por exemplo `MatriX.146` (o que um
`ghcr.io/yourok/torrserver:latest` ao vivo respondeu em `/echo`). Esta
sonda não registra nenhum campo `extra`.

## Correlação de CVEs

Sem correlação — nenhum dos dois bancos de dados tem dados utilizáveis
para ele. Consulte
[Correlação de CVEs](/pt-br/cve/#quais-produtos-têm-correspondência).

## Resolvedor de ciclo de vida

`github:YouROK/TorrServer` — o endoflife.date não tem um calendário do
TorrServer (404 confirmado), então a resolução é feita pelos GitHub
Releases: apenas a tag publicada mais recente que não seja pré-lançamento,
sem datas de eol/support/lts (o GitHub não tem opinião sobre política de
ciclo de vida, apenas sobre "qual é o lançamento mais recente").
