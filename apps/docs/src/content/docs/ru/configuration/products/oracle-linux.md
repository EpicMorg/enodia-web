---
title: Oracle Linux
description: Настройка enodia для опроса Oracle Linux через SSH.
---

Часть семейства [SSH-проб для определения ОС](/ru/configuration/products/ssh-os-probes/)
— общий механизм, credentials и проверка ключа хоста описаны на той
странице. Сверяется поле `ID` из `/etc/os-release`.

```yaml
targets:
  - id: oraclelinux-host
    product: oracle-linux
    address: host.example.com
    credentials: linux-host-ssh
```

Подтверждено вживую на `oraclelinux:9`: `ID="ol"` — собственное значение
`ID` у Oracle, отличное от значения `product:` — и `VERSION_ID="9.8"`.

## Сопоставление с CVE

Сверяется **по каждому установленному пакету** с OVAL Oracle (`com.oracle.elsa-ol<N>.xml.bz2` в `cve.oval.path`), а не по релизу. В том же SSH-обращении проба ещё перечисляет установленные бинарные пакеты (`rpm -qa`, с потоком модуля AppStream у каждого пакета) и читает `uname -r`/`-m`/`-v` — это сохраняется в полях наблюдения `packages` и `modules` и в `extra.kernelRelease`, `extra.arch`, `extra.kernelVersion`. Из нескольких установленных ядер сравнивается работающее. Отдельные ветки Oracle для x86_64 и aarch64 сверяются с `uname -m`, а пересборки FIPS и Ksplice — только с исправлениями своего варианта. Сообщаются только CVE с исправлением новее установленного, одна находка на пакет, со ссылкой на ELSA. См. [Сопоставление с CVE](/ru/cve/#cve-на-уровне-пакетов-для-дистрибутивов-linux).

## Резолвер жизненного цикла

`endoflife:oracle-linux`.
