---
title: Ubuntu
description: Настройка enodia для опроса Ubuntu через SSH.
---

Часть семейства [SSH-проб для определения ОС](/ru/configuration/products/ssh-os-probes/)
— общий механизм, credentials и проверка ключа хоста описаны на той
странице. Сверяется поле `ID` из `/etc/os-release`.

```yaml
targets:
  - id: ubuntu-host
    product: ubuntu
    address: host.example.com
    credentials: linux-host-ssh
```

Подтверждено вживую на `ubuntu:24.04`: `ID=ubuntu`,
`VERSION_ID="24.04"`.

## Резолвер жизненного цикла

`endoflife:ubuntu`.
