---
title: Generic
description: Configurarea sondei generice enodia pentru sisteme interne sau neacceptate.
---

Soluția de rezervă pentru orice nu are o sondă dedicată — un bloc
`parser:` scris manual în locul logicii Go compilate. Referința completă
a câmpurilor, vocabularul înghețat `json`/`xml`/`header`/`plaintext`/`regex`
și nota despre scrierea câmpului `clean_regex` se află în
[Configurare → Sonda generică](/ro/configuration/#sonda-generică);
această pagină există doar pentru ca `generic` să apară în bara laterală
alături de celelalte 89 de produse.

```yaml
targets:
  - id: in-house-api
    product: generic
    address: https://internal.example.com
    parser:
      type: regex
      regex: 'v(\d+\.\d+\.\d+)'
```

## Autentificare

Sunt acceptate `none`, `bearer`, `token-header` și `basic` — adică
metoda pe care o așteaptă efectiv serviciul dumneavoastră intern.

## Corelare CVE

Nu se corelează — un parser scris manual nu are o identitate de produs după care să se caute CVE-uri. Consultați [Corelare CVE](/ro/cve/#ce-produse-sunt-potrivite).

## Rezolvatorul ciclului de viață

Niciunul — o țintă construită manual nu are, prin definiție, un calendar
de consultat. Nu vă găsiți produsul în lista celor 89 de sonde dedicate?
Consultați [Produse acceptate](/ro/products/#nu-găsiți-produsul-dumneavoastră)
pentru cele două căi posibile: această soluție de rezervă sau solicitarea
unei sonde reale.
