---
title: MikroTik RouterOS
description: Настройка enodia для опроса MikroTik RouterOS.
---

Читает `GET /rest/system/resource` — REST API RouterOS (RouterOS 7.1+;
сервис `www`, включённый по умолчанию на свежей установке, должен быть
включён).

```yaml
targets:
  - id: router-main
    product: routeros
    address: https://router.example.com
    credentials: routeros-admin
```

## Аутентификация — обязательна

Подтверждено вживую на реальной ВМ CHR (Cloud Hosted Router) 7.24.2:
этот эндпоинт всегда отвечает `401` без credentials, а анонимная
страница входа webfig по адресу `/` тоже не несёт никакого текста
версии — это собственный админский API маршрутизатора, так что
требование credentials здесь — правильное поведение по умолчанию, а не
настройка hardening, которую нужно обходить.

```yaml
credentials:
  routeros-admin:
    kind: basic
    username: enodia-ro
    password: "${ROUTEROS_PASSWORD}"
```

Баннер SSH (`"SSH-2.0-ROSSSH"`, подтверждено вживую) тоже не несёт
версии, что исключает подход через баннер SSH, которым пользуются
[SSH](/ru/configuration/products/ssh/)/[MySQL](/ru/configuration/products/mysql/).

## Записываемые поля

- `version`
- `extra.boardName`, `extra.architecture`

## Резолвер жизненного цикла

`endoflife:routeros`.
