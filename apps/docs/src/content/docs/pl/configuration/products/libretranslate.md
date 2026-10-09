---
title: LibreTranslate
description: Konfiguracja enodia do sondowania produktu LibreTranslate.
---

Odczytuje `GET /spec` — własny dokument OpenAPI (Swagger 2.0) API, który
jest publiczny nawet tam, gdzie tłumaczenie wymaga klucza API. Domyślnym
schematem jest `https`.

```yaml
targets:
  - id: translate-main
    product: libretranslate
    address: https://translate.example.com
```

## Weryfikacja tożsamości producenta

`info.version` to wersja serwera. Sonda wymaga też, aby `info.title`
miało wartość `"LibreTranslate"`, tak aby dokument Swagger innej usługi
nie został odczytany jako dokument LibreTranslate.

## Uwierzytelnianie

Brak — `/spec` jest publiczny, a sonda nie przyjmuje żadnego rodzaju
poświadczeń (klucz API jest potrzebny tylko do tłumaczenia, którego sonda
nigdy nie wykonuje). Od wersji 2.2.0 poświadczenie skonfigurowane dla tego
celu jest błędem konfiguracji, a nie jest ignorowane; zobacz
[Konfiguracja → Poświadczenia](/pl/configuration/#poświadczenia).

## Rejestrowane pola

Tylko `version` — np. `1.9.6`, z `info.version` (potwierdzone na żywo na
`libretranslate/libretranslate:latest`, wydanie v1.9.6). Ta sonda nie
zapisuje żadnych pól `extra`.

## Korelacja CVE

Brak dopasowania — żadna z baz nie ma dla niego użytecznych danych. Zobacz
stronę [Korelacja CVE](/pl/cve/#które-produkty-są-dopasowywane).

## Resolver cyklu życia

`github:LibreTranslate/LibreTranslate` — endoflife.date nie ma kalendarza
dla LibreTranslate (potwierdzone 404), więc zamiast tego jest rozwiązywany
przez GitHub Releases: wyłącznie najnowszy opublikowany tag niebędący
wydaniem wstępnym (prerelease), bez dat eol/support/lts (GitHub nie ma
zdania na temat polityki cyklu życia, zna tylko „najnowsze wydanie”).
