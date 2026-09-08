---
title: Artifactory
description: Настройка enodia для опроса JFrog Artifactory.
---

Читает `GET /artifactory/api/system/version` для получения версии.

```yaml
targets:
  - id: artifactory-main
    product: artifactory
    address: https://artifactory.example.com
```

## Аутентификация

Опционально. Нужны ли этому эндпоинту credentials, зависит от
конкретного инстанса — подтверждено на двух реальных серверах: свежая
установка OSS отвечает `401` анонимно, а вот продакшн-инстанс с
включённым «Allow Anonymous Access» ответил `200` вообще без credential.
Basic auth работает, когда он нужен:

```yaml
credentials:
  artifactory-admin:
    kind: basic
    username: admin
    password: "${ARTIFACTORY_PASSWORD}"
```

## Записываемые поля

- `version` — например, `7.161.20`
- `extra.revision`, если он присутствует в ответе

Ответ также содержит поля `license`, `addons` и `entitlements` — они
намеренно никогда не читаются. На реальном продакшн-инстансе `license`
оказался уникальным для установки отпечатком лицензии, а не
фиксированной строкой, и ни одно из этих трёх полей не описывает само
программное обеспечение.

## Резолвер жизненного цикла

`endoflife:artifactory`.
