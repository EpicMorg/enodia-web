---
title: Perforce Helix Swarm
description: Konfiguracja enodia do sondowania produktu Perforce Helix Swarm.
---

Odczytuje wersję z `GET /api/version` — celowo ze ścieżki bez numeru
wersji zamiast konkretnej `/api/v11/version`. Perforce przez lata
przesuwał minimalną wersję tego API (Swarm 2017.3 obsługuje tylko v7;
2018.2 obsługuje v9), a żądanie `vN` spoza zakresu otrzymuje `401` na
endpoincie, który poza tym jest w pełni anonimowy. Postać bez numeru
wersji pozwala uniknąć zgadywania, które `vN` dana instalacja wciąż
akceptuje.

```yaml
targets:
  - id: swarm-main
    product: perforce-swarm
    address: https://swarm.example.com
```

## Uwierzytelnianie

Brak — endpoint nie przyjmuje żadnego rodzaju poświadczeń.

## Parsowanie wersji

Surowe pole wygląda tak: `SWARM/2024.6/2710109 (2025/01/28)` — jest ono
parsowane na zwykłą wersję (`2024.6`), changelist i datę wydania.
Nierozpoznany format powoduje zachowanie surowego ciągu jako `version`,
zamiast kończyć się błędem, ponieważ nadal jest to fakt zgłoszony przez
serwer.

## Rejestrowane pola

- `version` — np. `2024.6`
- `extra.raw` — pełny, nieparsowany ciąg
- `extra.changelist`, `extra.releaseDate` — tylko gdy format został
  sparsowany

## Korelacja CVE

Brak dopasowania — żadna z baz nie ma dla niego użytecznych danych. Zobacz stronę [Korelacja CVE](/pl/cve/#które-produkty-są-dopasowywane).

## Resolver cyklu życia

Brak — endoflife.date nie ma kalendarza pod `perforce-swarm`,
`helix-swarm`, `swarm` ani `perforce` (wszystkie potwierdzone 404).
Na razie wyłącznie do inwentarza.
