---
title: Forgejo
description: Configurarea enodia pentru a sonda Forgejo.
---

Citește `GET /api/v1/version` — un endpoint compatibil cu API-ul Gitea pe
care Forgejo (un fork al Gitea) îl livrează în continuare la aceeași
cale.

```yaml
targets:
  - id: forgejo-main
    product: forgejo
    address: https://forgejo.example.com
```

## Autentificare

Opțională — implicit anonimă. O instanță cu `REQUIRE_SIGNIN_VIEW = true`
setat (o opțiune reală de securizare) răspunde în schimb `403`, tratat la
fel ca provocarea de autentificare a oricărei alte sonde. Sunt acceptate
atât `basic`, cât și `token-header` — consultați
[Configurare → Credențiale](/ro/configuration/#credențiale) pentru forma
exactă a câmpurilor fiecăreia.

## Câmpuri înregistrate

Doar `version` — această sondă nu înregistrează niciun câmp `extra`.

## Corelare CVE

Se corelează cu NVD și BDU FSTEC atunci când este configurat un [bloc `cve:`](/ro/cve/).

## Rezolvatorul ciclului de viață

`endoflife:forgejo`.
