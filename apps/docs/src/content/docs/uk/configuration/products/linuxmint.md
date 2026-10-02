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

Зіставляється **за кожним встановленим пакетом** з OVAL Canonical для бази Ubuntu хоста (`UBUNTU_CODENAME` з os-release, записується як `extra.codename`; файл кладеться в `cve.oval.path`). Проба також отримує список встановлених бінарних пакетів (`dpkg-query`) і читає `uname -r`/`-m`/`-v` за той самий обмін через SSH — це зберігається як `packages` спостереження, а також `extra.kernelRelease`, `extra.arch`, `extra.kernelVersion`. Повідомляються лише CVE з виправленням, новішим за встановлену версію, — по одній знахідці на пакет, з посиланням на його USN. Див. [Зіставлення з CVE](/uk/cve/#cve-на-рівні-пакетів-для-дистрибутивів-linux).

## Резолвер життєвого циклу

`endoflife:linuxmint`.
