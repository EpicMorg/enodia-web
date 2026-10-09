---
title: TorrServer
description: Konfiguracja enodia do sondowania produktu TorrServer.
---

Odczytuje `GET /echo`, na które TorrServer odpowiada swoją wersją jako
zwykłym tekstem. Domyślnym schematem jest `https`.

```yaml
targets:
  - id: torrserver-main
    product: torrserver
    address: https://torrserver.example.com
```

## Postać wersji

`/echo` odpowiada np. `MatriX.146` — nazwa kodowa i liczba, w tym samym
zapisie co tagi wydań TorrServer na GitHubie (`MatriX.146`,
`MatriX.145.2`). Wersja jest zapisywana bez zmian; porównanie używa liczb
po nazwie kodowej, po obu stronach. Odpowiedź o innej postaci (np. strona
HTML) jest zgłaszana jako nieobsługiwana.

## Uwierzytelnianie

Opcjonalne. `basic` jest wysyłane, jeśli zostało skonfigurowane, dla
instancji z włączonym własnym uwierzytelnianiem; bez skonfigurowanych
poświadczeń żądanie jest anonimowe. `basic` to jedyny akceptowany
rodzaj — od wersji 2.2.0 każdy inny rodzaj jest błędem konfiguracji.
Zobacz [Konfiguracja → Poświadczenia](/pl/configuration/#poświadczenia).

```yaml
credentials:
  torrserver-auth:
    kind: basic
    username: admin
    password: "${TORRSERVER_PASSWORD}"
```

## Rejestrowane pola

Tylko `version` — np. `MatriX.146` (to, co odpowiedział na `/echo` działający
`ghcr.io/yourok/torrserver:latest`). Ta sonda nie zapisuje żadnych pól
`extra`.

## Korelacja CVE

Brak dopasowania — żadna z baz nie ma dla niego użytecznych danych. Zobacz
stronę [Korelacja CVE](/pl/cve/#które-produkty-są-dopasowywane).

## Resolver cyklu życia

`github:YouROK/TorrServer` — endoflife.date nie ma kalendarza dla
TorrServer (potwierdzone 404), więc zamiast tego jest rozwiązywany przez
GitHub Releases: wyłącznie najnowszy opublikowany tag niebędący wydaniem
wstępnym (prerelease), bez dat eol/support/lts (GitHub nie ma zdania na
temat polityki cyklu życia, zna tylko „najnowsze wydanie”).
