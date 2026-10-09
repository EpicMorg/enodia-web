---
title: Greenbone / OpenVAS
description: Konfiguracja enodia do sondowania produktu Greenbone / OpenVAS.
---

Odczytuje wersję gsad — demona WWW Greenbone Security Assistant stojącego
przed OpenVAS — z `GET /gmp`. Domyślnym schematem jest `https`.
Jako aliasy akceptowane są `product: openvas` i `product: gsad`.

```yaml
targets:
  - id: greenbone-main
    product: greenbone
    address: https://greenbone.example.com
```

## Dlaczego 401 z `/gmp`

gsad opakowuje każdą odpowiedź `/gmp` w kopertę zawierającą jego wersję,
łącznie z odpowiedzią 401 na żądanie bez sesji:
`<envelope><version>24.12.0</version><vendor_version></vendor_version>…`
(„Authentication required … (GSA 24.12.0)”). Sonda akceptuje tę odpowiedź
401 i odczytuje kopertę. Sam interfejs WWW to statyczny pakiet React bez
żadnej wersji.

Wersja należy do gsad. Skaner (openvas-scanner) i gvmd za nim mają
własne, odrębne wersje i nie są widoczne bez zalogowania.

## Uwierzytelnianie

Brak — endpoint nie przyjmuje żadnego rodzaju poświadczeń.

## Rejestrowane pola

- `version` — np. `24.12.0`, z `<envelope><version>`
- `extra.vendorVersion` — `<vendor_version>`, gdy nie jest puste

## Korelacja CVE

Dopasowywany do NVD, gdy skonfigurowano [blok `cve:`](/pl/cve/) — jako
gsad (`greenbone_security_assistant`), a nie demon `openvas_manager`.

## Resolver cyklu życia

`github:greenbone/gsad` — endoflife.date nie ma kalendarza dla Greenbone
(potwierdzone 404), więc zamiast tego jest rozwiązywany przez GitHub
Releases: wyłącznie najnowszy opublikowany tag niebędący wydaniem wstępnym
(prerelease), bez dat eol/support/lts (GitHub nie ma zdania na temat
polityki cyklu życia, zna tylko „najnowsze wydanie”).
