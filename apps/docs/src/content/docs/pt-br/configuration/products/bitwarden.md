---
title: Bitwarden
description: Como configurar o enodia para sondar um servidor Bitwarden auto-hospedado.
---

Somente auto-hospedado — não há motivo para apontar isto para o serviço
de nuvem da própria Bitwarden. Lê `GET /api/version`, que retorna uma
string JSON simples (não um objeto). Nenhuma credencial é necessária: os
aplicativos clientes usam este endpoint para verificar a compatibilidade
com o servidor antes de existir qualquer login.

```yaml
targets:
  - id: bitwarden-main
    product: bitwarden
    address: https://vault.example.com
```

## Autenticação

Nenhuma — o endpoint não aceita nenhum tipo de credencial.

## Não é o mesmo produto que o Vaultwarden

O [Vaultwarden](/pt-br/configuration/products/vaultwarden/) é uma
reimplementação do zero, em Rust, da API do servidor Bitwarden, não um
fork, com a sua própria numeração de versões independente. Ele expõe o
mesmo endpoint e o mesmo formato de resposta, mas é registrado como um
`product:` separado — apontar uma instalação do Vaultwarden para
`product: bitwarden` compararia a versão de um projeto com o histórico de
lançamentos do outro.

## Correlação de CVEs

Correlacionado com o NVD quando um [bloco `cve:`](/pt-br/cve/) está configurado.

## Resolvedor de ciclo de vida

`github:bitwarden/server` — o endoflife.date não tem um calendário
`bitwarden` (404 confirmado), então a resolução é feita pelos GitHub
Releases: apenas a tag publicada mais recente que não seja pré-lançamento,
sem datas de eol/support/lts (o GitHub não tem opinião sobre política de
ciclo de vida, apenas sobre "qual é o lançamento mais recente").
