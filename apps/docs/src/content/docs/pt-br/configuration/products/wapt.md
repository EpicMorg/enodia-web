---
title: WAPT
description: Como configurar o enodia para sondar o WAPT.
---

Lê o `GET /ping` do servidor WAPT (Tranquil IT), que ele serve sem
sessão.

```yaml
targets:
  - id: wapt-main
    product: wapt
    address: https://wapt.example.com
```

## Qual versão é informada

`/ping` traz tanto `version` (`1.8.2`) quanto `git_hash`
(`1.8.2.7334-2d15afd9-debian-10-amd64`), que começa com o número de build
completo. Quando esse número de build estende `version`, é ele que é
informado — `1.8.2.7334`, não `1.8.2`. Confirmado ao vivo em um servidor
WAPT 1.8.2 de produção.

## Autenticação

Nenhuma — o endpoint não aceita nenhum tipo de credencial.

## Campos registrados

- `version` — por exemplo `1.8.2.7334`
- `extra.edition` — por exemplo `community`
- `extra.apiVersion` — por exemplo `v3`
- `extra.gitHash` — por exemplo `1.8.2.7334-2d15afd9-debian-10-amd64`

## Correlação de CVEs

Correlacionado com o NVD quando um [bloco `cve:`](/pt-br/cve/) está configurado.

Sensível à edição: a própria edição do WAPT (`community`/`enterprise`) já
está nos termos do NVD e é repassada como está. Qualquer outro valor é
tratado como edição desconhecida, o que mantém todos os achados.

## Resolvedor de ciclo de vida

Nenhum — o WAPT não tem página no endoflife.date (404 confirmado), e as
tags do GitHub da Tranquil IT pararam na 1.5; os lançamentos são
publicados no próprio site deles, que nenhum resolvedor aqui lê. Apenas
inventário.
