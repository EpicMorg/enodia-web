---
title: Red Hat Enterprise Linux
description: Настройка enodia для опроса RHEL через SSH.
---

Часть семейства [SSH-проб для определения ОС](/ru/configuration/products/ssh-os-probes/)
— общий механизм, credentials и проверка ключа хоста описаны на той
странице. Сверяется поле `ID` из `/etc/os-release`.

```yaml
targets:
  - id: rhel-host
    product: rhel
    address: host.example.com
    credentials: linux-host-ssh
```

Подтверждено вживую на `registry.redhat.io/ubi9` (собственный
бесплатный Universal Base Image от Red Hat): `ID=rhel`,
`VERSION_ID="9.8"`.

## Резолвер жизненного цикла

`endoflife:rhel`.
