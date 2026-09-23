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

Не сопоставляется — CVE дистрибутива общего назначения относятся к пакетам, а номер релиза не говорит, какие пакеты с тех пор обновлены. См. [Сопоставление с CVE](/ru/cve/#какие-продукты-сопоставляются).

## Резолвер жизненного цикла

`endoflife:oracle-linux`.
