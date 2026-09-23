---
title: NixOS
description: Настройка enodia для опроса NixOS через SSH.
---

Часть семейства [SSH-проб для определения ОС](/ru/configuration/products/ssh-os-probes/)
— общий механизм, credentials и проверка ключа хоста описаны на той
странице. Сверяется поле `ID` из `/etc/os-release`.

```yaml
targets:
  - id: nixos-host
    product: nixos
    address: host.example.com
    credentials: linux-host-ssh
```

Подтверждено на реальном захвате rootfs из ISO: `ID=nixos`,
`VERSION_ID="26.05"`. Единственный образ на Docker Hub, `nixos/nix`, —
это просто пакетный менеджер Nix поверх базы, не являющейся NixOS, без
`/etc/os-release` вообще — не годился в качестве цели для проверки,
поэтому вместо него использовался захват rootfs из ISO.

## Сопоставление с CVE

Не сопоставляется — CVE дистрибутива общего назначения относятся к пакетам, а номер релиза не говорит, какие пакеты с тех пор обновлены. См. [Сопоставление с CVE](/ru/cve/#какие-продукты-сопоставляются).

## Резолвер жизненного цикла

`endoflife:nixos`.
