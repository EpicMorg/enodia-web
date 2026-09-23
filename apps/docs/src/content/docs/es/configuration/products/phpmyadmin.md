---
title: phpMyAdmin
description: Configuración de enodia para sondear phpMyAdmin.
---

Lee la versión de la propia llamada de arranque `CommonParams.setAll({...})`
de la página de inicio de sesión: el JS de phpMyAdmin usa este objeto en
cada petición AJAX que realiza, así que se incluye en todas las páginas,
con o sin autenticación, sin necesidad de un endpoint de versión aparte.

```yaml
targets:
  - id: phpmyadmin-main
    product: phpmyadmin
    address: https://phpmyadmin.example.com
```

## Autenticación

Ninguna: confirmado en vivo contra un contenedor real `phpmyadmin/phpmyadmin`.

## Campos registrados

Solo `version`: esta sonda no registra ningún campo `extra`.

## Correlación de CVE

Se contrasta con NVD y BDU FSTEC cuando hay configurado un [bloque `cve:`](/es/cve/).

## Resolvedor del ciclo de vida

`endoflife:phpmyadmin`.
