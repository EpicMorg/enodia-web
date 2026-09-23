---
title: Jenkins
description: Configuración de enodia para sondear Jenkins.
---

Lee la versión de la **cabecera de respuesta `X-Jenkins`**, no del cuerpo
de la respuesta: Jenkins envía esa cabecera en todas las respuestas,
incluido un `403` a una solicitud no autenticada, mientras que el cuerpo
que recibe una solicitud autenticada no contiene ningún campo de versión.

```yaml
targets:
  - id: jenkins-main
    product: jenkins
    address: https://jenkins.example.com
```

## Autenticación

Opcional. Una instancia recién instalada con su security realm
predeterminado responde `/api/json` con `403` a una solicitud anónima;
eso no es un fallo aquí, `X-Jenkins` sigue presente en esa misma
respuesta. Se acepta autenticación Basic si prefiere autenticarse:

```yaml
credentials:
  jenkins-admin:
    kind: basic
    username: admin
    password: "${JENKINS_TOKEN}"
```

## Campos registrados

- `version`: de la cabecera `X-Jenkins`
- `extra.mode`, `extra.useSecurity`: solo se rellenan cuando la solicitud
  estaba lo bastante autenticada como para recibir un cuerpo `200`;
  ausentes en un `403` anónimo

## Correlación de CVE

Se contrasta con NVD y BDU FSTEC cuando hay configurado un [bloque `cve:`](/es/cve/).

## Resolvedor del ciclo de vida

`endoflife:jenkins`.
