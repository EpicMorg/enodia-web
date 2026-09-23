---
title: Graylog
description: Configurarea enodia pentru a sonda Graylog.
---

Citește `GET /api/` — resursa rădăcină a API-ului REST, un document public
de descoperire la care răspunde fiecare nod Graylog fără credențiale.

```yaml
targets:
  - id: graylog-main
    product: graylog
    address: https://graylog.example.com
```

## Autentificare

Niciuna — confirmat live pe un container real `graylog/graylog` (plus
MongoDB și Elasticsearch, de care depinde): rădăcina răspunde anonim.

## Câmpuri înregistrate

Doar `version` — această sondă nu înregistrează niciun câmp `extra`.

## Corelare CVE

Se corelează cu NVD și BDU FSTEC atunci când este configurat un [bloc `cve:`](/ro/cve/).

## Rezolvatorul ciclului de viață

`endoflife:graylog`.
