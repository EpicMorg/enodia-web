---
title: Apache Cassandra
description: Налаштування enodia для опитування Apache Cassandra.
---

Проба на нативному протоколі CQL, а не HTTP — `address` має вигляд `host`
або `host:port`, без схеми. Якщо порт не вказано, використовується `9042`.
Читає `release_version` запитом `SELECT release_version FROM system.local`.

```yaml
targets:
  - id: cassandra-01
    product: cassandra
    address: cassandra-01.example.com:9042
```

## Протокол

Cassandra не має HTTP API, тому enodia говорить CQL напряму, без
драйвера: `STARTUP`, потім — лише якщо сервер відповідає `AUTHENTICATE` —
одна відповідь SASL PLAIN, а потім єдиний запит. `OPTIONS`/`SUPPORTED`,
єдиний обмін до автентифікації, містить версії CQL і протоколу, але не
версію самого сервера. Використовується протокол v4, бо його підтримує
кожна підтримувана Cassandra: 3.x, 4.x і 5.0 його приймають, тоді як 3.11
відхиляє v5. Cassandra 2.x (щонайбільше v3) давно поза підтримкою, і
спроби з нею не робляться.

## Автентифікація

Необовʼязкова, `kind: password` — надсилається лише тоді, коли кластер її
вимагає (`PasswordAuthenticator`). Див.
[Конфігурація → Облікові дані](/uk/configuration/#облікові-дані).

```yaml
credentials:
  cassandra-ro:
    kind: password
    username: enodia_ro
    password: "${CASSANDRA_PASSWORD}"
```

Кластер, що вимагає автентифікації, коли облікові дані не налаштовано,
завершується помилкою автентифікації з назвою свого автентифікатора;
відхилені облікові дані — теж помилка автентифікації.

## Записувані поля

Лише `version` — напр. `5.0.9` або `3.11.19`. Ця проба не записує полів
`extra`.

## Зіставлення з CVE

Зіставляється з NVD і БДУ ФСТЕК, якщо налаштовано [блок `cve:`](/uk/cve/).

## Резолвер життєвого циклу

`endoflife:apache-cassandra`.
