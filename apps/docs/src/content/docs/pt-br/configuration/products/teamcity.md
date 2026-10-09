---
title: TeamCity
description: Como configurar o enodia para sondar o JetBrains TeamCity.
---

Lê a versão anonimamente de `GET /app/rest/server/version` quando
nenhuma credencial está configurada, ou de `GET /app/rest/server` — o
ponto de entrada que a própria referência da API REST do TeamCity indica
primeiro — quando há um token.

```yaml
targets:
  - id: teamcity-main
    product: teamcity
    address: https://teamcity.example.com
    # credentials: teamcity-pat    # opcional, veja abaixo
```

## Autenticação — opcional, e fácil de inverter se você adicioná-la

**Nenhuma credencial é necessária.** O TeamCity serve
`/app/rest/server/version` para qualquer um, como texto puro —
`2026.1.1 (build 222577)` — mesmo com o login de convidado desativado.
Confirmado em servidores novos da 2017.2 à 2026.1 sem nenhum
administrador criado, e em sete instâncias de produção (da 2024.03 à
2026.1.3) sem credenciais. Não é acesso de convidado: `/app/rest/server`
e os endpoints exclusivos de convidado são recusados nesses mesmos
servidores. Enquanto o TeamCity está inicializando, ele responde a
qualquer caminho com uma página HTML de manutenção com status 200, então
a resposta precisa corresponder por completo a `YYYY.N[.N] (build N)`, ou
o alvo falha como não interpretável.

**Com um token configurado**, a sonda lê `/app/rest/server` em vez disso —
você pediu uma leitura autenticada, ela traz também o `internalId`, e um
token errado continua sendo um erro de autenticação visível em vez de ser
mascarado pelo caminho anônimo. `/app/rest/server` nunca é anônimo: uma
instância nova responde `401` com desafios Basic e Bearer. O TeamCity tem **dois tipos distintos de token, confirmados ao vivo, que
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
- `extra.buildNumber`
- `extra.internalId` — só com um token (`/app/rest/server`)

## Correlação de CVEs

Correlacionado com o NVD e o BDU FSTEC quando um [bloco `cve:`](/pt-br/cve/) está configurado.

## Resolvedor de ciclo de vida

Nenhum — o endoflife.date não tem um calendário do TeamCity (404
confirmado). Apenas inventário, por enquanto.
