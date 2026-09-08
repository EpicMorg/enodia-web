---
title: CentOS Stream
description: Настройка enodia для опроса CentOS Stream через SSH.
---

Часть семейства [SSH-проб для определения ОС](/ru/configuration/products/ssh-os-probes/)
— общий механизм, credentials и проверка ключа хоста описаны на той
странице.

```yaml
targets:
  - id: centos-stream-host
    product: centos-stream
    address: host.example.com
    credentials: linux-host-ssh
```

## Проверка личности — больше, чем просто сверка `ID`

Подтверждено вживую на `quay.io/centos/centos:stream9`: `/etc/os-release`
сообщает `ID="centos"` — **тот же `ID`, что и у устаревшего, EOL
[CentOS Linux](/ru/configuration/products/centos/)** — поэтому этот
продукт дополнительно сверяет `NAME="CentOS Stream"`, поле, которое и
отличает их друг от друга. `product: centos-stream`, указанный для хоста
с устаревшим CentOS 7 (и наоборот), не пройдёт проверку личности вместо
того, чтобы записаться под неверным продуктом.

## Записываемые поля

Как и у остального семейства: `version` из `VERSION_ID`, плюс
`extra.hostKeyVerified`.

## Резолвер жизненного цикла

`endoflife:centos-stream`.
