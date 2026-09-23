---
title: Forgejo
description: Configuración de enodia para sondear Forgejo.
---

Lee `GET /api/v1/version`, un endpoint compatible con la API de Gitea que
Forgejo (un fork de Gitea) sigue ofreciendo en la misma ruta.

```yaml
targets:
  - id: forgejo-main
    product: forgejo
    address: https://forgejo.example.com
```

## Autenticación

Opcional: anónimo por defecto. Una instancia con
`REQUIRE_SIGNIN_VIEW = true` (una opción real de endurecimiento) responde
`403` en su lugar, lo que se trata igual que el desafío de autenticación
de cualquier otra sonda. Se aceptan tanto `basic` como `token-header`;
consulte [Configuración → Credenciales](/es/configuration/#credenciales)
para la forma exacta de los campos de cada uno.

## Campos registrados

Solo `version`: esta sonda no registra ningún campo `extra`.

## Correlación de CVE

Se contrasta con NVD y BDU FSTEC cuando hay configurado un [bloque `cve:`](/es/cve/).

## Resolvedor del ciclo de vida

`endoflife:forgejo`.
