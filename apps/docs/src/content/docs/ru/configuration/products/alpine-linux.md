---
title: Alpine Linux
description: Настройка enodia для опроса Alpine Linux через SSH.
---

Часть семейства [SSH-проб для определения ОС](/ru/configuration/products/ssh-os-probes/)
— общий механизм, credentials и проверка ключа хоста описаны на той
странице. Сверяется поле `ID` из `/etc/os-release`.

```yaml
targets:
  - id: alpine-host
    product: alpine-linux
    address: host.example.com
    credentials: linux-host-ssh
```

Подтверждено вживую на `alpine:latest`: `ID=alpine` (обратите внимание —
это само по себе поле `ID`, а не `alpine-linux`; значение `product:`
добавляет `-linux` для ясности, сверка же идёт с более коротким значением
вендора), `VERSION_ID=3.24.1`.

## Резолвер жизненного цикла

`endoflife:alpine-linux`.
