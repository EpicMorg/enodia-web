---
title: postmarketOS
description: Настройка enodia для опроса postmarketOS через SSH.
---

Часть семейства [SSH-проб для определения ОС](/ru/configuration/products/ssh-os-probes/)
— общий механизм, credentials и проверка ключа хоста описаны на той
странице. Сверяется поле `ID` из `/etc/os-release`.

```yaml
targets:
  - id: postmarketos-host
    product: postmarketos
    address: host.example.com
    credentials: linux-host-ssh
```

Подтверждено на реальном захвате rootfs из ISO: `ID="postmarketos"`,
`VERSION_ID="v26.06"` — ведущая `v` — собственный формат вендора,
передаётся как есть; сравнение версий в enodia уже отбрасывает ведущую
`v`/`V` перед сравнением — так же, как это происходит с тегами релизов
GitHub вида `v1.2.3` в остальных частях инструмента.

## Резолвер жизненного цикла

`endoflife:postmarketos`.
