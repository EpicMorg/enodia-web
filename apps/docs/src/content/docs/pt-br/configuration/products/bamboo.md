---
title: Bamboo
description: Como configurar o enodia para sondar o Atlassian Bamboo (Data Center).
---

**Somente Data Center** — o Atlassian Cloud não expõe o endpoint que esta
sonda lê. Lê `GET /rest/applinks/1.0/manifest`, o mesmo manifesto de
Application Links que todo produto Atlassian Data Center expõe — anônimo,
e é por isso que ele é usado em vez de `/rest/api/2/serverInfo`.

```yaml
targets:
  - id: bamboo-main
    product: bamboo
    address: https://bamboo.example.com
```

## Autenticação

Opcional — o manifesto pode ser lido sem credenciais. `none`, `basic` e
`bearer` são todos aceitos, caso você prefira se autenticar mesmo assim.

## Verificação da identidade do fornecedor

O `<typeId>` do manifesto é comparado com o que `product: bamboo` espera
(`bamboo`). Uma URL que se revele ser do Jira ou do Confluence falha de
forma explícita em vez de ser registrada como um fato errado — consulte
[Jira](/pt-br/configuration/products/jira/),
[Confluence](/pt-br/configuration/products/confluence/) e
[Bitbucket](/pt-br/configuration/products/bitbucket/) para os produtos
irmãos que compartilham essa mesma convenção de manifesto.

## Campos registrados

- `version`
- `extra.buildNumber`, `extra.typeId` — `typeId` conterá `bamboo`

## Correlação de CVEs

Correlacionado com o NVD e o BDU FSTEC quando um [bloco `cve:`](/pt-br/cve/) está configurado.

## Resolvedor de ciclo de vida

`endoflife:bamboo` — agora conectado. [endoflife.date/bamboo](https://endoflife.date/bamboo)
é um calendário real e ativo; uma revisão anterior desta página afirmava
por engano que esse calendário nem existia, baseando-se apenas no fato de
`registry.go` ter `resolver: ""` sem explicação, em vez de verificar
diretamente no endoflife.date. Isso foi corrigido tanto aqui quanto no
upstream.
