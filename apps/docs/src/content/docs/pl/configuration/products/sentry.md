---
title: Sentry
description: Konfiguracja enodia do sondowania produktu Sentry.
---

Odczytuje anonimową stronę logowania samodzielnie hostowanego Sentry,
`GET /auth/login/` (która przekierowuje na stronę logowania jedynej
organizacji). Każda strona osadza `window.__initialData = {...}`, a jego
`version.current` to wersja. Domyślnym schematem jest `https`.

```yaml
targets:
  - id: sentry-main
    product: sentry
    address: https://sentry.example.com
```

## Dlaczego strona logowania

Potwierdzone na żywo, anonimowo, na produkcyjnym samodzielnie hostowanym
26.2.1. Ten sam obiekt `version` ma też pole `latest` — własne sprawdzanie
aktualizacji Sentry — które **nie** jest używane: przy wyłączonym
sprawdzaniu było nieaktualne (`21.7.0`). Główny endpoint API `/api/0/`
również jest anonimowy, ale jego `"version":
"0"` to wersja API, a nie serwera; `/api/0/internal/health/` wymaga
uwierzytelnienia.

## Uwierzytelnianie

Brak — strona logowania jest publiczna, a sonda nie przyjmuje żadnego
rodzaju poświadczeń. Od wersji 2.2.0 poświadczenie przypisane do celu
`sentry` jest błędem konfiguracji, a nie jest po cichu ignorowane — zobacz
[Konfiguracja → Poświadczenia](/pl/configuration/#poświadczenia).

## Rejestrowane pola

- `version` — z `version.current`, np. `26.2.1`
- `extra.build` — commit git z `version.build`
- `extra.mode` — `sentryMode`, np. `SELF_HOSTED`

## Korelacja CVE

Dopasowywany do NVD, gdy skonfigurowano [blok `cve:`](/pl/cve/).
Wpisy „Sentry” w BDU dotyczą SDK, a nie serwera, i nie są używane.

## Resolver cyklu życia

`github:getsentry/self-hosted` — endoflife.date nie ma kalendarza dla
Sentry (potwierdzone 404), więc zamiast tego jest rozwiązywany przez
GitHub Releases: wyłącznie najnowszy opublikowany tag niebędący wydaniem
wstępnym (prerelease), bez dat eol/support/lts (GitHub nie ma zdania na
temat polityki cyklu życia, zna tylko „najnowsze wydanie”). Tagi wydań
getsentry/self-hosted (`26.8.0`, `26.9.0`, …) to wersje serwera, które
instaluje.
