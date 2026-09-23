---
title: Bitbucket
description: Configuración de enodia para sondear Atlassian Bitbucket (Data Center).
---

**Solo Data Center**: Atlassian Cloud no expone el endpoint que lee esta
sonda. Lee `GET /rest/applinks/1.0/manifest`, el mismo manifiesto de
Application Links que expone todo producto Atlassian Data Center; es
anónimo, y por eso se usa en lugar de `/rest/api/2/serverInfo`.

```yaml
targets:
  - id: bitbucket-main
    product: bitbucket
    address: https://bitbucket.example.com
```

## Autenticación

Opcional: el manifiesto se puede leer sin credenciales. Se aceptan `none`,
`basic` y `bearer` si, aun así, prefiere autenticarse.

## Verificación de la identidad del fabricante

El `<typeId>` del manifiesto se compara con lo que espera
`product: bitbucket`. **El propio manifiesto de Bitbucket sigue
identificándose como `stash`**, su nombre anterior al cambio de marca de
Atlassian, así que `typeId: stash` es correcto y esperado aquí; es la
respuesta del fabricante, no una peculiaridad de enodia. Una URL que
resulte ser Jira o Confluence sigue fallando de forma explícita en lugar
de registrarse como un dato erróneo; consulte
[Jira](/es/configuration/products/jira/),
[Confluence](/es/configuration/products/confluence/) y
[Bamboo](/es/configuration/products/bamboo/) para los productos hermanos
que comparten esta misma convención de manifiesto.

## Campos registrados

- `version`
- `extra.buildNumber`, `extra.typeId` — `typeId` contendrá `stash`, no
  `bitbucket`

## Correlación de CVE

Se contrasta con NVD y BDU FSTEC cuando hay configurado un [bloque `cve:`](/es/cve/).

## Resolvedor del ciclo de vida

`endoflife:bitbucket`.
