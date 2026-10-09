---
title: openHAB
description: Настройка enodia для опроса openHAB.
---

Читает корень REST API, `GET /rest/`, который openHAB отдаёт без входа в
систему.

```yaml
targets:
  - id: openhab-main
    product: openhab
    address: https://openhab.example.com
```

## Какая версия чья

`/rest/` отвечает двумя версиями: `version` верхнего уровня (`"8"`) —
версия самого REST API, а `runtimeInfo.version` (`"5.2.2"`) — версия
openHAB. Подтверждено вживую на `openhab/openhab:latest`, чей
`version.properties` указывал openhab-distro 5.2.2. Проба сообщает
`runtimeInfo.version`; версия REST API попадает в `extra`.

## Аутентификация

Необязательна. По умолчанию `/rest/` отвечает анонимно; `/rest/systeminfo`
требует входа и не используется. Для инстанса с отключённым анонимным
доступом передаются учётные данные `bearer` или `basic`, если они
настроены:

```yaml
credentials:
  openhab-token:
    kind: bearer
    value: "${OPENHAB_TOKEN}"
```

Любой другой `kind` — ошибка конфигурации. См.
[Конфигурация → Credentials](/ru/configuration/#credentials).

## Записываемые поля

- `version` — `runtimeInfo.version`, например `5.2.2`
- `extra.build` — `runtimeInfo.buildString`, например `Release Build`
- `extra.restApiVersion` — `version` верхнего уровня, например `8`

## Сопоставление с CVE

Сверяется с NVD, если настроен [блок `cve:`](/ru/cve/).

## Резолвер жизненного цикла

`github:openhab/openhab-distro` — у endoflife.date нет календаря для
openHAB (подтверждено 404), поэтому резолвинг идёт через GitHub
Releases: только последний опубликованный, не pre-release тег, без
данных по eol/support/lts (у GitHub нет мнения о политике жизненного
цикла, только «какой релиз последний»). openhab-distro публикует
milestone-сборки (`5.3.0.M2`) как обычные релизы, не помечая их как
pre-release; резолвер пропускает их по имени тега, чтобы milestone не
заставлял каждый стабильный openHAB выглядеть отстающим.
