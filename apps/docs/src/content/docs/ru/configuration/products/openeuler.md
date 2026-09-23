---
title: openEuler
description: Настройка enodia для опроса openEuler через SSH.
---

Часть семейства [SSH-проб для определения ОС](/ru/configuration/products/ssh-os-probes/)
— общий механизм, credentials и проверка ключа хоста описаны на той
странице. Сверяется поле `ID` из `/etc/os-release`.

```yaml
targets:
  - id: openeuler-host
    product: openeuler
    address: host.example.com
    credentials: linux-host-ssh
```

Подтверждено вживую через `vmactions/openeuler-vm` (24.03-LTS-SP4, релиз
по умолчанию для этого action): `ID="openEuler"` — **с заглавной E,
подтверждено вживую, не строчная буква** — и `VERSION_ID="24.03"`.

## Сопоставление с CVE

Не сопоставляется — CVE дистрибутива общего назначения относятся к пакетам, а номер релиза не говорит, какие пакеты с тех пор обновлены. См. [Сопоставление с CVE](/ru/cve/#какие-продукты-сопоставляются).

## Резолвер жизненного цикла

Отсутствует — у endoflife.date пока нет календаря для openEuler. Пока
только инвентаризация.
