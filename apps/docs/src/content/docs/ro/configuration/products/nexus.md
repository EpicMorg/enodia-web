---
title: Sonatype Nexus Repository
description: Configurarea enodia pentru a sonda Sonatype Nexus Repository.
---

Citește antetul de răspuns `Server` pe care Nexus îl setează la fiecare
răspuns — aceeași formă ca la [nginx](/ro/configuration/products/nginx/)/
[Apache](/ro/configuration/products/apache/) — dar interogând endpointul
anonim de stare construit special în acest scop, nu `/`, deoarece acesta
este o verificare rapidă a stării, cu corp gol, nu pagina completă a
portalului.

```yaml
targets:
  - id: nexus-main
    product: nexus
    address: https://nexus.example.com
```

## Autentificare

Niciuna — confirmat live pe un container real `sonatype/nexus3`:
`"Nexus/3.96.0-09 (COMMUNITY)"` atât pe endpointul de stare, cât și pe
pagina portalului și pe o provocare `401` de la un alt endpoint, efectiv
protejat. Spre deosebire de nginx/Apache, nu este documentată și nu a
fost găsită nicio opțiune de configurare care să reducă antetul la un
simplu `"Nexus"` — dar această sondă degradează elegant la o eroare
clară, în loc să se blocheze, dacă o versiune viitoare sau o configurare
cu reverse proxy va face vreodată acest lucru.

## Câmpuri înregistrate

Doar `version` — această sondă nu înregistrează niciun câmp `extra`
(ediția, de exemplu `COMMUNITY`/`PRO`, este eliminată, deoarece
`product: nexus` o implică deja, fără a fi nevoie să fie înregistrată
pentru fiecare țintă).

## Corelare CVE

Se corelează cu NVD și BDU FSTEC atunci când este configurat un [bloc `cve:`](/ro/cve/).

## Rezolvatorul ciclului de viață

`endoflife:nexus`.
