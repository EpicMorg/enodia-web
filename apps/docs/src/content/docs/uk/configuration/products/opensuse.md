---
title: openSUSE
description: Налаштування enodia для опитування openSUSE через SSH.
---

Належить до сімейства [ідентифікації ОС через SSH](/uk/configuration/products/ssh-os-probes/)
— спільний механізм, облікові дані та перевірку ключа хоста описано на
тій сторінці.

```yaml
targets:
  - id: opensuse-host
    product: opensuse
    address: host.example.com
    credentials: linux-host-ssh
```

## Відповідає і Leap, і Tumbleweed

На відміну від більшості простих перевірок рівності `ID` у цьому
сімействі, ця відповідає будь-якому `ID`, що починається з `opensuse-`.
Перевірено наживо на `opensuse/leap:latest`: `ID="opensuse-leap"`,
`VERSION_ID="16.0"`. Tumbleweed (`ID="opensuse-tumbleweed"`) тут не покрито
реальною фікстурою, але він має той самий префікс `opensuse-`, тож цей
самий продукт його приймає, а не залишає без відповідності.

## Зіставлення з CVE

Не зіставляється — CVE дистрибутива загального призначення є вразливостями пакетів, а номер релізу не показує, які пакети було виправлено відтоді. Див. [Зіставлення з CVE](/uk/cve/#які-продукти-зіставляються).

## Резолвер життєвого циклу

`endoflife:opensuse`.
