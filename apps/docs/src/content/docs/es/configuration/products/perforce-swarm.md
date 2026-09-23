---
title: Perforce Helix Swarm
description: Configuración de enodia para sondear Perforce Helix Swarm.
---

Lee `GET /api/version` para obtener la versión: deliberadamente la ruta
sin versión en lugar de una concreta como `/api/v11/version`. Perforce ha
ido cambiando a lo largo de los años la versión mínima de esta API
(Swarm 2017.3 solo habla v7; 2018.2 habla v9), y solicitar un `vN` fuera
de rango devuelve un `401` en un endpoint que, por lo demás, es
completamente anónimo. La forma sin versión evita tener que adivinar qué
`vN` sigue aceptando una instalación concreta.

```yaml
targets:
  - id: swarm-main
    product: perforce-swarm
    address: https://swarm.example.com
```

## Autenticación

Ninguna: el endpoint no acepta ninguna forma de credencial.

## Análisis de la versión

El campo en bruto tiene el aspecto `SWARM/2024.6/2710109 (2025/01/28)` y
se descompone en una versión simple (`2024.6`), una changelist y una
fecha de publicación. Un formato no reconocido recurre a conservar la
cadena en bruto como `version` en lugar de fallar directamente, ya que
sigue siendo el dato que informó el servidor.

## Campos registrados

- `version`: p. ej. `2024.6`
- `extra.raw`: la cadena completa sin analizar
- `extra.changelist`, `extra.releaseDate`: solo cuando el formato se
  pudo analizar

## Correlación de CVE

No se contrasta: ninguna de las dos bases de datos tiene datos utilizables para este producto. Consulte [Correlación de CVE](/es/cve/#qué-productos-tienen-correspondencia).

## Resolvedor del ciclo de vida

Ninguno: endoflife.date no tiene calendario bajo `perforce-swarm`,
`helix-swarm`, `swarm` ni `perforce` (404 confirmado en todos los
casos). Por ahora, solo inventario.
