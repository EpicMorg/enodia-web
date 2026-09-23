---
title: Bitbucket
description: Configurarea enodia pentru a sonda Atlassian Bitbucket (Data Center).
---

**Doar Data Center** — Atlassian Cloud nu expune endpointul pe care îl
citește această sondă. Citește `GET /rest/applinks/1.0/manifest`, același
manifest Application Links pe care îl expune fiecare produs Atlassian
Data Center — anonim, motiv pentru care este folosit în locul
`/rest/api/2/serverInfo`.

```yaml
targets:
  - id: bitbucket-main
    product: bitbucket
    address: https://bitbucket.example.com
```

## Autentificare

Opțională — manifestul poate fi citit fără credențiale. `none`, `basic`
și `bearer` sunt toate acceptate dacă preferați totuși să vă autentificați.

## Verificarea identității producătorului

`<typeId>` din manifest este comparat cu valoarea pe care o așteaptă
`product: bitbucket`. **Manifestul Bitbucket încă se raportează ca
`stash`** — numele său anterior, dinaintea rebranding-ului Atlassian —
așa că `typeId: stash` este corect și de așteptat aici; acesta este
răspunsul producătorului, nu o particularitate a enodia. Un URL care se
dovedește a fi Jira sau Confluence eșuează în continuare explicit, în loc
să fie înregistrat ca un fapt greșit — consultați
[Jira](/ro/configuration/products/jira/),
[Confluence](/ro/configuration/products/confluence/),
[Bamboo](/ro/configuration/products/bamboo/) pentru produsele înrudite
care folosesc aceeași convenție a manifestului.

## Câmpuri înregistrate

- `version`
- `extra.buildNumber`, `extra.typeId` — `typeId` va avea valoarea `stash`,
  nu `bitbucket`

## Corelare CVE

Se corelează cu NVD și BDU FSTEC atunci când este configurat un [bloc `cve:`](/ro/cve/).

## Rezolvatorul ciclului de viață

`endoflife:bitbucket`.
