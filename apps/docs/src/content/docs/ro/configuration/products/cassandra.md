---
title: Apache Cassandra
description: Configurarea enodia pentru a sonda Apache Cassandra.
---

O sondă pe protocolul nativ CQL, nu HTTP — `address` este `host` sau
`host:port`, fără schemă. Portul implicit este `9042` atunci când este
omis. Citește `release_version` cu `SELECT release_version FROM system.local`.

```yaml
targets:
  - id: cassandra-01
    product: cassandra
    address: cassandra-01.example.com:9042
```

## Protocol

Cassandra nu are un API HTTP, așa că enodia vorbește CQL direct, fără un
driver: `STARTUP`, apoi — doar atunci când serverul răspunde cu
`AUTHENTICATE` — un singur răspuns SASL PLAIN, apoi interogarea unică.
`OPTIONS`/`SUPPORTED`, singurul schimb de dinaintea autentificării,
conține versiunile CQL și ale protocolului, dar nu și pe cea a serverului.
Se folosește protocolul v4, deoarece toate versiunile Cassandra acceptate
îl vorbesc: 3.x, 4.x și 5.0 îl acceptă, în timp ce 3.11 refuză v5.
Cassandra 2.x (cel mult v3) nu mai este suportată de mult și nu este
încercată.

## Autentificare

Opțională, `kind: password` — trimisă doar atunci când clusterul o cere
(`PasswordAuthenticator`). Consultați
[Configurare → Credențiale](/ro/configuration/#credențiale).

```yaml
credentials:
  cassandra-ro:
    kind: password
    username: enodia_ro
    password: "${CASSANDRA_PASSWORD}"
```

Un cluster care cere autentificare, fără nicio credențială configurată,
eșuează cu o eroare de autentificare care îi numește autentificatorul;
credențialele respinse sunt, de asemenea, o eroare de autentificare.

## Câmpuri înregistrate

Doar `version` — de exemplu `5.0.9` sau `3.11.19`. Această sondă nu
înregistrează niciun câmp `extra`.

## Corelare CVE

Se corelează cu NVD și BDU FSTEC atunci când este configurat un [bloc `cve:`](/ro/cve/).

## Rezolvatorul ciclului de viață

`endoflife:apache-cassandra`.
