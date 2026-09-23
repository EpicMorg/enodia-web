---
title: ClickHouse
description: Configurarea enodia pentru a sonda ClickHouse.
---

Rulează `SELECT version()` prin interfața HTTP a ClickHouse (implicit
portul 8123) și citește răspunsul în text simplu.

```yaml
targets:
  - id: clickhouse-main
    product: clickhouse
    address: https://clickhouse.example.com:8123
```

## Autentificare

Opțională. Imaginile recente cer ca `CLICKHOUSE_PASSWORD` să fie setat
obligatoriu — nu există o parolă goală implicită a utilizatorului
implicit la care să se revină, spre deosebire de instalările mai vechi —
așa că o cerere neautentificată către o instanță securizată primește un
`401` obișnuit, tratat la fel ca la orice altă sondă:

```yaml
credentials:
  clickhouse-default:
    kind: basic
    username: default
    password: "${CLICKHOUSE_PASSWORD}"
```

Dacă o anumită instalare necesită sau nu credențiale depinde în
întregime de modul în care a fost configurată.

## Câmpuri înregistrate

Doar `version` — această sondă nu înregistrează niciun câmp `extra`.

## Corelare CVE

Se corelează cu NVD și BDU FSTEC atunci când este configurat un [bloc `cve:`](/ro/cve/).

## Rezolvatorul ciclului de viață

`endoflife:clickhouse`.
