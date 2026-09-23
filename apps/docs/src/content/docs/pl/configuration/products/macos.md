---
title: macOS
description: Konfiguracja enodia do sondowania systemu macOS przez SSH.
---

Używa tego samego mechanizmu SSH, poświadczeń i weryfikacji klucza hosta co
rodzina [identyfikacji systemów operacyjnych przez SSH](/pl/configuration/products/ssh-os-probes/),
ale uruchamia `sw_vers` — standardowy, udokumentowany sposób odczytania
tożsamości systemu Maca — zamiast odczytywać plik.

```yaml
targets:
  - id: mac-host
    product: macos
    address: host.example.com
    credentials: linux-host-ssh
```

## Dlaczego `sw_vers`, a nie `uname -a`

`uname -a` w Darwinie podaje w swoim wyjściu nazwę hosta maszyny — coś,
czego ta sonda nie ma powodu widzieć ani przechowywać. Trzywierszowe
wyjście `ProductName`/`ProductVersion`/`BuildVersion` z `sw_vers` nie
zawiera niczego takiego. Zweryfikowano na żywo na prawdziwym Macu
(macOS 15.4, `BuildVersion 24E248`, przez SSH) — licencja EULA Apple
ogranicza wirtualizację macOS do oryginalnego sprzętu Apple, więc był to
jedyny produkt w całej rodzinie SSH, który wymagał prawdziwego, fizycznego
Maca zamiast kontenera czy obrazu maszyny wirtualnej do pobrania.

Rozpoznawany jest tylko `ProductName: macOS` (od 10.12 Sierra) — starsze
wydania zgłaszały zamiast tego `"Mac OS X"`, czego nigdy nie potwierdzono
na żywo na prawdziwym systemie, więc jest to traktowane jako
nieobsługiwane, zamiast zgadywać.

## Rejestrowane pola

- `version` — z `ProductVersion`
- `extra.buildVersion` — z `BuildVersion`, jeśli występuje
- `extra.hostKeyVerified`

## Korelacja CVE

Dopasowywany do NVD i BDU FSTEC, gdy skonfigurowano [blok `cve:`](/pl/cve/).

## Resolver cyklu życia

`endoflife:macos`.
