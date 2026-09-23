---
title: openEuler
description: Налаштування enodia для опитування openEuler через SSH.
---

Належить до сімейства [ідентифікації ОС через SSH](/uk/configuration/products/ssh-os-probes/)
— спільний механізм, облікові дані та перевірку ключа хоста описано на
тій сторінці. Зіставляється за полем `ID` файлу `/etc/os-release`.

```yaml
targets:
  - id: openeuler-host
    product: openeuler
    address: host.example.com
    credentials: linux-host-ssh
```

Перевірено наживо через `vmactions/openeuler-vm` (24.03-LTS-SP4, типовий
реліз цієї дії): `ID="openEuler"` — **велика E, підтверджено наживо, не
мала** — і `VERSION_ID="24.03"`.

## Зіставлення з CVE

Не зіставляється — CVE дистрибутива загального призначення є вразливостями пакетів, а номер релізу не показує, які пакети було виправлено відтоді. Див. [Зіставлення з CVE](/uk/cve/#які-продукти-зіставляються).

## Резолвер життєвого циклу

Немає — endoflife.date наразі не має календаря openEuler. Лише для інвентаризації.
