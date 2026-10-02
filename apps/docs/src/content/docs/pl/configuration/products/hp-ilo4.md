---
title: HP iLO 4
description: Konfiguracja enodia do sondowania kontrolera HP iLO 4.
---

Odczytuje `GET /redfish/v1/Managers/1/` — z końcowym ukośnikiem, co,
jak potwierdzono na żywo, ma znaczenie — aby uzyskać wersję firmware
kontrolera.

```yaml
targets:
  - id: vm43-ilo
    product: hp-ilo4
    address: https://ilo-vm43.example.com
    credentials: ilo-ro
```

## Uwierzytelnianie — wymagane

Uwierzytelnianie HTTP Basic; bez niego endpoint odpowiada `401`
(potwierdzone na żywo).

```yaml
credentials:
  ilo-ro:
    kind: basic
    username: enodia
    password: "${ILO_PASSWORD}"
```

Wystarczy konto iLO tylko do odczytu. Kontrolery iLO zwykle udostępniają
certyfikat z podpisem własnym — zamiast wyłączać weryfikację, należy go
przypiąć, zobacz [Konfiguracja → TLS](/pl/configuration/#tls-tls).

## Tylko iLO 4

API iLO 4 przedstawia się jako „HP RESTful Root Service” — to API HP
starsze niż Redfish, a nie implementacja Redfish — ale ten jeden zasób
pokrywa się z Redfish na tyle, że można go odczytać w ten sam sposób.
Tożsamość jest sprawdzana po kluczu `Oem.Hp`. iLO 5 jest w pełni zgodny
z Redfish i najprawdopodobniej wymaga innego sprawdzenia; żaden iLO 5
nie był dostępny, by to potwierdzić na żywo, więc na razie nie ma dla
niego sondy, zamiast sondy opartej na zgadywaniu.

## Rejestrowane pola

- `version` — sparsowana z `FirmwareVersion`: `iLO 4 v2.82` → `2.82`
- `extra.raw` — pełny ciąg `FirmwareVersion`

## Korelacja CVE

Jeszcze bez dopasowania — sondy BMC są nowe w 2.1, a upstream odłożył
ich mapowanie CVE na późniejszy, osobny etap. Zobacz stronę
[Korelacja CVE](/pl/cve/#które-produkty-są-dopasowywane).

## Resolver cyklu życia

Brak — firmware BMC nie ma publicznego kalendarza cyklu życia
(potwierdzone 404 pod każdym wypróbowanym slugiem). Wyłącznie do
inwentarza.
