---
title: Bamboo
description: Налаштування enodia для опитування Atlassian Bamboo (Data Center).
---

**Лише Data Center** — Atlassian Cloud не надає ендпоінт, який читає ця
проба. Читає `GET /rest/applinks/1.0/manifest` — той самий маніфест Application
Links, який надає кожен продукт Atlassian Data Center, — анонімно, саме тому
його використано замість `/rest/api/2/serverInfo`.

```yaml
targets:
  - id: bamboo-main
    product: bamboo
    address: https://bamboo.example.com
```

## Автентифікація

Необовʼязкова — маніфест доступний без облікових даних. Якщо Ви все ж
бажаєте автентифікуватися, приймаються `none`, `basic` і `bearer`.

## Перевірка ідентичності вендора

`<typeId>` маніфесту порівнюється з тим, що очікує `product: bamboo`
(`bamboo`). URL, який виявляється Jira чи Confluence, явно завершується
помилкою, а не записується як хибний факт — див.
[Jira](/uk/configuration/products/jira/),
[Confluence](/uk/configuration/products/confluence/),
[Bitbucket](/uk/configuration/products/bitbucket/) щодо споріднених
продуктів, які використовують ту саму конвенцію маніфесту.

## Записувані поля

- `version`
- `extra.buildNumber`, `extra.typeId` — `typeId` матиме значення `bamboo`

## Зіставлення з CVE

Зіставляється з NVD і БДУ ФСТЕК, якщо налаштовано [блок `cve:`](/uk/cve/).

## Резолвер життєвого циклу

`endoflife:bamboo` — тепер підключено. [endoflife.date/bamboo](https://endoflife.date/bamboo)
— справжній, чинний календар; попередня редакція цієї сторінки помилково
стверджувала, що такого календаря взагалі не існує, спираючись лише на те,
що в `registry.go` стоїть `resolver: ""` без пояснень, а не перевіривши
endoflife.date безпосередньо. Це виправлено і тут, і в основному репозиторії.
