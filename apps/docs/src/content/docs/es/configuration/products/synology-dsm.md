---
title: Synology DSM
description: Configuración de enodia para sondear Synology DSM.
---

Inicia sesión en la propia Web API de Synology (`SYNO.API.Auth`) y después
lee `SYNO.DSM.Info` para obtener la versión usando la sesión resultante;
es la única sonda HTTP de enodia que necesita un paso real de inicio de
sesión en lugar de una credencial estática.

```yaml
targets:
  - id: nas-main
    product: synology-dsm
    address: https://nas.example.com:5001
    credentials: synology-admin
```

## Autenticación — obligatoria, usuario y contraseña

```yaml
credentials:
  synology-admin:
    kind: password
    username: enodia-ro
    password: "${SYNOLOGY_PASSWORD}"
```

Confirmado en vivo: `SYNO.DSM.Info` siempre responde `{"error":{"code":119}}`
(«no hay sesión») si no se dispone a la vez de un identificador de sesión
y, cuando la protección CSRF está activada, de un `SynoToken`; ninguno de
los dos se puede obtener sin llamar primero al método de inicio de sesión
de `SYNO.API.Auth` con una cuenta y una contraseña reales. Se trata de un
caso realmente más ligero que un inicio de sesión completo mediante un
formulario HTML: una API JSON simple que recibe usuario/contraseña como
parámetros normales y devuelve el identificador de sesión como un campo
JSON normal, sin necesidad de un almacén de cookies ni de extraer tokens
CSRF. Tras leer la versión se cierra la sesión (en la medida de lo
posible), para que la recopilación no acumule sesiones abiertas en el NAS
ejecución tras ejecución.

Aquí los fallos de autenticación no usan códigos de estado HTTP en
absoluto: toda llamada a la Web API de Synology responde `200` incluso
cuando falla, con `success: false` en el cuerpo (confirmado en vivo), por
lo que esta sonda lee el cuerpo, no el código de estado, para detectar un
inicio de sesión rechazado.

## Campos registrados

- `version`: extraída de la forma `"DSM <version> Update
  <n>"` de `version_string`, p. ej. `"DSM 7.3.2-86009 Update 4"` → `7.3.2-86009`
- `extra.update`: el número de Update (`4`), desde la 2.2, cuando la
  cadena lo incluye; se mantiene separado de `version` para que drift y
  el ciclo de vida sigan comparando la propia versión

## Correlación de CVE

Se contrasta con NVD y BDU FSTEC cuando hay configurado un [bloque `cve:`](/es/cve/). Desde la 2.2. Una versión de DSM consta
de versión, compilación y Update (`7.2.1-69057 Update 6`), y las bases de
datos la acotan como `7.2.1-69057-6`; el `version` y el `extra.update` de
la sonda se combinan en una única versión comparable para la búsqueda.
Un inventario recopilado antes de la 2.2 no tiene `extra.update` y se lee
como Update 0: pueden marcarse Updates ya corregidos, pero no se pasa por
alto ninguno. Los rangos por rama de BDU siguen sobreinformando en las
ramas más antiguas (los de NVD no); consulte
[Dell iDRAC y Synology DSM](/es/cve/#dell-idrac-y-synology-dsm) y
[Limitaciones conocidas](/es/cve/#limitaciones-conocidas).

## Resolvedor del ciclo de vida

Ninguno: endoflife.date no tiene ningún calendario bajo `synology-dsm`,
`synology` ni `dsm` (404 confirmado). Por ahora, solo inventario.
