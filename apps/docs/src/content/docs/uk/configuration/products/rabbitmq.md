---
title: RabbitMQ
description: Налаштування enodia для опитування RabbitMQ.
---

Читає `GET /api/overview` з HTTP API плагіна керування (за замовчуванням
порт `15672` — вкажіть його в адресі). Сам порт AMQP не має обміну
версіями до автентифікації, який варто було б читати; плагін керування —
єдине місце, де RabbitMQ віддає свою версію.

```yaml
targets:
  - id: rabbitmq-main
    product: rabbitmq
    address: https://rabbitmq.example.com:15672
    credentials: rabbitmq-monitor
```

## Автентифікація — обовʼязкова

API керування ніколи не буває анонімним: підтверджено наживо на
`rabbitmq:4-management`, який без облікових даних відповів `401`. Облікові
дані HTTP Basic користувача керування:

```yaml
credentials:
  rabbitmq-monitor:
    kind: basic
    username: monitor
    password: "${RABBITMQ_PASSWORD}"
```

Приймається лише `basic`; будь-який інший вид є помилкою конфігурації.
Див. [Конфігурація → Облікові дані](/uk/configuration/#облікові-дані).

API керування працює через звичайний HTTP, якщо на ньому не налаштовано
TLS, а enodia відмовляється надсилати облікові дані через звичайний HTTP:
адреса `http://` навмисно потребує `allow_insecure_transport` — див.
[Спершу HTTPS](/uk/concepts/#спершу-https-облікові-дані-за-замовчуванням-ніколи-не-передаються-відкритим-текстом).

## Записувані поля

- `version` — `rabbitmq_version`, напр. `4.3.6`
- `extra.productName` — напр. `RabbitMQ`
- `extra.productVersion` — напр. `4.3.6`
- `extra.erlangVersion` — напр. `27.3.4.18`
- `extra.clusterName` — напр. `rabbit@enodia-test`

Ті самі поля є й у відповіді 3.8.34.

## Зіставлення з CVE

Зіставляється з NVD і БДУ ФСТЕК, якщо налаштовано [блок `cve:`](/uk/cve/).

## Резолвер життєвого циклу

`endoflife:rabbitmq`.
