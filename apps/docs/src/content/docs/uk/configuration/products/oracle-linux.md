---
title: Oracle Linux
description: Налаштування enodia для опитування Oracle Linux через SSH.
---

Належить до сімейства [ідентифікації ОС через SSH](/uk/configuration/products/ssh-os-probes/)
— спільний механізм, облікові дані та перевірку ключа хоста описано на
тій сторінці. Зіставляється за полем `ID` файлу `/etc/os-release`.

```yaml
targets:
  - id: oraclelinux-host
    product: oracle-linux
    address: host.example.com
    credentials: linux-host-ssh
```

Перевірено наживо на `oraclelinux:9`: `ID="ol"` — власне значення `ID`
в os-release від Oracle, що відрізняється від назви `product:`, — і
`VERSION_ID="9.8"`.

## Зіставлення з CVE

Зіставляється **за кожним встановленим пакетом** з OVAL Oracle (`com.oracle.elsa-ol<N>.xml.bz2`, у `cve.oval.path`), а не за релізом. Проба також отримує список встановлених бінарних пакетів (`rpm -qa`, з потоком модуля AppStream для кожного пакета) і читає `uname -r`/`-m`/`-v` за той самий обмін через SSH — це зберігається як `packages` і `modules` спостереження, а також `extra.kernelRelease`, `extra.arch`, `extra.kernelVersion`. Із кількох встановлених ядер порівнюється запущене. Окремі гілки Oracle для x86_64 і aarch64 зіставляються за `uname -m`, а перезбірки FIPS і Ksplice — лише з виправленнями свого варіанта. Повідомляються лише CVE з виправленням, новішим за встановлену версію, — по одній знахідці на пакет, з посиланням на його ELSA. Див. [Зіставлення з CVE](/uk/cve/#cve-на-рівні-пакетів-для-дистрибутивів-linux).

## Резолвер життєвого циклу

`endoflife:oracle-linux`.
