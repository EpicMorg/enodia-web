---
title: Astra Linux
description: Настройка enodia для опроса Astra Linux через SSH.
---

Использует тот же механизм SSH, credentials и проверку ключа хоста, что
и семейство [SSH-проб для определения ОС](/ru/configuration/products/ssh-os-probes/),
но читает другой файл: `/etc/astra_version`, собственный файл
идентичности Astra, а не `/etc/os-release`.

```yaml
targets:
  - id: astra-host
    product: astra-linux
    address: host.example.com
    credentials: linux-host-ssh
```

## Почему не `/etc/os-release`

Astra Linux основана на Debian и действительно несёт `/etc/os-release`
(`ID_LIKE=debian`), но её `VERSION_ID` непригоден для использования:
подтверждено вживую (`epicmorg/astralinux:1.7-main` и `:1.8-main`), что
там указано `"1.8_x86-64"` — суффикс архитектуры, встроенный прямо в
строку версии. В `/etc/astra_version` ничего подобного нет: простое
`"1.8.6"`/`"1.7.9"` — реальный point-релиз, который отслеживает сама
Astra.

## Записываемые поля

- `version` — из `/etc/astra_version`
- `extra.hostKeyVerified`

## Сопоставление с CVE

Сверяется **по каждому установленному пакету** с собственным OVAL Astra Linux для SE 1.7 или 1.8 (`oval-definitions-alse-<1.7|1.8>.xml` в `cve.oval.path`) — данные Debian здесь неприменимы, потому что версии пакетов Astra — её собственные пересборки. Релиз определяется по major.minor версии (`1.8.6` → 1.8). В том же SSH-обращении, что и `/etc/astra_version`, проба ещё перечисляет установленные бинарные пакеты (`dpkg-query`) — это сохраняется в поле наблюдения `packages` и в `extra.kernelRelease`, `extra.arch`, `extra.kernelVersion`. Находки ссылаются на бюллетень самой Astra или на БДУ, если вендор его не указывает (1.7). Оценки критичности в данных Astra нет, а пакеты ядра сравниваются как установленные, а не как работающие. См. [Сопоставление с CVE](/ru/cve/#cve-на-уровне-пакетов-для-дистрибутивов-linux).

## Резолвер жизненного цикла

Отсутствует — у endoflife.date нет календаря для Astra Linux
(подтверждено 404 под `astra`, `astralinux` и `astra-linux`). Пока
только инвентаризация.
