---
title: Perforce Helix Swarm
description: Configurarea enodia pentru a sonda Perforce Helix Swarm.
---

Citește `GET /api/version` pentru versiune — în mod deliberat calea fără
versiune, nu una specifică, precum `/api/v11/version`. De-a lungul anilor,
Perforce a mutat versiunea minimă a acestui API (Swarm 2017.3 vorbește
doar v7; 2018.2 vorbește v9), iar solicitarea unui `vN` din afara
intervalului primește `401` pe un endpoint altfel complet anonim. Forma
fără versiune evită ghicirea versiunii `vN` pe care o anumită instalare
o mai acceptă.

```yaml
targets:
  - id: swarm-main
    product: perforce-swarm
    address: https://swarm.example.com
```

## Autentificare

Niciuna — endpointul nu acceptă nicio formă de credențiale.

## Parsarea versiunii

Câmpul brut arată ca `SWARM/2024.6/2710109 (2025/01/28)` — este parsat
într-o versiune simplă (`2024.6`), un changelist și o dată de lansare. Un
format nerecunoscut revine la păstrarea șirului brut ca `version`, în loc
să eșueze direct, deoarece acesta este în continuare faptul raportat de
server.

## Câmpuri înregistrate

- `version` — de exemplu `2024.6`
- `extra.raw` — șirul complet, neprelucrat
- `extra.changelist`, `extra.releaseDate` — doar atunci când formatul a
  fost parsat

## Corelare CVE

Nu se corelează — niciuna dintre baze de date nu are date utilizabile pentru acest produs. Consultați [Corelare CVE](/ro/cve/#ce-produse-sunt-potrivite).

## Rezolvatorul ciclului de viață

Niciunul — endoflife.date nu are un calendar pentru `perforce-swarm`,
`helix-swarm`, `swarm` sau `perforce` (404 confirmat pentru toate). Doar
pentru inventar, deocamdată.
