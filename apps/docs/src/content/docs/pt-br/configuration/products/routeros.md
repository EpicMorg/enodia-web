---
title: MikroTik RouterOS
description: Como configurar o enodia para sondar o MikroTik RouterOS.
---

Lê `GET /rest/system/resource` — a API REST do RouterOS (RouterOS 7.1+;
o serviço `www`, ativado por padrão em uma instalação nova, precisa estar
habilitado).

```yaml
targets:
  - id: router-main
    product: routeros
    address: https://router.example.com
    credentials: routeros-admin
```

## Autenticação — obrigatória

Confirmado ao vivo com uma VM CHR (Cloud Hosted Router) 7.24.2 real: este
endpoint sempre responde `401` sem credenciais, e a página de login
anônima do webfig em `/` também não traz texto de versão em lugar nenhum
— esta é a própria API de administração de um roteador, então exigir
credenciais é a postura padrão correta, e não uma opção de hardening a
ser contornada.

```yaml
credentials:
  routeros-admin:
    kind: basic
    username: enodia-ro
    password: "${ROUTEROS_PASSWORD}"
```

O banner SSH (`"SSH-2.0-ROSSSH"`, confirmado ao vivo) também não traz
versão, o que descarta uma abordagem baseada em banner SSH como a que o
[SSH](/pt-br/configuration/products/ssh/)/[MySQL](/pt-br/configuration/products/mysql/)
usam.

## Campos registrados

- `version`
- `extra.boardName`, `extra.architecture`

## Correlação de CVEs

Correlacionado com o NVD e o BDU FSTEC quando um [bloco `cve:`](/pt-br/cve/) está configurado.

## Resolvedor de ciclo de vida

`endoflife:routeros`.
