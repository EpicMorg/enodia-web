---
title: nginx
description: Konfiguracja enodia do sondowania produktu nginx.
---

Odczytuje nagłówek odpowiedzi `Server`, który nginx ustawia w każdej
odpowiedzi. Nie ma endpointu wersji: nginx (w przeciwieństwie do REST API
NGINX Plus) nie udostępnia anonimowo niczego więcej —
`/stub_status` z `ngx_http_stub_status_module` podaje liczniki połączeń,
nigdy wersję.

```yaml
targets:
  - id: nginx-main
    product: nginx
    address: https://www.example.com
```

## Uwierzytelnianie

Brak — akceptowany jest każdy kod statusu, ponieważ nginx dodaje własny
nagłówek `Server` do stron błędów i przekierowań tak samo jak do `200`.
Cel, którego `/` zwraca akurat 404 lub znajduje się za vhostem
z uwierzytelnianiem Basic, nadal bez problemu zgłasza wersję. Potwierdzono
na żywo na rzeczywistych kontenerach `nginx:1.27.4` dla obu przypadków.

## `server_tokens off` usuwa wersję

Własne ustawienie utwardzające nginx (popularne na produkcji) ustawia
nagłówek na samo `"nginx"` bez żadnej wersji — potwierdzony produkt, dla którego nie pozostało nic do porównania z kalendarzem cyklu życia, a nie błąd parsera.

## Rejestrowane pola

Tylko `version` — ta sonda nie zapisuje żadnych pól `extra`.

## Korelacja CVE

Dopasowywany do NVD i BDU FSTEC, gdy skonfigurowano [blok `cve:`](/pl/cve/).

## Resolver cyklu życia

`endoflife:nginx`.
