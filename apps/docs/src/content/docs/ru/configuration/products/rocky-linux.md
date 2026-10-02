---
title: Rocky Linux
description: Настройка enodia для опроса Rocky Linux через SSH.
---

Часть семейства [SSH-проб для определения ОС](/ru/configuration/products/ssh-os-probes/)
— общий механизм, credentials и проверка ключа хоста описаны на той
странице. Сверяется поле `ID` из `/etc/os-release`.

```yaml
targets:
  - id: rocky-host
    product: rocky-linux
    address: host.example.com
    credentials: linux-host-ssh
```

Подтверждено вживую на `rockylinux:9`: `ID="rocky"` — собственное
значение `ID` у Rocky, отличное от значения `product:` — и
`VERSION_ID="9.3"`.

## Сопоставление с CVE

Сверяется **по каждому установленному пакету** с OVAL **Red Hat** (`rhel-<N>.oval.xml.bz2` в `cve.oval.path`) — Rocky пересобирает пакеты Red Hat с теми же версиями, а собственный OVAL-файл Rocky отклоняется (в нём лишь малая часть бюллетеней Rocky, и он не проходит проверку по схеме OVAL). В том же SSH-обращении проба ещё перечисляет установленные бинарные пакеты (`rpm -qa`, с потоком модуля AppStream у каждого пакета) и читает `uname -r`/`-m`/`-v` — это сохраняется в полях наблюдения `packages` и `modules` и в `extra.kernelRelease`, `extra.arch`, `extra.kernelVersion`. Из нескольких установленных ядер сравнивается работающее. Сообщаются только CVE с исправлением новее установленного, одна находка на пакет. Часть из них — исправления, которые Red Hat выпустил как бюллетени об исправлении ошибок (RHBA), а `dnf updateinfo --security` их не показывает. См. [Сопоставление с CVE](/ru/cve/#cve-на-уровне-пакетов-для-дистрибутивов-linux).

## Резолвер жизненного цикла

`endoflife:rocky-linux`.
