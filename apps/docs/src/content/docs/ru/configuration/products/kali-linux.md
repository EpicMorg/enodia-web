---
title: Kali Linux
description: Настройка enodia для опроса Kali Linux через SSH.
---

Часть семейства [SSH-проб для определения ОС](/ru/configuration/products/ssh-os-probes/)
— общий механизм, credentials и проверка ключа хоста описаны на той
странице. Сверяется поле `ID` из `/etc/os-release`.

```yaml
targets:
  - id: kali-host
    product: kali-linux
    address: host.example.com
    credentials: linux-host-ssh
```

Подтверждено вживую на `kalilinux/kali-rolling`: `ID=kali`,
`VERSION_ID="2026.3"` — датированный снапшот rolling-release, а не
дискретная версия.

## Резолвер жизненного цикла

Отсутствует — Kali является rolling-release, и у endoflife.date нет для
неё календаря (подтверждено 404) по той же причине, что и у Gentoo.
Пока только инвентаризация.
