---
title: Jaeger
description: Konfiguracja enodia do sondowania produktu Jaeger.
---

Odczytuje wersję, którą query-service Jaegera (komponent serwujący UI,
domyślnie port 16686) osadza we własnym `index.html` przez wyszukiwanie
i zamianę w czasie budowania — nie ma osobnego API wersji.

```yaml
targets:
  - id: jaeger-main
    product: jaeger
    address: https://jaeger.example.com
```

## Uwierzytelnianie

Brak — Jaeger w ogóle nie ma własnego uwierzytelniania. Wdrożenie za
reverse proxy lub bramą SSO (oauth2-proxy to częsty, realny wybór)
odpowiada przekierowaniem do procesu logowania tej bramy zamiast HTML-a
Jaegera, co objawia się własnym błędem tej sondy „no JAEGER_VERSION
found” — ta sonda nie może tego samodzielnie dokończyć; to ten sam rodzaj
luki, jaki miałby produkt z logowaniem przez formularz.

## Rejestrowane pola

Tylko `version` — ta sonda nie zapisuje żadnych pól `extra`.

## Korelacja CVE

Dopasowywany do NVD, gdy skonfigurowano [blok `cve:`](/pl/cve/).

## Resolver cyklu życia

`endoflife:jaeger`.
