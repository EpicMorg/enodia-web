---
title: Vaultwarden
description: Como configurar o enodia para sondar o Vaultwarden.
---

Lê `GET /api/version`, que retorna uma string JSON simples (não um
objeto) — o mesmo endpoint e o mesmo formato de resposta do próprio
[Bitwarden](/pt-br/configuration/products/bitwarden/). Nenhuma credencial é
necessária: os aplicativos clientes usam este endpoint para verificar a
compatibilidade com o servidor antes de existir qualquer login.

```yaml
targets:
  - id: vaultwarden-main
    product: vaultwarden
    address: https://vault.example.com
```

## Autenticação

Nenhuma — o endpoint não aceita nenhum tipo de credencial.

## Não é o mesmo produto que o Bitwarden

O Vaultwarden é uma reimplementação do zero, em Rust, da API do servidor
Bitwarden, não um fork — ele tem a sua própria numeração de versões
independente, que não acompanha os lançamentos do Bitwarden. Ele é
registrado como um `product:` distinto exatamente por esse motivo:
comparar a versão de uma instalação do Vaultwarden com um calendário de
ciclo de vida rotulado como `bitwarden` seria comparar dois esquemas de
numeração sem relação entre si.

## Correlação de CVEs

Correlacionado com o NVD e o BDU FSTEC quando um [bloco `cve:`](/pt-br/cve/) está configurado.

## Resolvedor de ciclo de vida

`github:dani-garcia/vaultwarden` — o endoflife.date não tem um calendário
`vaultwarden` (404 confirmado), então a resolução é feita pelos GitHub
Releases: apenas a tag publicada mais recente que não seja pré-lançamento,
sem datas de eol/support/lts (o GitHub não tem opinião sobre política de
ciclo de vida, apenas sobre "qual é o lançamento mais recente").
