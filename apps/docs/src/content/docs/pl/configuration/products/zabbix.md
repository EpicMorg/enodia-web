---
title: Zabbix
description: Konfiguracja enodia do sondowania produktu Zabbix.
---

Wywołuje metodę JSON-RPC `apiinfo.version` — jedyną metodę w API Zabbix,
która według dokumentacji wprost nie wymaga uwierzytelniania.

```yaml
targets:
  - id: zabbix-main
    product: zabbix
    address: https://zabbix.example.com
```

## Uwierzytelnianie

Brak — wszystko inne w API Zabbix wymaga tokenu sesji, którego ta sonda
nie ma powodu przechowywać; `apiinfo.version` to celowy wyjątek.

## Rejestrowane pola

Tylko `version` — ta sonda nie zapisuje żadnych pól `extra`.

## Korelacja CVE

Dopasowywany do NVD i BDU FSTEC, gdy skonfigurowano [blok `cve:`](/pl/cve/).

## Resolver cyklu życia

`endoflife:zabbix`.
