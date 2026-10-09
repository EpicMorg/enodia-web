---
title: Home Assistant
description: Настройка enodia для опроса Home Assistant.
---

Читает `GET /api/config` из REST API Home Assistant с долгоживущим
токеном доступа. В качестве `product:` принимается и псевдоним
`homeassistant`.

```yaml
targets:
  - id: home-assistant-main
    product: home-assistant
    address: https://home-assistant.example.com
    credentials: ha-token
```

## Аутентификация — обязательна

Ни один анонимный эндпоинт не содержит версии Home Assistant: `/api/` и
`/api/config` отвечают `401`, а в `/manifest.json`, `/auth/providers` и
эндпоинтах онбординга её нет (подтверждено вживую на
`ghcr.io/home-assistant/home-assistant:stable` 2026.10.0).
Документированный способ аутентификации в REST API — долгоживущий токен
доступа (Профиль → Безопасность → Долгоживущие токены доступа),
передаваемый как `Authorization: Bearer`:

```yaml
credentials:
  ha-token:
    kind: bearer
    value: "${HOME_ASSISTANT_TOKEN}"
```

Принимается только `bearer`; любой другой `kind` — ошибка конфигурации.
См. [Конфигурация → Credentials](/ru/configuration/#credentials).

## Что читается

`/api/config` возвращает также координаты дома, пути и URL. Ничего из
этого не читается — только `version`, `state` и флаги безопасного
режима / режима восстановления.

## Записываемые поля

- `version` — например `2026.10.0`
- `extra.state` — например `RUNNING`
- `extra.recoveryMode` — `true`, если Home Assistant сообщает о
  безопасном режиме или режиме восстановления; иначе отсутствует

## Сопоставление с CVE

Сверяется с NVD, если настроен [блок `cve:`](/ru/cve/).

## Резолвер жизненного цикла

`github:home-assistant/core` — у endoflife.date нет календаря для Home
Assistant (подтверждено 404), поэтому резолвинг идёт через GitHub
Releases: только последний опубликованный, не pre-release тег, без
данных по eol/support/lts (у GitHub нет мнения о политике жизненного
цикла, только «какой релиз последний»). Релиз, тег которого обозначает
pre-release (`2026.10.0b7`), пропускается, даже если GitHub не помечает
его как таковой.
