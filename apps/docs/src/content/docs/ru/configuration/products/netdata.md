---
title: Netdata
description: Настройка enodia для опроса Netdata.
---

Читает `GET /api/v1/info` агента, который по умолчанию отдаётся без
входа. Схема по умолчанию — `https`.

```yaml
targets:
  - id: netdata-01
    product: netdata
    address: https://netdata-01.example.com
```

## Что читается

Ответ начинается с `"version": "v2.12.1"`, рядом — `release-channel`.
Остальное в нём описывает хост — uid, ядро, метки, оборудование,
облако, — ничто из этого не описывает само программное обеспечение,
поэтому читаются только версия и канал релизов. Ответ без `version`
считается неподдерживаемым (это не Netdata).

## Аутентификация

Опционально — по умолчанию агент отвечает анонимно. Если заданы
`basic` или `bearer`, они передаются — для агента за прокси, который
их запрашивает; начиная с 2.2.0 любой другой вид — ошибка конфигурации.
См. [Конфигурация → Credentials](/ru/configuration/#credentials).

```yaml
credentials:
  netdata-proxy:
    kind: basic
    username: enodia
    password: "${NETDATA_PROXY_PASSWORD}"
```

## Записываемые поля

- `version` — как его сообщает агент, например `v2.12.1` (подтверждено
  вживую на `netdata/netdata:stable`)
- `extra.releaseChannel` — например, `stable` или `nightly`, если
  присутствует

## Сопоставление с CVE

Сверяется с NVD и БДУ ФСТЭК, если настроен [блок `cve:`](/ru/cve/).

## Резолвер жизненного цикла

`github:netdata/netdata` — у endoflife.date нет календаря для Netdata
(подтверждено 404), поэтому резолвинг идёт через GitHub Releases:
только последний опубликованный, не pre-release тег, без данных по
eol/support/lts (у GitHub нет мнения о политике жизненного цикла,
только «какой релиз последний»).
