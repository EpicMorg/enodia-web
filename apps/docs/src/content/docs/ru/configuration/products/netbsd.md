---
title: NetBSD
description: Настройка enodia для опроса NetBSD через SSH.
---

Часть семейства [SSH-проб для определения ОС](/ru/configuration/products/ssh-os-probes/),
но не группы os-release — у NetBSD вообще нет аналога os-release,
поэтому источником идентичности вместо него служит `uname -sr`. Общий
механизм, credentials и проверка ключа хоста — на странице семейства.

```yaml
targets:
  - id: netbsd-host
    product: netbsd
    address: host.example.com
    credentials: linux-host-ssh
```

Подтверждено вживую через `vmactions/netbsd-vm` (иначе загружаемого
готового образа не существует): `uname -sr` → `"NetBSD 11.0"`, без
какого-либо имени хоста в выводе — в отличие от `uname -a`, которую эта
проба намеренно не использует.

## Резолвер жизненного цикла

`endoflife:netbsd`.
