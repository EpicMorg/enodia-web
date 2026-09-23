---
title: OPNsense
description: Konfiguracja enodia do sondowania systemu OPNsense przez SSH.
---

Używa tego samego mechanizmu SSH, poświadczeń i weryfikacji klucza hosta co
rodzina [identyfikacji systemów operacyjnych przez SSH](/pl/configuration/products/ssh-os-probes/),
ale uruchamia `opnsense-version` zamiast odczytywać plik.

```yaml
targets:
  - id: opnsense-host
    product: opnsense
    address: host.example.com
    credentials: linux-host-ssh
```

## Dlaczego polecenie, a nie plik

OPNsense działa na bazie FreeBSD bez żadnego `/etc/os-release`, a jego
rzeczywista wersja jest rozdzielona między kilka plików komponentów
w `/usr/local/opnsense/version/` (base, kernel, core, pkgs) — nie ma
jednego oczywistego pliku tożsamości. `opnsense-version` to własny
wrapper OPNsense, który odczytuje właściwy plik i wypisuje całość w jednym
wierszu. Zweryfikowano na żywo na prawdziwej instancji OPNsense 26.7,
uruchomionej przez `vmactions/opnsense-vm`: `"OPNsense 26.7 (amd64)"`.

## Rejestrowane pola

- `version` — wyodrębniona z wyjścia `opnsense-version`
- `extra.hostKeyVerified`

## Korelacja CVE

Dopasowywany do NVD i BDU FSTEC, gdy skonfigurowano [blok `cve:`](/pl/cve/).

## Resolver cyklu życia

`endoflife:opnsense`.
