---
title: Fedora Linux
description: Настройка enodia для опроса Fedora Linux через SSH.
---

Часть семейства [SSH-проб для определения ОС](/ru/configuration/products/ssh-os-probes/)
— общий механизм, credentials и проверка ключа хоста описаны на той
странице. Сверяется поле `ID` из `/etc/os-release`.

```yaml
targets:
  - id: fedora-host
    product: fedora
    address: host.example.com
    credentials: linux-host-ssh
```

Подтверждено вживую на `fedora:latest`: `ID=fedora`, `VERSION_ID=44`.

## Резолвер жизненного цикла

`endoflife:fedora`.
