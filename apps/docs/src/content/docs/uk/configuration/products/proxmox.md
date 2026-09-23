---
title: Proxmox VE
description: Налаштування enodia для опитування Proxmox VE.
---

Читає `GET /api2/json/version`.

```yaml
targets:
  - id: proxmox-main
    product: proxmox
    address: https://proxmox.example.com:8006
    credentials: proxmox-token
```

## Автентифікація — обовʼязкова

Підтверджено наживо на справжньому хості Proxmox VE 9.2.2: без облікових
даних цей ендпоінт відповідає `401`. Власний формат API-токена Proxmox — це
звичайне значення заголовка `Authorization` —
`PVEAPIToken=user@realm!tokenid=secret`, увесь рядок як один токен, — тож
`token-header` підходить безпосередньо, а його заголовок за замовчуванням
(`Authorization`) уже правильний:

```yaml
credentials:
  proxmox-token:
    kind: token-header
    value: "PVEAPIToken=enodia@pve!readonly=${PROXMOX_TOKEN_SECRET}"
```

Альтернативний потік із квитком за іменем користувача й паролем
(`POST /access/ticket` для отримання сесійного cookie плюс CSRF-токена)
навмисно не підтримується — це важча схема з входом у сесію, а власна
документація Proxmox і так рекомендує API-токен для автоматизації без участі
людини.

## Записувані поля

- `version`
- `extra.repoid`, якщо є

## Зіставлення з CVE

Зіставляється з NVD і БДУ ФСТЕК, якщо налаштовано [блок `cve:`](/uk/cve/).

## Резолвер життєвого циклу

`endoflife:proxmox-ve`.
