---
title: Ubuntu
description: Konfiguracja enodia do sondowania systemu Ubuntu przez SSH.
---

Używa tego samego mechanizmu SSH, poświadczeń i weryfikacji klucza hosta co
rodzina [identyfikacji systemów operacyjnych przez SSH](/pl/configuration/products/ssh-os-probes/),
ale — od wersji 1.1.1 — nie jest już częścią opisanego tam wspólnego
mechanizmu `osReleaseFamilyProbe`; zobacz poniżej.

```yaml
targets:
  - id: ubuntu-host
    product: ubuntu
    address: host.example.com
    credentials: linux-host-ssh
```

## Własna sonda zamiast wspólnej sondy os-release od wersji 1.1.1

`VERSION_ID` w `/etc/os-release` Ubuntu celowo nigdy nie zmienia się po
opublikowaniu wydania — potwierdzono na żywo (od `14.04` do `24.10`):
w pełni zaktualizowany host `22.04`, kilka wydań punktowych i nowych
nośników instalacyjnych później, nadal zgłasza `VERSION_ID="22.04"`, a nie
`22.04.5`. Wydanie punktowe istnieje tylko w polu `VERSION` tego samego
pliku (`VERSION="22.04.5 LTS (Jammy Jellyfish)"`) i tylko dla wydania LTS,
które doczekało się więcej niż jednego — `VERSION` wydania innego niż LTS
w ogóle nie zawiera dodatkowego segmentu (potwierdzone na żywo:
`VERSION="24.10 (Oracular Oriole)"`, dokładnie zgodne z `VERSION_ID`). Ta
sonda preferuje numer z `VERSION` zamiast `VERSION_ID` zawsze, gdy jest on
ściśle dokładniejszy i ma ten sam prefiks major.minor — bez drugiego pliku
do odczytania, w przeciwieństwie do poprawki
[Debiana](/pl/configuration/products/debian/) dla tej samej luki, ponieważ
precyzja jest już w tym samym pliku, tylko w innym polu. Każdy inny
produkt ze wspólnej rodziny os-release został sprawdzony w ten sam sposób;
żaden z pozostałych nie ma tej luki.

Zweryfikowano na żywo na `ubuntu:24.04`: `ID=ubuntu`, `VERSION_ID="24.04"`.

## Rejestrowane pola

- `version` — precyzyjne wydanie punktowe, gdy `VERSION` je zawiera, np.
  `22.04.5`; w przeciwnym razie samo `VERSION_ID`
- `extra.hostKeyVerified`

## Korelacja CVE

Brak dopasowania — CVE dystrybucji ogólnego przeznaczenia to podatności pakietów, a numer wydania nie mówi, które pakiety załatano od tego czasu. Zobacz stronę [Korelacja CVE](/pl/cve/#które-produkty-są-dopasowywane).

## Resolver cyklu życia

`endoflife:ubuntu` — bez zmian.
