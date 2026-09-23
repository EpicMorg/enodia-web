---
title: Nextcloud
description: Configuración de enodia para sondear Nextcloud.
---

Lee `GET /status.php` para obtener la versión: un endpoint de
comprobación de estado para balanceadores de carga, accesible incluso
antes de ejecutar la instalación y mientras el modo de mantenimiento
está activado.

```yaml
targets:
  - id: nextcloud-main
    product: nextcloud
    address: https://nextcloud.example.com
```

## Autenticación

Ninguna: el endpoint no acepta ninguna forma de credencial.

## Qué campo de versión

Se informa `versionstring` (p. ej. `34.0.3`), no `version` (p. ej.
`34.0.3.2`): confirmado en vivo, `versionstring` es lo que usan los
ciclos de [endoflife.date](https://endoflife.date/nextcloud) para
`latest`, y el cuarto componente interno de compilación de `version`
nunca aparece en el calendario del ciclo de vida.

## Campos registrados

- `version`: de `versionstring`
- `extra.installed`, `extra.maintenance`: `"true"`/`"false"`
- `extra.buildVersion`: el campo `version` en bruto, conservado como
  referencia
- `extra.enterprise`: de `edition` de `status.php`: vacío (el servidor
  community, confirmado en vivo) → `"false"`, `enterprise` → `"true"`;
  cualquier otro valor se deja sin informar en lugar de suponerlo

## Correlación de CVE

Se contrasta con NVD y BDU FSTEC cuando hay configurado un [bloque `cve:`](/es/cve/). Tiene en cuenta la edición: la sonda registra la edición del propio servidor en `extra.enterprise`, y una instancia community no ve los hallazgos exclusivos de la edición enterprise. Una edición desconocida conserva todos los hallazgos.

## Resolvedor del ciclo de vida

`endoflife:nextcloud`.
