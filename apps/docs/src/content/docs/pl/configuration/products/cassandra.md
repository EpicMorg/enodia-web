---
title: Apache Cassandra
description: Konfiguracja enodia do sondowania produktu Apache Cassandra.
---

Sonda natywnego protokołu CQL, a nie HTTP — `address` to `host` lub
`host:port`, bez schematu. Gdy port zostanie pominięty, domyślnie używany
jest `9042`. Odczytuje `release_version` zapytaniem `SELECT release_version FROM system.local`.

```yaml
targets:
  - id: cassandra-01
    product: cassandra
    address: cassandra-01.example.com:9042
```

## Protokół

Cassandra nie ma API HTTP, więc enodia mówi bezpośrednio w CQL, bez
sterownika: `STARTUP`, następnie — tylko gdy serwer odpowie
`AUTHENTICATE` — jedna odpowiedź SASL PLAIN, a potem jedno zapytanie.
`OPTIONS`/`SUPPORTED`, jedyna wymiana przed uwierzytelnieniem, zawiera
wersje CQL i protokołu, ale nie wersję samego serwera. Używany jest
protokół v4, ponieważ obsługuje go każda wspierana Cassandra: 3.x, 4.x
i 5.0 go akceptują, natomiast 3.11 odrzuca v5. Cassandra 2.x (najwyżej
v3) od dawna nie jest wspierana i nie jest próbowana.

## Uwierzytelnianie

Opcjonalne, `kind: password` — wysyłane tylko wtedy, gdy klaster o nie
poprosi (`PasswordAuthenticator`). Zobacz
[Konfiguracja → Poświadczenia](/pl/configuration/#poświadczenia).

```yaml
credentials:
  cassandra-ro:
    kind: password
    username: enodia_ro
    password: "${CASSANDRA_PASSWORD}"
```

Klaster wymagający uwierzytelniania bez skonfigurowanego poświadczenia
kończy się błędem uwierzytelniania wskazującym jego authenticator;
odrzucone poświadczenia również są błędem uwierzytelniania.

## Rejestrowane pola

Tylko `version` — np. `5.0.9` lub `3.11.19`. Ta sonda nie zapisuje
żadnych pól `extra`.

## Korelacja CVE

Dopasowywany do NVD i BDU FSTEC, gdy skonfigurowano [blok `cve:`](/pl/cve/).

## Resolver cyklu życia

`endoflife:apache-cassandra`.
