---
title: TrueNAS
description: Налаштування enodia для опитування TrueNAS.
---

Читає `GET /api/v2.0/system/info`.

```yaml
targets:
  - id: truenas-main
    product: truenas
    address: https://truenas.example.com
    credentials: truenas-key
```

## Автентифікація — обовʼязкова

Підтверджено наживо на справжньому хості TrueNAS 25.10.7: без облікових
даних цей ендпоінт відповідає `401`. API-ключ працює як звичайний
bearer-токен:

```yaml
credentials:
  truenas-key:
    kind: bearer
    value: "${TRUENAS_API_KEY}"
```

## Не SSH-проба, хоча це ОС для пристроїв

Попередня версія цієї проби натомість читала `/etc/version` через SSH
(власний `/etc/os-release` TrueNAS повідомляє базовий Debian, а не сам
TrueNAS — той самий пробіл у файлі ідентичності, що й у
[Astra Linux](/uk/configuration/products/astra-linux/)). Щойно зʼявилася
справжня API-ціль для перевірки, HTTP-версія повністю замінила SSH-версію —
enodia не має запасного перемикання між двома транспортами для окремого
продукту, тож перемагає простіший і доречніший варіант, а не співіснування
обох.

## Записувані поля

Лише `version` — ця проба не записує полів `extra`.

## Зіставлення з CVE

Не зіставляється — надто мало записів, а їхні версії позначено інакше, ніж повідомляє проба. Див. [Зіставлення з CVE](/uk/cve/#які-продукти-зіставляються).

## Резолвер життєвого циклу

`endoflife:truenas`.
