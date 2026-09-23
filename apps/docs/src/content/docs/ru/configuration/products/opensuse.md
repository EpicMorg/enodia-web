---
title: openSUSE
description: Настройка enodia для опроса openSUSE через SSH.
---

Часть семейства [SSH-проб для определения ОС](/ru/configuration/products/ssh-os-probes/)
— общий механизм, credentials и проверка ключа хоста описаны на той
странице.

```yaml
targets:
  - id: opensuse-host
    product: opensuse
    address: host.example.com
    credentials: linux-host-ssh
```

## Совпадает и с Leap, и с Tumbleweed

В отличие от большинства продуктов этого семейства с простой сверкой
`ID` на точное равенство, здесь сверяется любой `ID`, начинающийся с
`opensuse-`. Подтверждено вживую на `opensuse/leap:latest`:
`ID="opensuse-leap"`, `VERSION_ID="16.0"`. Tumbleweed
(`ID="opensuse-tumbleweed"`) не покрыт здесь реальным фикстуром, но
разделяет тот же префикс `opensuse-`, поэтому принимается тем же
продуктом, а не остаётся несопоставленным.

## Сопоставление с CVE

Не сопоставляется — CVE дистрибутива общего назначения относятся к пакетам, а номер релиза не говорит, какие пакеты с тех пор обновлены. См. [Сопоставление с CVE](/ru/cve/#какие-продукты-сопоставляются).

## Резолвер жизненного цикла

`endoflife:opensuse`.
