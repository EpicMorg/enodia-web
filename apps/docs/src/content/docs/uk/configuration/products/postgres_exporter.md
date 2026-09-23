---
title: postgres_exporter
description: Налаштування enodia для опитування prometheus-community/postgres_exporter.
---

Читає gauge `postgres_exporter_build_info` з `/metrics` — «version
collector» із `prometheus/common`, який кожен експортер Prometheus у цій
екосистемі надає однаково (константа `1`, а версія — у мітці, а не у
значенні). Як псевдонім приймається `product: postgres-exporter`.

```yaml
targets:
  - id: postgres-exporter-main
    product: postgres_exporter
    address: https://exporter.example.com:9187
```

## Автентифікація

Необовʼязкова — `/metrics` за замовчуванням не потребує облікових даних і
відповідає навіть тоді, коли сам цільовий PostgreSQL недосяжний (`build_info`
описує бінарний файл експортера, а не базу даних, з якої він збирає метрики).
`exporter-toolkit` (бібліотека, що стоїть за `--web.config.file`) може додати
до цього ендпоінта HTTP Basic:

```yaml
credentials:
  postgres-exporter-basic:
    kind: basic
    username: metrics
    password: "${EXPORTER_PASSWORD}"
```

## Записувані поля

Лише `version` — ця проба не записує полів `extra`.

## Зіставлення з CVE

Не зіставляється — жодна з баз не має придатних для цього даних. Див. [Зіставлення з CVE](/uk/cve/#які-продукти-зіставляються).

## Резолвер життєвого циклу

`github:prometheus-community/postgres_exporter` — це експортер Prometheus,
а не продукт із власною політикою життєвого циклу/EOL, тому резолвінг
виконується через GitHub Releases: лише останній опублікований тег, що не є
пре-релізом, без дат eol/support/lts.
