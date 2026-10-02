---
title: Supermicro BMC
description: Konfiguracja enodia do sondowania kontrolera Supermicro BMC przez Redfish.
---

Odczytuje `GET /redfish/v1/Managers/1` — własny zasób menedżera Redfish
kontrolera BMC — aby uzyskać wersję firmware.

```yaml
targets:
  - id: srv125-bmc
    product: supermicro-bmc
    address: https://bmc-srv125.example.com
    credentials: bmc-admin
```

## Uwierzytelnianie — wymagane

Uwierzytelnianie HTTP Basic; bez niego endpoint odpowiada `401`
(potwierdzone na żywo).

```yaml
credentials:
  bmc-admin:
    kind: basic
    username: ADMIN
    password: "${BMC_PASSWORD}"
```

Wystarczy konto BMC tylko do odczytu. Kontrolery BMC zwykle udostępniają
certyfikat z podpisem własnym — zamiast wyłączać weryfikację, należy go
przypiąć, zobacz [Konfiguracja → TLS](/pl/configuration/#tls-tls).

## Weryfikacja tożsamości producenta

Potwierdzono na żywo na dwóch generacjach — płycie z serii X12
(AST2600, firmware `01.05.25`) i starszej z ery X9/X10 (firmware
`01.73.13`). Żadna z nich nie zawiera pola producenta, które ta sonda
mogłaby odczytać w jednym żądaniu, ale obie zawierają klucz
`Oem.Supermicro` w tym właśnie zasobie, więc to on jest sprawdzany. BMC
innego producenta odpowiadający pod tą samą ścieżką kończy się błędem,
zamiast zostać zapisanym jako Supermicro.

## Rejestrowane pola

- `version` — `FirmwareVersion`, np. `01.05.25`
- `extra.model`, jeśli występuje

## Korelacja CVE

Jeszcze bez dopasowania — sondy BMC są nowe w 2.1, a upstream odłożył
ich mapowanie CVE na późniejszy, osobny etap. Zobacz stronę
[Korelacja CVE](/pl/cve/#które-produkty-są-dopasowywane).

## Resolver cyklu życia

Brak — firmware BMC nie ma publicznego kalendarza cyklu życia
(potwierdzone 404 pod każdym wypróbowanym slugiem). Wyłącznie do
inwentarza.
