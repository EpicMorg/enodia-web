---
title: Traefik
description: Como configurar o enodia para sondar o Traefik.
---

Lê `GET /api/version`.

```yaml
targets:
  - id: traefik-main
    product: traefik
    address: https://traefik.example.com
```

## Autenticação

Opcional. Confirmado ao vivo com um contêiner `traefik:v3.1` real: com o
roteador da API habilitado (desativado por padrão — nem `--api` nem
`--api.insecure` vêm definidos em uma instância padrão) sob
`--api.insecure=true`, este endpoint não precisa de credenciais. Uma
implantação que, em vez disso, coloca o roteador da API atrás do seu
próprio middleware de autenticação Basic/Digest (a forma "segura"
documentada pelo Traefik para expô-lo) responde com desafios HTTP Basic
comuns:

```yaml
credentials:
  traefik-basic:
    kind: basic
    username: admin
    password: "${TRAEFIK_PASSWORD}"
```

Uma instância com a API totalmente desabilitada responde `404` aqui,
indistinguível de um endereço errado.

## Campos registrados

Apenas `version` — esta sonda não registra nenhum campo `extra` (`Codename`
e `startDate` descrevem a release, não a implantação, e não são lidos).

## Correlação de CVEs

Correlacionado com o NVD e o BDU FSTEC quando um [bloco `cve:`](/pt-br/cve/) está configurado.

## Resolvedor de ciclo de vida

`endoflife:traefik`.
