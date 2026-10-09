---
title: DomainMOD
description: Como configurar o enodia para sondar o DomainMOD.
---

Lê `GET /CHANGELOG`, o arquivo de changelog que o DomainMOD traz na sua
raiz web, servido como arquivo estático. O esquema padrão é `https`.

```yaml
targets:
  - id: domainmod-main
    product: domainmod
    address: https://domains.example.com
```

Um DomainMOD instalado em um subcaminho (`DOMAINMOD_WEB_ROOT`) é
alcançado colocando esse caminho no endereço, por exemplo
`https://www.example.com/domainmod`.

## Por que o CHANGELOG

O DomainMOD mostra `Version 4.23.0` apenas no rodapé do layout de usuário
logado. O CHANGELOG é anônimo: começa com `DomainMOD CHANGELOG`, uma
linha separadora e depois a entrada mais recente primeiro —
`v4.23.0     2025-01-04`. A sonda exige esse cabeçalho, para que o
changelog de outra aplicação não seja lido como o do DomainMOD. Um
servidor web que bloqueia o arquivo torna o alvo "não suportado".

## Autenticação

Nenhuma — a sonda lê um arquivo estático e não aceita nenhum tipo de
credencial. Desde a 2.2.0, uma credencial configurada neste alvo é um
erro de configuração, em vez de ser ignorada; consulte
[Configuração → Credenciais](/pt-br/configuration/#credenciais).

## Campos registrados

Apenas `version` — por exemplo `4.23.0`, da entrada mais recente do
CHANGELOG, `v4.23.0     2025-01-04` (confirmado ao vivo em
`domainmod/domainmod:latest`, cujo `software.inc.php` diz
`SOFTWARE_VERSION = '4.23.0'`). Esta sonda não registra nenhum campo
`extra`.

## Correlação de CVEs

Correlacionado com o NVD quando um [bloco `cve:`](/pt-br/cve/) está configurado.

## Resolvedor de ciclo de vida

`github:domainmod/domainmod` — o endoflife.date não tem um calendário do
DomainMOD (404 confirmado), então a resolução é feita pelos GitHub
Releases: apenas a tag publicada mais recente que não seja pré-lançamento,
sem datas de eol/support/lts (o GitHub não tem opinião sobre política de
ciclo de vida, apenas sobre "qual é o lançamento mais recente").
