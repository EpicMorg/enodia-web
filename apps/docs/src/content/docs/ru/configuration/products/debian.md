---
title: Debian
description: Настройка enodia для опроса Debian через SSH.
---

Часть семейства [SSH-проб для определения ОС](/ru/configuration/products/ssh-os-probes/)
— общий механизм, credentials и проверка ключа хоста описаны на той
странице. Сверяется поле `ID` из `/etc/os-release`.

```yaml
targets:
  - id: debian-host
    product: debian
    address: host.example.com
    credentials: linux-host-ssh
```

Подтверждено вживую на `debian:bookworm-slim`: `ID=debian`,
`VERSION_ID="12"`.

## Резолвер жизненного цикла

`endoflife:debian`.
