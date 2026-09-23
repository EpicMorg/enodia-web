---
title: Bamboo
description: Configurarea enodia pentru a sonda Atlassian Bamboo (Data Center).
---

**Doar Data Center** — Atlassian Cloud nu expune endpointul pe care îl
citește această sondă. Citește `GET /rest/applinks/1.0/manifest`, același
manifest Application Links pe care îl expune fiecare produs Atlassian
Data Center — anonim, motiv pentru care este folosit în locul
`/rest/api/2/serverInfo`.

```yaml
targets:
  - id: bamboo-main
    product: bamboo
    address: https://bamboo.example.com
```

## Autentificare

Opțională — manifestul poate fi citit fără credențiale. `none`, `basic`
și `bearer` sunt toate acceptate dacă preferați totuși să vă autentificați.

## Verificarea identității producătorului

`<typeId>` din manifest este comparat cu valoarea pe care o așteaptă
`product: bamboo` (`bamboo`). Un URL care se dovedește a fi Jira sau
Confluence eșuează explicit, în loc să fie înregistrat ca un fapt greșit
— consultați [Jira](/ro/configuration/products/jira/),
[Confluence](/ro/configuration/products/confluence/),
[Bitbucket](/ro/configuration/products/bitbucket/) pentru produsele
înrudite care folosesc aceeași convenție a manifestului.

## Câmpuri înregistrate

- `version`
- `extra.buildNumber`, `extra.typeId` — `typeId` va avea valoarea `bamboo`

## Corelare CVE

Se corelează cu NVD și BDU FSTEC atunci când este configurat un [bloc `cve:`](/ro/cve/).

## Rezolvatorul ciclului de viață

`endoflife:bamboo` — acum conectat. [endoflife.date/bamboo](https://endoflife.date/bamboo)
este un calendar real, activ; o revizie anterioară a acestei pagini
susținea din greșeală că un astfel de calendar nu există deloc, bazându-se
doar pe faptul că `registry.go` avea `resolver: ""` fără nicio explicație,
în loc să verifice efectiv endoflife.date direct. Acest lucru este corectat
atât aici, cât și în proiectul principal (upstream).
