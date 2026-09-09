---
title: Debian
description: Настройка enodia для опроса Debian через SSH.
---

Использует тот же механизм SSH, credentials и проверку ключа хоста, что
и семейство [SSH-проб для определения ОС](/ru/configuration/products/ssh-os-probes/),
но — начиная с 1.1.1 — больше не относится к общему механизму
`osReleaseFamilyProbe`, описанному на той странице; см. ниже.

```yaml
targets:
  - id: debian-host
    product: debian
    address: host.example.com
    credentials: linux-host-ssh
```

## Собственная проба, а не общая os-release, начиная с 1.1.1

Поле `VERSION_ID` в `/etc/os-release` у Debian никогда не несёт
point-релиз — подтверждено вживую: полностью пропатченная установка
Debian 13 всё равно сообщает голый `VERSION_ID="13"`, точно так же, как
и день-один-установка. Реальный point-релиз (`13.6`) живёт только в
`/etc/debian_version`. Доверять только этому файлу нельзя: подтверждено
вживую, что реальный образ Ubuntu 24.04 тоже несёт такой файл,
унаследованный из цепочки сборки, со значением `trixie/sid` —
бессмысленным для версии самой Ubuntu. Эта проба читает оба файла за
один SSH-запрос, сначала подтверждает `ID=debian`, и только потом
доверяет содержимому `debian_version`, если это простое число через
точки — собственная копия Debian testing (`forky/sid`) и унаследованная
копия у Ubuntu обе корректно откатываются на `VERSION_ID`.

Подтверждено вживую на `debian:bookworm-slim`: `ID=debian`,
`VERSION_ID="12"`.

## Записываемые поля

- `version` — point-релиз, если он есть в `/etc/debian_version`,
  например `13.6`; иначе голый `VERSION_ID`
- `extra.debianVersion` — необработанное содержимое
  `/etc/debian_version`, если файл существует и не пуст, даже если это
  не простое число через точки (как `forky/sid` у Debian testing) —
  полезно видеть как есть, а не молча отбрасывать
- `extra.hostKeyVerified`

## Резолвер жизненного цикла

`endoflife:debian` — без изменений.
