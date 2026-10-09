---
title: Euro-Office Docs
description: Configuración de enodia para sondear Euro-Office Docs.
---

Euro-Office Docs es la bifurcación de ONLYOFFICE Docs que distribuye
Nextcloud (`nextcloud/aio-eurooffice`). Igual que
[ONLYOFFICE Docs](/es/configuration/products/onlyoffice/), se lee de forma
anónima desde la raíz del servidor de documentos, `GET /index.html`
(«Version: 9.3.1. Build: 37. Release date: 2016-06-29…»), y después se lee
`GET /welcome/` para comprobar la marca. El esquema por defecto es
`https`.

```yaml
targets:
  - id: eurooffice-main
    product: euro-office
    address: https://office.example.com
```

## Una sonda, dos productos

Euro-Office comparte su sonda con
[`onlyoffice`](/es/configuration/products/onlyoffice/), pero tiene su
propia línea de versiones (Euro-Office/DocumentServer: v9.3.3, v9.3.4,
v9.3.4-hotfix.1), separada de la de ONLYOFFICE (v9.3.1, v9.4.0), así que
es un producto propio con su propio resolvedor: comparado con las
versiones de ONLYOFFICE, un Euro-Office actualizado aparecería siempre
como desactualizado. La fecha de publicación de su `/index.html` es un
valor de relleno; la versión es real (el propio paquete de la imagen es
`euro-office-documentserver 9.3.1-dev.1`).

`/index.html` es idéntico en ambos, así que la marca sale del título de
`/welcome/`: «Euro-Office Docs Community Edition» frente a «ONLYOFFICE
Docs Community Edition». **Un servidor de la otra marca se rechaza
indicando el producto que debe usarse**: `product: euro-office` apuntado a
un servidor ONLYOFFICE falla con `this document server is ONLYOFFICE, not Euro-Office —
use product: onlyoffice`. Si la página de bienvenida está desactivada
(404), se da por hecho que el servidor es lo que indica la configuración.

## Autenticación

Ninguna: ambas páginas son públicas y la sonda no acepta ningún tipo de
credencial. Desde la 2.2.0, una credencial asociada a un destino
`euro-office` es un error de configuración y no se ignora en silencio;
consulte [Configuración → Credenciales](/es/configuration/#credenciales).

## Campos registrados

- `version`: p. ej. `9.3.1`
- `extra.build`: el número de compilación, p. ej. `37`
- `extra.edition`: a partir del tipo de paquete: `community` (0),
  `enterprise` (1) o `developer` (2)
- `extra.brand`: la marca del título de `/welcome/` (`Euro-Office`),
  cuando la página de bienvenida está activa

## Correlación de CVE

No se contrasta: ninguna de las dos bases de datos tiene datos utilizables para este producto. Consulte [Correlación de CVE](/es/cve/#qué-productos-tienen-correspondencia).
Es una bifurcación sin entradas propias; las entradas de ONLYOFFICE no se
le aplican.

## Resolvedor del ciclo de vida

`github:Euro-Office/DocumentServer`: endoflife.date no tiene un calendario
de Euro-Office (404 confirmado), por lo que se resuelve contra GitHub
Releases: solo la última etiqueta publicada que no sea prerelease, sin
fechas eol/support/lts (GitHub no tiene opinión sobre la política de ciclo
de vida, solo sobre «cuál es la última versión»).
