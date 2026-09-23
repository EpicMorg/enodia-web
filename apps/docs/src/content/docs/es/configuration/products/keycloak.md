---
title: Keycloak
description: Configuración de enodia para sondear Keycloak.
---

Lee `GET /admin/serverinfo` para obtener la versión.

```yaml
targets:
  - id: keycloak-main
    product: keycloak
    address: https://keycloak.example.com
    credentials: keycloak-token
```

## Autenticación — obligatoria

Keycloak es el único producto aquí **sin ninguna ruta anónima hacia la
versión**: confirmado en vivo, `/realms/<realm>/.well-known/openid-configuration`
(el endpoint que todo realm expone sin token) no contiene ningún campo de
versión, y `/admin/serverinfo`, que sí lo contiene, responde `401` sin
uno. Un destino sin credencial configurada se **omite**, no falla, en el
momento de la recopilación.

```yaml
credentials:
  keycloak-token:
    kind: bearer
    value: "${KEYCLOAK_ACCESS_TOKEN}"
```

Solo se acepta `bearer`. Obtener ese token de acceso (de la forma estándar
de OpenID Connect, contra el endpoint de tokens del propio realm) queda
fuera de la función de enodia (las sondas se ocupan del transporte, no de
la federación de identidades): la configuración espera un token ya
emitido. Los tokens de acceso suelen ser de corta duración, así que lo
que proporcione `KEYCLOAK_ACCESS_TOKEN` en el momento de la recopilación
debe mantenerlo vigente; enodia en sí no tiene lógica de renovación de
tokens.

## Campos registrados

- `version`: de `systemInfo.version`
- `extra.javaVersion`

## Correlación de CVE

Se contrasta con NVD y BDU FSTEC cuando hay configurado un [bloque `cve:`](/es/cve/).

## Resolvedor del ciclo de vida

`endoflife:keycloak`.
