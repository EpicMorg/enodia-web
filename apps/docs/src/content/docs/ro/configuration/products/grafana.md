---
title: Grafana
description: Configurarea enodia pentru a sonda Grafana.
---

Citește `GET /api/health` pentru versiune.

```yaml
targets:
  - id: grafana-main
    product: grafana
    address: https://grafana.example.com
```

## Autentificare

Niciuna — confirmat live, acest endpoint răspunde `200` cu un corp valid
chiar și cu credențiale Basic auth greșite. Există pentru verificarea de
disponibilitate (liveness) a unui load balancer, nu ca rută API protejată,
așa că nu există aici o cale cu credențiale de oferit.

## Câmpuri înregistrate

- `version`
- `extra.commit`, `extra.database`

## Corelare CVE

Se corelează cu NVD și BDU FSTEC atunci când este configurat un [bloc `cve:`](/ro/cve/).

## Rezolvatorul ciclului de viață

`endoflife:grafana`.
