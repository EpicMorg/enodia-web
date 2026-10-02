---
title: Rocky Linux
description: Налаштування enodia для опитування Rocky Linux через SSH.
---

Належить до сімейства [ідентифікації ОС через SSH](/uk/configuration/products/ssh-os-probes/)
— спільний механізм, облікові дані та перевірку ключа хоста описано на
тій сторінці. Зіставляється за полем `ID` файлу `/etc/os-release`.

```yaml
targets:
  - id: rocky-host
    product: rocky-linux
    address: host.example.com
    credentials: linux-host-ssh
```

Перевірено наживо на `rockylinux:9`: `ID="rocky"` — власне значення `ID`
в os-release Rocky, відмінне від імені `product:`, — і
`VERSION_ID="9.3"`.

## Зіставлення з CVE

Зіставляється **за кожним встановленим пакетом** з OVAL **Red Hat** (`rhel-<N>.oval.xml.bz2`, у `cve.oval.path`) — Rocky перезбирає пакети Red Hat з тими самими версіями, а власний OVAL-файл Rocky відхиляється (він містить лише невелику частку бюлетенів Rocky і не проходить перевірку схеми OVAL). Проба також отримує список встановлених бінарних пакетів (`rpm -qa`, з потоком модуля AppStream для кожного пакета) і читає `uname -r`/`-m`/`-v` за той самий обмін через SSH — це зберігається як `packages` і `modules` спостереження, а також `extra.kernelRelease`, `extra.arch`, `extra.kernelVersion`. Із кількох встановлених ядер порівнюється запущене. Повідомляються лише CVE з виправленням, новішим за встановлену версію, — по одній знахідці на пакет. Частина з них походить із виправлень, які Red Hat випустив як бюлетені виправлення помилок (RHBA), а `dnf updateinfo --security` їх не показує. Див. [Зіставлення з CVE](/uk/cve/#cve-на-рівні-пакетів-для-дистрибутивів-linux).

## Резолвер життєвого циклу

`endoflife:rocky-linux`.
