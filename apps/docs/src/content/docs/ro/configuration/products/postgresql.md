---
title: PostgreSQL
description: Configurarea enodia pentru a sonda PostgreSQL.
---

O sondă pe protocolul de rețea nativ, nu HTTP — `address` este `host` sau
`host:port`, fără schemă. Portul implicit este `5432` atunci când este
omis. `product: postgres` este acceptat și el ca alias pentru
`postgresql`.

Versiunea provine dintr-un mesaj `ParameterStatus` pe care fiecare
backend PostgreSQL îl trimite automat imediat după autentificarea reușită
— nu este necesară o interogare explicită `SHOW server_version`.

```yaml
targets:
  - id: pg-main
    product: postgresql
    address: db.example.com:5432
    credentials: pg-app
```

## Autentificare

Necesară doar dacă serverul o cere efectiv — autentificarea trust nu
necesită nicio credențială. Atunci când o cere, **trust, cleartext, MD5
și SCRAM-SHA-256 sunt toate acceptate și negociate automat** — inclusiv
SCRAM-SHA-256, implicit pe PostgreSQL 14+ și frecvent pe 10–13, fără de
care majoritatea instalărilor reale ar fi inaccesibile.

```yaml
credentials:
  pg-app:
    kind: password
    username: enodia_ro   # opțional — implicit "postgres" dacă este omis
    password: "${PG_PASSWORD}"
```

Baza de date la care se face conectarea are implicit aceeași valoare ca
numele de utilizator (valoarea implicită de pe server) — în prezent nu
există un câmp de configurare pentru a indica explicit un alt nume de
bază de date.

## Corelare CVE

Se corelează cu NVD și BDU FSTEC atunci când este configurat un [bloc `cve:`](/ro/cve/). Începând cu 2.2, `cve.postgresql.path`
adaugă paginile de securitate proprii ale proiectului, care numesc
corecția per versiune majoră: pentru o versiune majoră numită în paginile
salvate, verdictul lor înlocuiește intervalele fără ramură ale BDU, care
altfel semnalează cea mai recentă versiune a fiecărei versiuni majore
mai vechi. Consultați
[Datele proprii ale producătorilor → PostgreSQL](/ro/cve/#postgresql).

## Rezolvatorul ciclului de viață

`endoflife:postgresql`.
