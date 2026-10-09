---
title: Apache Cassandra
description: Como configurar o enodia para sondar o Apache Cassandra.
---

Uma sonda do protocolo nativo CQL, não HTTP — `address` é `host` ou
`host:port`, sem esquema. A porta padrão é `9042` quando omitida. Lê
`release_version` com `SELECT release_version FROM system.local`.

```yaml
targets:
  - id: cassandra-01
    product: cassandra
    address: cassandra-01.example.com:9042
```

## Protocolo

O Cassandra não tem API HTTP, então o enodia fala CQL diretamente, sem
driver: `STARTUP`, depois — só quando o servidor responde `AUTHENTICATE` —
uma resposta SASL PLAIN e, por fim, a única consulta. `OPTIONS`/`SUPPORTED`,
a única troca anterior à autenticação, traz as versões do CQL e do
protocolo, mas não a do próprio servidor. É usado o protocolo v4, porque
todo Cassandra suportado o fala: 3.x, 4.x e 5.0 o aceitam, enquanto o 3.11
recusa o v5. O Cassandra 2.x (no máximo v3) está há muito tempo fora de
suporte e não é tentado.

## Autenticação

Opcional, `kind: password` — enviada só quando o cluster a pede
(`PasswordAuthenticator`). Consulte
[Configuração → Credenciais](/pt-br/configuration/#credenciais).

```yaml
credentials:
  cassandra-ro:
    kind: password
    username: enodia_ro
    password: "${CASSANDRA_PASSWORD}"
```

Um cluster que exige autenticação sem nenhuma credencial configurada
falha com um erro de autenticação que nomeia o seu autenticador;
credenciais rejeitadas também são um erro de autenticação.

## Campos registrados

Apenas `version` — por exemplo `5.0.9` ou `3.11.19`. Esta sonda não
registra nenhum campo `extra`.

## Correlação de CVEs

Correlacionado com o NVD e o BDU FSTEC quando um [bloco `cve:`](/pt-br/cve/) está configurado.

## Resolvedor de ciclo de vida

`endoflife:apache-cassandra`.
