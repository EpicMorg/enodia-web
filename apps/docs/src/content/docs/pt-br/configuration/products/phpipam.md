---
title: phpIPAM
description: Como configurar o enodia para sondar o phpIPAM.
---

Lê a página de login, `GET /index.php?page=login`, anonimamente. O
esquema padrão é `https`.

```yaml
targets:
  - id: ipam-main
    product: phpipam
    address: https://ipam.example.com
```

## De onde vem a versão

O rodapé da página de login diz `phpIPAM IP address management [v1.8.3]`,
e cada folha de estilo e script nela é carregado com `?v=1.8.3_r002_v46` —
o prefixo de scripts do próprio phpIPAM: a versão visível, a revisão do
código e a versão do esquema do banco de dados. O rodapé fornece a
versão; o sufixo dos assets é o recurso quando o rodapé foi removido por
personalização, e é a fonte da revisão e da versão do esquema. Versões
mais antigas carregam os assets com um simples `?v=1.7.3` (visto em um
1.7.3 de produção), sem as partes de revisão e esquema — a versão
continua sendo lida, e os dois campos `extra` ficam então ausentes. Uma
página sem nenhum dos dois é relatada como não suportada.

## Autenticação

Nenhuma — a sonda lê uma página anônima e não aceita nenhum tipo de
credencial. Desde a 2.2.0, uma credencial configurada neste alvo é um
erro de configuração, em vez de ser ignorada; consulte
[Configuração → Credenciais](/pt-br/configuration/#credenciais).

## Campos registrados

- `version` — por exemplo `1.8.3`, de `phpIPAM IP address management [v1.8.3]`
  (confirmado ao vivo em `phpipam/phpipam-www:latest`)
- `extra.revision` — a revisão do código, do sufixo dos assets, por
  exemplo `002`
- `extra.dbVersion` — a versão do esquema do banco de dados, do sufixo
  dos assets, por exemplo `46`

## Correlação de CVEs

Correlacionado com o NVD e o BDU FSTEC quando um [bloco `cve:`](/pt-br/cve/)
está configurado.

## Resolvedor de ciclo de vida

`github:phpipam/phpipam` — o endoflife.date não tem um calendário do
phpIPAM (404 confirmado), então a resolução é feita pelos GitHub
Releases: apenas a tag publicada mais recente que não seja pré-lançamento,
sem datas de eol/support/lts (o GitHub não tem opinião sobre política de
ciclo de vida, apenas sobre "qual é o lançamento mais recente").
