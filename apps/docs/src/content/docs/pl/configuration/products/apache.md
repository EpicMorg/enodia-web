---
title: Apache HTTP Server
description: Konfiguracja enodia do sondowania produktu Apache HTTP Server.
---

Odczytuje nagłówek odpowiedzi `Server`, który Apache httpd ustawia w każdej
odpowiedzi — ten sam rodzaj problemu co w przypadku
[nginx](/pl/configuration/products/nginx/): nie istnieje endpoint wersji,
a każdy kod statusu nadal niesie ten nagłówek. Jako alias akceptowany jest
`product: httpd`.

```yaml
targets:
  - id: apache-main
    product: apache
    address: https://www.example.com
```

## Uwierzytelnianie

Brak — nagłówek `Server` jest wysyłany w każdej odpowiedzi niezależnie od
uwierzytelnienia.

## `ServerTokens Prod` usuwa wersję

Potwierdzono na żywo na rzeczywistych kontenerach `httpd:2.4`: domyślna
kompilacja odpowiada `"Apache/2.4.68 (Unix)"`; `ServerTokens Prod`
(własna dyrektywa utwardzająca Apache, popularna na produkcji) skraca to do
samego `"Apache"` bez żadnej wersji — potwierdzony produkt, dla którego nie pozostało nic do porównania z kalendarzem cyklu życia, a nie błąd parsera.

## Rejestrowane pola

Tylko `version` — ta sonda nie zapisuje żadnych pól `extra`.

## Korelacja CVE

Dopasowywany do NVD i BDU FSTEC, gdy skonfigurowano [blok `cve:`](/pl/cve/).

## Resolver cyklu życia

`endoflife:apache-http-server` — zarówno `apache`, jak i `httpd`
przekierowują (301) na endoflife.date do tego sluga; enodia rozwiązuje
docelowy slug bezpośrednio, zamiast wykonywać ten dodatkowy przeskok przy
każdym wyszukiwaniu.
