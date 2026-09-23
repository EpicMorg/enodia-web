---
title: Bitwarden
description: Configurarea enodia pentru a sonda un server Bitwarden auto-găzduit.
---

Doar auto-găzduit — nu există niciun motiv să îndreptați această sondă spre
serviciul cloud propriu al Bitwarden. Citește `GET /api/version`, care
returnează un simplu șir JSON (nu un obiect). Nu sunt necesare
credențiale: aplicațiile client folosesc acest endpoint pentru a verifica
compatibilitatea serverului înainte de a exista o autentificare.

```yaml
targets:
  - id: bitwarden-main
    product: bitwarden
    address: https://vault.example.com
```

## Autentificare

Niciuna — endpointul nu acceptă nicio formă de credențiale.

## Nu este același produs ca Vaultwarden

[Vaultwarden](/ro/configuration/products/vaultwarden/) este o
reimplementare de la zero, în Rust, a API-ului serverului Bitwarden, nu un
fork, cu propria numerotare independentă a versiunilor. Expune același
endpoint și aceeași formă a răspunsului, dar este înregistrat ca un
`product:` separat — a îndrepta o instalare Vaultwarden spre
`product: bitwarden` ar compara versiunea unui proiect cu istoricul de
versiuni al celuilalt.

## Corelare CVE

Se corelează cu NVD atunci când este configurat un [bloc `cve:`](/ro/cve/).

## Rezolvatorul ciclului de viață

`github:bitwarden/server` — endoflife.date nu are un calendar `bitwarden`
(404 confirmat),
așa că rezolvarea se face în schimb pe baza GitHub Releases: doar cel mai
recent tag publicat care nu este prerelease, fără date eol/support/lts
(GitHub nu are nicio opinie despre politica ciclului de viață, doar
despre „care este cea mai recentă versiune”).
