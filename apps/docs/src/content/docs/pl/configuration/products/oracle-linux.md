---
title: Oracle Linux
description: Konfiguracja enodia do sondowania systemu Oracle Linux przez SSH.
---

Należy do rodziny [identyfikacji systemów operacyjnych przez SSH](/pl/configuration/products/ssh-os-probes/)
— wspólny mechanizm, poświadczenia i weryfikację klucza hosta opisano na
tamtej stronie. Dopasowuje pole `ID` z `/etc/os-release`.

```yaml
targets:
  - id: oraclelinux-host
    product: oracle-linux
    address: host.example.com
    credentials: linux-host-ssh
```

Zweryfikowano na żywo na `oraclelinux:9`: `ID="ol"` — własna wartość
`ID` z os-release Oracle, różna od nazwy `product:` — oraz
`VERSION_ID="9.8"`.

## Korelacja CVE

Dopasowywany **według zainstalowanych pakietów** do OVAL Oracle (`com.oracle.elsa-ol<N>.xml.bz2`, w `cve.oval.path`), a nie według wydania. Sonda wyświetla też listę zainstalowanych pakietów binarnych (`rpm -qa`, ze strumieniem modułu AppStream każdego pakietu) i odczytuje `uname -r`/`-m`/`-v` w tym samym przebiegu SSH — zapisywane jako `packages` i `modules` obserwacji oraz `extra.kernelRelease`, `extra.arch`, `extra.kernelVersion`. Spośród kilku zainstalowanych jąder porównywane jest to działające. Osobne gałęzie x86_64 i aarch64 Oracle są dopasowywane według `uname -m`, a przebudowy FIPS i Ksplice są dopasowywane tylko do poprawek własnego wariantu. Zgłaszane są tylko CVE z poprawką nowszą niż zainstalowana wersja, jedno znalezisko na pakiet, z linkiem do jego ELSA. Zobacz stronę [Korelacja CVE](/pl/cve/#cve-na-poziomie-pakietów-dla-dystrybucji-linuksa).

## Resolver cyklu życia

`endoflife:oracle-linux`.
