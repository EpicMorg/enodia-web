---
title: Amazon Linux
description: Настройка enodia для опроса Amazon Linux через SSH.
---

Часть семейства [SSH-проб для определения ОС](/ru/configuration/products/ssh-os-probes/)
— общий механизм, credentials и проверка ключа хоста описаны на той
странице. Сверяется поле `ID` из `/etc/os-release`.

```yaml
targets:
  - id: amazon-linux-host
    product: amazon-linux
    address: host.example.com
    credentials: linux-host-ssh
```

Подтверждено вживую на `amazonlinux:2023`: `ID="amzn"` — собственное
значение `ID` у Amazon, отличное от значения `product:` — и
`VERSION_ID="2023"`.

## Резолвер жизненного цикла

`endoflife:amazon-linux`.
