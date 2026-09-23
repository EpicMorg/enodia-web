---
title: WordPress
description: Konfiguracja enodia do sondowania produktu WordPress.
---

Próbuje kolejno dwóch anonimowych powierzchni i używa tej, która
odpowie jako pierwsza:

1. Wiersza `<generator>` z kanału RSS (`/?feed=rss2` — postać z ciągiem
   zapytania, która działa niezależnie od tego, czy skonfigurowano
   „ładne” permalinki).
2. Znacznika `<meta name="generator" content="WordPress X.Y.Z" />` ze
   strony głównej (`/`).

```yaml
targets:
  - id: wordpress-main
    product: wordpress
    address: https://blog.example.com
```

## Uwierzytelnianie

Brak — endpoint nie przyjmuje żadnego rodzaju poświadczeń.

## Dlaczego najpierw sprawdzany jest kanał

Kanał przetrwa najpopularniejszy krok utwardzania: WordPress rejestruje
swój znacznik generatora w hookach kanału niezależnie od akcji `wp_head`
strony głównej, więc jednowierszowy fragment `remove_action('wp_head',
'wp_generator')`, podawany w każdym poradniku „jak ukryć wersję
WordPressa”, usuwa tylko znacznik ze strony głównej, a nie z kanału —
potwierdzono to, czytając rejestracje hooków w samym WordPressie, a nie
zakładając. Witryna, która poszła dalej i całkowicie wyłączyła kanały lub
usunęła oba sygnały, kończy się jasnym błędem „not supported”.

## Rejestrowane pola

Tylko `version` — ta sonda nie zapisuje żadnych pól `extra`.

## Korelacja CVE

Dopasowywany do NVD i BDU FSTEC, gdy skonfigurowano [blok `cve:`](/pl/cve/).

## Resolver cyklu życia

`endoflife:wordpress`.
