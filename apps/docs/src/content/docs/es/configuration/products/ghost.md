---
title: Ghost
description: Configuración de enodia para sondear Ghost.
---

Lee `GET /ghost/api/admin/site/` (el único endpoint de la Admin API que
Ghost sirve sin sesión ni clave; la aplicación de administración lo lee
antes del inicio de sesión) y toma `site.version`. El esquema por defecto
es `https`.

```yaml
targets:
  - id: ghost-main
    product: ghost
    address: https://blog.example.com
```

## Solo major.minor es público

Confirmado en vivo en `ghost:6`: el endpoint indicaba `6.69`, igual que
`<meta name="generator">` y la cabecera `Content-Version`, mientras que el
paquete instalado era la 6.69.0. La versión completa está tras la clave
de la Admin API, un JWT firmado: un nuevo tipo de credencial por un solo
dígito no merece la pena, ya que las versiones de Ghost son `x.y.0` casi
sin excepción, y `6.69` se compara como igual a la etiqueta `v6.69.0`.

## Autenticación

Ninguna: el endpoint es público y la sonda no acepta ningún tipo de
credencial. Desde la 2.2.0, una credencial asociada a un destino `ghost`
es un error de configuración y no se ignora en silencio; consulte
[Configuración → Credenciales](/es/configuration/#credenciales).

## Campos registrados

Solo `version`: major.minor, p. ej. `6.69`; esta sonda no registra ningún
campo `extra`.

## Correlación de CVE

Se contrasta con NVD y BDU FSTEC cuando hay configurado un [bloque `cve:`](/es/cve/).

## Resolvedor del ciclo de vida

`github:TryGhost/Ghost`: endoflife.date no tiene un calendario de Ghost
(404 confirmado), por lo que se resuelve contra GitHub Releases: solo la
última etiqueta publicada que no sea prerelease, sin fechas
eol/support/lts (GitHub no tiene opinión sobre la política de ciclo de
vida, solo sobre «cuál es la última versión»).
