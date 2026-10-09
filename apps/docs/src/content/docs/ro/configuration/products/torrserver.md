---
title: TorrServer
description: Configurarea enodia pentru a sonda TorrServer.
---

Citește `GET /echo`, la care TorrServer răspunde cu versiunea sa ca text
simplu. Schema implicită este `https`.

```yaml
targets:
  - id: torrserver-main
    product: torrserver
    address: https://torrserver.example.com
```

## Forma versiunii

`/echo` răspunde, de exemplu, `MatriX.146` — un nume de cod și un număr,
în aceeași formă ca tag-urile de lansare GitHub ale TorrServer
(`MatriX.146`, `MatriX.145.2`). Versiunea este înregistrată ca atare;
comparația folosește numerele de după numele de cod, de ambele părți. Un
răspuns care nu are această formă (de exemplu, o pagină HTML) este
raportat ca neacceptat.

## Autentificare

Opțională. `basic` este trimis dacă este configurat, pentru o instanță cu
propria autentificare activată; fără nimic configurat, cererea este
anonimă. `basic` este singurul tip acceptat — începând cu 2.2.0, orice
alt tip este o eroare de configurare. Consultați
[Configurare → Credențiale](/ro/configuration/#credențiale).

```yaml
credentials:
  torrserver-auth:
    kind: basic
    username: admin
    password: "${TORRSERVER_PASSWORD}"
```

## Câmpuri înregistrate

Doar `version` — de exemplu `MatriX.146` (ceea ce a răspuns un
`ghcr.io/yourok/torrserver:latest` live la `/echo`). Această sondă nu
înregistrează niciun câmp `extra`.

## Corelare CVE

Nu se corelează — niciuna dintre baze de date nu are date utilizabile
pentru acest produs. Consultați
[Corelare CVE](/ro/cve/#ce-produse-sunt-potrivite).

## Rezolvatorul ciclului de viață

`github:YouROK/TorrServer` — endoflife.date nu are un calendar pentru
TorrServer (404 confirmat), așa că rezolvarea se face în schimb pe baza
GitHub Releases: doar cel mai recent tag publicat care nu este prerelease,
fără date eol/support/lts (GitHub nu are nicio opinie despre politica
ciclului de viață, doar despre „care este cea mai recentă versiune”).
