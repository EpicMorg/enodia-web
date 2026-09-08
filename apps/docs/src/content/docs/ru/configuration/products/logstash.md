---
title: Logstash
description: Настройка enodia для опроса Logstash.
---

Читает `GET /` через собственный HTTP monitoring API Logstash — **порт
9600 по умолчанию, не порты Elasticsearch или Kibana**.

```yaml
targets:
  - id: logstash-main
    product: logstash
    address: https://logstash.example.com:9600
```

## Аутентификация

Отсутствует. У monitoring API Logstash вообще нет встроенной
аутентификации — предполагается, что он закрыт файрволом, а не защищён
credentials. Подтверждено вживую на реальном контейнере
`docker.elastic.co/logstash/logstash`.

## Записываемые поля

Только `version` — эта проба не записывает никаких полей `extra`.

## Резолвер жизненного цикла

`endoflife:logstash`.
