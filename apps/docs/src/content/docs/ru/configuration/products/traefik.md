---
title: Traefik
description: Настройка enodia для опроса Traefik.
---

Читает `GET /api/version`.

```yaml
targets:
  - id: traefik-main
    product: traefik
    address: https://traefik.example.com
```

## Аутентификация

Опционально. Подтверждено вживую на реальном контейнере `traefik:v3.1`:
если API-роутер вообще включён (по умолчанию выключен — ни `--api`, ни
`--api.insecure` не установлены на стандартном инстансе) под
`--api.insecure=true`, этот эндпоинт не требует credentials. Установка,
которая вместо этого подключает API-роутер за собственным мидлваром
Basic/Digest-аутентификации (документированный у Traefik «безопасный»
способ его открыть), отвечает обычными вызовами HTTP Basic:

```yaml
credentials:
  traefik-basic:
    kind: basic
    username: admin
    password: "${TRAEFIK_PASSWORD}"
```

Инстанс с вообще не включённым API отвечает здесь `404`, неотличимо от
неверного адреса.

## Записываемые поля

Только `version` — эта проба не записывает никаких полей `extra`
(`Codename` и `startDate` описывают релиз, а не установку, и не
читаются).

## Резолвер жизненного цикла

`endoflife:traefik`.
