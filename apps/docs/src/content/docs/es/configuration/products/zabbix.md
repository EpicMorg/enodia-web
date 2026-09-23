---
title: Zabbix
description: Configuración de enodia para sondear Zabbix.
---

Llama al método JSON-RPC `apiinfo.version`, el único método de la API de
Zabbix documentado explícitamente como método que no necesita
autenticación.

```yaml
targets:
  - id: zabbix-main
    product: zabbix
    address: https://zabbix.example.com
```

## Autenticación

Ninguna: todo lo demás en la API de Zabbix requiere un token de sesión que
esta sonda no tiene ningún motivo para poseer; `apiinfo.version` es la
excepción deliberada.

## Campos registrados

Solo `version`: esta sonda no registra ningún campo `extra`.

## Correlación de CVE

Se contrasta con NVD y BDU FSTEC cuando hay configurado un [bloque `cve:`](/es/cve/).

## Resolvedor del ciclo de vida

`endoflife:zabbix`.
