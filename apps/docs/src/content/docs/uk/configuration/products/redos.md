---
title: RED OS
description: Налаштування enodia для опитування RED OS через SSH.
---

Належить до сімейства [ідентифікації ОС через SSH](/uk/configuration/products/ssh-os-probes/)
— спільний механізм, облікові дані та перевірку ключа хоста описано на
тій сторінці. Зіставляється за полем `ID` файлу `/etc/os-release`.

```yaml
targets:
  - id: redos-host
    product: redos
    address: host.example.com
    credentials: linux-host-ssh
```

Перевірено наживо на `alrdockerhub/redos:7.3.1` (справжній вміст RED OS —
`HOME_URL`/`BUG_REPORT_URL` вказують на red-soft.ru): `ID="redos"`,
`VERSION_ID="7.3.1"`.

## Зіставлення з CVE

Не зіставляється — CVE дистрибутива загального призначення є вразливостями пакетів, а номер релізу не показує, які пакети було виправлено відтоді. Див. [Зіставлення з CVE](/uk/cve/#які-продукти-зіставляються).

## Резолвер життєвого циклу

Немає — наразі endoflife.date не має календаря RED OS. Лише для інвентаризації.
