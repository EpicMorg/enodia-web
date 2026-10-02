---
title: FreeRADIUS
description: Настройка enodia для опроса FreeRADIUS через SSH.
---

SSH-проба: заходит на хост и запускает собственный `-v` сервера. Порт по
умолчанию — `22`, без схемы; тот же механизм SSH, credentials и проверка
ключа хоста, что и у семейства
[SSH-проб для определения ОС](/ru/configuration/products/ssh-os-probes/).

```yaml
targets:
  - id: radius-01
    product: freeradius
    address: radius-01.example.com
    credentials: linux-host-ssh
```

## Почему SSH

В RADIUS нет обмена версиями, и в ответе Status-Server у FreeRADIUS его
тоже нет — его словари описывают счётчики статистики, а не атрибут
версии. Поэтому версию можно получить только от самого бинарника
сервера. Проба пробует `freeradius` (Debian/Ubuntu) и `radiusd` (семейство
RHEL, сборки из исходников) — сначала по имени, потом по пути в
`/usr/sbin`, потому что в `PATH` нелогин-сессии SSH `/usr/sbin` часто
нет.

## Аутентификация — обязательна

SSH-credential, `ssh-key` или `password` — см.
[Конфигурация → Credentials](/ru/configuration/#credentials).

## FreeRADIUS в контейнере

Если FreeRADIUS работает в Docker или Podman, а на самом хосте бинарника
нет, укажите контейнер в `options` — тогда команда выполняется через
`docker exec` (или `podman exec`):

```yaml
targets:
  - id: radius-01
    product: freeradius
    address: radius-01.example.com
    credentials: linux-host-ssh
    options:
      container: freeradius          # имя контейнера
      container_runtime: podman      # опционально: docker (по умолчанию) или podman
```

SSH-пользователю должно быть разрешено пользоваться этим рантаймом. Имя
контейнера сверяется с собственным шаблоном имён Docker, прежде чем
попасть в удалённую команду.

## Записываемые поля

- `version` — например, `3.2.10`, из `FreeRADIUS Version 3.2.10 (git #9071ea041)`
- `extra.git` — git-хеш сборки, если присутствует
- `extra.container` — имя контейнера, если задан `options.container`
- `extra.hostKeyVerified`

## Сопоставление с CVE

Сверяется с NVD и БДУ ФСТЭК, если настроен [блок `cve:`](/ru/cve/). Оба
источника берутся как есть: диапазон NVD для BlastRADIUS
(CVE-2024-3596) охватывает только версии до 3.0.27 и ничего не говорит о
ветке 3.2 (исправлено в 3.2.5), поэтому хост 3.2.3 находки по нему не
получает.

## Резолвер жизненного цикла

`github-tag-branches:FreeRADIUS/freeradius-server`. У endoflife.date
нет страницы FreeRADIUS (подтверждено 404), а FreeRADIUS поддерживает
ветки 3.0.x и 3.2.x параллельно и тегирует релизы как `release_3_2_10`.
Этот тип резолвера читает теги как **отдельный цикл поддержки на
каждую ветку major.minor**, у каждой свой последний тег, так что
полностью пропатченный 3.0.28 читается как `current` в своей ветке, с
более новой доступной веткой, — а не как «отстаёт от 3.2.10». Читается
только максимальная страница GitHub на 100 тегов; как и у других
резолверов через GitHub, дат EOL у него нет, а `GITHUB_TOKEN` поднимает
лимит запросов (см. [Поддерживаемые продукты](/ru/products/)).
