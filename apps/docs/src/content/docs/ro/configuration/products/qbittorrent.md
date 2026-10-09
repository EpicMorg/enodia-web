---
title: qBittorrent
description: Configurarea enodia pentru a sonda qBittorrent.
---

Citește versiunea din API-ul Web UI al qBittorrent: se autentifică cu
`POST /api/v2/auth/login`, apoi citește `GET /api/v2/app/version` și
`GET /api/v2/app/buildInfo` cu cookie-ul de sesiune și se deconectează.

```yaml
targets:
  - id: qbittorrent-main
    product: qbittorrent
    address: https://qbittorrent.example.com
    credentials: qbittorrent-monitor
```

## Autentificare

Opțională, dar de obicei necesară: Web UI răspunde la orice, inclusiv la
`/`, cu `401` fără sesiune (confirmat live pe `linuxserver/qbittorrent`
5.2.4). Este o autentificare prin formular (câmpurile `username` și
`password`), nu HTTP Basic, așa că tipul este `password`:

```yaml
credentials:
  qbittorrent-monitor:
    kind: password
    username: monitor
    password: "${QBITTORRENT_PASSWORD}"
```

Este acceptat doar `password`; orice alt tip este o eroare de configurare.
Consultați [Configurare → Credențiale](/ro/configuration/#credențiale).

Fără credențiale, sonda interoghează direct `/api/v2/app/version` — pentru
un Web UI configurat să ocolească autentificarea pentru subrețeaua
sondei. Dacă acesta răspunde `401`, eroarea indică să configurați
credențiale.

Orice cookie de sesiune setat la autentificare este trimis înapoi ca
atare: 5.x răspunde `204` și setează `QBT_SID_<port>`, 4.x răspunde
`200 Ok.` și setează `SID`. O parolă greșită înseamnă `401` pe 5.x și
`200 Fails.` pe 4.x; ambele sunt raportate ca eșec de autentificare.

## În spatele unui reverse proxy

qBittorrent verifică dacă portul din antetul `Host` corespunde propriului
port și dacă `Referer`/`Origin` corespunde lui `Host`. La autentificare se
trimite originea proprie a țintei ca `Referer`. În spatele unui reverse
proxy care remapează porturile, qBittorrent trebuie configurat în acest
sens — altfel fiecare cerere primește `401`, exact ceea ce a arătat o
captură live printr-un port de container remapat, până când porturile au
coincis.

## Câmpuri înregistrate

- `version` — `/api/v2/app/version` fără `v`-ul de la început, de exemplu
  `5.2.4`
- `extra.libtorrent` — din `/api/v2/app/buildInfo`, de exemplu `2.0.15.0`
- `extra.qt` — din `/api/v2/app/buildInfo`, de exemplu `6.11.2`

## Corelare CVE

Se corelează cu NVD și BDU FSTEC atunci când este configurat un [bloc `cve:`](/ro/cve/).

## Rezolvatorul ciclului de viață

`github:qbittorrent/qBittorrent` — endoflife.date nu are un calendar
pentru qBittorrent (404 confirmat), așa că rezolvarea se face în schimb pe
baza GitHub Releases: doar cel mai recent tag publicat care nu este
prerelease, fără date eol/support/lts (GitHub nu are nicio opinie despre
politica ciclului de viață, doar despre „care este cea mai recentă
versiune”). Lansările sunt etichetate `release-5.2.4`; rezolvatorul
elimină prefixul `release-` și citește restul ca versiune.
