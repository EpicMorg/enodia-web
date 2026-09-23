---
title: MongoDB
description: Configuración de enodia para sondear MongoDB.
---

Una sonda de protocolo de red en bruto, no HTTP: `address` es `host` o
`host:port`, sin esquema. El puerto predeterminado es `27017` cuando se
omite. Ejecuta el comando `buildInfo` sobre el protocolo de red
(`OP_MSG`) y lee su campo `version`, sin biblioteca cliente ni consulta
de tipo `SELECT`.

```yaml
targets:
  - id: mongodb-main
    product: mongodb
    address: db.example.com:27017
```

## Autenticación

Ninguna: `buildInfo` es uno de los pocos comandos que MongoDB siempre
responde antes de la autenticación. Confirmado en vivo contra dos
contenedores `mongo:7` reales, uno sin ningún control de acceso y otro
con `--auth` y un usuario root configurado: ambos devolvieron el mismo
documento `buildInfo` completo sin enviar ninguna credencial.

## Campos registrados

- `version`
- `extra.enterprise`: `"true"` cuando `modules` de `buildInfo` incluye
  `enterprise`, `"false"` cuando no (un servidor community tiene un array
  vacío); no se informa cuando el campo está ausente

## Correlación de CVE

Se contrasta con NVD y BDU FSTEC cuando hay configurado un [bloque `cve:`](/es/cve/). Tiene en cuenta la edición: la sonda registra la edición del propio servidor en `extra.enterprise`, y una instancia community no ve los hallazgos exclusivos de la edición enterprise. Una edición desconocida conserva todos los hallazgos.

## Resolvedor del ciclo de vida

`endoflife:mongodb`.
