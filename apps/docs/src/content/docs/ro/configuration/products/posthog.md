---
title: PostHog
description: Configurarea enodia pentru a sonda PostHog.
---

Citește pagina de autentificare anonimă, `GET /login`, a unui PostHog
self-hosted. Pagina încorporează `window.POSTHOG_APP_CONTEXT = JSON.parse("{...}")`
— un document JSON într-un literal șir JavaScript — iar `commit_sha` din
acesta este raportat ca versiune. Schema implicită este `https`.

```yaml
targets:
  - id: posthog-main
    product: posthog
    address: https://posthog.example.com
```

## Commit-ul git este versiunea

PostHog nu mai livrează lansări numerotate: o instalare self-hosted
(hobby) urmărește ramura principală, iar singurul identificator pe care îl
expune este commit-ul din care a fost construită (confirmat live, anonim,
pe o instanță self-hosted de producție). Așadar, `version` este aici un
hash de commit precum `55babe9554`, nu un număr de lansare. `/_preflight/`
este și el anonim, dar conține doar starea serviciilor și realm-ul;
`/api/instance_status` necesită autentificare.

## Autentificare

Niciuna — pagina de autentificare este publică, iar sonda nu acceptă
niciun tip de credențială. Începând cu 2.2.0, o credențială atașată unei
ținte `posthog` este o eroare de configurare, nu este ignorată în tăcere —
consultați [Configurare → Credențiale](/ro/configuration/#credențiale).

## Câmpuri înregistrate

- `version` — commit-ul git, de exemplu `55babe9554`
- `extra.commit` — același commit
- `extra.realm` — de exemplu `hosted-clickhouse`, atunci când pagina îl conține

## Corelare CVE

Nu se corelează — niciuna dintre baze de date nu are date utilizabile pentru acest produs. Consultați [Corelare CVE](/ro/cve/#ce-produse-sunt-potrivite).
Limitele de versiune ale NVD pentru PostHog sunt hash-uri de commit, care
nu pot fi comparate.

## Rezolvatorul ciclului de viață

Niciunul — nu există lansări cu care să fie comparat un commit. Pentru a
afla cât de mult rămâne un commit în urma ramurii principale ar fi nevoie
de API-ul compare al GitHub, un alt tip de rezolvator decât oricare dintre
cele pe care le are enodia; nu este implementat. Doar pentru inventar.
