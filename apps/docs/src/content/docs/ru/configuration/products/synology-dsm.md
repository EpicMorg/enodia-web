---
title: Synology DSM
description: Настройка enodia для опроса Synology DSM.
---

Входит через собственный Web API Synology (`SYNO.API.Auth`), затем
читает `SYNO.DSM.Info` для получения версии, используя полученную
сессию — единственная HTTP-проба в enodia, которой нужен настоящий шаг
входа, а не статический credential.

```yaml
targets:
  - id: nas-main
    product: synology-dsm
    address: https://nas.example.com:5001
    credentials: synology-admin
```

## Аутентификация — обязательна, username и password

```yaml
credentials:
  synology-admin:
    kind: password
    username: enodia-ro
    password: "${SYNOLOGY_PASSWORD}"
```

Подтверждено вживую: `SYNO.DSM.Info` всегда отвечает
`{"error":{"code":119}}` («нет сессии») без session id и, если включена
защита CSRF, без `SynoToken` — ни то, ни другое нельзя получить без
предварительного вызова метода входа `SYNO.API.Auth` с реальным
аккаунтом и паролем. Это заметно более лёгкий случай, чем полноценный
вход через HTML-форму: обычный JSON API, принимающий username/password
как обычные параметры и возвращающий session id как обычное поле JSON,
без cookie-jar и без вычитывания CSRF-токена со страницы. За чтением
версии следует best-effort logout, чтобы сборы данных не накапливали
открытые сессии на NAS от запуска к запуску.

Ошибки аутентификации здесь вообще не используют HTTP-коды статуса:
любой вызов Web API Synology отвечает `200` даже при неудаче, с
`success: false` в теле — подтверждено вживую, поэтому эта проба
проверяет тело, а не код статуса, чтобы обнаружить отклонённый вход.

## Записываемые поля

Только `version` — разобрано из формы `"DSM <version> Update <n>"` поля
`version_string`, например `"DSM 7.3.2-86009 Update 4"` → `7.3.2-86009`.

## Резолвер жизненного цикла

Отсутствует — у endoflife.date нет календаря ни под `synology-dsm`, ни
под `synology` или `dsm` (подтверждено 404). Пока только
инвентаризация.
