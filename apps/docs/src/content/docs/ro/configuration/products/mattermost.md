---
title: Mattermost
description: Configurarea enodia pentru a sonda Mattermost.
---

Citește `GET /api/v4/config/client?format=old` pentru versiune — același
endpoint public de configurare a clientului de care are nevoie o pagină
de autentificare înainte de a exista vreo sesiune.

```yaml
targets:
  - id: mattermost-main
    product: mattermost
    address: https://mattermost.example.com
```

## Autentificare

Niciuna — endpointul nu acceptă nicio formă de credențiale.

Răspunsul real este o descărcare completă a configurației clientului —
peste o sută de chei, inclusiv feature flags, culorile butoanelor SSO și
câmpuri care chiar identifică instalarea (`SiteName`, `SupportEmail`, un
ID de telemetrie/diagnosticare, o cheie publică de semnare). Nimic din
toate acestea nu descrie software-ul în sine, așa că sunt citite doar
`Version` și câmpurile `Build*`.

## Câmpuri înregistrate

- `version`
- `extra.buildNumber`, `extra.buildHash`

## Corelare CVE

Se corelează cu NVD și BDU FSTEC atunci când este configurat un [bloc `cve:`](/ro/cve/).

## Rezolvatorul ciclului de viață

`endoflife:mattermost`.
