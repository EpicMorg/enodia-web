---
title: Dell iDRAC
description: Konfiguracja enodia do sondowania kontrolera Dell iDRAC przez Redfish.
---

Dwa żądania przez Redfish: `GET /redfish/v1` w celu sprawdzenia
tożsamości producenta, a następnie `GET /redfish/v1/Managers/iDRAC.Embedded.1`
w celu odczytania wersji firmware.

```yaml
targets:
  - id: blade-1a-idrac
    product: dell-idrac
    address: https://idrac-blade-1a.example.com
    credentials: idrac-ro
```

## Uwierzytelnianie — wymagane

Uwierzytelnianie HTTP Basic; bez niego endpointy odpowiadają `401`
(potwierdzone na żywo).

```yaml
credentials:
  idrac-ro:
    kind: basic
    username: enodia
    password: "${IDRAC_PASSWORD}"
```

Wystarczy konto iDRAC tylko do odczytu. Kontrolery iDRAC zwykle
udostępniają certyfikat z podpisem własnym — zamiast wyłączać
weryfikację, należy go przypiąć, zobacz
[Konfiguracja → TLS](/pl/configuration/#tls-tls).

## Weryfikacja tożsamości producenta

Dlaczego dwa żądania: potwierdzono na żywo na prawdziwym iDRAC 12.
generacji, że sam zasób Manager nie zawiera żadnego znacznika
producenta, podczas gdy główny zasób usługi `/redfish/v1` zawiera
`Oem.Dell` (z numerem service tag) oraz ciąg produktu „Integrated Dell
Remote Access Controller”. Pierwsze żądanie potwierdza, że to Dell;
drugie odczytuje wersję. `iDRAC.Embedded.1` to standardowy identyfikator
Della dla wbudowanego kontrolera — to on jest sprawdzany.

Dell **CMC** (kontroler na poziomie obudowy kasetowej) to inny produkt,
w ogóle bez endpointu Redfish, i nie jest obsługiwany.

## Rejestrowane pola

- `version` — `FirmwareVersion`, np. `2.65.65.65`
- `extra.model`, jeśli występuje
- `extra.serviceTag`, jeśli występuje

## Korelacja CVE

Jeszcze bez dopasowania — sondy BMC są nowe w 2.1, a upstream odłożył
ich mapowanie CVE na późniejszy, osobny etap. Zobacz stronę
[Korelacja CVE](/pl/cve/#które-produkty-są-dopasowywane).

## Resolver cyklu życia

Brak — firmware BMC nie ma publicznego kalendarza cyklu życia
(potwierdzone 404 pod każdym wypróbowanym slugiem). Wyłącznie do
inwentarza.
