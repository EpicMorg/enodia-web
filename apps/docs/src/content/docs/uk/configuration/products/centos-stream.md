---
title: CentOS Stream
description: Налаштування enodia для опитування CentOS Stream через SSH.
---

Належить до сімейства [ідентифікації ОС через SSH](/uk/configuration/products/ssh-os-probes/)
— спільний механізм, облікові дані та перевірку ключа хоста описано на
тій сторінці.

```yaml
targets:
  - id: centos-stream-host
    product: centos-stream
    address: host.example.com
    credentials: linux-host-ssh
```

## Перевірка ідентичності вендора — більше, ніж просто збіг `ID`

Перевірено наживо на `quay.io/centos/centos:stream9`: `/etc/os-release`
повідомляє `ID="centos"` — **той самий `ID`, що й у застарілої CentOS Linux
із завершеною підтримкою ([CentOS Linux](/uk/configuration/products/centos/))**, —
тому цей продукт додатково перевіряє `NAME="CentOS Stream"`, поле, яке
справді їх розрізняє. `product: centos-stream`, спрямований на застарілий
хост CentOS 7 (або навпаки), не проходить перевірку ідентичності, а не
записується під неправильним продуктом.

## Записувані поля

Такі самі, як і в решти сімейства: `version` з `VERSION_ID`, плюс
`extra.hostKeyVerified`.

## Зіставлення з CVE

Не зіставляється — CVE дистрибутива загального призначення є вразливостями пакетів, а номер релізу не показує, які пакети було виправлено відтоді. Див. [Зіставлення з CVE](/uk/cve/#які-продукти-зіставляються).

## Резолвер життєвого циклу

`endoflife:centos-stream`.
