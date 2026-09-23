---
title: Graylog
description: Como configurar o enodia para sondar o Graylog.
---

Lê `GET /api/` — o recurso raiz da própria API REST, um documento público
de descoberta que todo nó do Graylog responde sem credenciais.

```yaml
targets:
  - id: graylog-main
    product: graylog
    address: https://graylog.example.com
```

## Autenticação

Nenhuma — confirmado ao vivo com um contêiner `graylog/graylog` real
(mais o MongoDB e o Elasticsearch dos quais ele depende): a raiz responde
anonimamente.

## Campos registrados

Apenas `version` — esta sonda não registra nenhum campo `extra`.

## Correlação de CVEs

Correlacionado com o NVD e o BDU FSTEC quando um [bloco `cve:`](/pt-br/cve/) está configurado.

## Resolvedor de ciclo de vida

`endoflife:graylog`.
