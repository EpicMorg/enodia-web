---
title: code-server
description: Konfiguracja enodia do sondowania produktu code-server.
---

Odczytuje anonimowo `GET /login`. Domyślnym schematem jest `https`. Strona
logowania osadza `<meta id="coder-options" data-settings="{...}">` — JSON
zakodowany jako encje HTML — a jego `codeServerVersion` to wersja serwera;
sonda dekoduje encje atrybutu, a następnie sam JSON.

```yaml
targets:
  - id: code-main
    product: code-server
    address: https://code.example.com
```

## Dlaczego strona logowania

Własny `/version` code-servera wymaga hasła, a `/healthz` nie zawiera
wersji. Strona logowania jest dostępna bez logowania i zawiera te same
opcje, z którymi uruchamiany jest edytor. Strona bez elementu
`coder-options` jest zgłaszana jako nieobsługiwana (to nie code-server).

## Uwierzytelnianie

Brak — sonda odczytuje anonimową stronę i nie przyjmuje żadnego rodzaju
poświadczeń. Od wersji 2.2.0 poświadczenie skonfigurowane dla tego celu
jest błędem konfiguracji, a nie jest ignorowane; zobacz
[Konfiguracja → Poświadczenia](/pl/configuration/#poświadczenia).

## Rejestrowane pola

Tylko `version` — np. `4.141.0` (potwierdzone na żywo na
`codercom/code-server:latest`, którego `code-server --version` podało
4.141.0 z Code 1.141.0). Ta sonda nie zapisuje żadnych pól `extra`.

## Korelacja CVE

Dopasowywany do NVD, gdy skonfigurowano [blok `cve:`](/pl/cve/).

## Resolver cyklu życia

`github:coder/code-server` — endoflife.date nie ma kalendarza dla
code-server (potwierdzone 404), więc zamiast tego jest rozwiązywany przez
GitHub Releases: wyłącznie najnowszy opublikowany tag niebędący wydaniem
wstępnym (prerelease), bez dat eol/support/lts (GitHub nie ma zdania na
temat polityki cyklu życia, zna tylko „najnowsze wydanie”).
