---
title: postgres_exporter
description: Configuración de enodia para sondear prometheus-community/postgres_exporter.
---

Lee la métrica gauge `postgres_exporter_build_info` de `/metrics`: el
«version collector» de `prometheus/common` que todo exporter de Prometheus
de este ecosistema expone de la misma manera (un `1` constante, con la
versión en una etiqueta, no en el valor). También se acepta
`product: postgres-exporter` como alias.

```yaml
targets:
  - id: postgres-exporter-main
    product: postgres_exporter
    address: https://exporter.example.com:9187
```

## Autenticación

Opcional: `/metrics` no requiere credenciales por defecto y responde
incluso cuando el propio PostgreSQL de destino no está accesible
(`build_info` describe el binario del exporter, no la base de datos que
recopila). `exporter-toolkit` (la biblioteca que hay detrás de
`--web.config.file`) puede añadir HTTP Basic a este endpoint:

```yaml
credentials:
  postgres-exporter-basic:
    kind: basic
    username: metrics
    password: "${EXPORTER_PASSWORD}"
```

## Campos registrados

Solo `version`: esta sonda no registra ningún campo `extra`.

## Correlación de CVE

No se contrasta: ninguna de las dos bases de datos tiene datos utilizables para este producto. Consulte [Correlación de CVE](/es/cve/#qué-productos-tienen-correspondencia).

## Resolvedor del ciclo de vida

`github:prometheus-community/postgres_exporter`: se trata de un exporter
de Prometheus, no de un producto con su propia política de ciclo de
vida/EOL, por lo que se resuelve contra GitHub Releases: solo la última
etiqueta publicada que no sea prerelease, sin fechas eol/support/lts.
