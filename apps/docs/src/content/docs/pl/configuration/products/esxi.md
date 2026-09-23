---
title: VMware ESXi
description: Konfiguracja enodia do sondowania produktu VMware ESXi.
---

Wywołuje `ServiceContent.about` przez wywołanie discovery SOAP
`RetrieveServiceContent` samego vSphere API pod `/sdk` — to samo wywołanie
i endpoint, na które odpowiada
[vCenter Server](/pl/configuration/products/vcenter/), rozróżniane polem
`apiType`.

```yaml
targets:
  - id: esxi-main
    product: esxi
    address: https://esxi-host.example.com
```

## Uwierzytelnianie

Brak — potwierdzono na żywo na rzeczywistym produkcyjnym hoście ESXi 8.0.3,
bez żadnych poświadczeń.

## Weryfikacja tożsamości producenta

`apiType` jest porównywane z `"HostAgent"` — prawdziwy vCenter Server
odpowiada na identyczne wywołanie wartością `apiType=VirtualCenter` (zobacz
[vCenter Server](/pl/configuration/products/vcenter/), który wykonuje to
samo sprawdzenie w odwrotną stronę). Wskazanie `product: esxi` na instancję
vCenter kończy się wyraźnym błędem, zamiast zostać zapisanym jako nieprawdziwy fakt.

## Rejestrowane pola

- `version` — np. `8.0.3`
- `extra.build`, jeśli występuje

## Korelacja CVE

Brak dopasowania — prawie wszystkie jego wpisy to literały w stylu `7.0` + `update_1`, których mechanizm dopasowania nie odczytuje, więc wynikiem byłoby albo nic, albo wszystko. Zobacz stronę [Korelacja CVE](/pl/cve/#które-produkty-są-dopasowywane).

## Resolver cyklu życia

`endoflife:esxi`.
