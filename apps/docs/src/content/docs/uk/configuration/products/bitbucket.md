---
title: Bitbucket
description: Налаштування enodia для опитування Atlassian Bitbucket (Data Center).
---

**Лише Data Center** — Atlassian Cloud не надає ендпоінт, який читає ця
проба. Читає `GET /rest/applinks/1.0/manifest` — той самий маніфест Application
Links, який надає кожен продукт Atlassian Data Center, — анонімно, саме тому
його використано замість `/rest/api/2/serverInfo`.

```yaml
targets:
  - id: bitbucket-main
    product: bitbucket
    address: https://bitbucket.example.com
```

## Автентифікація

Необовʼязкова — маніфест доступний без облікових даних. Якщо Ви все ж
бажаєте автентифікуватися, приймаються `none`, `basic` і `bearer`.

## Перевірка ідентичності вендора

`<typeId>` маніфесту порівнюється з тим, чого очікує `product: bitbucket`.
**Власний маніфест Bitbucket досі представляється як `stash`** — його
колишня назва до ребрендингу Atlassian, — тож `typeId: stash` тут
правильний і очікуваний; це відповідь вендора, а не особливість enodia.
URL, який насправді виявляється Jira чи Confluence, однаково завершується
явною помилкою, а не записується як хибний факт, — див.
[Jira](/uk/configuration/products/jira/),
[Confluence](/uk/configuration/products/confluence/),
[Bamboo](/uk/configuration/products/bamboo/) щодо споріднених продуктів,
які дотримуються тієї самої конвенції маніфесту.

## Записувані поля

- `version`
- `extra.buildNumber`, `extra.typeId` — `typeId` міститиме `stash`, а не
  `bitbucket`

## Зіставлення з CVE

Зіставляється з NVD і БДУ ФСТЕК, якщо налаштовано [блок `cve:`](/uk/cve/).

## Резолвер життєвого циклу

`endoflife:bitbucket`.
