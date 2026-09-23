---
title: YouTrack
description: Налаштування enodia для опитування YouTrack.
---

Читає `GET /api/config?fields=version`.

```yaml
targets:
  - id: youtrack-main
    product: youtrack
    address: https://youtrack.example.com
```

## Автентифікація

Не потрібна — підтверджено наживо на справжньому екземплярі YouTrack,
доступному з інтернету: цей ендпоінт не потребує облікових даних, а запит
будь-якого поля, крім `version` (`buildDate`, `edition`, ...), для анонімного
клієнта мовчки ігнорується, а не повертається. Якщо Ви все ж бажаєте
автентифікуватися, приймається `bearer`.

## Записувані поля

Лише `version` — ця проба не записує полів `extra`.

## Зіставлення з CVE

Зіставляється з NVD і БДУ ФСТЕК, якщо налаштовано [блок `cve:`](/uk/cve/).

## Резолвер життєвого циклу

`endoflife:youtrack`.
