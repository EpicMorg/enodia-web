---
title: ClickHouse
description: Konfiguracja enodia do sondowania produktu ClickHouse.
---

Wykonuje `SELECT version()` przez interfejs HTTP ClickHouse (domyślnie
port 8123) i odczytuje odpowiedź w postaci zwykłego tekstu.

```yaml
targets:
  - id: clickhouse-main
    product: clickhouse
    address: https://clickhouse.example.com:8123
```

## Uwierzytelnianie

Opcjonalne. Nowsze obrazy w ogóle wymagają ustawienia `CLICKHOUSE_PASSWORD`
— w przeciwieństwie do starszych instalacji nie ma pustego hasła
domyślnego użytkownika, na które można by się zdać — więc
nieuwierzytelnione żądanie do zabezpieczonej instancji otrzymuje zwykłe
`401`, obsługiwane tak samo jak w każdej innej sondzie:

```yaml
credentials:
  clickhouse-default:
    kind: basic
    username: default
    password: "${CLICKHOUSE_PASSWORD}"
```

To, czy dane wdrożenie w ogóle wymaga poświadczeń, zależy wyłącznie od
sposobu jego skonfigurowania.

## Rejestrowane pola

Tylko `version` — ta sonda nie zapisuje żadnych pól `extra`.

## Korelacja CVE

Dopasowywany do NVD i BDU FSTEC, gdy skonfigurowano [blok `cve:`](/pl/cve/).

## Resolver cyklu życia

`endoflife:clickhouse`.
