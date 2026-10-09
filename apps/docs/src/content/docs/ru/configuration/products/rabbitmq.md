---
title: RabbitMQ
description: Настройка enodia для опроса RabbitMQ.
---

Читает `GET /api/overview` из HTTP API management-плагина (по умолчанию
порт `15672` — укажите его в адресе). У самого AMQP-порта нет обмена
версией до аутентификации, который стоило бы читать; management-плагин —
единственное место, где RabbitMQ отдаёт свою версию.

```yaml
targets:
  - id: rabbitmq-main
    product: rabbitmq
    address: https://rabbitmq.example.com:15672
    credentials: rabbitmq-monitor
```

## Аутентификация — обязательна

Management API никогда не бывает анонимным: подтверждено вживую на
`rabbitmq:4-management`, который без учётных данных ответил `401`.
Нужны учётные данные HTTP Basic пользователя management:

```yaml
credentials:
  rabbitmq-monitor:
    kind: basic
    username: monitor
    password: "${RABBITMQ_PASSWORD}"
```

Принимается только `basic`; любой другой `kind` — ошибка конфигурации.
См. [Конфигурация → Credentials](/ru/configuration/#credentials).

Management API работает по plain HTTP, если на нём не настроен TLS, а
enodia отказывается отправлять учётные данные по plain HTTP: адресу
`http://` намеренно нужен `allow_insecure_transport` — см.
[Сначала HTTPS](/ru/concepts/#сначала-https-credentials-никогда-не-уходят-в-открытом-виде-по-умолчанию).

## Записываемые поля

- `version` — `rabbitmq_version`, например `4.3.6`
- `extra.productName` — например `RabbitMQ`
- `extra.productVersion` — например `4.3.6`
- `extra.erlangVersion` — например `27.3.4.18`
- `extra.clusterName` — например `rabbit@enodia-test`

Те же поля есть и в ответе 3.8.34.

## Сопоставление с CVE

Сверяется с NVD и БДУ ФСТЭК, если настроен [блок `cve:`](/ru/cve/).

## Резолвер жизненного цикла

`endoflife:rabbitmq`.
