---
title: EuroLinux
description: Konfiguracja enodia do sondowania systemu EuroLinux przez SSH.
---

Należy do rodziny [identyfikacji systemów operacyjnych przez SSH](/pl/configuration/products/ssh-os-probes/)
— wspólny mechanizm, poświadczenia i weryfikację klucza hosta opisano na
tamtej stronie. Dopasowuje pole `ID` z `/etc/os-release`.

```yaml
targets:
  - id: eurolinux-host
    product: eurolinux
    address: host.example.com
    credentials: linux-host-ssh
```

Dla EuroLinux nie istnieje obraz Dockera — zamiast tego zweryfikowano na
rzeczywistym zrzucie rootfs z obrazu ISO (samego nośnika instalacyjnego,
zbadanego offline): `ID="eurolinux"`, `VERSION_ID="8.10"`.

## Korelacja CVE

Brak dopasowania — CVE dystrybucji ogólnego przeznaczenia to podatności pakietów, a numer wydania nie mówi, które pakiety załatano od tego czasu. Zobacz stronę [Korelacja CVE](/pl/cve/#które-produkty-są-dopasowywane).

## Resolver cyklu życia

`endoflife:eurolinux`.
