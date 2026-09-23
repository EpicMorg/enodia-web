---
title: ProFTPD
description: Como configurar o enodia para sondar o ProFTPD.
---

Uma sonda TCP bruta, não HTTP — `address` é `host` ou `host:port`, sem
esquema. A porta padrão é `21` quando omitida. Lê a saudação FTP (a
resposta `220` da RFC 959) que todo servidor envia espontaneamente ao
receber a conexão e procura uma versão dentro dela.

```yaml
targets:
  - id: ftp-main
    product: proftpd
    address: ftp.example.com:21
```

## Autenticação

Nenhuma — a saudação é enviada antes de qualquer etapa de autenticação.

## O padrão de fábrica não traz versão alguma

Sem nenhuma diretiva `ServerIdent` configurada — o padrão real,
confirmado ao vivo tanto em um host de produção real quanto em um
contêiner `instantlinux/proftpd` novo —, a saudação é
`"ProFTPD Server (<ServerName>) [<address>]"`, sem versão. A versão só
aparece se um administrador configurar explicitamente `ServerIdent on
"... %{version} ..."` — também confirmado ao vivo:
`"ProFTPD 1.3.9c ready at 127.0.0.1"`. Portanto, o caso "nenhuma versão
encontrada" desta sonda é o comum, não a exceção.

## Campos registrados

Apenas `version` — esta sonda não registra nenhum campo `extra`.

## Correlação de CVEs

Correlacionado com o NVD e o BDU FSTEC quando um [bloco `cve:`](/pt-br/cve/) está configurado.

## Resolvedor de ciclo de vida

`endoflife:proftpd`.
