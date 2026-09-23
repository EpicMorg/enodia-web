---
title: vCenter Server
description: Konfiguracja enodia do sondowania produktu VMware vCenter Server.
---

Wywołuje `ServiceContent.about` przez wywołanie discovery SOAP
`RetrieveServiceContent` samego vSphere API pod `/sdk` — to samo wywołanie
i endpoint, na które odpowiada [ESXi](/pl/configuration/products/esxi/),
rozróżniane polem `apiType`.

```yaml
targets:
  - id: vcenter-main
    product: vcenter
    address: https://vcenter.example.com
```

## Uwierzytelnianie

Brak — potwierdzono na żywo na rzeczywistej produkcyjnej instancji
vCenter 8.0.3, bez żadnych poświadczeń.

## Weryfikacja tożsamości producenta

`apiType` jest porównywane z `"VirtualCenter"` — prawdziwy host ESXi
odpowiada na identyczne wywołanie wartością `apiType=HostAgent` (zobacz
[ESXi](/pl/configuration/products/esxi/), który wykonuje to samo
sprawdzenie w odwrotną stronę). Wskazanie `product: vcenter` na host ESXi
kończy się wyraźnym błędem, zamiast zostać zapisanym jako nieprawdziwy fakt.

## To nie to samo co wcześniejsza wersja tej sondy

Ta sonda odczytywała wcześniej `/sdk/vimServiceVersions.xml`, który
odpowiada identycznie zarówno dla ESXi, jak i dla vCenter (więc nigdy nie
mogła ich rozróżnić), i podaje wersję schematu API `vim25` (np.
`"8.0.3.0"`) zamiast prawdziwej, marketingowej wersji produktu. Obecna
sonda oparta na `RetrieveServiceContent` rozwiązuje oba problemy —
prawdziwa wersja, prawdziwa weryfikacja tożsamości.

## Rejestrowane pola

- `version` — prawdziwa wersja marketingowa, np. `8.0.3`
- `extra.build`, jeśli występuje

## Korelacja CVE

Brak dopasowania — prawie wszystkie jego wpisy to literały w stylu `7.0` + `update_1`, których mechanizm dopasowania nie odczytuje, więc wynikiem byłoby albo nic, albo wszystko. Zobacz stronę [Korelacja CVE](/pl/cve/#które-produkty-są-dopasowywane).

## Resolver cyklu życia

`endoflife:vcenter`.
