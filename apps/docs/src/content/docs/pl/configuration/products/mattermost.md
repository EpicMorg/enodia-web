---
title: Mattermost
description: Konfiguracja enodia do sondowania produktu Mattermost.
---

Odczytuje wersję z `GET /api/v4/config/client?format=old` — tego samego
publicznego endpointu konfiguracji klienta, którego strona logowania
potrzebuje, zanim istnieje jakakolwiek sesja.

```yaml
targets:
  - id: mattermost-main
    product: mattermost
    address: https://mattermost.example.com
```

## Uwierzytelnianie

Brak — endpoint nie przyjmuje żadnego rodzaju poświadczeń.

Rzeczywista odpowiedź to pełny zrzut konfiguracji klienta — ponad sto
kluczy, w tym flagi funkcji, kolory przycisków SSO oraz pola faktycznie
identyfikujące wdrożenie (`SiteName`, `SupportEmail`, identyfikator
telemetrii/diagnostyki, klucz publiczny do podpisów). Nic z tego nie
opisuje samego oprogramowania, dlatego odczytywane są tylko `Version`
i pola `Build*`.

## Rejestrowane pola

- `version`
- `extra.buildNumber`, `extra.buildHash`

## Korelacja CVE

Dopasowywany do NVD i BDU FSTEC, gdy skonfigurowano [blok `cve:`](/pl/cve/).

## Resolver cyklu życia

`endoflife:mattermost`.
