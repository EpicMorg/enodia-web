---
title: Apache ZooKeeper
description: Настройка enodia для опроса Apache ZooKeeper.
---

Проба на сыром TCP через клиентский порт, не HTTP — `address` это `host`
или `host:port`, без схемы. Порт по умолчанию — `2181`, если не указан.
Отправляет четырёхбуквенную команду `srvr` и читает ответ, пока сервер не
закроет соединение.

```yaml
targets:
  - id: zk-01
    product: zookeeper
    address: zk-01.example.com:2181
```

## Почему `srvr`

ZooKeeper 3.5+ по умолчанию разрешает только `srvr`
(`4lw.commands.whitelist`): `stat`, `mntr`, `ruok` и остальные отвечают
«is not executed because it is not in the whitelist». Если на сервере
`srvr` тоже убран из белого списка, таргет завершается ошибкой «не
поддерживается». AdminServer (HTTP, 8080) отдаёт те же данные, но часто
не открыт наружу; клиентский порт открыт всегда.

## Аутентификация

Отсутствует — у четырёхбуквенных команд нет аутентификации.

## Записываемые поля

- `version` — например, `3.9.6`, из
  `Zookeeper version: 3.9.6-a355171b081b5b60749db8f19cca1528b0df936f, built on 2026-09-03 19:29 UTC`
- `extra.git` — git-хеш сборки, если присутствует
- `extra.mode` — строка `Mode:`, например `standalone`

## Сопоставление с CVE

Сверяется с NVD и БДУ ФСТЭК, если настроен [блок `cve:`](/ru/cve/).

## Резолвер жизненного цикла

`endoflife:zookeeper`.
