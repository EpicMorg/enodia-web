---
title: Bamboo
description: Configuración de enodia para sondear Atlassian Bamboo (Data Center).
---

**Solo Data Center**: Atlassian Cloud no expone el endpoint que lee esta
sonda. Lee `GET /rest/applinks/1.0/manifest`, el mismo manifiesto de
Application Links que expone todo producto Atlassian Data Center; es
anónimo, y por eso se usa en lugar de `/rest/api/2/serverInfo`.

```yaml
targets:
  - id: bamboo-main
    product: bamboo
    address: https://bamboo.example.com
```

## Autenticación

Opcional: el manifiesto se puede leer sin credenciales. Se aceptan `none`,
`basic` y `bearer` si, aun así, prefiere autenticarse.

## Verificación de la identidad del fabricante

El `<typeId>` del manifiesto se compara con lo que espera `product: bamboo`
(`bamboo`). Una URL que resulte ser Jira o Confluence falla de forma
explícita en lugar de registrarse como un dato erróneo; consulte
[Jira](/es/configuration/products/jira/),
[Confluence](/es/configuration/products/confluence/) y
[Bitbucket](/es/configuration/products/bitbucket/) para los productos
hermanos que comparten esta misma convención de manifiesto.

## Campos registrados

- `version`
- `extra.buildNumber`, `extra.typeId` — `typeId` contendrá `bamboo`

## Correlación de CVE

Se contrasta con NVD y BDU FSTEC cuando hay configurado un [bloque `cve:`](/es/cve/).

## Resolvedor del ciclo de vida

`endoflife:bamboo`, ya conectado. [endoflife.date/bamboo](https://endoflife.date/bamboo)
es un calendario real y activo; una revisión anterior de esta página
afirmaba por error que no existía tal calendario, basándose solo en que
`registry.go` tenía `resolver: ""` sin explicación, en lugar de comprobarlo
directamente en endoflife.date. Esto está corregido tanto aquí como en el
proyecto original.
