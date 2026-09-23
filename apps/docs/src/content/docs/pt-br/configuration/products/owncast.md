---
title: Owncast
description: Como configurar o enodia para sondar o Owncast.
---

Lê `GET /api/status` para obter a versão.

```yaml
targets:
  - id: owncast-main
    product: owncast
    address: https://owncast.example.com
```

## Autenticação

Nenhuma — a rota não tem nenhum middleware que exija autenticação no
código-fonte do próprio Owncast, confirmado com um contêiner
`owncast/owncast:latest` ativo.

## Campos registrados

- `version` — a partir de `versionNumber`
- `extra.online` — `"true"`/`"false"`

## Correlação de CVEs

Correlacionado com o NVD quando um [bloco `cve:`](/pt-br/cve/) está configurado.

## Resolvedor de ciclo de vida

`github:owncast/owncast` — o endoflife.date não tem um calendário do
Owncast (404 confirmado), então a resolução é feita pelos GitHub
Releases: apenas a tag publicada mais recente que não seja pré-lançamento,
sem datas de eol/support/lts (o GitHub não tem opinião sobre política de
ciclo de vida, apenas sobre "qual é o lançamento mais recente").
