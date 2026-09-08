---
title: GitLab
description: Настройка enodia для опроса GitLab.
---

Читает `GET /api/v4/version` для получения версии.

```yaml
targets:
  - id: gitlab-main
    product: gitlab
    address: https://gitlab.example.com
    credentials: gitlab-token
```

## Аутентификация

GitLab по умолчанию требует credential для этого эндпоинта —
неаутентифицированный запрос получает `401`. Personal access token
работает в обоих вариантах, подтверждено на реальном инстансе:

```yaml
credentials:
  gitlab-token:
    kind: token-header
    header: PRIVATE-TOKEN
    value: "${GITLAB_TOKEN}"

  # тоже валидно — тот же токен как обычный bearer-токен
  gitlab-token-bearer:
    kind: bearer
    value: "${GITLAB_TOKEN}"
```

## Записываемые поля

- `version`
- `extra.revision`, если присутствует
- `extra.enterprise` — `"true"`/`"false"`, GitLab EE или CE

## Резолвер жизненного цикла

`endoflife:gitlab`.
