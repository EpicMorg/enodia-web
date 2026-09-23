---
title: Zabbix
description: Configurarea enodia pentru a sonda Zabbix.
---

Apelează metoda JSON-RPC `apiinfo.version` — singura metodă din API-ul
Zabbix documentată explicit ca nenecesitând autentificare.

```yaml
targets:
  - id: zabbix-main
    product: zabbix
    address: https://zabbix.example.com
```

## Autentificare

Niciuna — tot restul API-ului Zabbix necesită un token de sesiune pe care
această sondă nu are niciun motiv să îl dețină; `apiinfo.version` este
excepția deliberată.

## Câmpuri înregistrate

Doar `version` — această sondă nu înregistrează niciun câmp `extra`.

## Corelare CVE

Se corelează cu NVD și BDU FSTEC atunci când este configurat un [bloc `cve:`](/ro/cve/).

## Rezolvatorul ciclului de viață

`endoflife:zabbix`.
