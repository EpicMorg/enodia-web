---
title: Home Assistant
description: Configuración de enodia para sondear Home Assistant.
---

Lee `GET /api/config` de la API REST de Home Assistant, con un token de
acceso de larga duración. También se acepta el alias `homeassistant` como
`product:`.

```yaml
targets:
  - id: home-assistant-main
    product: home-assistant
    address: https://home-assistant.example.com
    credentials: ha-token
```

## Autenticación — obligatoria

Nada anónimo incluye la versión de Home Assistant: `/api/` y
`/api/config` responden `401`, y `/manifest.json`, `/auth/providers` y los
endpoints de configuración inicial no la incluyen (confirmado en vivo en
`ghcr.io/home-assistant/home-assistant:stable` 2026.10.0). La
autenticación documentada de la API REST es un token de acceso de larga
duración (Profile → Security → Long-lived access tokens), enviado como
`Authorization: Bearer`:

```yaml
credentials:
  ha-token:
    kind: bearer
    value: "${HOME_ASSISTANT_TOKEN}"
```

Solo se acepta `bearer`; cualquier otro tipo es un error de configuración.
Consulte [Configuración → Credenciales](/es/configuration/#credenciales).

## Qué se lee

`/api/config` también devuelve las coordenadas, rutas y URL de la casa.
Nada de eso se lee: solo `version`, `state` y los indicadores de modo
seguro/de recuperación.

## Campos registrados

- `version`: p. ej. `2026.10.0`
- `extra.state`: p. ej. `RUNNING`
- `extra.recoveryMode`: `true` cuando Home Assistant indica modo seguro o
  modo de recuperación; ausente en caso contrario

## Correlación de CVE

Se contrasta con NVD cuando hay configurado un [bloque `cve:`](/es/cve/).

## Resolvedor del ciclo de vida

`github:home-assistant/core`: endoflife.date no tiene un calendario de
Home Assistant (404 confirmado), por lo que se resuelve contra GitHub
Releases: solo la última etiqueta publicada que no sea prerelease, sin
fechas eol/support/lts (GitHub no tiene opinión sobre la política de ciclo
de vida, solo sobre «cuál es la última versión»). Una versión cuya
etiqueta designa una preversión (`2026.10.0b7`) se omite aunque GitHub no
la marque como tal.
