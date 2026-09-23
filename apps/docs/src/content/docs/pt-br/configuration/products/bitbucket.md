---
title: Bitbucket
description: Como configurar o enodia para sondar o Atlassian Bitbucket (Data Center).
---

**Somente Data Center** — o Atlassian Cloud não expõe o endpoint que esta
sonda lê. Lê `GET /rest/applinks/1.0/manifest`, o mesmo manifesto de
Application Links que todo produto Atlassian Data Center expõe — anônimo,
e é por isso que ele é usado em vez de `/rest/api/2/serverInfo`.

```yaml
targets:
  - id: bitbucket-main
    product: bitbucket
    address: https://bitbucket.example.com
```

## Autenticação

Opcional — o manifesto pode ser lido sem credenciais. `none`, `basic` e
`bearer` são todos aceitos, caso você prefira se autenticar mesmo assim.

## Verificação da identidade do fornecedor

O `<typeId>` do manifesto é comparado com o que `product: bitbucket`
espera. **O próprio manifesto do Bitbucket ainda se identifica como
`stash`** — o seu nome anterior, antes do rebranding da Atlassian —,
então `typeId: stash` é correto e esperado aqui; essa é a resposta do
fornecedor, não uma peculiaridade do enodia. Uma URL que se revele ser do
Jira ou do Confluence ainda falha de forma explícita em vez de ser
registrada como um fato errado — consulte
[Jira](/pt-br/configuration/products/jira/),
[Confluence](/pt-br/configuration/products/confluence/) e
[Bamboo](/pt-br/configuration/products/bamboo/) para os produtos irmãos
que compartilham essa mesma convenção de manifesto.

## Campos registrados

- `version`
- `extra.buildNumber`, `extra.typeId` — `typeId` conterá `stash`, e não
  `bitbucket`

## Correlação de CVEs

Correlacionado com o NVD e o BDU FSTEC quando um [bloco `cve:`](/pt-br/cve/) está configurado.

## Resolvedor de ciclo de vida

`endoflife:bitbucket`.
