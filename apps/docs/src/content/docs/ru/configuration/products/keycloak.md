---
title: Keycloak
description: Настройка enodia для опроса Keycloak.
---

Читает `GET /admin/serverinfo` для получения версии.

```yaml
targets:
  - id: keycloak-main
    product: keycloak
    address: https://keycloak.example.com
    credentials: keycloak-token
```

## Аутентификация — обязательна

Keycloak — единственный продукт здесь, у которого **вообще нет
анонимного пути к версии**: подтверждено на реальном сервере —
`/realms/<realm>/.well-known/openid-configuration` (эндпоинт, который
любой realm отдаёт без токена) нигде не содержит поля версии, а
`/admin/serverinfo`, которое его содержит, без credential отвечает
`401`. Таргет без настроенного credential будет **пропущен**, а не
провален, во время сбора данных.

```yaml
credentials:
  keycloak-token:
    kind: bearer
    value: "${KEYCLOAK_ACCESS_TOKEN}"
```

Принимается только `bearer`. Получение этого access-токена — обычным
для OpenID Connect способом, через собственный token-эндпоинт realm'а —
не входит в задачу enodia (пробы отвечают за транспорт, а не за
федерацию identity): конфиг ожидает уже выданный токен. Access-токены
обычно короткоживущие, так что то, что подставляет
`KEYCLOAK_ACCESS_TOKEN` во время сбора, должно самостоятельно
поддерживать его свежим — у самой enodia логики обновления токена нет.

## Записываемые поля

- `version` — из `systemInfo.version`
- `extra.javaVersion`

## Резолвер жизненного цикла

`endoflife:keycloak`.
