---
title: MikroTik RouterOS
description: Configurarea enodia pentru a sonda MikroTik RouterOS.
---

Citește `GET /rest/system/resource` — API-ul REST al RouterOS (RouterOS
7.1+; serviciul `www`, activat implicit pe o instalare nouă, trebuie să
fie activ).

```yaml
targets:
  - id: router-main
    product: routeros
    address: https://router.example.com
    credentials: routeros-admin
```

## Autentificare — obligatorie

Confirmat live pe o mașină virtuală reală CHR (Cloud Hosted Router)
7.24.2: acest endpoint răspunde întotdeauna `401` fără credențiale, iar
pagina anonimă de autentificare webfig de la `/` nu conține nici ea
vreun text de versiune — acesta este API-ul de administrare al unui
router, așa că cerința de credențiale este configurația implicită
corectă, nu o opțiune de securizare de ocolit.

```yaml
credentials:
  routeros-admin:
    kind: basic
    username: enodia-ro
    password: "${ROUTEROS_PASSWORD}"
```

Nici bannerul SSH (`"SSH-2.0-ROSSSH"`, confirmat live) nu conține vreo
versiune, ceea ce exclude o abordare bazată pe bannerul SSH, așa cum
folosesc [SSH](/ro/configuration/products/ssh/)/[MySQL](/ro/configuration/products/mysql/).

## Câmpuri înregistrate

- `version`
- `extra.boardName`, `extra.architecture`

## Corelare CVE

Se corelează cu NVD și BDU FSTEC atunci când este configurat un [bloc `cve:`](/ro/cve/).

## Rezolvatorul ciclului de viață

`endoflife:routeros`.
