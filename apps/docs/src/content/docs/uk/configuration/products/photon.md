---
title: VMware Photon OS
description: Налаштування enodia для опитування VMware Photon OS через SSH.
---

Належить до сімейства [ідентифікації ОС через SSH](/uk/configuration/products/ssh-os-probes/)
— спільний механізм, облікові дані та перевірку ключа хоста описано на
тій сторінці. Зіставляється за полем `ID` файлу `/etc/os-release`.

```yaml
targets:
  - id: photon-host
    product: photon
    address: host.example.com
    credentials: linux-host-ssh
```

Перевірено наживо на офіційному образі верхнього рівня `photon:5.0`
(програма Docker Official Images, а не власний репозиторій `vmware/photon`,
який зупиняється на 2.0): `ID=photon`, `VERSION_ID=5.0`.

## Зіставлення з CVE

Не зіставляється — CVE дистрибутива загального призначення є вразливостями пакетів, а номер релізу не показує, які пакети було виправлено відтоді. Див. [Зіставлення з CVE](/uk/cve/#які-продукти-зіставляються).

## Резолвер життєвого циклу

`endoflife:photon`.
