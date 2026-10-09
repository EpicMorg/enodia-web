---
title: Apache ZooKeeper
description: Como configurar o enodia para sondar o Apache ZooKeeper.
---

Uma sonda TCP bruta na porta de clientes, não HTTP — `address` é `host`
ou `host:port`, sem esquema. A porta padrão é `2181` quando omitida.
Envia a palavra de quatro letras `srvr` e lê a resposta até o servidor
fechar a conexão.

```yaml
targets:
  - id: zk-01
    product: zookeeper
    address: zk-01.example.com:2181
```

## Por que `srvr`

O ZooKeeper 3.5+ permite apenas `srvr` por padrão
(`4lw.commands.whitelist`): `stat`, `mntr`, `ruok` e os demais respondem
"is not executed because it is not in the whitelist". Se um servidor
também tiver removido `srvr` da whitelist, o alvo falha como não
suportado. O AdminServer (HTTP, 8080) traz os mesmos dados, mas muitas
vezes não está exposto; a porta de clientes sempre está.

## Autenticação

Nenhuma — as palavras de quatro letras não têm autenticação.

## Campos registrados

- `version` — por exemplo `3.9.6`, de
  `Zookeeper version: 3.9.6-a355171b081b5b60749db8f19cca1528b0df936f, built on 2026-09-03 19:29 UTC`
- `extra.git` — o hash git do build, quando presente
- `extra.mode` — a linha `Mode:`, por exemplo `standalone`

## Correlação de CVEs

Correlacionado com o NVD e o BDU FSTEC quando um [bloco `cve:`](/pt-br/cve/) está configurado.

## Resolvedor de ciclo de vida

`endoflife:zookeeper`.
