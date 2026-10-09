---
title: openHAB
description: Налаштування enodia для опитування openHAB.
---

Читає корінь REST API, `GET /rest/`, який openHAB віддає без входу в
систему.

```yaml
targets:
  - id: openhab-main
    product: openhab
    address: https://openhab.example.com
```

## Яка версія чия

`/rest/` відповідає двома версіями: `version` верхнього рівня (`"8"`) —
власна версія REST API, і `runtimeInfo.version` (`"5.2.2"`) — версія
openHAB; підтверджено наживо на `openhab/openhab:latest`, чий
`version.properties` повідомив openhab-distro 5.2.2. Проба повідомляє
`runtimeInfo.version`; версія REST API потрапляє в `extra`.

## Автентифікація

Необовʼязкова. За замовчуванням `/rest/` відповідає анонімно;
`/rest/systeminfo` потребує входу й не використовується. Для екземпляра з
вимкненим анонімним доступом передаються облікові дані `bearer` або
`basic`, якщо їх налаштовано:

```yaml
credentials:
  openhab-token:
    kind: bearer
    value: "${OPENHAB_TOKEN}"
```

Будь-який інший вид є помилкою конфігурації. Див.
[Конфігурація → Облікові дані](/uk/configuration/#облікові-дані).

## Записувані поля

- `version` — `runtimeInfo.version`, напр. `5.2.2`
- `extra.build` — `runtimeInfo.buildString`, напр. `Release Build`
- `extra.restApiVersion` — `version` верхнього рівня, напр. `8`

## Зіставлення з CVE

Зіставляється з NVD, якщо налаштовано [блок `cve:`](/uk/cve/).

## Резолвер життєвого циклу

`github:openhab/openhab-distro` — endoflife.date не має календаря openHAB
(підтверджено 404), тому резолвінг натомість виконується через GitHub
Releases: лише останній опублікований тег, що не є пре-релізом, без дат
eol/support/lts (GitHub не має позиції щодо політики життєвого циклу, лише
«який реліз останній»). openhab-distro публікує майлстоуни (`5.3.0.M2`) як
звичайні релізи, не позначені як пре-релізи; резолвер пропускає їх за
назвою тегу, щоб майлстоун не робив кожен стабільний openHAB відсталим.
