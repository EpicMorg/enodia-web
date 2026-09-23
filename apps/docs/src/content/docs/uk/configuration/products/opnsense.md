---
title: OPNsense
description: Налаштування enodia для опитування OPNsense через SSH.
---

Використовує той самий механізм SSH, облікові дані та перевірку ключа хоста,
що й сімейство [ідентифікації ОС через SSH](/uk/configuration/products/ssh-os-probes/),
але виконує `opnsense-version`, а не читає файл.

```yaml
targets:
  - id: opnsense-host
    product: opnsense
    address: host.example.com
    credentials: linux-host-ssh
```

## Чому команда, а не файл

OPNsense побудовано на базі FreeBSD без жодного `/etc/os-release`, а його
фактичну версію розподілено між кількома файлами компонентів у
`/usr/local/opnsense/version/` (base, kernel, core, pkgs) — єдиного
очевидного файлу ідентичності немає. `opnsense-version` — власна обгортка
OPNsense, яка читає потрібний файл і виводить усе одним рядком. Перевірено
наживо на справжньому екземплярі OPNsense 26.7, запущеному через
`vmactions/opnsense-vm`: `"OPNsense 26.7 (amd64)"`.

## Записувані поля

- `version` — розібрана з виводу `opnsense-version`
- `extra.hostKeyVerified`

## Зіставлення з CVE

Зіставляється з NVD і БДУ ФСТЕК, якщо налаштовано [блок `cve:`](/uk/cve/).

## Резолвер життєвого циклу

`endoflife:opnsense`.
