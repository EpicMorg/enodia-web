---
title: MySQL
description: Como configurar o enodia para sondar o MySQL Server.
---

Um protocolo TCP bruto, não HTTP — `address` é `host` ou `host:port`, sem
esquema `https://`/`http://` (não há nada a alertar sobre a falta de
esquema; consulte [Configuração](/pt-br/configuration/#targets)). A porta
padrão é `3306` quando omitida.

Nenhuma requisição é enviada: o MySQL anuncia a sua versão
espontaneamente, no pacote inicial de handshake, antes de qualquer etapa
de autenticação — então esta sonda nunca precisa de uma credencial para
observá-la.

```yaml
targets:
  - id: mysql-main
    product: mysql
    address: db.example.com:3306
```

## Autenticação

Nenhuma — a versão é lida diretamente do handshake, antes do ponto em que
uma credencial teria qualquer importância.

## MariaDB é um produto diferente

O MariaDB mascara a sua versão real atrás de um prefixo `5.5.5-` para
clientes MySQL anteriores ao esquema de versões próprio do MariaDB — o
que ainda acontece em uma imagem atual do MariaDB 10.11. `product: mysql`
apontado para um servidor MariaDB detecta isso e **falha de propósito**,
informando a versão real do MariaDB no erro, em vez de registrá-la
silenciosamente como um fato do MySQL. Ainda não existe uma sonda
`mariadb` dedicada — hoje isto é uma parada definitiva, não algo a
contornar com a [sonda genérica](/pt-br/configuration/products/generic/).

## Correlação de CVEs

Correlacionado com o NVD e o BDU FSTEC quando um [bloco `cve:`](/pt-br/cve/) está configurado.

## Resolvedor de ciclo de vida

`endoflife:mysql`.
