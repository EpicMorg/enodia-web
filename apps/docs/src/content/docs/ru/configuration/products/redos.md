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

## Резолвер жизненного цикла

Отсутствует — у endoflife.date пока нет календаря для RED OS. Пока
только инвентаризация.
