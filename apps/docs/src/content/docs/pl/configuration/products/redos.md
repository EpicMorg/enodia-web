---
title: RED OS
description: Konfiguracja enodia do sondowania systemu RED OS przez SSH.
---

Należy do rodziny [identyfikacji systemów operacyjnych przez SSH](/pl/configuration/products/ssh-os-probes/)
— wspólny mechanizm, poświadczenia i weryfikację klucza hosta opisano na
tamtej stronie. Dopasowuje pole `ID` z `/etc/os-release`.

```yaml
targets:
  - id: redos-host
    product: redos
    address: host.example.com
    credentials: linux-host-ssh
```

Zweryfikowano na żywo na `alrdockerhub/redos:7.3.1` (rzeczywista
zawartość RED OS — `HOME_URL`/`BUG_REPORT_URL` wskazują na red-soft.ru):
`ID="redos"`, `VERSION_ID="7.3.1"`.

## Korelacja CVE

Dopasowywany **według zainstalowanych pakietów** do własnego OVAL RED OS dla 7.3 lub 8.0 (`redos.xml` z `redos.red-soft.ru/support/secure/<7.3|8.0>/`, w `cve.oval.path`) — dane RHEL nie mają tu zastosowania, ponieważ wersje pakietów RED OS są jego własne (`.el7` w 7.3, `.red80` w 8.0). Wydanie jest dopasowywane według major.minor wersji. Sonda wyświetla też listę zainstalowanych pakietów binarnych (`rpm -qa`, ze strumieniem modułu AppStream każdego pakietu) i odczytuje `uname -r`/`-m`/`-v` w tym samym przebiegu SSH — zapisywane jako `packages` i `modules` obserwacji oraz `extra.kernelRelease`, `extra.arch`, `extra.kernelVersion`. Spośród kilku zainstalowanych jąder porównywane jest to działające. Znaleziska prowadzą do biuletynów `ROS-…` RED OS i niosą własną ważność dostawcy. Zobacz stronę [Korelacja CVE](/pl/cve/#cve-na-poziomie-pakietów-dla-dystrybucji-linuksa).

## Resolver cyklu życia

Brak — endoflife.date nie ma obecnie kalendarza dla RED OS. Wyłącznie do inwentarza.
