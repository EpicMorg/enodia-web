---
title: MinIO
description: Настройка enodia для опроса MinIO через SSH.
---

SSH-проба: заходит на хост и запускает собственный `--version` бинарника
сервера — сначала `minio` по имени, потом `/usr/local/bin/minio`. Порт по
умолчанию — `22`, без схемы; тот же механизм SSH, credentials и проверка
ключа хоста, что и у семейства
[SSH-проб для определения ОС](/ru/configuration/products/ssh-os-probes/).

```yaml
targets:
  - id: minio-01
    product: minio
    address: minio-01.example.com
    credentials: linux-host-ssh
```

## Почему SSH

Ни один сетевой интерфейс MinIO не отдаёт версию анонимно: заголовок
`Server` у S3 API — просто `MinIO`, анонимный `/api/v1/login` консоли
возвращает только способ входа, а admin API и метрики Prometheus требуют
ключа администратора или bearer-токена, сгенерированного через `mc`.

## MinIO в контейнере

Если MinIO работает в Docker или Podman, а на самом хосте бинарника нет,
укажите контейнер в `options` — тогда команда выполняется через
`docker exec` (или `podman exec`):

```yaml
targets:
  - id: minio-01
    product: minio
    address: minio-01.example.com
    credentials: linux-host-ssh
    options:
      container: minio               # имя контейнера
      container_runtime: podman      # опционально: docker (по умолчанию) или podman
```

SSH-пользователю должно быть разрешено пользоваться этим рантаймом. Имя
контейнера сверяется с собственным шаблоном имён Docker, прежде чем
попасть в удалённую команду.

## Имена релизов как версии

MinIO называет релизы по метке времени UTC — `RELEASE.2025-10-15T17-29-55Z`
— и в `--version`, и в тегах на GitHub. enodia сворачивает такое имя, с
маркером `_<MARKER>` после `RELEASE` или без него (внутренние сборки
пишут `RELEASE_INHOUSE.…`), в сравнимое `2025.10.15.17.29.55` — и для
наблюдаемой версии, и для тега резолвера.

## Аутентификация — обязательна

SSH-credential, `ssh-key` или `password` — см.
[Конфигурация → Credentials](/ru/configuration/#credentials).

## Записываемые поля

- `version` — например, `RELEASE_INHOUSE.2025-03-12T18-04-18Z`, из
  `minio version RELEASE_INHOUSE.2025-03-12T18-04-18Z (commit-id=…)`
- `extra.build` — маркер после `RELEASE_` у не-upstream сборки, например
  `INHOUSE`
- `extra.commit` — `commit-id`, если присутствует
- `extra.runtime` — рантайм Go из строки `Runtime:`, например `go1.24.4`
- `extra.container` — имя контейнера, если задан `options.container`
- `extra.hostKeyVerified`

## Сопоставление с CVE

Сверяется с NVD и БДУ ФСТЭК, если настроен [блок `cve:`](/ru/cve/). Оба
источника записывают границы как метки времени релизов
(`2025-10-15t17-29-55z`, в любом регистре); они сворачиваются в ту же
форму с точками, что и опрошенная версия, так что их можно сравнивать.
Граница, заданная простой датой, по-прежнему не разбирается.

## Резолвер жизненного цикла

`github:minio/minio` — у endoflife.date нет страницы MinIO (подтверждено
404), поэтому резолвинг идёт через GitHub Releases: только последний
опубликованный, не pre-release тег, без данных по eol/support/lts.
Репозиторий архивирован: последний релиз community-редакции —
`RELEASE.2025-10-15T17-29-55Z`, и именно с ним теперь сравнивается любой
MinIO.
