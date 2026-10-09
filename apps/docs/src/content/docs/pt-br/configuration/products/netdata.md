---
title: Netdata
description: Como configurar o enodia para sondar o Netdata.
---

Lê o `GET /api/v1/info` do agente, servido sem login por padrão. O
esquema padrão é `https`.

```yaml
targets:
  - id: netdata-01
    product: netdata
    address: https://netdata-01.example.com
```

## O que é lido

A resposta começa com `"version": "v2.12.1"`, com `release-channel` ao
lado. O restante descreve o host — uid, kernel, labels, hardware, nuvem —
e nada disso descreve o software em si, então apenas a versão e o canal
de lançamento são lidos. Uma resposta sem `version` é relatada como não
suportada (não é um Netdata).

## Autenticação

Opcional — o agente responde anonimamente por padrão. `basic` ou `bearer`
são repassados quando configurados, para um agente atrás de um proxy que
os peça; desde a 2.2.0, qualquer outro tipo é um erro de configuração.
Consulte [Configuração → Credenciais](/pt-br/configuration/#credenciais).

```yaml
credentials:
  netdata-proxy:
    kind: basic
    username: enodia
    password: "${NETDATA_PROXY_PASSWORD}"
```

## Campos registrados

- `version` — como o agente a informa, por exemplo `v2.12.1` (confirmado
  ao vivo em `netdata/netdata:stable`)
- `extra.releaseChannel` — por exemplo `stable` ou `nightly`, quando
  presente

## Correlação de CVEs

Correlacionado com o NVD e o BDU FSTEC quando um [bloco `cve:`](/pt-br/cve/)
está configurado.

## Resolvedor de ciclo de vida

`github:netdata/netdata` — o endoflife.date não tem um calendário do
Netdata (404 confirmado), então a resolução é feita pelos GitHub
Releases: apenas a tag publicada mais recente que não seja pré-lançamento,
sem datas de eol/support/lts (o GitHub não tem opinião sobre política de
ciclo de vida, apenas sobre "qual é o lançamento mais recente").
