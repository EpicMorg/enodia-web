---
title: Gentoo Linux
description: Настройка enodia для опроса Gentoo Linux через SSH.
---

Часть семейства [SSH-проб для определения ОС](/ru/configuration/products/ssh-os-probes/)
— общий механизм, credentials и проверка ключа хоста описаны на той
странице. Сверяется поле `ID` из `/etc/os-release`.

```yaml
targets:
  - id: gentoo-host
    product: gentoo
    address: host.example.com
    credentials: linux-host-ssh
```

Подтверждено вживую на `gentoo/stage3` (официальный образ gentoo.org):
`ID=gentoo`, `VERSION_ID=2.18` — собственный номер релиза Gentoo Base
System, а не версия дистрибутива в привычном смысле.

## Резолвер жизненного цикла

Отсутствует — Gentoo является rolling-release, и у endoflife.date нет
для неё календаря (подтверждено 404) по той же причине: нет дискретной
версии, для которой имело бы смысл отслеживать EOL. Пока только
инвентаризация.
