---
title: Perforce Proxy (p4p)
description: Configuración de enodia para sondear Perforce Proxy (p4p).
---

Ejecuta `p4 -Ztag -p <address> info`: el mismo comando y el mismo
mecanismo de CLI externa que usa [`p4d`](/es/configuration/products/p4d/);
consulte esa página para saber por qué invoca el propio binario `p4` del
operador en lugar de hablar directamente el protocolo de red de Perforce.

```yaml
targets:
  - id: p4p-main
    product: p4p
    address: p4p.example.com:1666
```

## Requiere la CLI `p4` en la máquina que ejecuta enodia

Igual que [`p4d`](/es/configuration/products/p4d/#requiere-la-cli-p4-en-la-máquina-que-ejecuta-enodia):
sobrescriba la ruta del binario con `options.binary` si `p4` no está en
`$PATH`:

```yaml
targets:
  - id: p4p-main
    product: p4p
    address: p4p.example.com:1666
    options:
      binary: /opt/perforce/bin/p4
```

## Tiempo de espera

`timeout` (por destino, con `defaults.timeout` como valor de respaldo)
se aplica al subproceso `p4` del mismo modo que se aplica al transporte
propio de cualquier otra sonda; consulte
[la nota propia de `p4d`](/es/configuration/products/p4d/#tiempo-de-espera) para
saber por qué esto importa de forma concreta en el caso de Perforce.
Corregido en 1.2.1.

## Autenticación

Ninguna: confirmado en vivo que `info` responde por completo sin
autenticación en un proxy de producción real.

## Verificación de la identidad del fabricante

Un proxy responde a `info` con todo lo que responde un servidor directo,
**más su propio campo `proxyVersion`**: los campos `serverVersion`/
`ServerID`/`serverServices` del servidor backend pasan sin cambios y
describen el servidor que está detrás del proxy, no el proxy en sí. Esta
sonda exige que `proxyVersion` esté presente y rechaza la respuesta de
un servidor directo (que no tiene ese campo) en lugar de informar la
versión del producto equivocado: la misma comprobación que
[`p4d`](/es/configuration/products/p4d/) realiza a la inversa.

## Campos registrados

- `version`: p. ej. `2024.2`, extraída de la forma
  `P4P/LINUX26X86_64/2024.2/2832881 (2025/09/30)` de `proxyVersion`
- `extra.raw`: la cadena `proxyVersion` completa sin analizar
- `extra.backendServerVersion`, `extra.backendServerID`: la versión/ID
  propios del `p4d` backend, transmitidos desde la misma respuesta,
  cuando están presentes

## Correlación de CVE

No se contrasta: ninguna de las dos bases de datos tiene datos utilizables para este producto. Consulte [Correlación de CVE](/es/cve/#qué-productos-tienen-correspondencia).

## Resolvedor del ciclo de vida

Ninguno: Perforce es propietario, no tiene página en endoflife.date con
ninguno de los slugs probados (404 confirmado) ni releases públicas en
GitHub a las que recurrir. Solo inventario, igual que
[`p4d`](/es/configuration/products/p4d/).
