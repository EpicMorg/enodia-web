---
title: LibreTranslate
description: Configurarea enodia pentru a sonda LibreTranslate.
---

Citește `GET /spec`, documentul OpenAPI (Swagger 2.0) propriu al API-ului,
care este public chiar și acolo unde traducerea necesită o cheie API.
Schema implicită este `https`.

```yaml
targets:
  - id: translate-main
    product: libretranslate
    address: https://translate.example.com
```

## Verificarea identității producătorului

`info.version` este versiunea serverului. Sonda cere și ca `info.title`
să fie `"LibreTranslate"`, astfel încât documentul Swagger al altui
serviciu să nu fie citit ca fiind al LibreTranslate.

## Autentificare

Niciuna — `/spec` este public, iar sonda nu acceptă niciun tip de
credențială (o cheie API este necesară doar pentru traducere, pe care
sonda nu o face niciodată). Începând cu 2.2.0, o credențială configurată
pe această țintă este o eroare de configurare, în loc să fie ignorată;
consultați [Configurare → Credențiale](/ro/configuration/#credențiale).

## Câmpuri înregistrate

Doar `version` — de exemplu `1.9.6`, din `info.version` (confirmat live pe
`libretranslate/libretranslate:latest`, lansarea v1.9.6). Această sondă
nu înregistrează niciun câmp `extra`.

## Corelare CVE

Nu se corelează — niciuna dintre baze de date nu are date utilizabile
pentru acest produs. Consultați
[Corelare CVE](/ro/cve/#ce-produse-sunt-potrivite).

## Rezolvatorul ciclului de viață

`github:LibreTranslate/LibreTranslate` — endoflife.date nu are un
calendar pentru LibreTranslate (404 confirmat), așa că rezolvarea se face
în schimb pe baza GitHub Releases: doar cel mai recent tag publicat care
nu este prerelease, fără date eol/support/lts (GitHub nu are nicio opinie
despre politica ciclului de viață, doar despre „care este cea mai recentă
versiune”).
