---
title: Linux Mint
description: Настройка enodia для опроса Linux Mint через SSH.
---

Часть семейства [SSH-проб для определения ОС](/ru/configuration/products/ssh-os-probes/)
— общий механизм, credentials и проверка ключа хоста описаны на той
странице. Сверяется поле `ID` из `/etc/os-release`.

```yaml
targets:
  - id: mint-host
    product: linuxmint
    address: host.example.com
    credentials: linux-host-ssh
```

Подтверждено на реальном захвате rootfs из ISO: `ID=linuxmint`,
`VERSION_ID="22.3"` — это по-настоящему собственная идентичность Mint, в
отличие от единственного найденного образа на Docker Hub
(`linuxmintd/mint22-amd64`, собственный CI build chroot Mint), который
сообщает вместо этого о базовом Ubuntu — и был бы неверной целью для
сверки.

## Резолвер жизненного цикла

`endoflife:linuxmint`.
