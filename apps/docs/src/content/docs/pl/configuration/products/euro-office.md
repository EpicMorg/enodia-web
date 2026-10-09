---
title: Euro-Office Docs
description: Konfiguracja enodia do sondowania produktu Euro-Office Docs.
---

Euro-Office Docs to fork ONLYOFFICE Docs dostarczany przez Nextcloud
(`nextcloud/aio-eurooffice`). Podobnie jak
[ONLYOFFICE Docs](/pl/configuration/products/onlyoffice/), jest odczytywany
anonimowo z katalogu głównego serwera dokumentów, `GET /index.html` —
„Version: 9.3.1. Build: 37. Release date: 2016-06-29…” — a następnie
odczytywany jest `GET /welcome/` w celu sprawdzenia marki. Domyślnym
schematem jest `https`.

```yaml
targets:
  - id: eurooffice-main
    product: euro-office
    address: https://office.example.com
```

## Jedna sonda, dwa produkty

Euro-Office dzieli sondę z
[`onlyoffice`](/pl/configuration/products/onlyoffice/), ale ma własną linię
wydań (Euro-Office/DocumentServer: v9.3.3, v9.3.4, v9.3.4-hotfix.1),
odrębną od linii ONLYOFFICE (v9.3.1, v9.4.0), więc jest osobnym produktem
z własnym resolverem — w porównaniu z wydaniami ONLYOFFICE aktualny
Euro-Office zawsze wyglądałby na przestarzały. Data wydania na jego
`/index.html` jest wartością zastępczą; wersja jest prawdziwa (własny
pakiet obrazu to `euro-office-documentserver 9.3.1-dev.1`).

`/index.html` wygląda identycznie w obu, więc marka pochodzi z tytułu
`/welcome/`: „Euro-Office Docs Community Edition” lub „ONLYOFFICE Docs
Community Edition”. **Serwer drugiej marki jest odrzucany z podaniem
produktu, którego należy użyć**: `product: euro-office` wskazany na serwer
ONLYOFFICE kończy się błędem `this document server is ONLYOFFICE, not Euro-Office —
use product: onlyoffice`. Jeśli strona powitalna jest wyłączona (404),
przyjmuje się, że serwer jest tym, co podaje konfiguracja.

## Uwierzytelnianie

Brak — obie strony są publiczne, a sonda nie przyjmuje żadnego rodzaju
poświadczeń. Od wersji 2.2.0 poświadczenie przypisane do celu `euro-office`
jest błędem konfiguracji, a nie jest po cichu ignorowane — zobacz
[Konfiguracja → Poświadczenia](/pl/configuration/#poświadczenia).

## Rejestrowane pola

- `version` — np. `9.3.1`
- `extra.build` — numer kompilacji, np. `37`
- `extra.edition` — z typu pakietu: `community` (0), `enterprise`
  (1) lub `developer` (2)
- `extra.brand` — marka z tytułu `/welcome/` (`Euro-Office`), gdy strona
  powitalna jest włączona

## Korelacja CVE

Brak dopasowania — żadna z baz nie ma dla niego użytecznych danych. Zobacz stronę [Korelacja CVE](/pl/cve/#które-produkty-są-dopasowywane).
To fork bez własnych wpisów; wpisy ONLYOFFICE nie są do niego stosowane.

## Resolver cyklu życia

`github:Euro-Office/DocumentServer` — endoflife.date nie ma kalendarza dla
Euro-Office (potwierdzone 404), więc zamiast tego jest rozwiązywany przez
GitHub Releases: wyłącznie najnowszy opublikowany tag niebędący wydaniem
wstępnym (prerelease), bez dat eol/support/lts (GitHub nie ma zdania na
temat polityki cyklu życia, zna tylko „najnowsze wydanie”).
