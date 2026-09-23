---
title: Zou
description: Konfiguracja enodia do sondowania produktu Zou (backend API CG-Wire).
---

Odczytuje wersję z `GET /api/status` — rzeczywistego backendu API stosu
śledzenia produkcji CG-Wire, powszechnie znanego pod marką
[Kitsu](/pl/configuration/products/kitsu/), czyli jego frontendu w Vue.js,
który nie ma własnego endpointu wersji.

```yaml
targets:
  - id: zou-main
    product: zou
    address: https://kitsu.example.com
```

## Uwierzytelnianie

Brak — endpoint nie przyjmuje żadnego rodzaju poświadczeń.

## Weryfikacja tożsamości producenta

Pole `name` z odpowiedzi jest porównywane z `"Zou"` — to samo uzasadnienie
co w sondach Atlassian i Jellyfin: jawne nazwanie produktu w konfiguracji
ma wychwycić adres URL wskazujący na niewłaściwą usługę.

## `zou` a `kitsu` — ta sama sonda, różne resolvery, nie alias

`product: kitsu` odpytuje identyczny endpoint i używa tej samej
implementacji sondy — [jego własna strona](/pl/configuration/products/kitsu/)
wyjaśnia, dlaczego oba są zarejestrowane jako osobne produkty, a nie jeden
produkt z aliasem: repozytorium GitHub samego `zou` nie publikuje żadnych
użytecznych Releases (tylko gołe tagi git, potwierdzone na żywo), więc
`product: zou` pozostaje bez resolvera, zamiast ryzykować porównanie
z numerami wersji niewłaściwego komponentu.

## Rejestrowane pola

- `version`
- `extra.databaseUp`, `extra.keyValueStoreUp`, `extra.eventStreamUp`,
  `extra.jobQueueUp`, `extra.indexerUp` — flagi stanu komponentów,
  `"true"`/`"false"`

## Korelacja CVE

Brak dopasowania — żadna z baz nie ma dla niego użytecznych danych. Zobacz stronę [Korelacja CVE](/pl/cve/#które-produkty-są-dopasowywane).

## Resolver cyklu życia

Brak — repozytorium GitHub `cgwire/zou` nie ma użytecznych Releases,
względem których można by rozwiązywać (potwierdzone na żywo: jego API
Releases zwraca pustą listę — tylko gołe tagi git). Jeśli wdrożenie jest
postrzegane jako „działające Kitsu”, a nie „działające Zou”,
`product: kitsu` zapewnia zamiast tego prawdziwy resolver względem
`cgwire/kitsu`, wskazujący na dokładnie ten sam backend.
