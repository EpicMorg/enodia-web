---
title: ProFTPD
description: Configurarea enodia pentru a sonda ProFTPD.
---

O sondă TCP nativă, nu HTTP — `address` este `host` sau `host:port`, fără
schemă. Portul implicit este `21` atunci când este omis. Citește mesajul
de întâmpinare FTP (răspunsul `220` din RFC 959) pe care fiecare server îl
trimite din proprie inițiativă la conectare și caută o versiune în el.

```yaml
targets:
  - id: ftp-main
    product: proftpd
    address: ftp.example.com:21
```

## Autentificare

Niciuna — mesajul de întâmpinare este trimis înaintea oricărui pas de
autentificare.

## Configurația implicită nu conține deloc versiunea

Fără nicio directivă `ServerIdent` configurată — valoarea implicită
reală, confirmată live atât pe o gazdă reală de producție, cât și pe un
container nou `instantlinux/proftpd` — mesajul de întâmpinare este
`"ProFTPD Server (<ServerName>) [<address>]"`, fără versiune. Versiunea
apare doar dacă un administrator configurează explicit `ServerIdent on
"... %{version} ..."` — confirmat live și acest lucru:
`"ProFTPD 1.3.9c ready at 127.0.0.1"`. Așadar, cazul „nu s-a găsit
nicio versiune” al acestei sonde este cel obișnuit, nu excepția.

## Câmpuri înregistrate

Doar `version` — această sondă nu înregistrează niciun câmp `extra`.

## Corelare CVE

Se corelează cu NVD și BDU FSTEC atunci când este configurat un [bloc `cve:`](/ro/cve/).

## Rezolvatorul ciclului de viață

`endoflife:proftpd`.
