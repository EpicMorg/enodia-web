---
title: YouTrack
description: Como configurar o enodia para sondar o YouTrack.
---

Lê `GET /api/config?fields=version`.

```yaml
targets:
  - id: youtrack-main
    product: youtrack
    address: https://youtrack.example.com
```

## Autenticação

Nenhuma é necessária — confirmado ao vivo com uma instância real do
YouTrack exposta à internet: este endpoint não precisa de credenciais, e
pedir qualquer campo além de `version` (`buildDate`, `edition`, ...) é
silenciosamente ignorado para um chamador anônimo, em vez de retornado.
`bearer` é aceito caso você prefira se autenticar mesmo assim.

## Campos registrados

Apenas `version` — esta sonda não registra nenhum campo `extra`.

## Correlação de CVEs

Correlacionado com o NVD e o BDU FSTEC quando um [bloco `cve:`](/pt-br/cve/) está configurado.

## Resolvedor de ciclo de vida

`endoflife:youtrack`.
