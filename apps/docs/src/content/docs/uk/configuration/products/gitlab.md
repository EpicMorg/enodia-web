---
title: GitLab
description: Налаштування enodia для опитування GitLab.
---

Читає версію з `GET /api/v4/version`.

```yaml
targets:
  - id: gitlab-main
    product: gitlab
    address: https://gitlab.example.com
    credentials: gitlab-token
```

## Автентифікація

Типово GitLab вимагає облікові дані для цього ендпоінта — неавтентифікований
запит отримує `401`. Персональний токен доступу працює обома способами,
підтверджено наживо на справжньому екземплярі:

```yaml
credentials:
  gitlab-token:
    kind: token-header
    header: PRIVATE-TOKEN
    value: "${GITLAB_TOKEN}"

  # так само коректно — той самий токен як звичайний bearer-токен
  gitlab-token-bearer:
    kind: bearer
    value: "${GITLAB_TOKEN}"
```

## Записувані поля

- `version`
- `extra.revision`, якщо є
- `extra.enterprise` — `"true"`/`"false"`, GitLab EE чи CE

## Зіставлення з CVE

Зіставляється з NVD і БДУ ФСТЕК, якщо налаштовано [блок `cve:`](/uk/cve/). З урахуванням редакції: проба записує власну редакцію сервера в `extra.enterprise`, і екземпляр community-редакції не бачить знахідок, що стосуються лише enterprise-редакції. Якщо редакція невідома, зберігаються всі знахідки.

## Резолвер життєвого циклу

`endoflife:gitlab`.
