---
title: Zabbix
description: Como configurar o enodia para sondar o Zabbix.
---

Chama o método JSON-RPC `apiinfo.version` — o único método da API do
Zabbix explicitamente documentado como não exigindo autenticação.

```yaml
targets:
  - id: zabbix-main
    product: zabbix
    address: https://zabbix.example.com
```

## Autenticação

Nenhuma — todo o restante da API do Zabbix exige um token de sessão que
esta sonda não tem motivo para manter; `apiinfo.version` é a exceção
deliberada.

## Campos registrados

Apenas `version` — esta sonda não registra nenhum campo `extra`.

## Correlação de CVEs

Correlacionado com o NVD e o BDU FSTEC quando um [bloco `cve:`](/pt-br/cve/) está configurado.

## Resolvedor de ciclo de vida

`endoflife:zabbix`.
