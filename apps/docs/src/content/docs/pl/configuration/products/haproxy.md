---
title: HAProxy
description: Konfiguracja enodia do sondowania produktu HAProxy.
---

Odczytuje wersję z nagłówka własnej **strony statystyk** HAProxy — HAProxy
nie ma endpointu wersji i, w przeciwieństwie do nginx, domyślnie w ogóle
nie ustawia nagłówka `Server`, który by go identyfikował.

```yaml
targets:
  - id: haproxy-main
    product: haproxy
    address: https://haproxy.example.com
```

`/stats` to domyślna ścieżka tej sondy — `path:` należy ustawić jawnie
tylko wtedy, gdy strona statystyk jest zamontowana gdzie indziej.

## Strona statystyk musi być włączona

Potwierdzono na żywo na rzeczywistym kontenerze `haproxy:3.0`: strona
statystyk (`stats enable` we własnej konfiguracji HAProxy; **domyślnie
wyłączona**) to jedyna anonimowa powierzchnia, która w ogóle zawiera
wersję — eksport statystyk `;csv` nie ma kolumny wersji nigdzie w swoim
nagłówku liczącym ok. 140 kolumn, dlatego ta sonda odczytuje właśnie
postać HTML.

## Uwierzytelnianie

Opcjonalne. `stats auth user:pass` (własna dyrektywa konfiguracyjna
HAProxy dla tej strony) to zwykłe HTTP Basic:

```yaml
credentials:
  haproxy-stats:
    kind: basic
    username: admin
    password: "${HAPROXY_STATS_PASSWORD}"
```

## Rejestrowane pola

Tylko `version` — ta sonda nie zapisuje żadnych pól `extra`.

## Korelacja CVE

Dopasowywany do NVD i BDU FSTEC, gdy skonfigurowano [blok `cve:`](/pl/cve/).

## Resolver cyklu życia

`endoflife:haproxy`.
