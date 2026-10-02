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

## Сопоставление с CVE

Сверяется **по каждому установленному пакету** с secdb Alpine для ветки хоста (`main.json` и `community.json` в `cve.alpine.path`), а не по релизу. Ветка — это major.minor из `VERSION_ID` (3.20.3 → v3.20); у edge нет номерной ветки, и находок у него нет. В том же SSH-обращении проба ещё читает `/lib/apk/db/installed` и группирует пакеты по **origin** (ключ самого secdb: `libcrypto3` и `libssl3` — это оба `openssl`) — это сохраняется в поле наблюдения `packages` и в `extra.kernelRelease`, `extra.arch`, `extra.kernelVersion`. Сообщаются только CVE с исправлением новее установленного, одна находка на origin, со ссылкой на его страницу на security.alpinelinux.org; оценки критичности в secdb нет. См. [Сопоставление с CVE](/ru/cve/#cve-на-уровне-пакетов-для-дистрибутивов-linux).

## Резолвер жизненного цикла

`endoflife:alpine-linux`.
