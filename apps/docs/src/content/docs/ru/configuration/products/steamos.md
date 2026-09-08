---
title: SteamOS
description: Настройка enodia для опроса SteamOS через SSH.
---

Часть семейства [SSH-проб для определения ОС](/ru/configuration/products/ssh-os-probes/)
— общий механизм, credentials и проверка ключа хоста описаны на той
странице. Сверяется поле `ID` из `/etc/os-release`.

```yaml
targets:
  - id: steamos-host
    product: steamos
    address: host.example.com
    credentials: linux-host-ssh
```

Подтверждено на реальном захвате rootfs из ISO для SteamOS 2 (на базе
Debian, кодовое имя «brewmaster»): `ID=steamos`, `VERSION_ID="2"`.
Ожидается, что SteamOS 3.x (на базе Arch, текущая ОС Steam Deck,
кодовое имя «holo») использует то же значение `ID=steamos` — брендинг
Valve последователен во всей линейке — но вживую это пока не
подтверждено, только фикстур 2.x. Простая сверка `ID=steamos` покрывает
обе версии без необходимости обрабатывать их отдельно.

## Резолвер жизненного цикла

`endoflife:steamos`.
