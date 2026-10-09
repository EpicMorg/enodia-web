---
title: Splunk
description: Налаштування enodia для опитування Splunk.
---

Читає `GET /services/server/info?output_mode=json` з порту керування
splunkd, а не з вебінтерфейсу. Адреса без порту отримує `8089` (порт
керування splunkd); схема за замовчуванням — `https`.

```yaml
targets:
  - id: splunk-main
    product: splunk
    address: splunk.example.com
    credentials: splunk-monitor
```

## Чому порт керування

Вебінтерфейс (порт 8000) — невдале місце для запиту: його часто
публікують за проксі або CDN, а його сторінка входу не містить версії, на
яку варто покладатися. Порт
керування splunkd доступний напряму, а `/services/server/info` відповідає
`entry[0].content` — `version`, `build`, `product_type`,
`isFree`/`isTrial`. На вебпорті пробі нічого читати, тому простий
hostname отримує `8089`, а не стандартний порт схеми.

## Автентифікація — обовʼязкова

Без облікових даних splunkd відповідає `401` з XML
`<msg type="ERROR">Unauthorized</msg>` і `Server: Splunkd` (помічено на
продакшн-екземплярі 9.4.1 і на `splunk/splunk` 10.6.0.5). Приймаються два
види — користувач Splunk через HTTP Basic або токен автентифікації Splunk
як Bearer:

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

Будь-який інший вид є помилкою конфігурації. Див.
[Конфігурація → Облікові дані](/uk/configuration/#облікові-дані).

## Записувані поля

- `version` — `entry[0].content.version`, напр. `10.6.0.5`
- `extra.build` — напр. `86587d4e3b27`
- `extra.license` — `free` або `trial`, якщо splunkd повідомляє одне з них;
  інакше відсутнє
- `extra.productType` — власний `product_type` splunkd, напр. `enterprise`

## Зіставлення з CVE

Зіставляється з NVD і БДУ ФСТЕК, якщо налаштовано [блок `cve:`](/uk/cve/).

З урахуванням редакції: NVD розділяє `splunk:splunk` за редакціями на
`enterprise` і давно виведену з ужитку `light`, а `extra.productType`
(`enterprise`, `lite`) визначає, яка з них застосовується. Якщо редакція
невідома, зберігаються всі знахідки. Splunk Cloud має власний CPE і не
зіставляється.

## Резолвер життєвого циклу

`endoflife:splunk`. Збірка, новіша за календар (10.6 у час, коли
endoflife.date містив версії до 10.4), показується як `cycle_unmatched`,
доки календар не наздожене.
