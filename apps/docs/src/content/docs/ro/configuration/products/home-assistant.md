---
title: Home Assistant
description: Configurarea enodia pentru a sonda Home Assistant.
---

Citește `GET /api/config` din API-ul REST al Home Assistant, cu un
long-lived access token. Aliasul `homeassistant` este acceptat și el ca
`product:`.

```yaml
targets:
  - id: home-assistant-main
    product: home-assistant
    address: https://home-assistant.example.com
    credentials: ha-token
```

## Autentificare — obligatorie

Nimic anonim nu conține versiunea Home Assistant: `/api/` și
`/api/config` răspund `401`, iar `/manifest.json`, `/auth/providers` și
endpointurile de onboarding nu o conțin (confirmat live pe
`ghcr.io/home-assistant/home-assistant:stable` 2026.10.0). Autentificarea
documentată a API-ului REST este un long-lived access token (Profile →
Security → Long-lived access tokens), trimis ca `Authorization: Bearer`:

```yaml
credentials:
  ha-token:
    kind: bearer
    value: "${HOME_ASSISTANT_TOKEN}"
```

Este acceptat doar `bearer`; orice alt tip este o eroare de configurare.
Consultați [Configurare → Credențiale](/ro/configuration/#credențiale).

## Ce se citește

`/api/config` returnează și coordonatele locuinței, căi și URL-uri.
Nimic din toate acestea nu este citit — doar `version`, `state` și
indicatorii modului safe/recovery.

## Câmpuri înregistrate

- `version` — de exemplu `2026.10.0`
- `extra.state` — de exemplu `RUNNING`
- `extra.recoveryMode` — `true` atunci când Home Assistant raportează
  modul safe sau modul recovery; absent în caz contrar

## Corelare CVE

Se corelează cu NVD atunci când este configurat un [bloc `cve:`](/ro/cve/).

## Rezolvatorul ciclului de viață

`github:home-assistant/core` — endoflife.date nu are un calendar pentru
Home Assistant (404 confirmat), așa că rezolvarea se face în schimb pe
baza GitHub Releases: doar cel mai recent tag publicat care nu este
prerelease, fără date eol/support/lts (GitHub nu are nicio opinie despre
politica ciclului de viață, doar despre „care este cea mai recentă
versiune”). O lansare al cărei tag denumește o versiune preliminară
(`2026.10.0b7`) este omisă chiar și atunci când GitHub nu o marchează ca
atare.
