---
title: Vistas
description: compact, lifecycle, drift y fleet; cuatro cortes de los mismos datos.
---

Tanto `check` como `export` presentan uno de cuatro enfoques, que se
elige con `--view` (o con `render.default_view` de `settings.yaml` cuando
no se pasa la opción). Cada vista es un corte distinto de los mismos
datos de inventario y evaluación, no una fuente de datos distinta.

## `compact` (la predeterminada)

Una fila por destino: los tres ejes, la severidad global y el motivo, si
algo requiere atención.

```console
$ enodia check
ID           PRODUCT  PATCH   LIFECYCLE  BRANCH     SEVERITY  REASON  CVES
jira-main    jira     behind  active     newer_lts  warn      -       12
gitlab-main  gitlab   behind  eol        newer      fail      -       -
```

La última columna, `CVES`, es el número de CVE distintas que afectan a
esa versión exacta: `-` cuando no hay ninguna, también cuando no hay
ningún [bloque `cve:`](/es/cve/) configurado o el producto no tiene
correspondencia. `drift` incluye la misma columna; `lifecycle` y `fleet`
no. Las CVE nunca modifican `SEVERITY` ni el código de salida.

## `lifecycle`

Cuándo termina realmente el ciclo de vida de cada destino:

```console
$ enodia check --from inventory.jsonl --view lifecycle
ID           PRODUCT  LIFECYCLE  EOL         SUPPORT-ENDS  DAYS-TO-EOL
jira-main    jira     active     2026-12-05  -             338
gitlab-main  gitlab   eol        2025-01-16  2024-11-21    -350
```

## `drift`

La versión instalada frente a la última versión publicada del mismo
ciclo:

```console
$ enodia check --from inventory.jsonl --view drift
ID           PRODUCT  CURRENT  LATEST   CYCLE  PATCH   CVES
jira-main    jira     10.3.1   10.3.25  10.3   behind  12
gitlab-main  gitlab   17.5.0   17.5.5   17.5   behind  -
```

## `fleet`

Dispersión de versiones y accesibilidad de todas las instancias de un
producto, agrupadas en lugar de enumeradas en una fila por destino. Es
la vista **solo sin conexión**: no necesita nada más que el propio
inventario, ni resolvedor del ciclo de vida ni acceso a internet en
absoluto. Dos instancias fallidas del mismo producto con distintos tipos
de fallo (autenticación frente a inaccesible) tienen sus propias filas,
no un grupo `(unknown)` compartido:

```console
$ enodia check --from inventory.jsonl --view fleet
PRODUCT  VERSION    STATUS       COUNT  INSTANCES
gitlab   (unknown)  auth         1      gitlab-2
gitlab   18.2.1     ok           1      gitlab-1
jira     (unknown)  unreachable  1      jira-staging
jira     10.3.1     ok           1      jira-3
jira     10.3.2     ok           2      jira-1, jira-2
```

## Qué ignora `--view`

`export --format json` y `export --format prometheus` ignoran `--view`
por completo: siempre incluyen todas las observaciones y evaluaciones.
Las vistas solo dan forma a la salida en tabla y al informe HTML
(`export --format html`); consulte [Informes](/es/reporting/).
