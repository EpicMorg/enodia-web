---
title: Debian
description: Konfiguracja enodia do sondowania systemu Debian przez SSH.
---

Używa tego samego mechanizmu SSH, poświadczeń i weryfikacji klucza hosta co
rodzina [identyfikacji systemów operacyjnych przez SSH](/pl/configuration/products/ssh-os-probes/),
ale — od wersji 1.1.1 — nie jest już częścią opisanego tam wspólnego
mechanizmu `osReleaseFamilyProbe`; zobacz poniżej.

```yaml
targets:
  - id: debian-host
    product: debian
    address: host.example.com
    credentials: linux-host-ssh
```

## Własna sonda zamiast wspólnej sondy os-release od wersji 1.1.1

`VERSION_ID` w `/etc/os-release` Debiana nigdy nie zawiera wydania
punktowego — potwierdzono na żywo, że w pełni zaktualizowana instalacja
Debiana 13 nadal zgłasza samo `VERSION_ID="13"`, identycznie jak instalacja
z pierwszego dnia. Prawdziwe wydanie punktowe (`13.6`) znajduje się tylko
w `/etc/debian_version`. Temu plikowi nie można jednak ufać samodzielnie:
potwierdzono na żywo, że rzeczywisty obraz Ubuntu 24.04 również go zawiera,
odziedziczony po swoim rodowodzie budowania, z treścią `trixie/sid` — bez
znaczenia dla wersji samego Ubuntu. Ta sonda odczytuje oba pliki w jednym
przebiegu SSH, najpierw potwierdza `ID=debian` i ufa zawartości
`debian_version` tylko wtedy, gdy jest to zwykły numer z kropkami — własna
kopia Debiana testing (`forky/sid`) oraz odziedziczona kopia Ubuntu
poprawnie przechodzą wtedy do `VERSION_ID`.

Zweryfikowano na żywo na `debian:bookworm-slim`: `ID=debian`,
`VERSION_ID="12"`.

## Rejestrowane pola

- `version` — wydanie punktowe, gdy `/etc/debian_version` je zawiera, np.
  `13.6`; w przeciwnym razie samo `VERSION_ID`
- `extra.debianVersion` — surowa zawartość `/etc/debian_version`, zawsze
  gdy plik istnieje i nie jest pusty, nawet jeśli nie był to zwykły numer
  z kropkami (jak w przypadku `forky/sid` z Debiana testing — warto go
  zobaczyć w oryginalnej postaci, zamiast go po cichu pomijać)
- `extra.codename` — `VERSION_CODENAME` z os-release, które wybiera
  wydanie w trackerze
- `extra.kernel` — wersja działającego jądra w Debianie, z `uname -v`
- `packages` — zainstalowane pakiety źródłowe i ich wersje (zobacz niżej)
- `extra.hostKeyVerified`

## Korelacja CVE

Dopasowywany **według zainstalowanych pakietów** do Debian Security Tracker (`cve.debian.path`), a nie według wydania. Sonda odczytuje zainstalowane pakiety *źródłowe* (`source:Package`/`source:Version` z `dpkg-query` — własny klucz trackera) oraz wersję działającego jądra w Debianie (z `uname -v`) w tym samym przebiegu SSH co samą wersję. Zgłaszane są tylko CVE, które Debian już naprawił w wersji nowszej niż zainstalowana, jedno znalezisko na pakiet źródłowy, z linkiem do jego strony w trackerze. Tracker obejmuje tylko wydania nadal wspierane przez zespół bezpieczeństwa Debiana (bookworm, trixie, testing, sid); starsze hosty nie otrzymują znalezisk pakietów. Host Proxmox VE jest obejmowany celem `debian` takim jak ten — zobacz stronę [Korelacja CVE](/pl/cve/#cve-na-poziomie-pakietów-dla-dystrybucji-linuksa).

## Resolver cyklu życia

`endoflife:debian` — bez zmian.
