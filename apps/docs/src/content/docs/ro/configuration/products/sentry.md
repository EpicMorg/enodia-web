---
title: Sentry
description: Configurarea enodia pentru a sonda Sentry.
---

Citește pagina de autentificare anonimă a unui Sentry self-hosted,
`GET /auth/login/` (care redirecționează către pagina de autentificare a
singurei organizații). Fiecare pagină încorporează
`window.__initialData = {...}`, iar `version.current` din aceasta este
versiunea. Schema implicită este `https`.

```yaml
targets:
  - id: sentry-main
    product: sentry
    address: https://sentry.example.com
```

## De ce pagina de autentificare

Confirmat live, anonim, pe un 26.2.1 self-hosted de producție. Același
obiect `version` are și un câmp `latest` — verificarea proprie de
actualizări a Sentry — care **nu** este folosit: cu acea verificare
dezactivată, era învechit (`21.7.0`). Rădăcina API-ului `/api/0/` este și
ea anonimă, dar `"version":
"0"` al ei este versiunea API-ului, nu a serverului; `/api/0/internal/health/`
necesită autentificare.

## Autentificare

Niciuna — pagina de autentificare este publică, iar sonda nu acceptă
niciun tip de credențială. Începând cu 2.2.0, o credențială atașată unei
ținte `sentry` este o eroare de configurare, nu este ignorată în tăcere —
consultați [Configurare → Credențiale](/ro/configuration/#credențiale).

## Câmpuri înregistrate

- `version` — din `version.current`, de exemplu `26.2.1`
- `extra.build` — commit-ul git din `version.build`
- `extra.mode` — `sentryMode`, de exemplu `SELF_HOSTED`

## Corelare CVE

Se corelează cu NVD atunci când este configurat un [bloc `cve:`](/ro/cve/).
Intrările „Sentry” din BDU se referă la SDK, nu la server, și nu sunt folosite.

## Rezolvatorul ciclului de viață

`github:getsentry/self-hosted` — endoflife.date nu are un calendar pentru
Sentry (404 confirmat), așa că rezolvarea se face în schimb pe baza GitHub
Releases: doar cel mai recent tag publicat care nu este prerelease, fără
date eol/support/lts (GitHub nu are nicio opinie despre politica ciclului
de viață, doar despre „care este cea mai recentă versiune”). Tag-urile de
lansare ale getsentry/self-hosted (`26.8.0`, `26.9.0`, …) sunt versiunile
de server pe care le instalează.
