---
title: Bamboo
description: Настройка enodia для опроса Atlassian Bamboo (Data Center).
---

**Только Data Center** — Atlassian Cloud не отдаёт эндпоинт, который
читает эта проба. Читает `GET /rest/applinks/1.0/manifest` — тот же
manifest Application Links, что отдаёт любой продукт Atlassian Data
Center — анонимный эндпоинт, поэтому используется он, а не
`/rest/api/2/serverInfo`.

```yaml
targets:
  - id: bamboo-main
    product: bamboo
    address: https://bamboo.example.com
```

## Аутентификация

Опционально — manifest читается без credentials. `none`, `basic` и
`bearer` тоже принимаются, если вы всё же хотите аутентифицироваться.

## Проверка личности вендора

`<typeId>` из manifest сверяется с тем, что ожидает `product: bamboo`
(`bamboo`). Если по адресу на самом деле оказалась Jira или Confluence,
проба громко откажет вместо того, чтобы записать это как неверный факт —
см. [Jira](/ru/configuration/products/jira/),
[Confluence](/ru/configuration/products/confluence/),
[Bitbucket](/ru/configuration/products/bitbucket/) — соседние продукты с
той же конвенцией manifest.

## Записываемые поля

- `version`
- `extra.buildNumber`, `extra.typeId` — `typeId` будет равен `bamboo`

## Резолвер жизненного цикла

Отсутствует — у endoflife.date нет календаря для Bamboo. enodia всё
равно отслеживает `version` и `buildNumber`; неопределённой остаётся
только ось lifecycle.
