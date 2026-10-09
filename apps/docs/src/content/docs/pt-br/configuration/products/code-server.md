---
title: code-server
description: Como configurar o enodia para sondar o code-server.
---

Lê `GET /login`, anonimamente. O esquema padrão é `https`. A página de
login embute `<meta id="coder-options" data-settings="{...}">` — JSON com
escape de HTML — e o seu `codeServerVersion` é a versão do servidor; a
sonda remove o escape do atributo e o decodifica.

```yaml
targets:
  - id: code-main
    product: code-server
    address: https://code.example.com
```

## Por que a página de login

O próprio `/version` do code-server exige a senha, e o `/healthz` não traz
versão. A página de login é acessível sem login e traz as mesmas opções
com que o editor é iniciado. Uma página sem o elemento `coder-options` é
relatada como não suportada (não é um code-server).

## Autenticação

Nenhuma — a sonda lê uma página anônima e não aceita nenhum tipo de
credencial. Desde a 2.2.0, uma credencial configurada neste alvo é um
erro de configuração, em vez de ser ignorada; consulte
[Configuração → Credenciais](/pt-br/configuration/#credenciais).

## Campos registrados

Apenas `version` — por exemplo `4.141.0` (confirmado ao vivo em
`codercom/code-server:latest`, cujo `code-server --version` informou 4.141.0
com Code 1.141.0). Esta sonda não registra nenhum campo `extra`.

## Correlação de CVEs

Correlacionado com o NVD quando um [bloco `cve:`](/pt-br/cve/) está configurado.

## Resolvedor de ciclo de vida

`github:coder/code-server` — o endoflife.date não tem um calendário do
code-server (404 confirmado), então a resolução é feita pelos GitHub
Releases: apenas a tag publicada mais recente que não seja pré-lançamento,
sem datas de eol/support/lts (o GitHub não tem opinião sobre política de
ciclo de vida, apenas sobre "qual é o lançamento mais recente").
