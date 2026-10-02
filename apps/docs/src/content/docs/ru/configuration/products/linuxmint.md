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

## Сопоставление с CVE

Сверяется **по каждому установленному пакету** с OVAL Canonical для базы Ubuntu, на которой построен хост (`UBUNTU_CODENAME` из os-release, записывается как `extra.codename`; файл кладётся в `cve.oval.path`). В том же SSH-обращении проба ещё перечисляет установленные бинарные пакеты (`dpkg-query`) и читает `uname -r`/`-m`/`-v` — это сохраняется в поле наблюдения `packages` и в `extra.kernelRelease`, `extra.arch`, `extra.kernelVersion`. Сообщаются только CVE с исправлением новее установленного, одна находка на пакет, со ссылкой на USN. См. [Сопоставление с CVE](/ru/cve/#cve-на-уровне-пакетов-для-дистрибутивов-linux).

## Резолвер жизненного цикла

`endoflife:linuxmint`.
