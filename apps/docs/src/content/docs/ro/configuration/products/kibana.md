---
title: Kibana
description: Configurarea enodia pentru a sonda Kibana.
---

Citește `GET /api/status` — neautentificat în mod deliberat, prin design
(este ceea ce folosesc orchestratoarele ca sondă de liveness/readiness;
sonda de readiness a chart-ului Helm oficial Elastic face curl exact pe
această cale, fără credențiale).

```yaml
targets:
  - id: kibana-main
    product: kibana
    address: https://kibana.example.com
```

## Autentificare

Niciuna. Confirmat live pe un container real
`docker.elastic.co/kibana/kibana` (conectat la un Elasticsearch real):
răspunsul conține versiunea completă chiar și în timp ce Kibana încă
pornește și răspunde `503` pentru „încă nu este gata” — corpul o conține
deja, indiferent de codul de stare.

## Câmpuri înregistrate

Doar `version` — această sondă nu înregistrează niciun câmp `extra`.

## Corelare CVE

Se corelează cu NVD și BDU FSTEC atunci când este configurat un [bloc `cve:`](/ro/cve/).

## Rezolvatorul ciclului de viață

`endoflife:kibana`.
