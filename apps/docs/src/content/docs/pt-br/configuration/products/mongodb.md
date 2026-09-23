---
title: MongoDB
description: Como configurar o enodia para sondar o MongoDB.
---

Uma sonda de protocolo de rede bruto, não HTTP — `address` é `host` ou
`host:port`, sem esquema. A porta padrão é `27017` quando omitida.
Executa o comando `buildInfo` pelo wire protocol (`OP_MSG`) e lê o seu
campo `version` — sem biblioteca cliente, sem consulta no estilo
`SELECT`.

```yaml
targets:
  - id: mongodb-main
    product: mongodb
    address: db.example.com:27017
```

## Autenticação

Nenhuma — `buildInfo` é um do pequeno conjunto de comandos que o MongoDB
sempre responde antes da autenticação. Confirmado ao vivo com dois
contêineres `mongo:7` reais, um sem nenhum controle de acesso e outro com
`--auth` e um usuário root configurado: ambos retornaram o mesmo
documento `buildInfo` completo sem nenhuma credencial enviada.

## Campos registrados

- `version`
- `extra.enterprise` — `"true"` quando `modules` do `buildInfo` lista
  `enterprise`, `"false"` quando não lista (um servidor community tem um
  array vazio); não informado quando o campo está ausente

## Correlação de CVEs

Correlacionado com o NVD e o BDU FSTEC quando um [bloco `cve:`](/pt-br/cve/) está configurado. Com reconhecimento de edição: a sonda registra a edição do próprio servidor em `extra.enterprise`, e uma instância community não vê achados exclusivos da edição enterprise. Uma edição desconhecida mantém todos os achados.

## Resolvedor de ciclo de vida

`endoflife:mongodb`.
