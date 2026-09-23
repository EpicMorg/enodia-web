---
title: PostgreSQL
description: Como configurar o enodia para sondar o PostgreSQL.
---

Uma sonda de protocolo de rede bruto, não HTTP — `address` é `host` ou
`host:port`, sem esquema. A porta padrão é `5432` quando omitida.
`product: postgres` também é aceito como alias de `postgresql`.

A versão vem de uma mensagem `ParameterStatus` que todo backend
PostgreSQL envia automaticamente logo após a autenticação ser
bem-sucedida — sem necessidade de uma consulta explícita
`SHOW server_version`.

```yaml
targets:
  - id: pg-main
    product: postgresql
    address: db.example.com:5432
    credentials: pg-app
```

## Autenticação

Necessária apenas se o servidor realmente pedir — a autenticação trust
não precisa de credencial alguma. Quando ele pede, **trust, cleartext,
MD5 e SCRAM-SHA-256 são todos suportados e negociados automaticamente** —
incluindo o SCRAM-SHA-256, o padrão no PostgreSQL 14+ e comum do 10 ao
13, sem o qual a maioria das implantações reais seria inacessível.

```yaml
credentials:
  pg-app:
    kind: password
    username: enodia_ro   # opcional — o padrão é "postgres" se omitido
    password: "${PG_PASSWORD}"
```

O banco de dados ao qual a conexão é feita tem, por padrão, o mesmo valor
do nome de usuário (padrão do lado do servidor) — atualmente não há campo
de configuração para apontar explicitamente para outro nome de banco de
dados.

## Correlação de CVEs

Correlacionado com o NVD e o BDU FSTEC quando um [bloco `cve:`](/pt-br/cve/) está configurado.

## Resolvedor de ciclo de vida

`endoflife:postgresql`.
