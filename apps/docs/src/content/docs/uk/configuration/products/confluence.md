---
title: Confluence
description: Налаштування enodia для опитування Atlassian Confluence (Data Center).
---

**Лише Data Center** — Atlassian Cloud не надає ендпоінт, який читає ця
проба. Читає `GET /rest/applinks/1.0/manifest` — той самий маніфест Application
Links, який надає кожен продукт Atlassian Data Center, — анонімно, саме тому
його використано замість `/rest/api/2/serverInfo`.

```yaml
targets:
  - id: confluence-main
    product: confluence
    address: https://confluence.example.com
```

## Автентифікація

Необовʼязкова — маніфест доступний без облікових даних. Якщо Ви все ж
бажаєте автентифікуватися, приймаються `none`, `basic` і `bearer`.

## Перевірка ідентичності вендора

`<typeId>` маніфесту порівнюється з тим, чого очікує `product: confluence`
(`confluence`). URL, який насправді виявляється Jira чи Bitbucket,
завершується явною помилкою, а не записується як хибний факт, — див.
[Jira](/uk/configuration/products/jira/),
[Bitbucket](/uk/configuration/products/bitbucket/),
[Bamboo](/uk/configuration/products/bamboo/) щодо споріднених продуктів,
які дотримуються тієї самої конвенції маніфесту.

## Записувані поля

- `version`
- `extra.buildNumber`, `extra.typeId` — `typeId` міститиме `confluence`

## Зіставлення з CVE

Зіставляється з NVD і БДУ ФСТЕК, якщо налаштовано [блок `cve:`](/uk/cve/).

## Резолвер життєвого циклу

`endoflife:confluence`.
