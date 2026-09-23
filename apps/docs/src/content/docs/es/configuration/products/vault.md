---
title: HashiCorp Vault
description: Configuración de enodia para sondear HashiCorp Vault.
---

Lee `GET /v1/sys/health` para obtener la versión: el endpoint de
comprobación de estado del clúster de Vault, anónimo a propósito para que
un balanceador de carga pueda consultarlo. Enviar un token no cambia nada
de esto.

```yaml
targets:
  - id: vault-main
    product: vault
    address: https://vault.example.com
```

## Autenticación

Ninguna: el endpoint no acepta ninguna forma de credencial, por diseño.

## El estado del clúster no es un fallo

`/sys/health` responde con distintos códigos de estado según la topología
del clúster (sellado `503`, standby `429`, standby de DR/rendimiento
`472`/`473`, no inicializado `501`), y **todos ellos siguen incluyendo el
mismo cuerpo JSON, versión incluida**. enodia los trata todos como
observaciones correctas, no como errores: un nodo de Vault sellado es un
dato sobre ese nodo, no un fallo de la sonda (consulte
[Conceptos](/es/concepts/#los-hechos-y-el-juicio-están-separados)).

## Campos registrados

- `version`
- `extra.initialized`, `extra.sealed`, `extra.standby`: `"true"`/`"false"`
- `extra.clusterName`, cuando está presente
- `extra.enterprise`: `"true"`/`"false"`, solo cuando `/sys/health` incluye su campo `enterprise`

## Correlación de CVE

Se contrasta con NVD y BDU FSTEC cuando hay configurado un [bloque `cve:`](/es/cve/). Tiene en cuenta la edición: la sonda registra la edición del propio servidor en `extra.enterprise`, y una instancia community no ve los hallazgos exclusivos de la edición enterprise. Una edición desconocida conserva todos los hallazgos.

## Resolvedor del ciclo de vida

`endoflife:hashicorp-vault`.
