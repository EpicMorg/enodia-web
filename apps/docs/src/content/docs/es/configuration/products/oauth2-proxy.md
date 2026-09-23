---
title: oauth2-proxy
description: Configuración de enodia para sondear oauth2-proxy.
---

Lee la versión impresa en el pie de página de `/oauth2/sign_in`.
oauth2-proxy no tiene ningún endpoint de versión en JSON: la página de
inicio de sesión es la única superficie anónima (debe mostrarse antes de
que exista ninguna sesión), y su plantilla predeterminada escribe la
versión directamente en el texto del pie de página.

```yaml
targets:
  - id: oauth2-proxy-main
    product: oauth2-proxy
    address: https://auth.example.com
```

## Autenticación

Ninguna: confirmado en vivo contra la página predeterminada de un
contenedor `oauth2-proxy/oauth2-proxy` real.

## El flag `--footer` puede ocultar la versión

El propio flag `--footer` de un despliegue puede sustituir u ocultar
(`-`) toda esa línea; en ese caso no existe ninguna alternativa anónima.
Se trata de un producto confirmado cuya versión retiene la propia
configuración del despliegue, no de un error de la sonda.

## Campos registrados

Solo `version`: esta sonda no registra ningún campo `extra`.

## Correlación de CVE

Se contrasta con NVD y BDU FSTEC cuando hay configurado un [bloque `cve:`](/es/cve/).

## Resolvedor del ciclo de vida

`github:oauth2-proxy/oauth2-proxy`: hoy no hay calendario en
endoflife.date, por lo que se resuelve contra GitHub Releases: solo la
última etiqueta publicada que no sea prerelease, sin fechas
eol/support/lts.
