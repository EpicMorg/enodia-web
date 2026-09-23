---
title: Fortinet FortiOS (FortiGate)
description: Configuración de enodia para sondear un Fortinet FortiGate con FortiOS.
---

Lee `GET /api/v2/monitor/system/status`, la propia API REST de FortiOS.
Verificado con un FortiGate 601E real con FortiOS 7.4.12.

```yaml
targets:
  - id: fw-edge
    product: fortios
    address: https://fw.example.com
    credentials: fortigate-api
```

## Autenticación — obligatoria

Un token de **REST API Admin**: cree un REST API Admin en la interfaz
gráfica de FortiGate (System → Administrators) y copie la clave de API que
genera; FortiOS la muestra una sola vez. Se envía como un bearer token
simple, sin inicio de sesión, sin token CSRF y sin parámetro de consulta
`access_token`:

```yaml
credentials:
  fortigate-api:
    kind: bearer
    value: "${FORTIGATE_API_TOKEN}"
```

Un token ausente o incorrecto recibe `401` (con una página de error HTML,
no JSON), que se informa como error de autenticación igual que en
cualquier otra sonda. En FortiOS se puede limitar un REST API Admin a
hosts de confianza; si lo hace, incluya la dirección desde la que se
conecta enodia.

## Campos registrados

- `version` — tal como la indica FortiOS, p. ej. `v7.4.12` (la `v`
  inicial se elimina al comparar, no al registrar)
- `extra.model` — p. ej. `FG6H1E` (el 601E)
- `extra.build` — el número de compilación de FortiOS

El nombre de host del dispositivo figura en la misma respuesta, pero
deliberadamente no se registra.

## Correlación de CVE

Se contrasta con NVD y BDU FSTEC cuando hay configurado un [bloque `cve:`](/es/cve/).

## Resolvedor del ciclo de vida

`endoflife:fortios`. La página de FortiOS en endoflife.date incluye los
ciclos de versiones y sus fechas, pero ninguna «última versión» para
ningún ciclo, así que el eje del ciclo de vida funciona mientras que
`drift` muestra `LATEST: -` y `PATCH: unknown`: es una carencia de los
datos de origen, no un error de la sonda.
