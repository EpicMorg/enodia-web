---
title: MikroTik RouterOS
description: Налаштування enodia для опитування MikroTik RouterOS.
---

Читає `GET /rest/system/resource` — REST API RouterOS (RouterOS 7.1+;
сервіс `www`, увімкнений за замовчуванням на свіжій інсталяції, має бути
ввімкнено).

```yaml
targets:
  - id: router-main
    product: routeros
    address: https://router.example.com
    credentials: routeros-admin
```

## Автентифікація — обовʼязкова

Підтверджено наживо на справжній VM CHR (Cloud Hosted Router) 7.24.2: цей
ендпоінт без облікових даних завжди відповідає `401`, а анонімна сторінка
входу webfig за адресою `/` також ніде не містить тексту з версією — це
власний адміністративний API маршрутизатора, тож вимога облікових даних є
правильною поведінкою за замовчуванням, а не опцією посилення захисту, яку
треба обходити.

```yaml
credentials:
  routeros-admin:
    kind: basic
    username: enodia-ro
    password: "${ROUTEROS_PASSWORD}"
```

SSH-банер (`"SSH-2.0-ROSSSH"`, підтверджено наживо) також не містить версії,
що виключає підхід на основі SSH-банера, який використовують
[SSH](/uk/configuration/products/ssh/)/[MySQL](/uk/configuration/products/mysql/).

## Записувані поля

- `version`
- `extra.boardName`, `extra.architecture`

## Зіставлення з CVE

Зіставляється з NVD і БДУ ФСТЕК, якщо налаштовано [блок `cve:`](/uk/cve/).

## Резолвер життєвого циклу

`endoflife:routeros`.
