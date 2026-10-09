---
title: Splunk
description: Configuración de enodia para sondear Splunk.
---

Lee `GET /services/server/info?output_mode=json` del puerto de gestión de
splunkd, no de la interfaz web. Una dirección sin puerto recibe `8089` (el
puerto de gestión de splunkd); el esquema por defecto es `https`.

```yaml
targets:
  - id: splunk-main
    product: splunk
    address: splunk.example.com
    credentials: splunk-monitor
```

## Por qué el puerto de gestión

La interfaz web (puerto 8000) es el lugar equivocado para preguntar: a
menudo se publica detrás de un proxy o una CDN, y su página de inicio de
sesión no incluye ninguna versión en la que merezca la pena confiar. El
puerto de gestión de splunkd es directo, y `/services/server/info`
responde con `entry[0].content`: `version`, `build`, `product_type`,
`isFree`/`isTrial`. La sonda no tiene nada que leer en el puerto web, y
por eso un nombre de host sin más recibe `8089` en lugar del puerto por
defecto del esquema.

## Autenticación — obligatoria

Sin credenciales, splunkd responde `401` con un XML
`<msg type="ERROR">Unauthorized</msg>` y `Server: Splunkd` (visto en una
9.4.1 de producción y en `splunk/splunk` 10.6.0.5). Se aceptan dos tipos:
un usuario de Splunk por HTTP Basic, o un token de autenticación de Splunk
como Bearer:

```yaml
credentials:
  splunk-monitor:
    kind: basic
    username: monitor
    password: "${SPLUNK_PASSWORD}"
```

```yaml
credentials:
  splunk-token:
    kind: bearer
    value: "${SPLUNK_TOKEN}"
```

Cualquier otro tipo es un error de configuración. Consulte
[Configuración → Credenciales](/es/configuration/#credenciales).

## Campos registrados

- `version`: `entry[0].content.version`, p. ej. `10.6.0.5`
- `extra.build`: p. ej. `86587d4e3b27`
- `extra.license`: `free` o `trial`, cuando splunkd indica uno de ellos;
  ausente en caso contrario
- `extra.productType`: el propio `product_type` de splunkd, p. ej.
  `enterprise`

## Correlación de CVE

Se contrasta con NVD y BDU FSTEC cuando hay configurado un [bloque `cve:`](/es/cve/).

Tiene en cuenta la edición: NVD divide `splunk:splunk` por edición en
`enterprise` y la `light`, retirada hace tiempo, y `extra.productType`
(`enterprise`, `lite`) elige cuál se aplica. Una edición desconocida
conserva todos los hallazgos. Splunk Cloud tiene su propio CPE y no tiene
correspondencia.

## Resolvedor del ciclo de vida

`endoflife:splunk`. Una compilación más reciente que el calendario (la
10.6, en un momento en que endoflife.date llegaba hasta la 10.4) aparece
como `cycle_unmatched` hasta que el calendario se pone al día.
