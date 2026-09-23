---
title: Apache HTTP Server
description: Configurarea enodia pentru a sonda Apache HTTP Server.
---

Citește antetul de răspuns `Server` pe care Apache httpd îl setează la
fiecare răspuns — aceeași formă de problemă ca la
[nginx](/ro/configuration/products/nginx/): nu există un endpoint de
versiune, iar orice cod de stare poartă în continuare antetul.
`product: httpd` este acceptat ca alias.

```yaml
targets:
  - id: apache-main
    product: apache
    address: https://www.example.com
```

## Autentificare

Niciuna — antetul `Server` este trimis la fiecare răspuns, indiferent de
autentificare.

## `ServerTokens Prod` elimină versiunea

Confirmat live pe containere reale `httpd:2.4`: build-ul implicit răspunde
`"Apache/2.4.68 (Unix)"`; `ServerTokens Prod` (directiva de securizare
proprie a Apache, frecventă în producție) îl reduce la un simplu
`"Apache"`, fără nicio versiune — un produs confirmat, fără nimic rămas
de comparat cu un calendar al ciclului de viață, nu o eroare a
parserului.

## Câmpuri înregistrate

Doar `version` — această sondă nu înregistrează niciun câmp `extra`.

## Corelare CVE

Se corelează cu NVD și BDU FSTEC atunci când este configurat un [bloc `cve:`](/ro/cve/).

## Rezolvatorul ciclului de viață

`endoflife:apache-http-server` — atât `apache`, cât și `httpd` fac
redirecționare 301 către acest slug pe endoflife.date; enodia rezolvă
direct slug-ul țintă, în loc să facă acest salt suplimentar la fiecare
interogare.
