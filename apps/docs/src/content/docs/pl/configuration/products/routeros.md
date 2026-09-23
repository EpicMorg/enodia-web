---
title: MikroTik RouterOS
description: Konfiguracja enodia do sondowania produktu MikroTik RouterOS.
---

Odczytuje `GET /rest/system/resource` — REST API RouterOS (RouterOS 7.1+;
usługa `www`, domyślnie włączona w świeżej instalacji, musi być aktywna).

```yaml
targets:
  - id: router-main
    product: routeros
    address: https://router.example.com
    credentials: routeros-admin
```

## Uwierzytelnianie — wymagane

Potwierdzono na żywo na rzeczywistej maszynie wirtualnej CHR (Cloud Hosted
Router) 7.24.2: ten endpoint bez poświadczeń zawsze odpowiada `401`,
a anonimowa strona logowania webfig pod `/` również nigdzie nie zawiera
tekstu wersji — to własne administracyjne API routera, więc wymaganie
poświadczeń to poprawna domyślna postawa, a nie opcja utwardzania, którą
trzeba obchodzić.

```yaml
credentials:
  routeros-admin:
    kind: basic
    username: enodia-ro
    password: "${ROUTEROS_PASSWORD}"
```

Baner SSH (`"SSH-2.0-ROSSSH"`, potwierdzony na żywo) również nie zawiera
wersji, co wyklucza podejście oparte na banerze SSH, jakiego używają
[SSH](/pl/configuration/products/ssh/)/[MySQL](/pl/configuration/products/mysql/).

## Rejestrowane pola

- `version`
- `extra.boardName`, `extra.architecture`

## Korelacja CVE

Dopasowywany do NVD i BDU FSTEC, gdy skonfigurowano [blok `cve:`](/pl/cve/).

## Resolver cyklu życia

`endoflife:routeros`.
