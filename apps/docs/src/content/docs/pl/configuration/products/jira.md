---
title: Jira
description: Konfiguracja enodia do sondowania produktu Atlassian Jira (Data Center).
---

**Tylko Data Center** — Atlassian Cloud nie udostępnia endpointu, który
odczytuje ta sonda. Odczytuje `GET /rest/applinks/1.0/manifest`, ten sam
manifest Application Links, który udostępnia każdy produkt Atlassian Data
Center — anonimowo, dlatego jest używany zamiast `/rest/api/2/serverInfo`.

```yaml
targets:
  - id: jira-main
    product: jira
    address: https://jira.example.com
```

## Uwierzytelnianie

Opcjonalne — manifest można odczytać bez poświadczeń. Jeśli mimo to
uwierzytelnianie jest preferowane, akceptowane są `none`, `basic`
i `bearer`.

## Weryfikacja tożsamości producenta

`<typeId>` z manifestu jest porównywany z wartością oczekiwaną przez
`product: jira` (`jira`). Adres URL, który okazuje się prowadzić do
Confluence lub Bitbucket, kończy się wyraźnym błędem, zamiast zostać
zapisanym jako nieprawdziwy fakt.
Zobacz też produkty pokrewne stosujące tę samą konwencję manifestu:
[Confluence](/pl/configuration/products/confluence/),
[Bitbucket](/pl/configuration/products/bitbucket/),
[Bamboo](/pl/configuration/products/bamboo/).

## Rejestrowane pola

- `version`
- `extra.buildNumber`, `extra.typeId` — `typeId` będzie miało wartość `jira`

## Korelacja CVE

Dopasowywany do NVD i BDU FSTEC, gdy skonfigurowano [blok `cve:`](/pl/cve/).

## Resolver cyklu życia

`endoflife:jira-software` — uwaga: slug to `jira-software`, a nie `jira`.
