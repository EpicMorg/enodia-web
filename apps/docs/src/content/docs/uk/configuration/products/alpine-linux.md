---
title: Alpine Linux
description: Налаштування enodia для опитування Alpine Linux через SSH.
---

Належить до сімейства [ідентифікації ОС через SSH](/uk/configuration/products/ssh-os-probes/)
— спільний механізм, облікові дані та перевірку ключа хоста описано на
тій сторінці. Зіставляється за полем `ID` файлу `/etc/os-release`.

```yaml
targets:
  - id: alpine-host
    product: alpine-linux
    address: host.example.com
    credentials: linux-host-ssh
```

Перевірено наживо на `alpine:latest`: `ID=alpine` (зверніть увагу: це
просте поле `ID`, а не `alpine-linux` — значення `product:` додає `-linux`
для ясності, а сама відповідність перевіряється за коротшим рядком
вендора), `VERSION_ID=3.24.1`.

## Зіставлення з CVE

Зіставляється **за кожним встановленим пакетом** із secdb Alpine для гілки хоста (`main.json` і `community.json`, у `cve.alpine.path`), а не за релізом. Гілка — це major.minor з `VERSION_ID` (3.20.3 → v3.20); edge не має нумерованої гілки й знахідок не отримує. Проба також читає `/lib/apk/db/installed` за той самий обмін через SSH і ключує пакети за **origin** (власний ключ secdb: `libcrypto3` і `libssl3` — обидва `openssl`) — це зберігається як `packages` спостереження, а також `extra.kernelRelease`, `extra.arch`, `extra.kernelVersion`. Повідомляються лише CVE з виправленням, новішим за встановлену версію, — по одній знахідці на origin, з посиланням на його сторінку на security.alpinelinux.org; secdb не містить оцінки критичності. Див. [Зіставлення з CVE](/uk/cve/#cve-на-рівні-пакетів-для-дистрибутивів-linux).

## Резолвер життєвого циклу

`endoflife:alpine-linux`.
