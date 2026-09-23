---
title: TrueNAS
description: Konfiguracja enodia do sondowania produktu TrueNAS.
---

Odczytuje `GET /api/v2.0/system/info`.

```yaml
targets:
  - id: truenas-main
    product: truenas
    address: https://truenas.example.com
    credentials: truenas-key
```

## Uwierzytelnianie — wymagane

Potwierdzono na żywo na rzeczywistym hoście TrueNAS 25.10.7: ten endpoint
bez poświadczeń odpowiada `401`. Klucz API działa jako zwykły token
bearer:

```yaml
credentials:
  truenas-key:
    kind: bearer
    value: "${TRUENAS_API_KEY}"
```

## To nie jest sonda SSH, mimo że to system typu appliance

Wcześniejsza wersja tej sondy odczytywała zamiast tego `/etc/version`
przez SSH (własny `/etc/os-release` TrueNAS podaje bazowego Debiana, a nie
sam TrueNAS — ta sama luka w pliku tożsamości, jaką ma
[Astra Linux](/pl/configuration/products/astra-linux/)). Gdy tylko pojawił
się rzeczywisty cel API, na którym można było to zweryfikować, wersja HTTP
całkowicie zastąpiła wersję SSH — enodia nie ma mechanizmu awaryjnego
z dwoma transportami dla jednego produktu, więc wygrywa prostszy, lepiej
dopasowany wariant, zamiast współistnienia obu.

## Rejestrowane pola

Tylko `version` — ta sonda nie zapisuje żadnych pól `extra`.

## Korelacja CVE

Brak dopasowania — zbyt mało wpisów, wersjonowanych inaczej, niż zgłasza sonda. Zobacz stronę [Korelacja CVE](/pl/cve/#które-produkty-są-dopasowywane).

## Resolver cyklu życia

`endoflife:truenas`.
