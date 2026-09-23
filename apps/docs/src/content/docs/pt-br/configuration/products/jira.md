---
title: Jira
description: Como configurar o enodia para sondar o Atlassian Jira (Data Center).
---

**Somente Data Center** — o Atlassian Cloud não expõe o endpoint que esta
sonda lê. Lê `GET /rest/applinks/1.0/manifest`, o mesmo manifesto de
Application Links que todo produto Atlassian Data Center expõe — anônimo,
e é por isso que ele é usado em vez de `/rest/api/2/serverInfo`.

```yaml
targets:
  - id: jira-main
    product: jira
    address: https://jira.example.com
```

## Autenticação

Opcional — o manifesto pode ser lido sem credenciais. `none`, `basic` e
`bearer` são todos aceitos, caso você prefira se autenticar mesmo assim.

## Verificação da identidade do fornecedor

O `<typeId>` do manifesto é comparado com o que `product: jira` espera
(`jira`). Uma URL que se revele ser do Confluence ou do Bitbucket falha de
forma explícita em vez de ser registrada como um fato errado — consulte
[Confluence](/pt-br/configuration/products/confluence/),
[Bitbucket](/pt-br/configuration/products/bitbucket/) e
[Bamboo](/pt-br/configuration/products/bamboo/) para os produtos irmãos
que compartilham essa mesma convenção de manifesto.

## Campos registrados

- `version`
- `extra.buildNumber`, `extra.typeId` — `typeId` conterá `jira`

## Correlação de CVEs

Correlacionado com o NVD e o BDU FSTEC quando um [bloco `cve:`](/pt-br/cve/) está configurado.

## Resolvedor de ciclo de vida

`endoflife:jira-software` — observe que o slug é `jira-software`, e não
`jira`.
