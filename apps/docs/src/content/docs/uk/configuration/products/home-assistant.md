---
title: Home Assistant
description: Налаштування enodia для опитування Home Assistant.
---

Читає `GET /api/config` з REST API Home Assistant за допомогою
довготривалого токена доступу. Псевдонім `homeassistant` теж приймається
як `product:`.

```yaml
targets:
  - id: home-assistant-main
    product: home-assistant
    address: https://home-assistant.example.com
    credentials: ha-token
```

## Автентифікація — обовʼязкова

Жоден анонімний ресурс не містить версії Home Assistant: `/api/` і
`/api/config` відповідають `401`, а в `/manifest.json`, `/auth/providers` і
ендпоінтах онбордингу її немає (підтверджено наживо на
`ghcr.io/home-assistant/home-assistant:stable` 2026.10.0). Документований
спосіб автентифікації REST API — довготривалий токен доступу (Profile →
Security → Long-lived access tokens), що надсилається як
`Authorization: Bearer`:

```yaml
credentials:
  ha-token:
    kind: bearer
    value: "${HOME_ASSISTANT_TOKEN}"
```

Приймається лише `bearer`; будь-який інший вид є помилкою конфігурації.
Див. [Конфігурація → Облікові дані](/uk/configuration/#облікові-дані).

## Що читається

`/api/config` повертає також координати оселі, шляхи та URL-адреси. Ніщо з
цього не читається — лише `version`, `state` і прапорці безпечного режиму
та режиму відновлення.

## Записувані поля

- `version` — напр. `2026.10.0`
- `extra.state` — напр. `RUNNING`
- `extra.recoveryMode` — `true`, коли Home Assistant повідомляє про
  безпечний режим або режим відновлення; інакше відсутнє

## Зіставлення з CVE

Зіставляється з NVD, якщо налаштовано [блок `cve:`](/uk/cve/).

## Резолвер життєвого циклу

`github:home-assistant/core` — endoflife.date не має календаря Home
Assistant (підтверджено 404), тому резолвінг натомість виконується через
GitHub Releases: лише останній опублікований тег, що не є пре-релізом, без
дат eol/support/lts (GitHub не має позиції щодо політики життєвого циклу,
лише «який реліз останній»). Реліз, тег якого вказує на пре-реліз
(`2026.10.0b7`), пропускається, навіть якщо GitHub не позначає його так.
