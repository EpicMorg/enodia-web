---
title: Fortinet FortiOS (FortiGate)
description: Konfiguracja enodia do sondowania urządzenia Fortinet FortiGate z systemem FortiOS.
---

Odczytuje `GET /api/v2/monitor/system/status` — własne REST API FortiOS.
Zweryfikowano na rzeczywistym urządzeniu FortiGate 601E z FortiOS 7.4.12.

```yaml
targets:
  - id: fw-edge
    product: fortios
    address: https://fw.example.com
    credentials: fortigate-api
```

## Uwierzytelnianie — wymagane

Token **REST API Admin**: należy utworzyć REST API Admin w GUI FortiGate
(System → Administrators) i skopiować wygenerowany klucz API — FortiOS
pokazuje go tylko raz. Jest wysyłany jako zwykły token bearer; bez
logowania sesyjnego, bez tokenu CSRF, bez parametru zapytania
`access_token`:

```yaml
credentials:
  fortigate-api:
    kind: bearer
    value: "${FORTIGATE_API_TOKEN}"
```

Brakujący lub błędny token daje odpowiedź `401` (ze stroną błędu w HTML,
a nie JSON) — zgłaszaną jako błąd uwierzytelniania, jak w każdej innej
sondzie. W samym FortiOS można ograniczyć REST API Admin do zaufanych
hostów; w takim przypadku należy uwzględnić adres, z którego łączy się
enodia.

## Rejestrowane pola

- `version` — w postaci zgłaszanej przez FortiOS, np. `v7.4.12` (wiodące
  `v` jest usuwane przy porównywaniu, a nie przy zapisie)
- `extra.model` — np. `FG6H1E` (601E)
- `extra.build` — numer kompilacji FortiOS

Nazwa hosta urządzenia znajduje się w tej samej odpowiedzi, ale celowo nie
jest zapisywana.

## Korelacja CVE

Dopasowywany do NVD i BDU FSTEC, gdy skonfigurowano [blok `cve:`](/pl/cve/).

## Resolver cyklu życia

`endoflife:fortios`. Strona FortiOS w endoflife.date zawiera cykle wydań
i daty, ale dla żadnego cyklu nie podaje „najnowszej wersji”, więc oś cyklu
życia działa, a `drift` pokazuje `LATEST: -` i `PATCH: unknown` — to luka
w danych źródłowych, a nie błąd sondy.
