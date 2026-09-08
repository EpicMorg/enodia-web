---
title: VMware Photon OS
description: Настройка enodia для опроса VMware Photon OS через SSH.
---

Часть семейства [SSH-проб для определения ОС](/ru/configuration/products/ssh-os-probes/)
— общий механизм, credentials и проверка ключа хоста описаны на той
странице. Сверяется поле `ID` из `/etc/os-release`.

```yaml
targets:
  - id: photon-host
    product: photon
    address: host.example.com
    credentials: linux-host-ssh
```

Подтверждено вживую на официальном образе верхнего уровня `photon:5.0`
(программа Docker Official Images — не собственный репозиторий
`vmware/photon`, который остановился на версии 2.0): `ID=photon`,
`VERSION_ID=5.0`.

## Резолвер жизненного цикла

`endoflife:photon`.
