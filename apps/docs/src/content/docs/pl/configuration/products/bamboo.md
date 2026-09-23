---
title: Bamboo
description: Konfiguracja enodia do sondowania produktu Atlassian Bamboo (Data Center).
---

**Tylko Data Center** — Atlassian Cloud nie udostępnia endpointu, który
odczytuje ta sonda. Odczytuje `GET /rest/applinks/1.0/manifest`, ten sam
manifest Application Links, który udostępnia każdy produkt Atlassian Data
Center — anonimowo, dlatego jest używany zamiast `/rest/api/2/serverInfo`.

```yaml
targets:
  - id: bamboo-main
    product: bamboo
    address: https://bamboo.example.com
```

## Uwierzytelnianie

Opcjonalne — manifest można odczytać bez poświadczeń. Jeśli mimo to
uwierzytelnianie jest preferowane, akceptowane są `none`, `basic`
i `bearer`.

## Weryfikacja tożsamości producenta

`<typeId>` z manifestu jest porównywany z wartością oczekiwaną przez
`product: bamboo` (`bamboo`). Adres URL, który okazuje się prowadzić do
Jiry lub Confluence, kończy się wyraźnym błędem, zamiast zostać zapisanym
jako nieprawdziwy fakt.
Zobacz też produkty pokrewne stosujące tę samą konwencję manifestu:
[Jira](/pl/configuration/products/jira/),
[Confluence](/pl/configuration/products/confluence/),
[Bitbucket](/pl/configuration/products/bitbucket/).

## Rejestrowane pola

- `version`
- `extra.buildNumber`, `extra.typeId` — `typeId` będzie miało wartość `bamboo`

## Korelacja CVE

Dopasowywany do NVD i BDU FSTEC, gdy skonfigurowano [blok `cve:`](/pl/cve/).

## Resolver cyklu życia

`endoflife:bamboo` — teraz podłączony. [endoflife.date/bamboo](https://endoflife.date/bamboo)
to rzeczywisty, aktywny kalendarz; wcześniejsza wersja tej strony błędnie
twierdziła, że taki kalendarz w ogóle nie istnieje, opierając się jedynie
na tym, że `registry.go` miał `resolver: ""` bez wyjaśnienia, zamiast
sprawdzić bezpośrednio endoflife.date. Zostało to poprawione zarówno tutaj,
jak i w repozytorium źródłowym.
