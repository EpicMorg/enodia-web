---
title: Jira
description: Configurarea enodia pentru a sonda Atlassian Jira (Data Center).
---

**Doar Data Center** — Atlassian Cloud nu expune endpointul pe care îl
citește această sondă. Citește `GET /rest/applinks/1.0/manifest`, același
manifest Application Links pe care îl expune fiecare produs Atlassian
Data Center — anonim, motiv pentru care este folosit în locul
`/rest/api/2/serverInfo`.

```yaml
targets:
  - id: jira-main
    product: jira
    address: https://jira.example.com
```

## Autentificare

Opțională — manifestul poate fi citit fără credențiale. `none`, `basic`
și `bearer` sunt toate acceptate dacă preferați totuși să vă autentificați.

## Verificarea identității producătorului

`<typeId>` din manifest este comparat cu valoarea pe care o așteaptă
`product: jira` (`jira`). Un URL care se dovedește a fi Confluence sau
Bitbucket eșuează explicit, în loc să fie înregistrat ca un fapt greșit
— consultați [Confluence](/ro/configuration/products/confluence/),
[Bitbucket](/ro/configuration/products/bitbucket/),
[Bamboo](/ro/configuration/products/bamboo/) pentru produsele înrudite
care folosesc aceeași convenție a manifestului.

## Câmpuri înregistrate

- `version`
- `extra.buildNumber`, `extra.typeId` — `typeId` va avea valoarea `jira`

## Corelare CVE

Se corelează cu NVD și BDU FSTEC atunci când este configurat un [bloc `cve:`](/ro/cve/).

## Rezolvatorul ciclului de viață

`endoflife:jira-software` — rețineți că slug-ul este `jira-software`, nu `jira`.
