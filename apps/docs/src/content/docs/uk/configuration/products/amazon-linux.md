---
title: Amazon Linux
description: Налаштування enodia для опитування Amazon Linux через SSH.
---

Належить до сімейства [ідентифікації ОС через SSH](/uk/configuration/products/ssh-os-probes/)
— спільний механізм, облікові дані та перевірку ключа хоста описано на
тій сторінці. Зіставляється за полем `ID` файлу `/etc/os-release`.

```yaml
targets:
  - id: amazon-linux-host
    product: amazon-linux
    address: host.example.com
    credentials: linux-host-ssh
```

Перевірено наживо на `amazonlinux:2023`: `ID="amzn"` — власне значення `ID`
в os-release від Amazon, відмінне від імені в `product:`, — і
`VERSION_ID="2023"`.

## Зіставлення з CVE

Не зіставляється — CVE дистрибутива загального призначення є вразливостями пакетів, а номер релізу не показує, які пакети було виправлено відтоді. Див. [Зіставлення з CVE](/uk/cve/#які-продукти-зіставляються).

## Резолвер життєвого циклу

`endoflife:amazon-linux`.
