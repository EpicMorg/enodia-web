---
title: Keycloak
description: Налаштування enodia для опитування Keycloak.
---

Читає версію з `GET /admin/serverinfo`.

```yaml
targets:
  - id: keycloak-main
    product: keycloak
    address: https://keycloak.example.com
    credentials: keycloak-token
```

## Автентифікація — обовʼязкова

Keycloak — єдиний продукт тут, у якого **взагалі немає анонімного шляху до
версії**: підтверджено наживо, `/realms/<realm>/.well-known/openid-configuration`
(ендпоінт, який кожен realm надає без токена) не містить поля версії ніде, а
`/admin/serverinfo`, який його містить, без токена відповідає `401`. Ціль
без налаштованих облікових даних під час збору **пропускається**, а не
завершується помилкою.

```yaml
credentials:
  keycloak-token:
    kind: bearer
    value: "${KEYCLOAK_ACCESS_TOKEN}"
```

Приймається лише `bearer`. Отримання цього токена доступу — стандартним
для OpenID Connect способом, через власний token-ендпоінт realm — не входить
до завдань enodia (проби відповідають за транспорт, а не за федерацію
ідентичностей): конфігурація очікує вже виданий токен. Токени доступу
зазвичай короткоживучі, тож те, що надає `KEYCLOAK_ACCESS_TOKEN` під час
збору, має підтримувати його актуальним; сама enodia не має логіки
оновлення токенів.

## Записувані поля

- `version` — з `systemInfo.version`
- `extra.javaVersion`

## Зіставлення з CVE

Зіставляється з NVD і БДУ ФСТЕК, якщо налаштовано [блок `cve:`](/uk/cve/).

## Резолвер життєвого циклу

`endoflife:keycloak`.
