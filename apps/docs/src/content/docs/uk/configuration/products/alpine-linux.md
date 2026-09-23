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

Не зіставляється — CVE дистрибутива загального призначення є вразливостями пакетів, а номер релізу не показує, які пакети було виправлено відтоді. Див. [Зіставлення з CVE](/uk/cve/#які-продукти-зіставляються).

## Резолвер життєвого циклу

`endoflife:alpine-linux`.
