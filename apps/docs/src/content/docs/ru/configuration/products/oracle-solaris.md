---
title: Oracle Solaris
description: Настройка enodia для опроса Oracle Solaris через SSH.
---

Использует тот же механизм SSH, credentials и проверку ключа хоста, что
и семейство [SSH-проб для определения ОС](/ru/configuration/products/ssh-os-probes/),
но читает `/etc/release`, а не файл os-release или `uname -sr`.

```yaml
targets:
  - id: solaris-host
    product: oracle-solaris
    address: host.example.com
    credentials: linux-host-ssh
```

## Почему не `uname -sr`

В отличие от OpenBSD/NetBSD, здесь `uname -sr` не работает: на Solaris
она всегда сообщает только версию ядра SunOS (`"SunOS 5.11"` для любого
релиза Solaris 11.x — версионирование SunOS не связано с версией
продукта), так что отличить 11.3 от 11.4 по ней невозможно. Собственная
строка `/etc/release` — `"Oracle Solaris 11.4 X86"` — несёт настоящую
версию.

Загружаемого образа без учётной записи Oracle/лицензии OTN не
существует, поэтому проверка велась через `vmactions/solaris-vm`, который
собирает и republish-ит собственный, свободно распространяемый Oracle
Solaris 11.4 CBE (Common Build Environment, предназначенный именно для
такого использования в CI).

## Записываемые поля

- `version` — разобрано из `/etc/release`
- `extra.hostKeyVerified`

## Резолвер жизненного цикла

`endoflife:oracle-solaris`.
