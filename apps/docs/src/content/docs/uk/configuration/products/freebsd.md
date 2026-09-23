---
title: FreeBSD
description: Налаштування enodia для опитування FreeBSD через SSH.
---

Належить до сімейства [ідентифікації ОС через SSH](/uk/configuration/products/ssh-os-probes/)
— спільний механізм, облікові дані та перевірку ключа хоста описано на
тій сторінці.

```yaml
targets:
  - id: freebsd-host
    product: freebsd
    address: host.example.com
    credentials: linux-host-ssh
```

## Єдиний продукт у цьому сімействі, що читає інший шлях

Усі інші продукти цього сімейства читають `/etc/os-release`; FreeBSD — виняток.
FreeBSD генерує `/var/run/os-release` сама, динамічно, під час завантаження
(`/etc/rc.d/os-release`) — у точно такій самій формі `KEY=VALUE`, у якій
дистрибутиви Linux статично постачають `/etc/os-release`. Перевірено наживо
через QEMU (офіційний хмарний qcow2 від самої FreeBSD — Docker-образу для
FreeBSD не існує): `ID=freebsd`, `VERSION_ID="15.1"`.

## Зіставлення з CVE

Не зіставляється — NVD записує рівні патчів у поле CPE, яке зіставник не читає, тож зіставлення лише за релізом позначило б повністю пропатчений хост усіма CVE, будь-коли виправленими в цьому релізі. Див. [Зіставлення з CVE](/uk/cve/#які-продукти-зіставляються).

## Резолвер життєвого циклу

`endoflife:freebsd`.
