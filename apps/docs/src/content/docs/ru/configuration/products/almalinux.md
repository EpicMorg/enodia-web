---
title: AlmaLinux
description: Настройка enodia для опроса AlmaLinux через SSH.
---

Часть семейства [SSH-проб для определения ОС](/ru/configuration/products/ssh-os-probes/)
— общий механизм, credentials и проверка ключа хоста описаны на той
странице. Сверяется поле `ID` из `/etc/os-release`.

```yaml
targets:
  - id: almalinux-host
    product: almalinux
    address: host.example.com
    credentials: linux-host-ssh
```

Подтверждено вживую на `docker.io/almalinux:9`: `ID=almalinux`,
`VERSION_ID="9.8"`.

## Резолвер жизненного цикла

`endoflife:almalinux`.
