---
title: Nextcloud
description: Configurarea enodia pentru a sonda Nextcloud.
---

Citește `GET /status.php` pentru versiune — un endpoint de verificare a
stării pentru load balancer, accesibil chiar înainte de rularea
configurării inițiale și în timp ce modul de mentenanță este activ.

```yaml
targets:
  - id: nextcloud-main
    product: nextcloud
    address: https://nextcloud.example.com
```

## Autentificare

Niciuna — endpointul nu acceptă nicio formă de credențiale.

## Ce câmp de versiune

Se raportează `versionstring` (de exemplu `34.0.3`), nu `version` (de
exemplu `34.0.3.2`) — confirmat live: `versionstring` este ceea ce
folosesc ciclurile de pe [endoflife.date](https://endoflife.date/nextcloud)
pentru `latest`, iar a patra componentă internă de build din `version`
nu apare deloc în calendarul ciclului de viață.

## Câmpuri înregistrate

- `version` — din `versionstring`
- `extra.installed`, `extra.maintenance` — `"true"`/`"false"`
- `extra.buildVersion` — câmpul `version` brut, păstrat ca referință
- `extra.enterprise` — din `edition` al `status.php`: gol (serverul
  community, confirmat live) → `"false"`, `enterprise` → `"true"`; orice
  altă valoare rămâne neraportată, în loc să fie ghicită

## Corelare CVE

Se corelează cu NVD și BDU FSTEC atunci când este configurat un [bloc `cve:`](/ro/cve/). Ține cont de ediție: sonda înregistrează ediția serverului în `extra.enterprise`, iar o instanță community nu vede constatările specifice ediției enterprise. O ediție necunoscută păstrează toate constatările.

## Rezolvatorul ciclului de viață

`endoflife:nextcloud`.
