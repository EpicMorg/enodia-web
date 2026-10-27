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

## Banco de dados

A sonda pede o banco de dados `postgres`, que todo servidor tem e que
concede `CONNECT` a todos — então uma role que tem apenas `LOGIN` revela a
versão sem precisar de um banco de dados próprio. Para um servidor sem o
banco de dados `postgres`, indique outro em `options.database`:

```yaml
targets:
  - id: pg-main
    product: postgresql
    address: db.example.com:5432
    credentials: pg-app
    options:
      database: inventory
```

:::caution[Alterado na 2.2.1]
Até a 2.2.0, a sonda pedia um banco de dados com o nome do usuário de
login, então uma role apenas com login falhava com
`database "<user>" does not exist`. Um alvo que dependia disso agora
precisa indicar o seu banco de dados em `options.database`.
:::

## Correlação de CVEs

Correlacionado com o NVD e o BDU FSTEC quando um [bloco `cve:`](/pt-br/cve/) está configurado. Desde a 2.2, o `cve.postgresql.path`
adiciona as próprias páginas de segurança do projeto, que indicam a
correção por major: para um major que as páginas salvas indicam, o
veredito delas substitui os intervalos sem ramo do BDU, que de outra forma
marcam a última versão de todos os majors mais antigos. Consulte
[Dados dos próprios fornecedores → PostgreSQL](/pt-br/cve/#postgresql).

## Resolvedor de ciclo de vida

`endoflife:postgresql`.
