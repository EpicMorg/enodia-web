---
title: EuroLinux
description: Налаштування enodia для опитування EuroLinux через SSH.
---

Належить до сімейства [ідентифікації ОС через SSH](/uk/configuration/products/ssh-os-probes/)
— спільний механізм, облікові дані та перевірку ключа хоста описано на
тій сторінці. Зіставляється за полем `ID` файлу `/etc/os-release`.

```yaml
targets:
  - id: eurolinux-host
    product: eurolinux
    address: host.example.com
    credentials: linux-host-ssh
```

Docker-образу для EuroLinux не існує — натомість перевірено на реальному
знімку rootfs з ISO (самому інсталяційному носії, дослідженому офлайн):
`ID="eurolinux"`, `VERSION_ID="8.10"`.

## Зіставлення з CVE

Не зіставляється — CVE дистрибутива загального призначення є вразливостями пакетів, а номер релізу не показує, які пакети було виправлено відтоді. Див. [Зіставлення з CVE](/uk/cve/#які-продукти-зіставляються).

## Резолвер життєвого циклу

`endoflife:eurolinux`.
