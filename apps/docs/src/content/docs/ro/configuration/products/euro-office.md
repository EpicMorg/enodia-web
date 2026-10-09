---
title: Euro-Office Docs
description: Configurarea enodia pentru a sonda Euro-Office Docs.
---

Euro-Office Docs este fork-ul ONLYOFFICE Docs livrat de Nextcloud
(`nextcloud/aio-eurooffice`). La fel ca
[ONLYOFFICE Docs](/ro/configuration/products/onlyoffice/), este citit
anonim din rădăcina serverului de documente, `GET /index.html` —
„Version: 9.3.1. Build: 37. Release date: 2016-06-29…” — apoi este citit
`GET /welcome/` pentru a verifica brandul. Schema implicită este `https`.

```yaml
targets:
  - id: eurooffice-main
    product: euro-office
    address: https://office.example.com
```

## O sondă, două produse

Euro-Office își împarte sonda cu
[`onlyoffice`](/ro/configuration/products/onlyoffice/), dar are propria
linie de lansări (Euro-Office/DocumentServer: v9.3.3, v9.3.4,
v9.3.4-hotfix.1), separată de cea a ONLYOFFICE (v9.3.1, v9.4.0), așa că
este un produs separat, cu propriul rezolvator — comparat cu lansările
ONLYOFFICE, un Euro-Office actualizat ar apărea mereu ca rămas în urmă.
Data lansării din `/index.html` este un substituent; versiunea este reală
(pachetul propriu al imaginii este `euro-office-documentserver 9.3.1-dev.1`).

`/index.html` arată identic pe ambele, așa că brandul provine din titlul
`/welcome/`: „Euro-Office Docs Community Edition” față de „ONLYOFFICE
Docs Community Edition”. **Un server al celuilalt brand este refuzat,
indicându-se produsul de folosit**: `product: euro-office` îndreptat spre
un server ONLYOFFICE eșuează cu `this document server is ONLYOFFICE, not Euro-Office —
use product: onlyoffice`. Dacă pagina de bun venit este dezactivată (404),
serverul este considerat a fi ceea ce indică configurația.

## Autentificare

Niciuna — ambele pagini sunt publice, iar sonda nu acceptă niciun tip de
credențială. Începând cu 2.2.0, o credențială atașată unei ținte
`euro-office` este o eroare de configurare, nu este ignorată în tăcere —
consultați [Configurare → Credențiale](/ro/configuration/#credențiale).

## Câmpuri înregistrate

- `version` — de exemplu `9.3.1`
- `extra.build` — numărul build-ului, de exemplu `37`
- `extra.edition` — din tipul pachetului: `community` (0), `enterprise`
  (1) sau `developer` (2)
- `extra.brand` — brandul din titlul `/welcome/` (`Euro-Office`), atunci
  când pagina de bun venit este activă

## Corelare CVE

Nu se corelează — niciuna dintre baze de date nu are date utilizabile pentru acest produs. Consultați [Corelare CVE](/ro/cve/#ce-produse-sunt-potrivite).
Este un fork fără intrări proprii; intrările ONLYOFFICE nu i se aplică.

## Rezolvatorul ciclului de viață

`github:Euro-Office/DocumentServer` — endoflife.date nu are un calendar
pentru Euro-Office (404 confirmat), așa că rezolvarea se face în schimb
pe baza GitHub Releases: doar cel mai recent tag publicat care nu este
prerelease, fără date eol/support/lts (GitHub nu are nicio opinie despre
politica ciclului de viață, doar despre „care este cea mai recentă versiune”).
