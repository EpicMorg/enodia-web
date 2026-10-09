---
title: openHAB
description: Configuración de enodia para sondear openHAB.
---

Lee la raíz de la API REST, `GET /rest/`, que openHAB sirve sin inicio de
sesión.

```yaml
targets:
  - id: openhab-main
    product: openhab
    address: https://openhab.example.com
```

## Qué versión es cuál

`/rest/` responde con dos versiones: un `version` de nivel superior
(`"8"`), que es la de la propia API REST, y `runtimeInfo.version`
(`"5.2.2"`), que es la de openHAB; confirmado en vivo en
`openhab/openhab:latest`, cuyo `version.properties` indicaba openhab-distro
5.2.2. La sonda notifica `runtimeInfo.version`; la versión de la API REST
va a `extra`.

## Autenticación

Opcional. `/rest/` responde de forma anónima por defecto; `/rest/systeminfo`
necesita inicio de sesión y no se usa. Para una instancia que desactive el
acceso anónimo, se envían credenciales `bearer` o `basic` si están
configuradas:

```yaml
credentials:
  openhab-token:
    kind: bearer
    value: "${OPENHAB_TOKEN}"
```

Cualquier otro tipo es un error de configuración. Consulte
[Configuración → Credenciales](/es/configuration/#credenciales).

## Campos registrados

- `version`: `runtimeInfo.version`, p. ej. `5.2.2`
- `extra.build`: `runtimeInfo.buildString`, p. ej. `Release Build`
- `extra.restApiVersion`: el `version` de nivel superior, p. ej. `8`

## Correlación de CVE

Se contrasta con NVD cuando hay configurado un [bloque `cve:`](/es/cve/).

## Resolvedor del ciclo de vida

`github:openhab/openhab-distro`: endoflife.date no tiene un calendario de
openHAB (404 confirmado), por lo que se resuelve contra GitHub Releases:
solo la última etiqueta publicada que no sea prerelease, sin fechas
eol/support/lts (GitHub no tiene opinión sobre la política de ciclo de
vida, solo sobre «cuál es la última versión»). openhab-distro publica los
hitos (`5.3.0.M2`) como versiones normales, sin marcarlos como
preversiones; el resolvedor los omite por el nombre de su etiqueta, para
que un hito no haga que todo openHAB estable aparezca como desactualizado.
