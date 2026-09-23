---
title: Vaultwarden
description: Configurarea enodia pentru a sonda Vaultwarden.
---

Citește `GET /api/version`, care returnează un simplu șir JSON (nu un
obiect) — același endpoint și aceeași formă a răspunsului ca
[Bitwarden](/ro/configuration/products/bitwarden/) însuși. Nu sunt
necesare credențiale: aplicațiile client folosesc acest endpoint pentru a
verifica compatibilitatea serverului înainte de a exista o autentificare.

```yaml
targets:
  - id: vaultwarden-main
    product: vaultwarden
    address: https://vault.example.com
```

## Autentificare

Niciuna — endpointul nu acceptă nicio formă de credențiale.

## Nu este același produs ca Bitwarden

Vaultwarden este o reimplementare de la zero, în Rust, a API-ului
serverului Bitwarden, nu un fork — are propria numerotare independentă a
versiunilor, care nu urmează versiunile Bitwarden. Este înregistrat ca un
`product:` distinct exact din acest motiv: a compara versiunea unei
instalări Vaultwarden cu un calendar al ciclului de viață etichetat
`bitwarden` ar însemna a compara două scheme de numerotare fără legătură
între ele.

## Corelare CVE

Se corelează cu NVD și BDU FSTEC atunci când este configurat un [bloc `cve:`](/ro/cve/).

## Rezolvatorul ciclului de viață

`github:dani-garcia/vaultwarden` — endoflife.date nu are un calendar
`vaultwarden` (404 confirmat),
așa că rezolvarea se face în schimb pe baza GitHub Releases: doar cel mai
recent tag publicat care nu este prerelease, fără date eol/support/lts
(GitHub nu are nicio opinie despre politica ciclului de viață, doar
despre „care este cea mai recentă versiune”).
