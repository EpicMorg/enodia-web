---
title: pfSense
description: Konfiguracja enodia do sondowania systemu pfSense Community Edition przez SSH.
---

Używa tego samego mechanizmu SSH, poświadczeń i weryfikacji klucza hosta co
rodzina [identyfikacji systemów operacyjnych przez SSH](/pl/configuration/products/ssh-os-probes/),
ale w jednym przebiegu odczytuje własne pliki pfSense `/etc/version`
i `/etc/platform`.

```yaml
targets:
  - id: pfsense-fw
    product: pfsense
    address: fw.example.com
    credentials: linux-host-ssh
```

## Uwierzytelnianie — wymagane

Poświadczenie SSH, `ssh-key` lub `password` — zobacz
[Konfiguracja → Poświadczenia](/pl/configuration/#poświadczenia).

## Tylko Community Edition

Potwierdzono na żywo na trzech prawdziwych hostach pfSense CE
(`2.7.2-RELEASE`, `2.8.1-RELEASE`): `/etc/version` zawiera dokładnie tę
wersję, którą pokazuje własny pulpit pfSense, a `/etc/platform` zawiera
`pfSense`.

Komercyjny **pfSense Plus** firmy Netgate to inny produkt z własnym,
opartym na kalendarzu schematem wersji (`24.11`, a nie `2.x.y-RELEASE`).
Według jego dokumentacji zgłasza on `pfSense-Plus` w `/etc/platform`; ta
sonda to odrzuca, zamiast zapisać host Plus jako fakt o CE. Żaden host
Plus nie był dostępny, by to potwierdzić na żywo — opiera się to
wyłącznie na dokumentacji.

## Rejestrowane pola

- `version` — `/etc/version` w niezmienionej postaci, np. `2.8.1-RELEASE`
- `extra.hostKeyVerified`

## Korelacja CVE

Dopasowywany do NVD i BDU FSTEC, gdy skonfigurowano [blok `cve:`](/pl/cve/). Od wersji 2.2. Sonda zgłasza
wyłącznie Community Edition, więc zakresy pfSense Plus w NVD
(`sw_edition: plus`) nigdy nie mają zastosowania — zobacz
[Dopasowywanie z uwzględnieniem edycji](/pl/cve/#dopasowywanie-z-uwzględnieniem-edycji).

## Resolver cyklu życia

Brak — endoflife.date nie ma strony pod `pfsense`, `pfsense-ce` ani
`pfsense-plus` (potwierdzone 404). Na razie wyłącznie do inwentarza.
