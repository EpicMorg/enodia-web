---
title: Supermicro BMC
description: Configurarea enodia pentru a sonda un BMC Supermicro prin Redfish.
---

Citește `GET /redfish/v1/Managers/1` — resursa Redfish de tip manager a
BMC-ului însuși — pentru versiunea firmware-ului.

```yaml
targets:
  - id: srv125-bmc
    product: supermicro-bmc
    address: https://bmc-srv125.example.com
    credentials: bmc-admin
```

## Autentificare — obligatorie

Autentificare HTTP Basic; fără ea, endpoint-ul răspunde `401`
(confirmat live).

```yaml
credentials:
  bmc-admin:
    kind: basic
    username: ADMIN
    password: "${BMC_PASSWORD}"
```

Un cont BMC doar pentru citire este suficient. BMC-urile servesc de
obicei un certificat autosemnat — fixați-l (pin) în loc să dezactivați
verificarea, consultați [Configurare → TLS](/ro/configuration/#tls-tls).

## Verificarea identității producătorului

Confirmat live pe două generații — o placă din seria X12 (AST2600,
firmware `01.05.25`) și una mai veche, din epoca X9/X10 (firmware
`01.73.13`). Niciuna nu conține un câmp de producător pe care această
sondă să-l poată obține într-o singură cerere, dar ambele conțin o cheie
`Oem.Supermicro` exact pe această resursă, așa că aceasta este
verificată. BMC-ul altui producător care răspunde pe aceeași cale
eșuează, în loc să fie înregistrat ca Supermicro.

## Câmpuri înregistrate

- `version` — `FirmwareVersion`, de exemplu `01.05.25`
- `extra.model`, atunci când este prezent

## Corelare CVE

Încă nu se corelează — sondele BMC sunt noi în 2.1, iar în amonte
maparea lor CVE a fost lăsată pentru o etapă ulterioară, dedicată.
Consultați [Corelare CVE](/ro/cve/#ce-produse-sunt-potrivite).

## Rezolvatorul ciclului de viață

Niciunul — firmware-ul BMC nu are un calendar public al ciclului de
viață (404 confirmat pentru fiecare slug încercat). Doar pentru
inventar.
