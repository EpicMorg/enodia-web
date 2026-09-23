---
title: Logstash
description: Налаштування enodia для опитування Logstash.
---

Читає `GET /` власного HTTP API моніторингу Logstash — **типово порт 9600,
а не порти Elasticsearch чи Kibana**.

```yaml
targets:
  - id: logstash-main
    product: logstash
    address: https://logstash.example.com:9600
```

## Автентифікація

Немає. API моніторингу Logstash узагалі не має вбудованої автентифікації —
його передбачено закривати мережевим екраном, а не захищати обліковими
даними. Підтверджено наживо на справжньому контейнері
`docker.elastic.co/logstash/logstash`.

## Записувані поля

Лише `version` — ця проба не записує полів `extra`.

## Зіставлення з CVE

Зіставляється з NVD і БДУ ФСТЕК, якщо налаштовано [блок `cve:`](/uk/cve/).

## Резолвер життєвого циклу

`endoflife:logstash`.
