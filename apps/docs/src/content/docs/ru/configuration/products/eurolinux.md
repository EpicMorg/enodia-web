---
title: EuroLinux
description: Настройка enodia для опроса EuroLinux через SSH.
---

Часть семейства [SSH-проб для определения ОС](/ru/configuration/products/ssh-os-probes/)
— общий механизм, credentials и проверка ключа хоста описаны на той
странице. Сверяется поле `ID` из `/etc/os-release`.

```yaml
targets:
  - id: eurolinux-host
    product: eurolinux
    address: host.example.com
    credentials: linux-host-ssh
```

Docker-образа для EuroLinux не существует — вместо этого подтверждено на
реальном захвате rootfs из ISO (сам установочный носитель, изученный
офлайн): `ID="eurolinux"`, `VERSION_ID="8.10"`.

## Резолвер жизненного цикла

`endoflife:eurolinux`.
