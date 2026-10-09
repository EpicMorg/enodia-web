---
title: ONLYOFFICE Docs
description: Configurarea enodia pentru a sonda ONLYOFFICE Docs.
---

Citește anonim rădăcina serverului de documente, `GET /index.html` — aceasta
răspunde chiar și cu JWT activat: „Server is functioning normally. Version:
9.4.0. Build: 129. Release date: … Package type: 0. …”. Apoi citește
`GET /welcome/` pentru a verifica brandul. Schema implicită este `https`.

```yaml
targets:
  - id: onlyoffice-main
    product: onlyoffice
    address: https://office.example.com
```

## O sondă, două produse

ONLYOFFICE Docs și fork-ul său [Euro-Office](/ro/configuration/products/euro-office/)
(așa cum este livrat pentru Nextcloud) sunt același server și împart o
singură sondă, dar fiecare are propria linie de lansări, așa că fiecare
este un produs separat, cu propriul rezolvator — comparat cu lansările
ONLYOFFICE, un Euro-Office actualizat ar apărea mereu ca rămas în urmă.

`/index.html` arată identic pe ambele, așa că brandul provine din titlul
`/welcome/`: „ONLYOFFICE Docs Community Edition” față de „Euro-Office
Docs Community Edition”. **Un server al celuilalt brand este refuzat,
indicându-se produsul de folosit**: `product: onlyoffice` îndreptat spre
un server Euro-Office eșuează cu `this document server is Euro-Office, not ONLYOFFICE —
use product: euro-office`, în loc să fie înregistrat ca un fapt ONLYOFFICE
(la fel cum [`mysql`](/ro/configuration/products/mysql/) refuză
MariaDB). Dacă pagina de bun venit este dezactivată (404), serverul este
considerat a fi ceea ce indică configurația.

Comanda `version` a serviciului de coautorare necesită secretul JWT, iar
`api.js` nu conține nicio versiune — de aici `/index.html`.

## Autentificare

Niciuna — ambele pagini sunt publice, iar sonda nu acceptă niciun tip de
credențială. Începând cu 2.2.0, o credențială atașată unei ținte
`onlyoffice` este o eroare de configurare, nu este ignorată în tăcere —
consultați [Configurare → Credențiale](/ro/configuration/#credențiale).

## Câmpuri înregistrate

- `version` — de exemplu `9.4.0`
- `extra.build` — numărul build-ului, de exemplu `129`
- `extra.edition` — din tipul pachetului: `community` (0), `enterprise`
  (1) sau `developer` (2)
- `extra.brand` — brandul din titlul `/welcome/` (`ONLYOFFICE`), atunci
  când pagina de bun venit este activă

## Corelare CVE

Se corelează cu NVD și BDU FSTEC atunci când este configurat un [bloc `cve:`](/ro/cve/).
Se folosește `onlyoffice:document_server` din NVD — `onlyoffice:server`
este Community Server, un produs separat.

## Rezolvatorul ciclului de viață

`github:ONLYOFFICE/DocumentServer` — endoflife.date nu are un calendar
pentru ONLYOFFICE (404 confirmat), așa că rezolvarea se face în schimb pe
baza GitHub Releases: doar cel mai recent tag publicat care nu este
prerelease, fără date eol/support/lts (GitHub nu are nicio opinie despre
politica ciclului de viață, doar despre „care este cea mai recentă versiune”).
