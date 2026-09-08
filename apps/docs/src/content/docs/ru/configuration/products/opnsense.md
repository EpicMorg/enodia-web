---
title: OPNsense
description: Настройка enodia для опроса OPNsense через SSH.
---

Использует тот же механизм SSH, credentials и проверку ключа хоста, что
и семейство [SSH-проб для определения ОС](/ru/configuration/products/ssh-os-probes/),
но запускает `opnsense-version` вместо чтения файла.

```yaml
targets:
  - id: opnsense-host
    product: opnsense
    address: host.example.com
    credentials: linux-host-ssh
```

## Почему команда, а не файл

OPNsense построена на базе FreeBSD, но без `/etc/os-release` вообще, а
её реальная версия разбита по нескольким файлам компонентов под
`/usr/local/opnsense/version/` (base, kernel, core, pkgs) — нет одного
очевидного файла идентичности. `opnsense-version` — собственная обёртка
OPNsense, которая читает нужный файл и печатает всё одной строкой.
Подтверждено вживую на реальном инстансе OPNsense 26.7, полученном
через `vmactions/opnsense-vm`: `"OPNsense 26.7 (amd64)"`.

## Записываемые поля

- `version` — разобрано из вывода `opnsense-version`
- `extra.hostKeyVerified`

## Резолвер жизненного цикла

`endoflife:opnsense`.
