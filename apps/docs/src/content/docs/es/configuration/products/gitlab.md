---
title: GitLab
description: Configuración de enodia para sondear GitLab.
---

Lee `GET /api/v4/version` para obtener la versión.

```yaml
targets:
  - id: gitlab-main
    product: gitlab
    address: https://gitlab.example.com
    credentials: gitlab-token
```

## Autenticación

GitLab exige por defecto una credencial para este endpoint: una petición
sin autenticar recibe un `401`. Un token de acceso personal funciona de
las dos formas, confirmado en vivo contra una instancia real:

```yaml
credentials:
  gitlab-token:
    kind: token-header
    header: PRIVATE-TOKEN
    value: "${GITLAB_TOKEN}"

  # igualmente válido: el mismo token como bearer token simple
  gitlab-token-bearer:
    kind: bearer
    value: "${GITLAB_TOKEN}"
```

## Campos registrados

- `version`
- `extra.revision`, cuando está presente
- `extra.enterprise` — `"true"`/`"false"`, GitLab EE frente a CE

## Correlación de CVE

Se contrasta con NVD y BDU FSTEC cuando hay configurado un [bloque `cve:`](/es/cve/). Tiene en cuenta la edición: la sonda registra la edición del propio servidor en `extra.enterprise`, y una instancia community no ve los hallazgos exclusivos de la edición enterprise. Una edición desconocida conserva todos los hallazgos.

## Resolvedor del ciclo de vida

`endoflife:gitlab`.
