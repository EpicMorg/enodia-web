---
title: Sonatype Nexus Repository
description: Como configurar o enodia para sondar o Sonatype Nexus Repository.
---

Lê o cabeçalho de resposta `Server` que o Nexus define em toda resposta —
o mesmo formato do [nginx](/pt-br/configuration/products/nginx/)/
[Apache](/pt-br/configuration/products/apache/) —, mas consultando o
endpoint de status anônimo feito para isso em vez de `/`, já que ele é um
health check rápido e com corpo vazio, e não a página completa do portal.

```yaml
targets:
  - id: nexus-main
    product: nexus
    address: https://nexus.example.com
```

## Autenticação

Nenhuma — confirmado ao vivo com um contêiner `sonatype/nexus3` real:
`"Nexus/3.96.0-09 (COMMUNITY)"` no endpoint de status, na página do
portal e também em um desafio `401` de outro endpoint, esse sim
protegido. Ao contrário do nginx/Apache, nenhuma opção de configuração
para reduzir isso a um simples `"Nexus"` está documentada ou foi
encontrada — mas esta sonda degrada para um erro claro, em vez de
travar, caso uma versão futura ou uma configuração com proxy reverso
algum dia faça isso.

## Campos registrados

Apenas `version` — esta sonda não registra nenhum campo `extra` (a
edição, por exemplo `COMMUNITY`/`PRO`, é descartada, já que
`product: nexus` já a implica, sem necessidade de registrá-la por alvo).

## Correlação de CVEs

Correlacionado com o NVD e o BDU FSTEC quando um [bloco `cve:`](/pt-br/cve/) está configurado.

## Resolvedor de ciclo de vida

`endoflife:nexus`.
