---
title: Proxmox VE
description: Configurarea enodia pentru a sonda Proxmox VE.
---

Citește `GET /api2/json/version`.

```yaml
targets:
  - id: proxmox-main
    product: proxmox
    address: https://proxmox.example.com:8006
    credentials: proxmox-token
```

## Autentificare — obligatorie

Confirmat live pe o gazdă reală Proxmox VE 9.2.2: acest endpoint
răspunde `401` fără credențiale. Forma tokenului API propriu al Proxmox
este o simplă valoare a antetului `Authorization` —
`PVEAPIToken=user@realm!tokenid=secret`, întregul șir ca un singur token
— așa că `token-header` se potrivește direct, cu antetul său implicit
(`Authorization`) deja corect:

```yaml
credentials:
  proxmox-token:
    kind: token-header
    value: "PVEAPIToken=enodia@pve!readonly=${PROXMOX_TOKEN_SECRET}"
```

Fluxul alternativ cu tichet pe bază de nume de utilizator/parolă
(`POST /access/ticket` pentru un cookie de sesiune plus un token CSRF)
nu este acceptat în mod deliberat — este o formă mai grea, bazată pe
autentificare prin sesiune, iar documentația Proxmox recomandă oricum
tokenul API pentru automatizarea nesupravegheată.

## Câmpuri înregistrate

- `version`
- `extra.repoid`, atunci când este prezent

## Corelare CVE

Se corelează cu NVD și BDU FSTEC atunci când este configurat un [bloc `cve:`](/ro/cve/).

## Rezolvatorul ciclului de viață

`endoflife:proxmox-ve`.
