---
title: Rocky Linux
description: Konfiguracja enodia do sondowania systemu Rocky Linux przez SSH.
---

Należy do rodziny [identyfikacji systemów operacyjnych przez SSH](/pl/configuration/products/ssh-os-probes/)
— wspólny mechanizm, poświadczenia i weryfikację klucza hosta opisano na
tamtej stronie. Dopasowuje pole `ID` z `/etc/os-release`.

```yaml
targets:
  - id: rocky-host
    product: rocky-linux
    address: host.example.com
    credentials: linux-host-ssh
```

Zweryfikowano na żywo na `rockylinux:9`: `ID="rocky"` — własna wartość
`ID` z os-release Rocky, różna od nazwy `product:` — oraz
`VERSION_ID="9.3"`.

## Korelacja CVE

Dopasowywany **według zainstalowanych pakietów** do OVAL **Red Hat** (`rhel-<N>.oval.xml.bz2`, w `cve.oval.path`) — Rocky przebudowuje pakiety Red Hata z tymi samymi wersjami, a własny plik OVAL Rocky jest odrzucany (zawiera niewielki ułamek biuletynów Rocky i nie przechodzi walidacji schematu OVAL). Sonda wyświetla też listę zainstalowanych pakietów binarnych (`rpm -qa`, ze strumieniem modułu AppStream każdego pakietu) i odczytuje `uname -r`/`-m`/`-v` w tym samym przebiegu SSH — zapisywane jako `packages` i `modules` obserwacji oraz `extra.kernelRelease`, `extra.arch`, `extra.kernelVersion`. Spośród kilku zainstalowanych jąder porównywane jest to działające. Zgłaszane są tylko CVE z poprawką nowszą niż zainstalowana wersja, jedno znalezisko na pakiet. Część z nich pochodzi z poprawek, które Red Hat wydał jako biuletyny naprawy błędów (RHBA), których `dnf updateinfo --security` nie wyświetla. Zobacz stronę [Korelacja CVE](/pl/cve/#cve-na-poziomie-pakietów-dla-dystrybucji-linuksa).

## Resolver cyklu życia

`endoflife:rocky-linux`.
