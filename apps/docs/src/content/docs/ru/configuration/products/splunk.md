---
title: Splunk
description: Настройка enodia для опроса Splunk.
---

Читает `GET /services/server/info?output_mode=json` с management-порта
splunkd, а не из веб-интерфейса. Адрес без порта получает `8089`
(management-порт splunkd); схема по умолчанию — `https`.

```yaml
targets:
  - id: splunk-main
    product: splunk
    address: splunk.example.com
    credentials: splunk-monitor
```

## Почему management-порт

Веб-интерфейс (порт 8000) — неподходящее место для запроса: его часто
публикуют за прокси или CDN, а его страница входа не содержит версии,
на которую можно было бы положиться. Management-порт
splunkd доступен напрямую, и `/services/server/info` отвечает объектом
`entry[0].content` — `version`, `build`, `product_type`,
`isFree`/`isTrial`. На веб-порту пробе читать нечего, поэтому голое имя
хоста получает `8089`, а не порт по умолчанию для схемы.

## Аутентификация — обязательна

Без учётных данных splunkd отвечает `401` с XML
`<msg type="ERROR">Unauthorized</msg>` и `Server: Splunkd` (наблюдалось на
боевом 9.4.1 и на `splunk/splunk` 10.6.0.5). Принимаются два вида —
пользователь Splunk через HTTP Basic или токен аутентификации Splunk
как Bearer:

```yaml
credentials:
  splunk-monitor:
    kind: basic
    username: monitor
    password: "${SPLUNK_PASSWORD}"
```

```yaml
credentials:
  splunk-token:
    kind: bearer
    value: "${SPLUNK_TOKEN}"
```

Любой другой `kind` — ошибка конфигурации. См.
[Конфигурация → Credentials](/ru/configuration/#credentials).

## Записываемые поля

- `version` — `entry[0].content.version`, например `10.6.0.5`
- `extra.build` — например `86587d4e3b27`
- `extra.license` — `free` или `trial`, если splunkd сообщает одно из
  них; иначе отсутствует
- `extra.productType` — собственный `product_type` splunkd, например
  `enterprise`

## Сопоставление с CVE

Сверяется с NVD и БДУ ФСТЭК, если настроен [блок `cve:`](/ru/cve/).

С учётом редакции: NVD разделяет `splunk:splunk` по редакциям на
`enterprise` и давно снятую с поддержки `light`, а `extra.productType`
(`enterprise`, `lite`) определяет, какая из них применяется. Если
редакция неизвестна, сохраняются все находки. У Splunk Cloud свой CPE, и
он не сопоставляется.

## Резолвер жизненного цикла

`endoflife:splunk`. Сборка новее календаря (10.6 — в момент, когда
endoflife.date перечислял версии до 10.4) читается как `cycle_unmatched`,
пока календарь не догонит.
