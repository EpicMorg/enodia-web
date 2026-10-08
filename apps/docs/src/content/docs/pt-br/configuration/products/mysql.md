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

A versão do handshake do MariaDB o denuncia: o MariaDB 10.x a mascara
atrás de um prefixo `5.5.5-` para clientes MySQL antigos
(`5.5.5-10.11.19-MariaDB-ubu2204`), e o MariaDB 11.0+ a envia sem
máscara, mas marcada (`11.4.13-MariaDB-ubu2404`). `product: mysql`
apontado para um servidor MariaDB detecta qualquer um dos dois formatos e
**falha de propósito**, informando a versão real do MariaDB no erro, em
vez de registrá-la silenciosamente como um fato do MySQL. Desde a 2.1, o
MariaDB tem uma sonda própria — use
[`product: mariadb`](/pt-br/configuration/products/mariadb/) para ele.

:::caution[MariaDB 11.0+ antes da 2.1.1]
Até a 2.1.0, apenas a máscara `5.5.5-` era reconhecida, então um servidor
MariaDB 11.0+ por trás de um alvo `product: mysql` era registrado **como
MySQL** e comparado com o ciclo de vida do MySQL. Desde a 2.1.1, esse
alvo falha — troque-o para `product: mariadb`.
:::

## Correlação de CVEs

Correlacionado com o NVD e o BDU FSTEC quando um [bloco `cve:`](/pt-br/cve/) está configurado.

## Resolvedor de ciclo de vida

`endoflife:mysql`.
