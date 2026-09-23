---
title: CentOS Stream
description: Konfiguracja enodia do sondowania systemu CentOS Stream przez SSH.
---

Należy do rodziny [identyfikacji systemów operacyjnych przez SSH](/pl/configuration/products/ssh-os-probes/)
— wspólny mechanizm, poświadczenia i weryfikację klucza hosta opisano na
tamtej stronie.

```yaml
targets:
  - id: centos-stream-host
    product: centos-stream
    address: host.example.com
    credentials: linux-host-ssh
```

## Weryfikacja tożsamości producenta — więcej niż samo dopasowanie `ID`

Zweryfikowano na żywo na `quay.io/centos/centos:stream9`: `/etc/os-release`
zgłasza `ID="centos"` — **to samo `ID`, którego używa starszy, wycofany
(EOL) [CentOS Linux](/pl/configuration/products/centos/)** — dlatego ten
produkt sprawdza również `NAME="CentOS Stream"`, czyli pole, które
faktycznie je rozróżnia. `product: centos-stream` wskazany na starszy host
CentOS 7 (lub odwrotnie) nie przechodzi weryfikacji tożsamości, zamiast
zostać zapisanym pod niewłaściwym produktem.

## Rejestrowane pola

Tak jak w pozostałej części rodziny: `version` z `VERSION_ID` oraz
`extra.hostKeyVerified`.

## Korelacja CVE

Brak dopasowania — CVE dystrybucji ogólnego przeznaczenia to podatności pakietów, a numer wydania nie mówi, które pakiety załatano od tego czasu. Zobacz stronę [Korelacja CVE](/pl/cve/#które-produkty-są-dopasowywane).

## Resolver cyklu życia

`endoflife:centos-stream`.
