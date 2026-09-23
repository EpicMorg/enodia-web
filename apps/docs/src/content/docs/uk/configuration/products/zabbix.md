---
title: Zabbix
description: Налаштування enodia для опитування Zabbix.
---

Викликає метод JSON-RPC `apiinfo.version` — єдиний метод в API Zabbix, для
якого явно задокументовано, що він не потребує автентифікації.

```yaml
targets:
  - id: zabbix-main
    product: zabbix
    address: https://zabbix.example.com
```

## Автентифікація

Немає — усе інше в API Zabbix потребує сесійного токена, тримати який ця
проба не має причин; `apiinfo.version` — навмисний виняток.

## Записувані поля

Лише `version` — ця проба не записує полів `extra`.

## Зіставлення з CVE

Зіставляється з NVD і БДУ ФСТЕК, якщо налаштовано [блок `cve:`](/uk/cve/).

## Резолвер життєвого циклу

`endoflife:zabbix`.
