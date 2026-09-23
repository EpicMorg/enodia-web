---
title: Harbor
description: Configuración de enodia para sondear Harbor (registro de contenedores).
---

Lee `GET /api/v2.0/systeminfo`.

```yaml
targets:
  - id: harbor-main
    product: harbor
    address: https://harbor.example.com
```

## Autenticación

Opcional. Confirmado en vivo contra un stack `goharbor/harbor` v2.12.2
real: `harbor_version` se devuelve sin ninguna credencial en todas las
versiones publicadas actualmente; las credenciales incorrectas o
inventadas se tratan en silencio como anónimas en lugar de responder
`401`, y este endpoint nunca rechaza una solicitud de plano.

:::note[Esté atento a este cambio en upstream]
El propio código fuente de Harbor (a partir de la versión contra la que
se verificó esta sonda) ya restringe `harbor_version` tras una
comprobación de sesión autenticada en su rama principal, sin publicar
en el momento de escribir esto, lo que apunta a una futura versión que
exigirá credenciales para este campo. `basic` ya se ofrece aquí para
cuando eso llegue:

```yaml
credentials:
  harbor-admin:
    kind: basic
    username: admin
    password: "${HARBOR_PASSWORD}"
```
:::

## Campos registrados

Solo `version`: esta sonda no registra ningún campo `extra`.

## Correlación de CVE

Se contrasta con NVD y BDU FSTEC cuando hay configurado un [bloque `cve:`](/es/cve/).

## Resolvedor del ciclo de vida

`endoflife:harbor`.
