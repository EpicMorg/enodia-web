---
title: Apache ZooKeeper
description: Налаштування enodia для опитування Apache ZooKeeper.
---

Сира TCP-проба на клієнтському порту, а не HTTP — `address` має вигляд
`host` або `host:port`, без схеми. Якщо порт не вказано, використовується
`2181`. Надсилає чотирилітерну команду `srvr` і читає відповідь, доки
сервер не закриє зʼєднання.

```yaml
targets:
  - id: zk-01
    product: zookeeper
    address: zk-01.example.com:2181
```

## Чому `srvr`

ZooKeeper 3.5+ за замовчуванням дозволяє лише `srvr`
(`4lw.commands.whitelist`): `stat`, `mntr`, `ruok` та інші відповідають
"is not executed because it is not in the whitelist". Якщо сервер прибрав
зі списку дозволених і `srvr`, ціль завершується помилкою як
непідтримувана. AdminServer (HTTP, 8080) містить ті самі дані, але часто
недоступний ззовні; клієнтський порт доступний завжди.

## Автентифікація

Немає — чотирилітерні команди не мають автентифікації.

## Записувані поля

- `version` — напр. `3.9.6`, з
  `Zookeeper version: 3.9.6-a355171b081b5b60749db8f19cca1528b0df936f, built on 2026-09-03 19:29 UTC`
- `extra.git` — git-хеш збірки, якщо є
- `extra.mode` — рядок `Mode:`, напр. `standalone`

## Зіставлення з CVE

Зіставляється з NVD і БДУ ФСТЕК, якщо налаштовано [блок `cve:`](/uk/cve/).

## Резолвер життєвого циклу

`endoflife:zookeeper`.
