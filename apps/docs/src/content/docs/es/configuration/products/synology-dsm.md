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

Solo `version`, extraída de la forma `"DSM <version> Update
<n>"` de `version_string`, p. ej. `"DSM 7.3.2-86009 Update 4"` → `7.3.2-86009`.

## Correlación de CVE

No se contrasta: sus rangos usan límites como `6.2.4-25556-3`, que el analizador estricto de rangos rechaza. Consulte [Correlación de CVE](/es/cve/#qué-productos-tienen-correspondencia).

## Resolvedor del ciclo de vida

Ninguno: endoflife.date no tiene ningún calendario bajo `synology-dsm`,
`synology` ni `dsm` (404 confirmado). Por ahora, solo inventario.
