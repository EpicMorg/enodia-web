---
title: Confluence
description: Настройка enodia для опроса Atlassian Confluence (Data Center).
---

**Только Data Center** — Atlassian Cloud не отдаёт эндпоинт, который
читает эта проба. Читает `GET /rest/applinks/1.0/manifest` — тот же
manifest Application Links, что отдаёт любой продукт Atlassian Data
Center — анонимный эндпоинт, поэтому используется он, а не
`/rest/api/2/serverInfo`.

```yaml
targets:
  - id: confluence-main
    product: confluence
    address: https://confluence.example.com
```

## Аутентификация

Опционально — manifest читается без credentials. `none`, `basic` и
`bearer` тоже принимаются, если вы всё же хотите аутентифицироваться.

## Проверка личности вендора

`<typeId>` из manifest сверяется с тем, что ожидает `product: confluence`
(`confluence`). Если по адресу на самом деле оказалась Jira или
Bitbucket, проба громко откажет вместо того, чтобы записать это как
неверный факт — см. [Jira](/ru/configuration/products/jira/),
[Bitbucket](/ru/configuration/products/bitbucket/),
[Bamboo](/ru/configuration/products/bamboo/) — соседние продукты с той
же конвенцией manifest.

## Записываемые поля

- `version`
- `extra.buildNumber`, `extra.typeId` — `typeId` будет равен `confluence`

## Резолвер жизненного цикла

`endoflife:confluence`.
