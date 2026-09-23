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

Не сопоставляется — CVE дистрибутива общего назначения относятся к пакетам, а номер релиза не говорит, какие пакеты с тех пор обновлены. См. [Сопоставление с CVE](/ru/cve/#какие-продукты-сопоставляются).

## Резолвер жизненного цикла

`endoflife:rocky-linux`.
