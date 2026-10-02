---
title: HP iLO 4
description: Configurarea enodia pentru a sonda un HP iLO 4.
---

Citește `GET /redfish/v1/Managers/1/` — cu slash-ul final, a cărui
importanță a fost confirmată live — pentru versiunea firmware-ului
controlerului.

```yaml
targets:
  - id: vm43-ilo
    product: hp-ilo4
    address: https://ilo-vm43.example.com
    credentials: ilo-ro
```

## Autentificare — obligatorie

Autentificare HTTP Basic; fără ea, endpoint-ul răspunde `401`
(confirmat live).

```yaml
credentials:
  ilo-ro:
    kind: basic
    username: enodia
    password: "${ILO_PASSWORD}"
```

Un cont iLO doar pentru citire este suficient. iLO-urile servesc de
obicei un certificat autosemnat — fixați-l (pin) în loc să dezactivați
verificarea, consultați [Configurare → TLS](/ro/configuration/#tls-tls).

## Doar iLO 4

API-ul iLO 4 se autointitulează „HP RESTful Root Service” — un API HP
anterior Redfish, nu o implementare Redfish — dar această resursă se
suprapune suficient de mult cu Redfish pentru a fi citită în același
mod. Identitatea este verificată după cheia sa `Oem.Hp`. iLO 5 este
complet conform Redfish și foarte probabil necesită o verificare
diferită; nu a fost disponibil niciun iLO 5 pentru a confirma acest
lucru live, așa că încă nu are o sondă, în loc să aibă una ghicită.

## Câmpuri înregistrate

- `version` — extras din `FirmwareVersion`: `iLO 4 v2.82` → `2.82`
- `extra.raw` — șirul complet `FirmwareVersion`

## Corelare CVE

Încă nu se corelează — sondele BMC sunt noi în 2.1, iar în amonte
maparea lor CVE a fost lăsată pentru o etapă ulterioară, dedicată.
Consultați [Corelare CVE](/ro/cve/#ce-produse-sunt-potrivite).

## Rezolvatorul ciclului de viață

Niciunul — firmware-ul BMC nu are un calendar public al ciclului de
viață (404 confirmat pentru fiecare slug încercat). Doar pentru
inventar.
