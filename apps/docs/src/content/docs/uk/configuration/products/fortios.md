---
title: Fortinet FortiOS (FortiGate)
description: Налаштування enodia для опитування Fortinet FortiGate під керуванням FortiOS.
---

Читає `GET /api/v2/monitor/system/status` — власний REST API FortiOS.
Перевірено на справжньому FortiGate 601E з FortiOS 7.4.12.

```yaml
targets:
  - id: fw-edge
    product: fortios
    address: https://fw.example.com
    credentials: fortigate-api
```

## Автентифікація — обовʼязкова

Потрібен токен **REST API Admin**: створіть REST API Admin у GUI FortiGate
(System → Administrators) і скопіюйте згенерований ним API-ключ — FortiOS
показує його лише один раз. Він надсилається як звичайний bearer-токен; без
входу в сесію, без CSRF-токена, без параметра запиту `access_token`:

```yaml
credentials:
  fortigate-api:
    kind: bearer
    value: "${FORTIGATE_API_TOKEN}"
```

На відсутній або неправильний токен приходить `401` (з HTML-сторінкою
помилки, а не JSON) — це повідомляється як помилка автентифікації, як і в
будь-якої іншої проби. У самій FortiOS REST API Admin можна обмежити
довіреними хостами; якщо Ви це робите, додайте адресу, з якої підключається
enodia.

## Записувані поля

- `version` — у тому вигляді, як її повідомляє FortiOS, напр. `v7.4.12`
  (початкова `v` відкидається під час порівняння, а не під час запису)
- `extra.model` — напр. `FG6H1E` (601E)
- `extra.build` — номер збірки FortiOS

Імʼя хоста пристрою міститься в тій самій відповіді, але навмисно не
записується.

## Зіставлення з CVE

Зіставляється з NVD і БДУ ФСТЕК, якщо налаштовано [блок `cve:`](/uk/cve/).

## Резолвер життєвого циклу

`endoflife:fortios`. Сторінка FortiOS на endoflife.date містить цикли
релізів і дати, але не містить «останньої версії» для жодного циклу, тож
вісь життєвого циклу працює, тоді як `drift` показує `LATEST: -` і
`PATCH: unknown` — це прогалина у вихідних даних, а не помилка проби.
