---
title: Ghost
description: Configurarea enodia pentru a sonda Ghost.
---

Citește `GET /ghost/api/admin/site/` — singurul endpoint al Admin API pe
care Ghost îl servește fără sesiune sau cheie (aplicația de administrare
îl citește înainte de autentificare) — și ia `site.version`. Schema
implicită este `https`.

```yaml
targets:
  - id: ghost-main
    product: ghost
    address: https://blog.example.com
```

## Doar major.minor este public

Confirmat live pe `ghost:6`: endpointul indica `6.69`, la fel ca
`<meta name="generator">` și antetul `Content-Version`, în timp ce
pachetul instalat era 6.69.0. Versiunea completă se află în spatele cheii
Admin API, un JWT semnat — un nou tip de credențială pentru o singură
cifră, nu merită: lansările Ghost sunt aproape fără excepție `x.y.0`, iar
`6.69` este egal, la comparare, cu tag-ul `v6.69.0`.

## Autentificare

Niciuna — endpointul este public, iar sonda nu acceptă niciun tip de
credențială. Începând cu 2.2.0, o credențială atașată unei ținte `ghost`
este o eroare de configurare, nu este ignorată în tăcere — consultați
[Configurare → Credențiale](/ro/configuration/#credențiale).

## Câmpuri înregistrate

Doar `version` — major.minor, de exemplu `6.69`; această sondă nu
înregistrează niciun câmp `extra`.

## Corelare CVE

Se corelează cu NVD și BDU FSTEC atunci când este configurat un [bloc `cve:`](/ro/cve/).

## Rezolvatorul ciclului de viață

`github:TryGhost/Ghost` — endoflife.date nu are un calendar pentru Ghost
(404 confirmat), așa că rezolvarea se face în schimb pe baza GitHub
Releases: doar cel mai recent tag publicat care nu este prerelease, fără
date eol/support/lts (GitHub nu are nicio opinie despre politica ciclului
de viață, doar despre „care este cea mai recentă versiune”).
