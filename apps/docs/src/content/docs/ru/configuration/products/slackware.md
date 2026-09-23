---
title: Slackware
description: Настройка enodia для опроса Slackware через SSH.
---

Часть семейства [SSH-проб для определения ОС](/ru/configuration/products/ssh-os-probes/)
— общий механизм, credentials и проверка ключа хоста описаны на той
странице. Сверяется поле `ID` из `/etc/os-release`.

```yaml
targets:
  - id: slackware-host
    product: slackware
    address: host.example.com
    credentials: linux-host-ssh
```

Подтверждено вживую на `vbatts/slackware:14.2`: `ID=slackware`,
`VERSION_ID=14.2` — Slackware действительно поставляет
`/etc/os-release`, вопреки более старой документации, утверждающей
обратное.

## Сопоставление с CVE

Не сопоставляется — CVE дистрибутива общего назначения относятся к пакетам, а номер релиза не говорит, какие пакеты с тех пор обновлены. См. [Сопоставление с CVE](/ru/cve/#какие-продукты-сопоставляются).

## Резолвер жизненного цикла

`endoflife:slackware`.
