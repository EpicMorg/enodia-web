---
title: ONLYOFFICE Docs
description: Konfiguracja enodia do sondowania produktu ONLYOFFICE Docs.
---

Odczytuje anonimowo katalog główny serwera dokumentów, `GET /index.html` —
odpowiada on nawet przy włączonym JWT: „Server is functioning normally. Version:
9.4.0. Build: 129. Release date: … Package type: 0. …”. Następnie odczytuje
`GET /welcome/` w celu sprawdzenia marki. Domyślnym schematem jest `https`.

```yaml
targets:
  - id: onlyoffice-main
    product: onlyoffice
    address: https://office.example.com
```

## Jedna sonda, dwa produkty

ONLYOFFICE Docs i jego fork [Euro-Office](/pl/configuration/products/euro-office/)
(w postaci dostarczanej dla Nextcloud) to ten sam serwer i dzielą jedną
sondę, ale każdy ma własną linię wydań, więc każdy jest osobnym produktem
z własnym resolverem — w porównaniu z wydaniami ONLYOFFICE aktualny
Euro-Office zawsze wyglądałby na przestarzały.

`/index.html` wygląda identycznie w obu, więc marka pochodzi z tytułu
`/welcome/`: „ONLYOFFICE Docs Community Edition” lub „Euro-Office
Docs Community Edition”. **Serwer drugiej marki jest odrzucany z podaniem
produktu, którego należy użyć**: `product: onlyoffice` wskazany na serwer
Euro-Office kończy się błędem `this document server is Euro-Office, not ONLYOFFICE —
use product: euro-office`, zamiast zapisać go jako fakt o ONLYOFFICE
(tak samo jak [`mysql`](/pl/configuration/products/mysql/) odrzuca
MariaDB). Jeśli strona powitalna jest wyłączona (404), przyjmuje się, że
serwer jest tym, co podaje konfiguracja.

Polecenie `version` usługi współedycji wymaga sekretu JWT, a `api.js` nie
zawiera wersji — stąd `/index.html`.

## Uwierzytelnianie

Brak — obie strony są publiczne, a sonda nie przyjmuje żadnego rodzaju
poświadczeń. Od wersji 2.2.0 poświadczenie przypisane do celu `onlyoffice`
jest błędem konfiguracji, a nie jest po cichu ignorowane — zobacz
[Konfiguracja → Poświadczenia](/pl/configuration/#poświadczenia).

## Rejestrowane pola

- `version` — np. `9.4.0`
- `extra.build` — numer kompilacji, np. `129`
- `extra.edition` — z typu pakietu: `community` (0), `enterprise`
  (1) lub `developer` (2)
- `extra.brand` — marka z tytułu `/welcome/` (`ONLYOFFICE`), gdy strona
  powitalna jest włączona

## Korelacja CVE

Dopasowywany do NVD i BDU FSTEC, gdy skonfigurowano [blok `cve:`](/pl/cve/).
Używany jest `onlyoffice:document_server` z NVD — `onlyoffice:server` to
odrębny Community Server.

## Resolver cyklu życia

`github:ONLYOFFICE/DocumentServer` — endoflife.date nie ma kalendarza dla
ONLYOFFICE (potwierdzone 404), więc zamiast tego jest rozwiązywany przez
GitHub Releases: wyłącznie najnowszy opublikowany tag niebędący wydaniem
wstępnym (prerelease), bez dat eol/support/lts (GitHub nie ma zdania na
temat polityki cyklu życia, zna tylko „najnowsze wydanie”).
