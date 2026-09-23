---
title: phpMyAdmin
description: Configurarea enodia pentru a sonda phpMyAdmin.
---

Citește versiunea din apelul de inițializare `CommonParams.setAll({...})`
al paginii de autentificare — JS-ul phpMyAdmin folosește acest obiect
pentru fiecare cerere AJAX pe care o face, așa că este livrat pe fiecare
pagină, autentificată sau nu, fără a fi nevoie de un endpoint de versiune
separat.

```yaml
targets:
  - id: phpmyadmin-main
    product: phpmyadmin
    address: https://phpmyadmin.example.com
```

## Autentificare

Niciuna — confirmat live pe un container real `phpmyadmin/phpmyadmin`.

## Câmpuri înregistrate

Doar `version` — această sondă nu înregistrează niciun câmp `extra`.

## Corelare CVE

Se corelează cu NVD și BDU FSTEC atunci când este configurat un [bloc `cve:`](/ro/cve/).

## Rezolvatorul ciclului de viață

`endoflife:phpmyadmin`.
