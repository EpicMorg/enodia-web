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

## Сопоставление с CVE

Сверяется **по каждому установленному пакету** с собственным OVAL AlmaLinux (`org.almalinux.alsa-<N>.xml.bz2` в `cve.oval.path`), а не по релизу. В том же SSH-обращении проба ещё перечисляет установленные бинарные пакеты (`rpm -qa`, с потоком модуля AppStream у каждого пакета) и читает `uname -r`/`-m`/`-v` — это сохраняется в полях наблюдения `packages` и `modules` и в `extra.kernelRelease`, `extra.arch`, `extra.kernelVersion`. Из нескольких установленных ядер сравнивается работающее. Сообщаются только CVE с исправлением новее установленного, одна находка на пакет, со ссылкой на ALSA. См. [Сопоставление с CVE](/ru/cve/#cve-на-уровне-пакетов-для-дистрибутивов-linux).

## Резолвер жизненного цикла

`endoflife:almalinux`.
