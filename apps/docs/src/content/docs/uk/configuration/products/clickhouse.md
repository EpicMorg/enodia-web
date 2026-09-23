---
title: ClickHouse
description: Налаштування enodia для опитування ClickHouse.
---

Виконує `SELECT version()` через HTTP-інтерфейс ClickHouse (типово порт
8123) і читає відповідь у вигляді простого тексту.

```yaml
targets:
  - id: clickhouse-main
    product: clickhouse
    address: https://clickhouse.example.com:8123
```

## Автентифікація

Необовʼязкова. Свіжі образи взагалі вимагають задати `CLICKHOUSE_PASSWORD` —
на відміну від старіших інсталяцій, порожнього пароля типового користувача,
до якого можна було б відступити, немає, — тож неавтентифікований запит до
захищеного екземпляра отримує звичайний `401`, який обробляється так само,
як і в будь-якій іншій пробі:

```yaml
credentials:
  clickhouse-default:
    kind: basic
    username: default
    password: "${CLICKHOUSE_PASSWORD}"
```

Чи потрібні облікові дані конкретному розгортанню, повністю залежить від
того, як його налаштовано.

## Записувані поля

Лише `version` — ця проба не записує полів `extra`.

## Зіставлення з CVE

Зіставляється з NVD і БДУ ФСТЕК, якщо налаштовано [блок `cve:`](/uk/cve/).

## Резолвер життєвого циклу

`endoflife:clickhouse`.
