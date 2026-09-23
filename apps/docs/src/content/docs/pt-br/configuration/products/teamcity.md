---
title: TeamCity
description: Como configurar o enodia para sondar o JetBrains TeamCity.
---

Lê `GET /app/rest/server` — o ponto de entrada que a própria referência
da API REST do TeamCity indica primeiro — para obter a versão.

```yaml
targets:
  - id: teamcity-main
    product: teamcity
    address: https://teamcity.example.com
    credentials: teamcity-pat
```

## Autenticação — obrigatória, e fácil de inverter

Não há acesso anônimo por padrão — uma instância nova responde `401` com
desafios Basic e Bearer (o login de convidado vem desativado por padrão).
O TeamCity tem **dois tipos distintos de token, confirmados ao vivo, que
só funcionam como tipos de credencial opostos**:

- O **token de bootstrap de superusuário**, de uso único, que um servidor
  novo registra no log na primeira inicialização, só funciona como
  **Basic** — usuário vazio, o token como senha. Enviado como um
  `Authorization: Bearer` simples, ele é rejeitado.
- O **personal access token** de um usuário comum (Profile → Access
  Tokens — a forma como a automação real de longa duração de fato se
  autentica) é o oposto: confirmado em sete instâncias de produção reais,
  ele funciona como **Bearer** e é rejeitado categoricamente como Basic
  ("Incorrect username or password", mesmo com usuário vazio).

```yaml
credentials:
  # token de bootstrap — Basic, usuário vazio
  teamcity-bootstrap:
    kind: basic
    username: ""
    password: "${TEAMCITY_BOOTSTRAP_TOKEN}"

  # personal access token — Bearer
  teamcity-pat:
    kind: bearer
    value: "${TEAMCITY_TOKEN}"
```

Use o personal access token em qualquer configuração de longa duração —
o token de bootstrap foi feito para ser descartado após o primeiro login.

## Campos registrados

- `version` — a string completa, por exemplo `2026.2 (build 238924)`
- `extra.buildNumber`, `extra.internalId`

## Correlação de CVEs

Correlacionado com o NVD e o BDU FSTEC quando um [bloco `cve:`](/pt-br/cve/) está configurado.

## Resolvedor de ciclo de vida

Nenhum — o endoflife.date não tem um calendário do TeamCity (404
confirmado). Apenas inventário, por enquanto.
