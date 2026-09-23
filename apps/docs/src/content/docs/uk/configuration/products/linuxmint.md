---
title: Linux Mint
description: Налаштування enodia для опитування Linux Mint через SSH.
---

Належить до сімейства [ідентифікації ОС через SSH](/uk/configuration/products/ssh-os-probes/)
— спільний механізм, облікові дані та перевірку ключа хоста описано на
тій сторінці. Зіставляється за полем `ID` файлу `/etc/os-release`.

```yaml
targets:
  - id: mint-host
    product: linuxmint
    address: host.example.com
    credentials: linux-host-ssh
```

Перевірено на реальному знімку rootfs з ISO: `ID=linuxmint`,
`VERSION_ID="22.3"` — справді власна ідентичність Mint, на відміну від
єдиного знайденого образу на Docker Hub (`linuxmintd/mint22-amd64`,
власний chroot для CI-збірок Mint), який натомість повідомляє базову
Ubuntu, і зіставлення з ним було б хибним.

## Зіставлення з CVE

Не зіставляється — CVE дистрибутива загального призначення є вразливостями пакетів, а номер релізу не показує, які пакети було виправлено відтоді. Див. [Зіставлення з CVE](/uk/cve/#які-продукти-зіставляються).

## Резолвер життєвого циклу

`endoflife:linuxmint`.
