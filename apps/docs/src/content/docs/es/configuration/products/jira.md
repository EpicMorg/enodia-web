---
title: Jira
description: Configuración de enodia para sondear Atlassian Jira (Data Center).
---

**Solo Data Center**: Atlassian Cloud no expone el endpoint que lee esta
sonda. Lee `GET /rest/applinks/1.0/manifest`, el mismo manifiesto de
Application Links que expone todo producto Atlassian Data Center; es
anónimo, y por eso se usa en lugar de `/rest/api/2/serverInfo`.

```yaml
targets:
  - id: jira-main
    product: jira
    address: https://jira.example.com
```

## Autenticación

Opcional: el manifiesto se puede leer sin credenciales. Se aceptan
`none`, `basic` y `bearer` si, aun así, prefiere autenticarse.

## Verificación de la identidad del fabricante

El `<typeId>` del manifiesto se compara con lo que espera `product: jira`
(`jira`). Una URL que resulta ser Confluence o Bitbucket falla de forma
explícita en lugar de registrarse como un dato erróneo; consulte
[Confluence](/es/configuration/products/confluence/),
[Bitbucket](/es/configuration/products/bitbucket/),
[Bamboo](/es/configuration/products/bamboo/) para los productos hermanos
que comparten esta misma convención de manifiesto.

## Campos registrados

- `version`
- `extra.buildNumber`, `extra.typeId`: `typeId` será `jira`

## Correlación de CVE

Se contrasta con NVD y BDU FSTEC cuando hay configurado un [bloque `cve:`](/es/cve/). Desde la 2.2, `cve.atlassian.path` añade
los propios datos por versión de Atlassian, incluidas las CVE de
dependencias de terceros, que las entradas de Atlassian en NVD no
incluyen, y, para una versión que figure en ellos, su veredicto prevalece
dentro de la propia rama de la versión. Consulte
[Datos propios de los fabricantes → Atlassian](/es/cve/#atlassian).

## Resolvedor del ciclo de vida

`endoflife:jira-software`: tenga en cuenta que el slug es `jira-software`, no `jira`.
