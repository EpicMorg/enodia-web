---
title: TrueNAS
description: Настройка enodia для опроса TrueNAS.
---

Читает `GET /api/v2.0/system/info`.

```yaml
targets:
  - id: truenas-main
    product: truenas
    address: https://truenas.example.com
    credentials: truenas-key
```

## Аутентификация — обязательна

Подтверждено вживую на реальном хосте TrueNAS 25.10.7: без credentials
этот эндпоинт отвечает `401`. API-ключ работает как обычный
bearer-токен:

```yaml
credentials:
  truenas-key:
    kind: bearer
    value: "${TRUENAS_API_KEY}"
```

## Не SSH-проба, несмотря на то что это ОС для устройства

Более ранняя версия этой пробы вместо этого читала `/etc/version` через
SSH (собственный `/etc/os-release` у TrueNAS сообщает о базовом
Debian, а не о самой TrueNAS — тот же пробел в файле идентичности, что
и у [Astra Linux](/ru/configuration/products/astra-linux/)). Как только
для проверки стал доступен реальный API-таргет, HTTP-версия полностью
заменила SSH-версию — у enodia нет запасного механизма с несколькими
транспортами на один продукт, поэтому побеждает более простая, лучше
подходящая форма, а не сосуществование двух вариантов.

## Записываемые поля

Только `version` — эта проба не записывает никаких полей `extra`.

## Резолвер жизненного цикла

`endoflife:truenas`.
