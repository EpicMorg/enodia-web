---
title: Bitbucket
description: Konfiguracja enodia do sondowania produktu Atlassian Bitbucket (Data Center).
---

**Tylko Data Center** — Atlassian Cloud nie udostępnia endpointu, który
odczytuje ta sonda. Odczytuje `GET /rest/applinks/1.0/manifest`, ten sam
manifest Application Links, który udostępnia każdy produkt Atlassian Data
Center — anonimowo, dlatego jest używany zamiast `/rest/api/2/serverInfo`.

```yaml
targets:
  - id: bitbucket-main
    product: bitbucket
    address: https://bitbucket.example.com
```

## Uwierzytelnianie

Opcjonalne — manifest można odczytać bez poświadczeń. Jeśli mimo to
uwierzytelnianie jest preferowane, akceptowane są `none`, `basic`
i `bearer`.

## Weryfikacja tożsamości producenta

`<typeId>` z manifestu jest porównywany z wartością oczekiwaną przez
`product: bitbucket`. **Własny manifest Bitbucket nadal przedstawia się
jako `stash`** — dawna nazwa sprzed rebrandingu Atlassian — więc
`typeId: stash` jest tu poprawne i oczekiwane; to odpowiedź producenta,
a nie osobliwość enodia. Adres URL, który okazuje się prowadzić do Jiry
lub Confluence, nadal kończy się wyraźnym błędem, zamiast zostać zapisanym
jako nieprawdziwy fakt.
Zobacz też produkty pokrewne stosujące tę samą konwencję manifestu:
[Jira](/pl/configuration/products/jira/),
[Confluence](/pl/configuration/products/confluence/),
[Bamboo](/pl/configuration/products/bamboo/).

## Rejestrowane pola

- `version`
- `extra.buildNumber`, `extra.typeId` — `typeId` będzie miało wartość `stash`, a nie
  `bitbucket`

## Korelacja CVE

Dopasowywany do NVD i BDU FSTEC, gdy skonfigurowano [blok `cve:`](/pl/cve/).

## Resolver cyklu życia

`endoflife:bitbucket`.
