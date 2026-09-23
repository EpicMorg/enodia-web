---
title: ClickHouse
description: Como configurar o enodia para sondar o ClickHouse.
---

Executa `SELECT version()` na interface HTTP do ClickHouse (porta 8123
por padrão) e lê a resposta em texto simples.

```yaml
targets:
  - id: clickhouse-main
    product: clickhouse
    address: https://clickhouse.example.com:8123
```

## Autenticação

Opcional. Imagens recentes exigem que `CLICKHOUSE_PASSWORD` esteja
definido — não há senha em branco do usuário padrão como alternativa, ao
contrário de instalações mais antigas —, então uma requisição sem
autenticação contra uma instância endurecida recebe um `401` comum,
tratado da mesma forma que em qualquer outra sonda:

```yaml
credentials:
  clickhouse-default:
    kind: basic
    username: default
    password: "${CLICKHOUSE_PASSWORD}"
```

Se uma determinada implantação precisa ou não de credenciais depende
inteiramente de como ela foi configurada.

## Campos registrados

Apenas `version` — esta sonda não registra nenhum campo `extra`.

## Correlação de CVEs

Correlacionado com o NVD e o BDU FSTEC quando um [bloco `cve:`](/pt-br/cve/) está configurado.

## Resolvedor de ciclo de vida

`endoflife:clickhouse`.
