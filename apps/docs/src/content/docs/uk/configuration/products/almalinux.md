---
title: AlmaLinux
description: Налаштування enodia для опитування AlmaLinux через SSH.
---

Належить до сімейства [ідентифікації ОС через SSH](/uk/configuration/products/ssh-os-probes/)
— спільний механізм, облікові дані та перевірку ключа хоста описано на
тій сторінці. Зіставляється за полем `ID` файлу `/etc/os-release`.

```yaml
targets:
  - id: almalinux-host
    product: almalinux
    address: host.example.com
    credentials: linux-host-ssh
```

Перевірено наживо на `docker.io/almalinux:9`: `ID=almalinux`,
`VERSION_ID="9.8"`.

## Зіставлення з CVE

Зіставляється **за кожним встановленим пакетом** із власним OVAL AlmaLinux (`org.almalinux.alsa-<N>.xml.bz2`, у `cve.oval.path`), а не за релізом. Проба також отримує список встановлених бінарних пакетів (`rpm -qa`, з потоком модуля AppStream для кожного пакета) і читає `uname -r`/`-m`/`-v` за той самий обмін через SSH — це зберігається як `packages` і `modules` спостереження, а також `extra.kernelRelease`, `extra.arch`, `extra.kernelVersion`. Із кількох встановлених ядер порівнюється запущене. Повідомляються лише CVE з виправленням, новішим за встановлену версію, — по одній знахідці на пакет, з посиланням на його ALSA. Див. [Зіставлення з CVE](/uk/cve/#cve-на-рівні-пакетів-для-дистрибутивів-linux).

## Резолвер життєвого циклу

`endoflife:almalinux`.
