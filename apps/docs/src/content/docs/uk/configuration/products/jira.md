---
title: Jira
description: Налаштування enodia для опитування Atlassian Jira (Data Center).
---

**Лише Data Center** — Atlassian Cloud не надає ендпоінт, який читає ця
проба. Читає `GET /rest/applinks/1.0/manifest` — той самий маніфест Application
Links, який надає кожен продукт Atlassian Data Center, — анонімно, саме тому
його використано замість `/rest/api/2/serverInfo`.

```yaml
targets:
  - id: jira-main
    product: jira
    address: https://jira.example.com
```

## Автентифікація

Необовʼязкова — маніфест доступний без облікових даних. Якщо Ви все ж
бажаєте автентифікуватися, приймаються `none`, `basic` і `bearer`.

## Перевірка ідентичності вендора

`<typeId>` маніфесту порівнюється з тим, що очікує `product: jira`
(`jira`). URL, який насправді виявляється Confluence або Bitbucket, дає явну
помилку, а не записується як хибний факт, — див.
[Confluence](/uk/configuration/products/confluence/),
[Bitbucket](/uk/configuration/products/bitbucket/),
[Bamboo](/uk/configuration/products/bamboo/) — споріднені продукти, що
дотримуються тієї самої конвенції маніфесту.

## Записувані поля

- `version`
- `extra.buildNumber`, `extra.typeId` — `typeId` матиме значення `jira`

## Зіставлення з CVE

Зіставляється з NVD і БДУ ФСТЕК, якщо налаштовано [блок `cve:`](/uk/cve/).

## Резолвер життєвого циклу

`endoflife:jira-software` — зверніть увагу: slug — `jira-software`, а не `jira`.
