---
title: Bitbucket
description: Настройка enodia для опроса Atlassian Bitbucket (Data Center).
---

**Только Data Center** — Atlassian Cloud не отдаёт эндпоинт, который
читает эта проба. Читает `GET /rest/applinks/1.0/manifest` — тот же
manifest Application Links, что отдаёт любой продукт Atlassian Data
Center — анонимный эндпоинт, поэтому используется он, а не
`/rest/api/2/serverInfo`.

```yaml
targets:
  - id: bitbucket-main
    product: bitbucket
    address: https://bitbucket.example.com
```

## Аутентификация

Опционально — manifest читается без credentials. `none`, `basic` и
`bearer` тоже принимаются, если вы всё же хотите аутентифицироваться.

## Проверка личности вендора

`<typeId>` из manifest сверяется с тем, что ожидает `product: bitbucket`.
**Собственный manifest Bitbucket всё ещё сообщает о себе как `stash`** —
его прежнее имя до ребрендинга Atlassian — поэтому `typeId: stash` здесь
и есть правильное, ожидаемое значение; это ответ вендора, а не
странность enodia. Если по адресу на самом деле оказалась Jira или
Confluence, проба всё равно громко откажет вместо того, чтобы записать
это как неверный факт — см. [Jira](/ru/configuration/products/jira/),
[Confluence](/ru/configuration/products/confluence/),
[Bamboo](/ru/configuration/products/bamboo/) — соседние продукты с той
же конвенцией manifest.

## Записываемые поля

- `version`
- `extra.buildNumber`, `extra.typeId` — `typeId` будет равен `stash`, а
  не `bitbucket`

## Резолвер жизненного цикла

`endoflife:bitbucket`.
