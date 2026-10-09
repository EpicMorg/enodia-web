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

O MariaDB e o MySQL falam exatamente o mesmo handshake e diferem apenas
na string de versão, que vem em dois formatos, ambos confirmados ao vivo:

- **MariaDB 10.x** mascara a sua versão atrás de um prefixo de
  compatibilidade `5.5.5-` para clientes MySQL antigos:
  `5.5.5-10.11.19-MariaDB-ubu2204`. A máscara é removida.
- **MariaDB 11.0+** abandonou a máscara: `11.4.13-MariaDB-ubu2404`,
  `12.3.3-MariaDB-ubu2404`. O `-MariaDB` na versão passa a ser o único
  sinal. Reconhecido desde a 2.1.1 — a 2.1.0 recusava esses servidores.

Qualquer um dos dois formatos é aceito. Apontada para um servidor MySQL
real, cuja versão não tem nenhum dos dois, a sonda falha em vez de
registrar um fato errado, o espelho do
[`mysql`](/pt-br/configuration/products/mysql/#mariadb-é-um-produto-diferente)
recusando um servidor MariaDB.

## Campos registrados

- `version` — a versão numérica, por exemplo `10.11.19`
- `extra.tag` — a tag do fornecedor que vem depois dela, por exemplo
  `MariaDB-ubu2204`, quando presente

## Correlação de CVEs

Correlacionado com o NVD e o BDU FSTEC quando um [bloco `cve:`](/pt-br/cve/) está configurado — e, com `cve.mariadb.path`, com a própria tabela de CVEs corrigidas do MariaDB, cujo veredito por série prevalece sobre os intervalos em aberto do BDU e do NVD. Consulte [Dados dos próprios fornecedores → MariaDB](/pt-br/cve/#mariadb).

## Resolvedor de ciclo de vida

`endoflife:mariadb`.
