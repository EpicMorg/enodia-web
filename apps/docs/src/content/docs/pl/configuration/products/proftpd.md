---
title: ProFTPD
description: Konfiguracja enodia do sondowania produktu ProFTPD.
---

Surowa sonda TCP, a nie HTTP — `address` to `host` lub `host:port`, bez
schematu. Gdy port zostanie pominięty, domyślnie używany jest `21`.
Odczytuje powitanie FTP (odpowiedź `220` z RFC 959), które każdy serwer
wysyła bez pytania po połączeniu, i szuka w nim wersji.

```yaml
targets:
  - id: ftp-main
    product: proftpd
    address: ftp.example.com:21
```

## Uwierzytelnianie

Brak — powitanie jest wysyłane przed jakimkolwiek krokiem uwierzytelniania.

## Domyślna konfiguracja w ogóle nie zawiera wersji

Bez skonfigurowanej dyrektywy `ServerIdent` — co jest faktycznym
ustawieniem domyślnym, potwierdzonym na żywo zarówno na rzeczywistym hoście
produkcyjnym, jak i na świeżym kontenerze `instantlinux/proftpd` —
powitanie ma postać `"ProFTPD Server (<ServerName>) [<address>]"`, bez
wersji. Wersja pojawia się tylko wtedy, gdy administrator jawnie
skonfiguruje `ServerIdent on "... %{version} ..."` — również potwierdzone
na żywo: `"ProFTPD 1.3.9c ready at 127.0.0.1"`. Przypadek „nie znaleziono
wersji” jest więc w tej sondzie typowy, a nie wyjątkowy.

## Rejestrowane pola

Tylko `version` — ta sonda nie zapisuje żadnych pól `extra`.

## Korelacja CVE

Dopasowywany do NVD i BDU FSTEC, gdy skonfigurowano [blok `cve:`](/pl/cve/).

## Resolver cyklu życia

`endoflife:proftpd`.
