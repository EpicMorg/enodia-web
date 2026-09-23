---
title: Traefik
description: Configurarea enodia pentru a sonda Traefik.
---

Citește `GET /api/version`.

```yaml
targets:
  - id: traefik-main
    product: traefik
    address: https://traefik.example.com
```

## Autentificare

Opțională. Confirmat live pe un container real `traefik:v3.1`: cu
routerul API activat (dezactivat implicit — nici `--api`, nici
`--api.insecure` nu sunt setate pe o instanță standard) cu
`--api.insecure=true`, acest endpoint nu necesită credențiale. O
instalare care plasează în schimb routerul API în spatele propriului
middleware de autentificare Basic/Digest (modul „securizat” documentat
de Traefik pentru a-l expune) răspunde cu provocări HTTP Basic obișnuite:

```yaml
credentials:
  traefik-basic:
    kind: basic
    username: admin
    password: "${TRAEFIK_PASSWORD}"
```

O instanță la care API-ul nu este activat deloc răspunde aici `404`, ceea
ce nu poate fi deosebit de o adresă greșită.

## Câmpuri înregistrate

Doar `version` — această sondă nu înregistrează niciun câmp `extra`
(`Codename` și `startDate` descriu versiunea lansată, nu instalarea, și
nu sunt citite).

## Corelare CVE

Se corelează cu NVD și BDU FSTEC atunci când este configurat un [bloc `cve:`](/ro/cve/).

## Rezolvatorul ciclului de viață

`endoflife:traefik`.
