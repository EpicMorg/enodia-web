---
title: Kitsu
description: Konfiguracja enodia do sondowania produktu Kitsu (frontend CG-Wire do śledzenia produkcji).
---

„Kitsu” to powszechnie znana marka stosu śledzenia produkcji CG-Wire, ale
samo Kitsu to frontend w Vue.js **bez własnego endpointu wersji**. Na
`GET /api/status` faktycznie odpowiada — co potwierdzono na żywo, także na
hoście o nazwie DNS dosłownie „kitsu” —
[Zou](/pl/configuration/products/zou/), backend API, z którym komunikuje
się Kitsu. `address` należy wskazać na ten sam backend, dokładnie tak jak
dla `product: zou` — nie ma osobnego adresu URL „Kitsu” do
skonfigurowania.

```yaml
targets:
  - id: kitsu-main
    product: kitsu
    address: https://kitsu.example.com
```

## Uwierzytelnianie

Brak — endpoint nie przyjmuje żadnego rodzaju poświadczeń.

## Dlaczego `kitsu` jest osobnym produktem, a nie aliasem `zou`

Oba wskazują na identyczny backend Zou i ten sam endpoint, ale potrzebują
**różnych resolverów cyklu życia**: repozytorium GitHub samego
`cgwire/zou` publikuje wyłącznie gołe tagi git (potwierdzone na żywo —
jego API Releases zwraca pustą listę), których resolver GitHub Releases
w enodia w ogóle nie potrafi odczytać. `cgwire/kitsu` ma prawdziwe GitHub
Releases i to właśnie jego śledzenia oczekuje wdrożenie, które uważa się
za „działające Kitsu”. Numery wersji obu repozytoriów faktycznie się
rozchodzą (backend Zou wyprzedza Kitsu), więc porównywanie pod bardziej
„technicznie precyzyjną” nazwą `zou` po cichu porównywałoby z numerami
niewłaściwego komponentu — stąd dwa zarejestrowane produkty współdzielące
jedną implementację sondy, a nie jeden produkt z aliasem.

## Rejestrowane pola

- `version`
- `extra.databaseUp`, `extra.keyValueStoreUp`, `extra.eventStreamUp`,
  `extra.jobQueueUp`, `extra.indexerUp` — flagi stanu komponentów,
  `"true"`/`"false"`

## Korelacja CVE

Brak dopasowania — żadna z baz nie ma dla niego użytecznych danych. Zobacz stronę [Korelacja CVE](/pl/cve/#które-produkty-są-dopasowywane).

## Resolver cyklu życia

`github:cgwire/kitsu` — tylko najnowsze wydanie na GitHubie; bez danych
eol/support/lts (GitHub nie ma zdania na temat polityki cyklu życia, zna
tylko „najnowszy tag”).
