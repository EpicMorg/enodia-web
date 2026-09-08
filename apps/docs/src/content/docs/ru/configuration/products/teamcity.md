---
title: TeamCity
description: Настройка enodia для опроса JetBrains TeamCity.
---

Читает `GET /app/rest/server` — точку входа, на которую первым делом
указывает собственный справочник REST API TeamCity, — для получения
версии.

```yaml
targets:
  - id: teamcity-main
    product: teamcity
    address: https://teamcity.example.com
    credentials: teamcity-pat
```

## Аутентификация — обязательна, и её легко перепутать местами

Анонимного доступа по умолчанию нет — свежий инстанс отвечает `401` с
вызовами и Basic, и Bearer (гостевой вход по умолчанию выключен). У
TeamCity **два разных вида токена, подтверждено вживую, и они работают
только как противоположные виды credential**:

- Одноразовый **bootstrap-токен суперпользователя**, который свежий
  сервер выводит в лог при первом запуске, работает только как
  **Basic** — пустой username, токен вместо пароля. Отправленный как
  обычный `Authorization: Bearer`, он отклоняется.
- Personal access token обычного пользователя (Profile → Access
  Tokens — способ, которым реально аутентифицируется долгоживущая
  автоматизация) — наоборот: подтверждено на семи реальных
  продакшн-инстансах, он работает как **Bearer** и однозначно
  отклоняется как Basic («Incorrect username or password» даже с пустым
  username).

```yaml
credentials:
  # bootstrap-токен — Basic, пустой username
  teamcity-bootstrap:
    kind: basic
    username: ""
    password: "${TEAMCITY_BOOTSTRAP_TOKEN}"

  # personal access token — Bearer
  teamcity-pat:
    kind: bearer
    value: "${TEAMCITY_TOKEN}"
```

Используйте personal access token в любом долгоживущем конфиге —
bootstrap-токен предназначен для того, чтобы его отозвали сразу после
первого входа.

## Записываемые поля

- `version` — полная строка, например `2026.2 (build 238924)`
- `extra.buildNumber`, `extra.internalId`

## Резолвер жизненного цикла

Отсутствует — у endoflife.date нет календаря для TeamCity (подтверждено
404). Пока только инвентаризация.
