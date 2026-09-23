---
title: pgAdmin
description: Konfiguracja enodia do sondowania produktu pgAdmin.
---

Dekoduje wersję z ciągu zapytania `?ver=NNNNN` (cache-busting), który
pgAdmin dołącza do każdego zasobu statycznego na swojej stronie logowania
— z założenia anonimowej, ponieważ musi się wyrenderować, zanim istnieje
jakakolwiek sesja.

```yaml
targets:
  - id: pgadmin-main
    product: pgadmin
    address: https://pgadmin.example.com
```

## Uwierzytelnianie

Brak — endpoint nie przyjmuje żadnego rodzaju poświadczeń.

## Jak dekodowana jest wersja

Potwierdzono na rzeczywistym kontenerze `dpage/pgadmin4` i w kodzie
źródłowym pgAdmin (`version.py`): `NNNNN` to `APP_VERSION_INT`,
udokumentowane tam jako `[X]XYYZZ` — wydanie, rewizja, a następnie kod
sufiksu — np. `91700` dla wydania 9, rewizji 17, sufiksu `00` (GA). Do
`version` odtwarzany jest tylko rdzeń wydanie.rewizja; niezerowy kod
sufiksu (kompilacja beta/dev) nie ma udokumentowanego odwzorowania na
tekst, które pozwalałoby go odtworzyć z samego kodu, więc jest
udostępniany jako `extra.suffixCode`, zamiast zgadywać.

## Rejestrowane pola

- `version` — np. `9.17`
- `extra.suffixCode`, tylko gdy jest niezerowy

## Korelacja CVE

Dopasowywany do NVD i BDU FSTEC, gdy skonfigurowano [blok `cve:`](/pl/cve/).

## Resolver cyklu życia

`github-tags:pgadmin-org/pgadmin4`. endoflife.date nie ma kalendarza dla
pgAdmin (potwierdzone 404), a `pgadmin-org/pgadmin4` w ogóle nie ma GitHub
Releases (potwierdzone na żywo: endpoint wydań zwraca pustą tablicę) —
tylko tagi w postaci `REL-9_17` zamiast wersji z kropkami. Typ resolvera
`github-tags` istnieje właśnie w tym celu: konwertuje ten format na `9.17`
i wybiera z pobranej strony tag o *najwyższej sparsowanej wersji*, zamiast
ufać kolejności listy, ponieważ endpoint tagów nie dokumentuje żadnej
gwarancji kolejności — w przeciwieństwie do Releases z ich odwrotnie
chronologiczną kolejnością. Podobnie jak zwykły resolver `github:`, zna on wyłącznie
„najnowszą wersję” — bez dat eol/support/lts, ponieważ endpoint tagów ich
nie zawiera. Zmienna środowiskowa `GITHUB_TOKEN`, która podnosi limit
żądań tego resolvera, jest opisana na stronie
[Obsługiwane produkty](/pl/products/#aplikacje-i-usługi-infrastrukturalne).
