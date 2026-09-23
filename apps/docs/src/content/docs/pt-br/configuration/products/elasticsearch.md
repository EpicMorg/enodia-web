---
title: Elasticsearch
description: Como configurar o enodia para sondar o Elasticsearch.
---

Lê `GET /` para obter a versão.

```yaml
targets:
  - id: es-main
    product: elasticsearch
    address: https://es.example.com:9200
```

## Autenticação

Opcional. Desde o Elasticsearch 8.0, a segurança (HTTPS mais autenticação
Basic/Bearer/ApiKey) vem ativada por padrão — uma requisição anônima
recebe um `401` anunciando os três esquemas. A autenticação Basic com o
superusuário `elastic` é o único esquema de fato testado e oferecido aqui:

```yaml
credentials:
  es-elastic:
    kind: basic
    username: elastic
    password: "${ES_PASSWORD}"
```

Um cluster iniciado com `xpack.security.enabled=false` — uma configuração
real e documentada — responde à mesma requisição anonimamente, via HTTP
simples, com um corpo idêntico; nesse caso nenhuma credencial é
necessária.

## Campos registrados

- `version` — a partir de `version.number`
- `extra.clusterName`, `extra.luceneVersion`, `extra.buildHash`

## Correlação de CVEs

Correlacionado com o NVD e o BDU FSTEC quando um [bloco `cve:`](/pt-br/cve/) está configurado.

## Resolvedor de ciclo de vida

`endoflife:elasticsearch`.
