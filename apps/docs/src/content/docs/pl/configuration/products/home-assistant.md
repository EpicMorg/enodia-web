---
title: Home Assistant
description: Konfiguracja enodia do sondowania produktu Home Assistant.
---

Odczytuje `GET /api/config` z REST API Home Assistant, przy użyciu
długoterminowego tokenu dostępu (long-lived access token). Jako `product:`
akceptowany jest również alias `homeassistant`.

```yaml
targets:
  - id: home-assistant-main
    product: home-assistant
    address: https://home-assistant.example.com
    credentials: ha-token
```

## Uwierzytelnianie — wymagane

Nic anonimowego nie zawiera wersji Home Assistant: `/api/` i
`/api/config` odpowiadają `401`, a `/manifest.json`, `/auth/providers`
i endpointy onboardingu nie zawierają jej wcale (potwierdzone na żywo na
`ghcr.io/home-assistant/home-assistant:stable` 2026.10.0). Udokumentowanym
sposobem uwierzytelniania w REST API jest długoterminowy token dostępu
(Profile → Security → Long-lived access tokens), wysyłany jako
`Authorization: Bearer`:

```yaml
credentials:
  ha-token:
    kind: bearer
    value: "${HOME_ASSISTANT_TOKEN}"
```

Akceptowany jest tylko `bearer`; każdy inny rodzaj jest błędem
konfiguracji. Zobacz
[Konfiguracja → Poświadczenia](/pl/configuration/#poświadczenia).

## Co jest odczytywane

`/api/config` zwraca też współrzędne domu, ścieżki i adresy URL. Nic
z tego nie jest odczytywane — tylko `version`, `state` oraz flagi trybu
bezpiecznego/odzyskiwania.

## Rejestrowane pola

- `version` — np. `2026.10.0`
- `extra.state` — np. `RUNNING`
- `extra.recoveryMode` — `true`, gdy Home Assistant zgłasza tryb
  bezpieczny lub tryb odzyskiwania; w przeciwnym razie nieobecne

## Korelacja CVE

Dopasowywany do NVD, gdy skonfigurowano [blok `cve:`](/pl/cve/).

## Resolver cyklu życia

`github:home-assistant/core` — endoflife.date nie ma kalendarza dla Home
Assistant (potwierdzone 404), więc zamiast tego jest rozwiązywany przez
GitHub Releases: wyłącznie najnowszy opublikowany tag niebędący wydaniem
wstępnym (prerelease), bez dat eol/support/lts (GitHub nie ma zdania na
temat polityki cyklu życia, zna tylko „najnowsze wydanie”). Wydanie,
którego tag wskazuje na wersję wstępną (`2026.10.0b7`), jest pomijane,
nawet jeśli GitHub go tak nie oznacza.
