---
title: Redis
description: Como configurar o enodia para sondar o Redis.
---

Uma sonda de protocolo RESP bruto, não HTTP — `address` é `host` ou
`host:port`, sem esquema. A porta padrão é `6379` quando omitida. Lê
`redis_version` de `INFO server`.

```yaml
targets:
  - id: redis-main
    product: redis
    address: cache.example.com:6379
```

## Autenticação

Opcional — a maioria das implantações do Redis não tem `requirepass`, e o
enodia não tem como saber antecipadamente se uma determinada implantação
tem. Um alvo sem credencial configurada simplesmente tenta `INFO`
primeiro e só envia `AUTH` quando o servidor de fato rejeita a requisição
simples com `NOAUTH`.

```yaml
credentials:
  redis-auth:
    kind: password
    password: "${REDIS_PASSWORD}"

  # usuário ACL do Redis 6+ — defina também username
  redis-acl-user:
    kind: password
    username: enodia_ro
    password: "${REDIS_PASSWORD}"
```

Uma senha errada ou ausente, quando uma é exigida, aparece como erro de
autenticação (`NOAUTH`/`WRONGPASS`), como em qualquer outra sonda com
credenciais aqui.

## Campos registrados

Apenas `version` — esta sonda não registra nenhum campo `extra`.

## Correlação de CVEs

Correlacionado com o NVD e o BDU FSTEC quando um [bloco `cve:`](/pt-br/cve/) está configurado.

## Resolvedor de ciclo de vida

`endoflife:redis`.
