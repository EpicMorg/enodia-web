---
title: Dell iDRAC
description: Configurarea enodia pentru a sonda un Dell iDRAC prin Redfish.
---

Două cereri prin Redfish: `GET /redfish/v1` pentru identitatea
producătorului, apoi `GET /redfish/v1/Managers/iDRAC.Embedded.1` pentru
versiunea firmware-ului.

```yaml
targets:
  - id: blade-1a-idrac
    product: dell-idrac
    address: https://idrac-blade-1a.example.com
    credentials: idrac-ro
```

## Autentificare — obligatorie

Autentificare HTTP Basic; fără ea, endpoint-urile răspund `401`
(confirmat live).

```yaml
credentials:
  idrac-ro:
    kind: basic
    username: enodia
    password: "${IDRAC_PASSWORD}"
```

Un cont iDRAC doar pentru citire este suficient. iDRAC-urile servesc de
obicei un certificat autosemnat — fixați-l (pin) în loc să dezactivați
verificarea, consultați [Configurare → TLS](/ro/configuration/#tls-tls).

## Verificarea identității producătorului

De ce două cereri: confirmat live pe un iDRAC real de generația 12G,
resursa Manager în sine nu conține niciun marcaj al producătorului, în
timp ce rădăcina serviciului `/redfish/v1` conține `Oem.Dell` (cu
service tag-ul) și șirul de produs „Integrated Dell Remote Access
Controller”. Prima cerere confirmă că este un Dell; a doua citește
versiunea. `iDRAC.Embedded.1` este id-ul Dell standard al controlerului
încorporat, cel verificat.

Un **CMC** Dell (controlerul la nivel de șasiu al unei incinte blade)
este un produs diferit, fără niciun endpoint Redfish, și nu este
acoperit.

## Câmpuri înregistrate

- `version` — `FirmwareVersion`, de exemplu `2.65.65.65`
- `extra.model`, atunci când este prezent
- `extra.serviceTag`, atunci când este prezent

## Corelare CVE

Se corelează cu NVD și BDU FSTEC atunci când este configurat un [bloc `cve:`](/ro/cve/). Începând cu 2.2. Ambele baze de date
numesc fiecare generație iDRAC ca produs separat, cu numere de firmware
care se suprapun, așa că generația este citită din `extra.model`
(modelul Redfish, de exemplu `12G Modular` → iDRAC7; 11G iDRAC6, 13G
iDRAC8, 14G–16G iDRAC9, 17G iDRAC10). Fără un model, este căutat doar
firmware-ul 3.x și ulterior (acesta nu poate fi decât iDRAC9) — consultați
[Dell iDRAC și Synology DSM](/ro/cve/#dell-idrac-și-synology-dsm).

## Rezolvatorul ciclului de viață

Niciunul — firmware-ul BMC nu are un calendar public al ciclului de
viață (404 confirmat pentru fiecare slug încercat). Doar pentru
inventar.
