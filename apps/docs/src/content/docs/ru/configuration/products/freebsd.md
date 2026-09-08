---
title: FreeBSD
description: Настройка enodia для опроса FreeBSD через SSH.
---

Часть семейства [SSH-проб для определения ОС](/ru/configuration/products/ssh-os-probes/)
— общий механизм, credentials и проверка ключа хоста описаны на той
странице.

```yaml
targets:
  - id: freebsd-host
    product: freebsd
    address: host.example.com
    credentials: linux-host-ssh
```

## Единственный продукт семейства, читающий другой путь

Любой другой продукт этого семейства читает `/etc/os-release`; FreeBSD —
исключение. FreeBSD генерирует `/var/run/os-release` самостоятельно,
динамически, при загрузке (`/etc/rc.d/os-release`) — в той же форме
`КЛЮЧ=ЗНАЧЕНИЕ`, в которой дистрибутивы Linux статически поставляют
`/etc/os-release`. Подтверждено вживую через QEMU (официальный
облачный qcow2-образ самой FreeBSD — Docker-образа для FreeBSD не
существует): `ID=freebsd`, `VERSION_ID="15.1"`.

## Резолвер жизненного цикла

`endoflife:freebsd`.
