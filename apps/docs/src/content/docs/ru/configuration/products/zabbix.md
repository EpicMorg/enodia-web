---
title: Zabbix
description: Настройка enodia для опроса Zabbix.
---

Вызывает JSON-RPC метод `apiinfo.version` — единственный метод в API
Zabbix, документированно не требующий аутентификации.

```yaml
targets:
  - id: zabbix-main
    product: zabbix
    address: https://zabbix.example.com
```

## Аутентификация

Отсутствует — всё остальное в API Zabbix требует токен сессии, который
этой пробе незачем хранить; `apiinfo.version` — намеренное исключение.

## Записываемые поля

Только `version` — эта проба не записывает никаких полей `extra`.

## Сопоставление с CVE

Сверяется с NVD и БДУ ФСТЭК, если настроен [блок `cve:`](/ru/cve/).

## Резолвер жизненного цикла

`endoflife:zabbix`.
