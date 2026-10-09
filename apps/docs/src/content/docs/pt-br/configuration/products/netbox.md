---
title: NetBox
description: Como configurar o enodia para sondar o NetBox.
---

Lê a página de login anônima, `GET /login/`, cujo elemento raiz traz
`data-netbox-version` — por exemplo `4.3.3-Docker-3.3.0` em um NetBox
executado pelo netbox-docker. Se o atributo estiver ausente, é usada a
versão com que a página carrega o seu bundle
(`/static/netbox.js?v=4.3.3`). O esquema padrão é `https`.

```yaml
targets:
  - id: netbox-main
    product: netbox
    address: https://netbox.example.com
```

## Por que a página de login

A API REST do NetBox (`/api/status/`) exige um token; a página de login
traz a versão sem ele (confirmado ao vivo em um NetBox de produção do
netbox-docker). A parte antes de `-Docker-` é a versão do próprio NetBox;
o resto é a versão da imagem do netbox-docker.

## Autenticação

Nenhuma — a página de login é pública, e a sonda não aceita nenhum tipo
de credencial. Desde a 2.2.0, uma credencial associada a um alvo `netbox`
é um erro de configuração, e não é ignorada silenciosamente — consulte
[Configuração → Credenciais](/pt-br/configuration/#credenciais).

## Campos registrados

- `version` — a versão do NetBox, por exemplo `4.3.3`
- `extra.netboxDocker` — a versão da imagem do netbox-docker (`3.3.0`),
  apenas quando `data-netbox-version` tem um sufixo `-Docker-`

## Correlação de CVEs

Correlacionado com o NVD quando um [bloco `cve:`](/pt-br/cve/) está configurado.
O "LenelS2 NetBox" do BDU é um produto diferente e não é usado.

## Resolvedor de ciclo de vida

`github:netbox-community/netbox` — o endoflife.date não tem um calendário
do NetBox (404 confirmado), então a resolução é feita pelos GitHub
Releases: apenas a tag publicada mais recente que não seja pré-lançamento,
sem datas de eol/support/lts (o GitHub não tem opinião sobre política de
ciclo de vida, apenas sobre "qual é o lançamento mais recente").
