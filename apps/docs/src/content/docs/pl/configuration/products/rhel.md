---
title: Red Hat Enterprise Linux
description: Konfiguracja enodia do sondowania systemu RHEL przez SSH.
---

Należy do rodziny [identyfikacji systemów operacyjnych przez SSH](/pl/configuration/products/ssh-os-probes/)
— wspólny mechanizm, poświadczenia i weryfikację klucza hosta opisano na
tamtej stronie. Dopasowuje pole `ID` z `/etc/os-release`.

```yaml
targets:
  - id: rhel-host
    product: rhel
    address: host.example.com
    credentials: linux-host-ssh
```

Zweryfikowano na żywo na `registry.redhat.io/ubi9` (darmowy Universal
Base Image od Red Hat): `ID=rhel`, `VERSION_ID="9.8"`.

## Korelacja CVE

Dopasowywany **według zainstalowanych pakietów** do OVAL Red Hat dla głównego wydania hosta (`rhel-<N>.oval.xml.bz2`, w `cve.oval.path`), a nie według wydania. Sonda wyświetla też listę zainstalowanych pakietów binarnych (`rpm -qa`, ze strumieniem modułu AppStream każdego pakietu) i odczytuje `uname -r`/`-m`/`-v` w tym samym przebiegu SSH — zapisywane jako `packages` i `modules` obserwacji oraz `extra.kernelRelease`, `extra.arch`, `extra.kernelVersion`. Spośród kilku zainstalowanych jąder porównywane jest to działające. Zgłaszane są tylko CVE z poprawką nowszą niż zainstalowana wersja, jedno znalezisko na pakiet, z linkiem do jego RHSA. Zobacz stronę [Korelacja CVE](/pl/cve/#cve-na-poziomie-pakietów-dla-dystrybucji-linuksa).

## Resolver cyklu życia

`endoflife:rhel`.
