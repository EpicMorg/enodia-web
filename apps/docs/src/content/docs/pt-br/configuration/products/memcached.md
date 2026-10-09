---
title: memcached
description: Como configurar o enodia para sondar o memcached.
---

Uma sonda TCP bruta sobre o protocolo de texto, não HTTP — `address` é
`host` ou `host:port`, sem esquema. A porta padrão é `11211` quando
omitida. Envia `version` e lê a resposta de uma linha, `VERSION 1.6.45`.

```yaml
targets:
  - id: memcached-01
    product: memcached
    address: cache.example.com:11211
```

## Autenticação

Nenhuma — o protocolo de texto não tem autenticação. Um servidor iniciado
com SASL (`-S`) fala apenas o protocolo binário e responde ao comando de
texto com um erro; isso é relatado como não suportado, em vez de
adivinhado.

## Campos registrados

Apenas `version` — por exemplo `1.6.45`. Esta sonda não registra nenhum
campo `extra`.

## Correlação de CVEs

Correlacionado com o NVD e o BDU FSTEC quando um [bloco `cve:`](/pt-br/cve/) está configurado.

## Resolvedor de ciclo de vida

`endoflife:memcached`.
