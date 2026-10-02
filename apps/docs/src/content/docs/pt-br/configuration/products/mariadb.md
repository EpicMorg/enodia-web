---
title: MariaDB
description: Como configurar o enodia para sondar o MariaDB Server.
---

Um protocolo TCP bruto, não HTTP — `address` é `host` ou `host:port`, sem
esquema. A porta padrão é `3306` quando omitida. O mesmo handshake do
[MySQL](/pt-br/configuration/products/mysql/): o MariaDB anuncia a sua
versão espontaneamente, no pacote inicial de handshake, antes de qualquer
etapa de autenticação, então esta sonda nunca precisa de uma credencial.

```yaml
targets:
  - id: mariadb-main
    product: mariadb
    address: db.example.com:3306
```

## Autenticação

Nenhuma — a versão é lida diretamente do handshake.

## Verificação da identidade do fornecedor

O MariaDB e o MySQL falam exatamente o mesmo handshake e diferem em um
único detalhe: o MariaDB prefixa a sua versão com uma máscara de
compatibilidade `5.5.5-` para clientes MySQL antigos (confirmado ao vivo,
o que ainda acontece no MariaDB 10.11). Esta sonda exige essa máscara e a
remove — apontada para um servidor MySQL real, ela falha em vez de
registrar um fato errado, o espelho do
[`mysql`](/pt-br/configuration/products/mysql/#mariadb-é-um-produto-diferente)
recusando um servidor MariaDB.

## Campos registrados

- `version` — a versão numérica, por exemplo `10.11.19`
- `extra.tag` — a tag do fornecedor que vem depois dela, por exemplo
  `MariaDB-ubu2204`, quando presente

## Correlação de CVEs

Ainda sem correlação — o MariaDB é novo na 2.1, e o upstream deixou o
mapeamento de CVEs dele para uma etapa posterior, dedicada. Consulte
[Correlação de CVEs](/pt-br/cve/#quais-produtos-têm-correspondência).

## Resolvedor de ciclo de vida

`endoflife:mariadb`.
