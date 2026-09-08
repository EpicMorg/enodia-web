---
title: macOS
description: Настройка enodia для опроса macOS через SSH.
---

Использует тот же механизм SSH, credentials и проверку ключа хоста, что
и семейство [SSH-проб для определения ОС](/ru/configuration/products/ssh-os-probes/),
но запускает `sw_vers` — стандартный, документированный способ узнать
идентичность ОС Mac — вместо чтения файла.

```yaml
targets:
  - id: mac-host
    product: macos
    address: host.example.com
    credentials: linux-host-ssh
```

## Почему `sw_vers`, а не `uname -a`

`uname -a` в Darwin сообщает собственное имя хоста машины как часть
вывода — ничего из этого этой пробе видеть или хранить незачем.
Трёхстрочный вывод `sw_vers` (`ProductName`/`ProductVersion`/
`BuildVersion`) ничего подобного не несёт. Подтверждено вживую на
реальном Mac (macOS 15.4, `BuildVersion 24E248`, через SSH) — лицензия
Apple ограничивает виртуализацию macOS только настоящим железом Apple,
так что это единственный продукт во всём SSH-семействе, для которого
понадобился настоящий физический Mac, а не контейнер или загружаемый
образ ВМ.

Распознаётся только `ProductName: macOS` (начиная с 10.12 Sierra) — в
более старых релизах вместо этого сообщалось `"Mac OS X"`, форма,
никогда не подтверждённая вживую на реальной системе, поэтому она
считается неподдерживаемой, а не угадывается.

## Записываемые поля

- `version` — из `ProductVersion`
- `extra.buildVersion` — из `BuildVersion`, если присутствует
- `extra.hostKeyVerified`

## Резолвер жизненного цикла

`endoflife:macos`.
