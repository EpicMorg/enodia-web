---
title: Artifactory
description: Налаштування enodia для опитування JFrog Artifactory.
---

Читає версію з `GET /artifactory/api/system/version`.

```yaml
targets:
  - id: artifactory-main
    product: artifactory
    address: https://artifactory.example.com
```

## Автентифікація

Необовʼязкова. Чи потрібні цьому ендпоінту облікові дані, залежить від
екземпляра — перевірено на двох реальних серверах: свіжа OSS-інсталяція
анонімно відповідає `401`, а продакшн-екземпляр з увімкненим «Allow
Anonymous Access» відповів `200` взагалі без облікових даних. За потреби
працює Basic-автентифікація:

```yaml
credentials:
  artifactory-admin:
    kind: basic
    username: admin
    password: "${ARTIFACTORY_PASSWORD}"
```

## Записувані поля

- `version` — напр. `7.161.20`
- `extra.revision`, якщо відповідь його містить

Відповідь також містить `license`, `addons` і `entitlements` — їх навмисно
ніколи не читають. На реальному продакшн-екземплярі `license` був
відбитком конкретної інсталяції, а не фіксованим літералом, і жодне з
трьох полів не описує саме програмне забезпечення.

## Зіставлення з CVE

Зіставляється з NVD і БДУ ФСТЕК, якщо налаштовано [блок `cve:`](/uk/cve/).

## Резолвер життєвого циклу

`endoflife:artifactory`.
