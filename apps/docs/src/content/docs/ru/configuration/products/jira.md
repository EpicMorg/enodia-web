---
title: Jira
description: Настройка enodia для опроса Atlassian Jira (Data Center).
---

**Только Data Center** — Atlassian Cloud не отдаёт эндпоинт, который
читает эта проба. Читает `GET /rest/applinks/1.0/manifest` — тот же
manifest Application Links, что отдаёт любой продукт Atlassian Data
Center — анонимный эндпоинт, поэтому используется он, а не
`/rest/api/2/serverInfo`.

```yaml
targets:
  - id: jira-main
    product: jira
    address: https://jira.example.com
```

## Аутентификация

Опционально — manifest читается без credentials. `none`, `basic` и
`bearer` тоже принимаются, если вы всё же хотите аутентифицироваться.

## Проверка личности вендора

`<typeId>` из manifest сверяется с тем, что ожидает `product: jira`
(`jira`). Если по адресу на самом деле оказалась Confluence или
Bitbucket, проба громко откажет вместо того, чтобы записать это как
неверный факт — см. [Confluence](/ru/configuration/products/confluence/),
[Bitbucket](/ru/configuration/products/bitbucket/),
[Bamboo](/ru/configuration/products/bamboo/) — соседние продукты с той
же конвенцией manifest.

## Записываемые поля

- `version`
- `extra.buildNumber`, `extra.typeId` — `typeId` будет равен `jira`

## Сопоставление с CVE

Сверяется с NVD и БДУ ФСТЭК, если настроен [блок `cve:`](/ru/cve/). Начиная с 2.2, `cve.atlassian.path` добавляет
собственные данные Atlassian по каждому релизу — включая CVE сторонних
зависимостей, которых записи NVD по Atlassian не перечисляют, — и для
релиза, который в них есть, их вердикт решает в пределах собственной
ветки релиза. См.
[Собственные данные вендоров → Atlassian](/ru/cve/#atlassian).

## Резолвер жизненного цикла

`endoflife:jira-software` — обратите внимание, слаг именно
`jira-software`, а не `jira`.
