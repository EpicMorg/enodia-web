---
title: Artifactory
description: Configuración de enodia para sondear JFrog Artifactory.
---

Lee `GET /artifactory/api/system/version` para obtener la versión.

```yaml
targets:
  - id: artifactory-main
    product: artifactory
    address: https://artifactory.example.com
```

## Autenticación

Opcional. Que este endpoint necesite credenciales o no depende de la
instancia; se confirmó con dos servidores reales: una instalación OSS
recién hecha responde `401` a peticiones anónimas, pero una instancia de
producción con «Allow Anonymous Access» activado respondió `200` sin
ninguna credencial. La autenticación Basic funciona cuando hace falta:

```yaml
credentials:
  artifactory-admin:
    kind: basic
    username: admin
    password: "${ARTIFACTORY_PASSWORD}"
```

## Campos registrados

- `version` — p. ej. `7.161.20`
- `extra.revision`, cuando la respuesta lo incluye

La respuesta también incluye `license`, `addons` y `entitlements`, que
deliberadamente nunca se leen. En una instancia de producción real,
`license` era una huella propia de cada instalación, no un literal fijo,
y ninguno de los tres describe el software en sí.

## Correlación de CVE

Se contrasta con NVD y BDU FSTEC cuando hay configurado un [bloque `cve:`](/es/cve/).

## Resolvedor del ciclo de vida

`endoflife:artifactory`.
