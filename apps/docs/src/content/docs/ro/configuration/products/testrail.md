---
title: TestRail
description: Configurarea enodia pentru a sonda TestRail.
---

Citește `GET /version.txt` — un simplu fișier static pe care TestRail îl
livrează în rădăcina web, nu un răspuns al API-ului REST. API-ul REST
documentat al TestRail (`get_current_user` și cele similare) necesită
credențiale și nu conține deloc versiunea produsului, motiv pentru care
această sondă citește în schimb fișierul static.

```yaml
targets:
  - id: testrail-main
    product: testrail
    address: https://testrail.example.com
```

## Autentificare

Niciuna — endpointul nu acceptă nicio formă de credențiale.

## Câmpuri înregistrate

Doar `version` — conținutul fișierului, fără spațiile de la capete, exact
așa cum este servit.

## Corelare CVE

Se corelează cu NVD atunci când este configurat un [bloc `cve:`](/ro/cve/).

## Rezolvatorul ciclului de viață

Niciunul — endoflife.date nu are un calendar pentru TestRail (404
confirmat). Doar pentru inventar, deocamdată.
