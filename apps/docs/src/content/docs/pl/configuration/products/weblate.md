---
title: Weblate
description: Konfiguracja enodia do sondowania produktu Weblate.
---

Odczytuje anonimowo `GET /about/`. Domyślnym schematem jest `https`.

```yaml
targets:
  - id: weblate-main
    product: weblate
    address: https://weblate.example.com
```

## Skąd pochodzi wersja

Stopka każdej strony Weblate brzmi `Powered by <a href="https://weblate.org/">Weblate 2026.10</a>`,
a jej link do dokumentacji wskazuje na `docs.weblate.org/en/weblate-2026.10/`.
Sonda najpierw odczytuje stopkę, a link do dokumentacji — jeśli stopka
została usunięta przez dostosowanie; strona bez żadnego z nich jest
zgłaszana jako nieobsługiwana. Odczytywany jest `/about/`, ponieważ istnieje
w każdym Weblate; witryna z `REQUIRE_LOGIN` przekierowuje go na stronę
logowania, która zawiera tę samą stopkę. Główny endpoint REST API (`/api/`)
również jest anonimowy, ale nie zawiera wersji, a `/api/metrics/` wymaga
tokenu.

Po 5.x Weblate przeszedł na wersje kalendarzowe (`2026.9`, `2026.9.1`,
`2026.10`); obie postacie są parsowane.

## Uwierzytelnianie

Brak — sonda odczytuje anonimową stronę i nie przyjmuje żadnego rodzaju
poświadczeń. Od wersji 2.2.0 poświadczenie skonfigurowane dla tego celu
jest błędem konfiguracji, a nie jest ignorowane; zobacz
[Konfiguracja → Poświadczenia](/pl/configuration/#poświadczenia).

## Rejestrowane pola

Tylko `version` — np. `2026.10` (potwierdzone na żywo na
`weblate/weblate:latest`). Ta sonda nie zapisuje żadnych pól `extra`.

## Korelacja CVE

Dopasowywany do NVD, gdy skonfigurowano [blok `cve:`](/pl/cve/).

## Resolver cyklu życia

`github:WeblateOrg/weblate` — endoflife.date nie ma kalendarza dla Weblate
(potwierdzone 404), więc zamiast tego jest rozwiązywany przez GitHub
Releases: wyłącznie najnowszy opublikowany tag niebędący wydaniem wstępnym
(prerelease), bez dat eol/support/lts (GitHub nie ma zdania na temat
polityki cyklu życia, zna tylko „najnowsze wydanie”). Weblate oznacza
swoje wydania tagami `weblate-2026.10`; od wersji 2.2.0 resolver usuwa
z tagów wydań początkowe `<repo>-` lub `<repo>_`, więc LATEST i CYCLE
mają wartość `2026.10`.
