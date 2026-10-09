---
title: pfSense
description: Налаштування enodia для опитування pfSense Community Edition через SSH.
---

Використовує той самий механізм SSH, облікові дані та перевірку ключа хоста,
що й сімейство [ідентифікації ОС через SSH](/uk/configuration/products/ssh-os-probes/),
але читає власні файли pfSense `/etc/version` і `/etc/platform` за один
обмін.

```yaml
targets:
  - id: pfsense-fw
    product: pfsense
    address: fw.example.com
    credentials: linux-host-ssh
```

## Автентифікація — обовʼязкова

Облікові дані SSH, `ssh-key` або `password` — див.
[Конфігурація → Облікові дані](/uk/configuration/#облікові-дані).

## Лише Community Edition

Підтверджено наживо на трьох справжніх хостах pfSense CE
(`2.7.2-RELEASE`, `2.8.1-RELEASE`): `/etc/version` містить рівно ту
версію, яку показує власна панель pfSense, а `/etc/platform` містить
`pfSense`.

Комерційний **pfSense Plus** від Netgate — інший продукт із власною
календарною схемою версій (`24.11`, а не `2.x.y-RELEASE`). Згідно з його
документацією, він повідомляє `pfSense-Plus` в `/etc/platform`; ця проба
відхиляє таку відповідь, а не записує хост Plus як факт про CE. Жодного
хоста Plus не було під рукою, щоб підтвердити це наживо, — це засновано
лише на документації.

## Записувані поля

- `version` — `/etc/version` як є, напр. `2.8.1-RELEASE`
- `extra.hostKeyVerified`

## Зіставлення з CVE

Зіставляється з NVD і БДУ ФСТЕК, якщо налаштовано [блок `cve:`](/uk/cve/). Починаючи з 2.2. Проба повідомляє
лише Community Edition, тож діапазони pfSense Plus у NVD (`sw_edition:
plus`) ніколи не застосовуються — див.
[Зіставлення з урахуванням редакції](/uk/cve/#зіставлення-з-урахуванням-редакції).

## Резолвер життєвого циклу

Немає — endoflife.date не має сторінки під `pfsense`, `pfsense-ce` чи
`pfsense-plus` (підтверджено 404). Поки що лише для інвентаризації.
