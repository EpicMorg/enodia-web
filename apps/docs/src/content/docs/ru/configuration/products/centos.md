---
title: CentOS Linux (устаревший)
description: Настройка enodia для опроса устаревшего, EOL CentOS Linux через SSH.
---

Использует тот же механизм SSH, credentials и проверку ключа хоста, что
и семейство [SSH-проб для определения ОС](/ru/configuration/products/ssh-os-probes/),
но читает другой файл: `/etc/redhat-release`, а не `/etc/os-release`.

```yaml
targets:
  - id: centos-host
    product: centos
    address: host.example.com
    credentials: linux-host-ssh
```

## Почему не семейство os-release

Это устаревший, уже вышедший из поддержки CentOS Linux (5/6/7/8) — в
отличие от [CentOS Stream](/ru/configuration/products/centos-stream/),
его актуального преемника. Подтверждено вживую, что CentOS 5 и 6
появились раньше конвенции os-release от systemd (`/etc/os-release`
там нет вообще), тогда как `/etc/redhat-release` существует во всём
семействе RHEL уже гораздо дольше. Реальные парки серверов всё ещё
используют их — достижение CentOS конца поддержки не выводит из
эксплуатации машины, которые на нём всё ещё работают, а именно для
этого enodia и существует — показывать это, а не скрывать.

Подтверждено вживую на `centos:5` (`"CentOS release 5.11 (Final)"`),
`:6` (`"CentOS release 6.10 (Final)"`) и `:7` (`"CentOS Linux release
7.9.2009 (Core)"`). Собственный `/etc/redhat-release` хоста с CentOS
Stream 9 (`"CentOS Stream release 9"`) **не** совпадает с этим
шаблоном — сверка требует, чтобы сразу после «CentOS » шло «release»
или «Linux release», так что инстанс Stream никогда не будет ошибочно
принят за устаревший `centos`, даже несмотря на то что оба файла
существуют в обеих линейках продукта.

## Записываемые поля

- `version` — номер релиза, разобранный из `/etc/redhat-release`
- `extra.hostKeyVerified`

## Резолвер жизненного цикла

`endoflife:centos`.
