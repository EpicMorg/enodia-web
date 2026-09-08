---
title: postgres_exporter
description: Настройка enodia для опроса prometheus-community/postgres_exporter.
---

Читает gauge-метрику `postgres_exporter_build_info` из `/metrics` —
«коллектор версии» из `prometheus/common`, который одинаково отдаёт
любой экспортёр Prometheus в этой экосистеме (константа `1`, версия — в
метке, а не в значении). `product: postgres-exporter` принимается как
алиас.

```yaml
targets:
  - id: postgres-exporter-main
    product: postgres_exporter
    address: https://exporter.example.com:9187
```

## Аутентификация

Опционально — `/metrics` по умолчанию не требует credentials и отвечает
даже тогда, когда сам целевой PostgreSQL недостижим (`build_info`
описывает бинарник экспортёра, а не базу, которую он опрашивает).
`exporter-toolkit` (библиотека за `--web.config.file`) может добавить
HTTP Basic на этот эндпоинт:

```yaml
credentials:
  postgres-exporter-basic:
    kind: basic
    username: metrics
    password: "${EXPORTER_PASSWORD}"
```

## Записываемые поля

Только `version` — эта проба не записывает никаких полей `extra`.

## Резолвер жизненного цикла

`github:prometheus-community/postgres_exporter` — это экспортёр
Prometheus, а не продукт с собственной политикой жизненного
цикла/EOL, поэтому резолвинг идёт через GitHub Releases: только
последний опубликованный, не pre-release тег, без данных по
eol/support/lts.
