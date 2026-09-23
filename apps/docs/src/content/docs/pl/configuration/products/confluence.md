---
title: Confluence
description: Konfiguracja enodia do sondowania produktu Atlassian Confluence (Data Center).
---

**Tylko Data Center** — Atlassian Cloud nie udostępnia endpointu, który
odczytuje ta sonda. Odczytuje `GET /rest/applinks/1.0/manifest`, ten sam
manifest Application Links, który udostępnia każdy produkt Atlassian Data
Center — anonimowo, dlatego jest używany zamiast `/rest/api/2/serverInfo`.

```yaml
targets:
  - id: confluence-main
    product: confluence
    address: https://confluence.example.com
```

## Uwierzytelnianie

Opcjonalne — manifest można odczytać bez poświadczeń. Jeśli mimo to
uwierzytelnianie jest preferowane, akceptowane są `none`, `basic`
i `bearer`.

## Weryfikacja tożsamości producenta

`<typeId>` z manifestu jest porównywany z wartością oczekiwaną przez
`product: confluence` (`confluence`). Adres URL, który okazuje się
prowadzić do Jiry lub Bitbucket, kończy się wyraźnym błędem, zamiast zostać
zapisanym jako nieprawdziwy fakt.
Zobacz też produkty pokrewne stosujące tę samą konwencję manifestu:
[Jira](/pl/configuration/products/jira/),
[Bitbucket](/pl/configuration/products/bitbucket/),
[Bamboo](/pl/configuration/products/bamboo/).

## Rejestrowane pola

- `version`
- `extra.buildNumber`, `extra.typeId` — `typeId` będzie miało wartość `confluence`

## Korelacja CVE

Dopasowywany do NVD i BDU FSTEC, gdy skonfigurowano [blok `cve:`](/pl/cve/).

## Resolver cyklu życia

`endoflife:confluence`.
