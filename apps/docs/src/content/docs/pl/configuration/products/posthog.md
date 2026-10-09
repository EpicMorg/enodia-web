---
title: PostHog
description: Konfiguracja enodia do sondowania produktu PostHog.
---

Odczytuje anonimową stronę logowania, `GET /login`, samodzielnie
hostowanego PostHog. Strona osadza `window.POSTHOG_APP_CONTEXT = JSON.parse("{...}")` —
dokument JSON wewnątrz literału łańcuchowego JavaScript — a jego
`commit_sha` jest zgłaszany jako wersja. Domyślnym schematem jest `https`.

```yaml
targets:
  - id: posthog-main
    product: posthog
    address: https://posthog.example.com
```

## Commit git jest wersją

PostHog nie wydaje już numerowanych wydań: instalacja samodzielnie
hostowana (hobby) podąża za gałęzią główną, a jedynym ujawnianym
identyfikatorem jest commit, z którego ją zbudowano (potwierdzone na
żywo, anonimowo, na produkcyjnej instancji samodzielnie hostowanej). Dlatego
`version` jest tu hashem commita, np. `55babe9554`, a nie numerem wydania.
`/_preflight/` również jest anonimowy, ale zawiera tylko stan usług i realm;
`/api/instance_status` wymaga zalogowania.

## Uwierzytelnianie

Brak — strona logowania jest publiczna, a sonda nie przyjmuje żadnego
rodzaju poświadczeń. Od wersji 2.2.0 poświadczenie przypisane do celu
`posthog` jest błędem konfiguracji, a nie jest po cichu ignorowane — zobacz
[Konfiguracja → Poświadczenia](/pl/configuration/#poświadczenia).

## Rejestrowane pola

- `version` — commit git, np. `55babe9554`
- `extra.commit` — ten sam commit
- `extra.realm` — np. `hosted-clickhouse`, jeśli strona go zawiera

## Korelacja CVE

Brak dopasowania — żadna z baz nie ma dla niego użytecznych danych. Zobacz stronę [Korelacja CVE](/pl/cve/#które-produkty-są-dopasowywane).
Granice wersji PostHog w NVD to hashe commitów, których nie da się
porównać.

## Resolver cyklu życia

Brak — nie ma wydań, z którymi można by porównać commit. Ustalenie, o ile
commit jest w tyle za gałęzią główną, wymagałoby API porównań GitHuba,
czyli innego rodzaju resolvera niż którykolwiek z tych, które ma enodia;
nie zostało to zrobione. Wyłącznie do inwentarza.
