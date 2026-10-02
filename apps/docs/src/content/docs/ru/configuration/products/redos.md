---
title: RED OS
description: Настройка enodia для опроса RED OS через SSH.
---

Часть семейства [SSH-проб для определения ОС](/ru/configuration/products/ssh-os-probes/)
— общий механизм, credentials и проверка ключа хоста описаны на той
странице. Сверяется поле `ID` из `/etc/os-release`.

```yaml
targets:
  - id: redos-host
    product: redos
    address: host.example.com
    credentials: linux-host-ssh
```

Подтверждено вживую на `alrdockerhub/redos:7.3.1` (настоящее содержимое
RED OS — `HOME_URL`/`BUG_REPORT_URL` указывают на red-soft.ru):
`ID="redos"`, `VERSION_ID="7.3.1"`.

## Сопоставление с CVE

Сверяется **по каждому установленному пакету** с собственным OVAL РЕД ОС для 7.3 или 8.0 (`redos.xml` с `redos.red-soft.ru/support/secure/<7.3|8.0>/` в `cve.oval.path`) — данные RHEL здесь неприменимы, потому что версии пакетов у РЕД ОС свои (`.el7` в 7.3, `.red80` в 8.0). Релиз определяется по major.minor версии. В том же SSH-обращении проба ещё перечисляет установленные бинарные пакеты (`rpm -qa`, с потоком модуля AppStream у каждого пакета) и читает `uname -r`/`-m`/`-v` — это сохраняется в полях наблюдения `packages` и `modules` и в `extra.kernelRelease`, `extra.arch`, `extra.kernelVersion`. Из нескольких установленных ядер сравнивается работающее. Находки ссылаются на бюллетени РЕД ОС `ROS-…` и несут собственную оценку критичности вендора. См. [Сопоставление с CVE](/ru/cve/#cve-на-уровне-пакетов-для-дистрибутивов-linux).

## Резолвер жизненного цикла

Отсутствует — у endoflife.date пока нет календаря для RED OS. Пока
только инвентаризация.
