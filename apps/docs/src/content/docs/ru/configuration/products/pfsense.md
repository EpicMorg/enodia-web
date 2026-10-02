---
title: pfSense
description: Настройка enodia для опроса pfSense Community Edition через SSH.
---

Использует тот же механизм SSH, credentials и проверку ключа хоста, что
и семейство [SSH-проб для определения ОС](/ru/configuration/products/ssh-os-probes/),
но за одно обращение читает собственные файлы pfSense `/etc/version` и
`/etc/platform`.

```yaml
targets:
  - id: pfsense-fw
    product: pfsense
    address: fw.example.com
    credentials: linux-host-ssh
```

## Аутентификация — обязательна

SSH-credential, `ssh-key` или `password` — см.
[Конфигурация → Credentials](/ru/configuration/#credentials).

## Только Community Edition

Подтверждено вживую на трёх реальных хостах pfSense CE (`2.7.2-RELEASE`,
`2.8.1-RELEASE`): в `/etc/version` ровно та версия, которую показывает
собственная панель pfSense, а в `/etc/platform` — `pfSense`.

Коммерческий **pfSense Plus** от Netgate — другой продукт со своей
календарной схемой версий (`24.11`, а не `2.x.y-RELEASE`). По его
документации он пишет в `/etc/platform` строку `pfSense-Plus`; эта проба
такой хост отклоняет, а не записывает его как факт про CE. Хоста Plus,
чтобы подтвердить это вживую, не было — поведение основано только на
документации.

## Записываемые поля

- `version` — содержимое `/etc/version` как есть, например `2.8.1-RELEASE`
- `extra.hostKeyVerified`

## Сопоставление с CVE

Пока не сопоставляется — pfSense появился в 2.1, и его сопоставление с
CVE в апстриме оставлено на отдельный, более поздний проход. См.
[Сопоставление с CVE](/ru/cve/#какие-продукты-сопоставляются).

## Резолвер жизненного цикла

Отсутствует — у endoflife.date нет страницы ни под `pfsense`, ни под
`pfsense-ce`, ни под `pfsense-plus` (подтверждено 404). Пока только
инвентаризация.
