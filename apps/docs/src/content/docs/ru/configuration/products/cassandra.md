---
title: Apache Cassandra
description: Настройка enodia для опроса Apache Cassandra.
---

Проба на нативном протоколе CQL, не HTTP — `address` это `host` или
`host:port`, без схемы. Порт по умолчанию — `9042`, если не указан.
Читает `release_version` запросом `SELECT release_version FROM system.local`.

```yaml
targets:
  - id: cassandra-01
    product: cassandra
    address: cassandra-01.example.com:9042
```

## Протокол

HTTP API у Cassandra нет, поэтому enodia говорит на CQL напрямую, без
драйвера: `STARTUP`, затем — только если сервер ответил `AUTHENTICATE` —
один ответ SASL PLAIN, затем единственный запрос. `OPTIONS`/`SUPPORTED`,
единственный обмен до аутентификации, содержит версии CQL и протокола, но
не версию самого сервера. Используется протокол v4, потому что на нём
говорит любая поддерживаемая Cassandra: 3.x, 4.x и 5.0 его принимают, а
3.11 отказывается от v5. Cassandra 2.x (максимум v3) давно вне поддержки,
и с ней проба не работает.

## Аутентификация

Опционально, `kind: password` — отправляется, только если кластер её
запрашивает (`PasswordAuthenticator`). См.
[Конфигурация → Credentials](/ru/configuration/#credentials).

```yaml
credentials:
  cassandra-ro:
    kind: password
    username: enodia_ro
    password: "${CASSANDRA_PASSWORD}"
```

Если кластер требует аутентификацию, а credential не настроен, это
ошибка аутентификации с именем его аутентификатора; отклонённые
credentials — тоже ошибка аутентификации.

## Записываемые поля

Только `version` — например, `5.0.9` или `3.11.19`. Эта проба не
записывает никаких полей `extra`.

## Сопоставление с CVE

Сверяется с NVD и БДУ ФСТЭК, если настроен [блок `cve:`](/ru/cve/).

## Резолвер жизненного цикла

`endoflife:apache-cassandra`.
