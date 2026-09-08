---
title: Proxmox VE
description: Настройка enodia для опроса Proxmox VE.
---

Читает `GET /api2/json/version`.

```yaml
targets:
  - id: proxmox-main
    product: proxmox
    address: https://proxmox.example.com:8006
    credentials: proxmox-token
```

## Аутентификация — обязательна

Подтверждено вживую на реальном хосте Proxmox VE 9.2.2: без credentials
этот эндпоинт отвечает `401`. Собственная форма API-токена у Proxmox —
обычное значение заголовка `Authorization` —
`PVEAPIToken=user@realm!tokenid=secret`, вся строка целиком как один
токен — поэтому `token-header` подходит напрямую, с уже правильным
заголовком по умолчанию (`Authorization`):

```yaml
credentials:
  proxmox-token:
    kind: token-header
    value: "PVEAPIToken=enodia@pve!readonly=${PROXMOX_TOKEN_SECRET}"
```

Альтернативный флоу с username/password через тикет (`POST
/access/ticket` для cookie-сессии плюс CSRF-токен) намеренно не
поддерживается — это более тяжёлая форма входа через сессию, а
собственная документация Proxmox рекомендует API-токен именно для
такой автоматизации без участия человека.

## Записываемые поля

- `version`
- `extra.repoid`, если присутствует

## Резолвер жизненного цикла

`endoflife:proxmox-ve`.
