---
title: Forgejo
description: Como configurar o enodia para sondar o Forgejo.
---

Lê `GET /api/v1/version` — um endpoint compatível com a API do Gitea que
o Forgejo (um fork do Gitea) ainda traz no mesmo caminho.

```yaml
targets:
  - id: forgejo-main
    product: forgejo
    address: https://forgejo.example.com
```

## Autenticação

Opcional — anônimo por padrão. Uma instância com
`REQUIRE_SIGNIN_VIEW = true` definido (uma opção real de hardening)
responde `403`, tratado da mesma forma que o desafio de autenticação de
qualquer outra sonda. Tanto `basic` quanto `token-header` são aceitos —
consulte [Configuração → Credenciais](/pt-br/configuration/#credenciais)
para o formato exato dos campos de cada um.

## Campos registrados

Apenas `version` — esta sonda não registra nenhum campo `extra`.

## Correlação de CVEs

Correlacionado com o NVD e o BDU FSTEC quando um [bloco `cve:`](/pt-br/cve/) está configurado.

## Resolvedor de ciclo de vida

`endoflife:forgejo`.
