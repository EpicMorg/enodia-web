---
title: Traefik
description: Налаштування enodia для опитування Traefik.
---

Читає `GET /api/version`.

```yaml
targets:
  - id: traefik-main
    product: traefik
    address: https://traefik.example.com
```

## Автентифікація

Необовʼязкова. Підтверджено наживо на реальному контейнері `traefik:v3.1`:
якщо API-роутер узагалі увімкнено (типово він вимкнений — у стандартному
екземплярі не задано ні `--api`, ні `--api.insecure`) з
`--api.insecure=true`, цей ендпоінт не потребує облікових даних. Розгортання,
у якому API-роутер натомість захищено власним middleware автентифікації
Basic/Digest (задокументований Traefik «безпечний» спосіб його публікації),
відповідає звичайними запитами HTTP Basic:

```yaml
credentials:
  traefik-basic:
    kind: basic
    username: admin
    password: "${TRAEFIK_PASSWORD}"
```

Екземпляр, у якому API взагалі не увімкнено, відповідає тут `404`, що
неможливо відрізнити від хибної адреси.

## Записувані поля

Лише `version` — ця проба не записує полів `extra` (`Codename` і
`startDate` описують реліз, а не розгортання, і не читаються).

## Зіставлення з CVE

Зіставляється з NVD і БДУ ФСТЕК, якщо налаштовано [блок `cve:`](/uk/cve/).

## Резолвер життєвого циклу

`endoflife:traefik`.
