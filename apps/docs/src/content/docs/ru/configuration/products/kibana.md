---
title: Kibana
description: Настройка enodia для опроса Kibana.
---

Читает `GET /api/status` — намеренно без аутентификации по замыслу
(это именно то, что оркестраторы используют как liveness/readiness
проверку; собственный readiness-проб официального Helm-чарта Elastic
обращается ровно по этому пути без credentials).

```yaml
targets:
  - id: kibana-main
    product: kibana
    address: https://kibana.example.com
```

## Аутентификация

Отсутствует. Подтверждено вживую на реальном контейнере
`docker.elastic.co/kibana/kibana` (за которым стоит настоящий
Elasticsearch): ответ несёт полную версию даже пока Kibana ещё
запускается и отвечает `503` («ещё не готова») — версия уже есть в теле
независимо от кода статуса.

## Записываемые поля

Только `version` — эта проба не записывает никаких полей `extra`.

## Резолвер жизненного цикла

`endoflife:kibana`.
