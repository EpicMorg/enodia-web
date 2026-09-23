---
title: Artifactory
description: Como configurar o enodia para sondar o JFrog Artifactory.
---

Lê `GET /artifactory/api/system/version` para obter a versão.

```yaml
targets:
  - id: artifactory-main
    product: artifactory
    address: https://artifactory.example.com
```

## Autenticação

Opcional. Se este endpoint precisa de credenciais varia de instância para
instância — confirmado com dois servidores reais: uma instalação OSS nova
responde `401` a requisições anônimas, mas uma instância de produção com
"Allow Anonymous Access" habilitado respondeu `200` sem credencial
alguma. A autenticação Basic funciona quando necessária:

```yaml
credentials:
  artifactory-admin:
    kind: basic
    username: admin
    password: "${ARTIFACTORY_PASSWORD}"
```

## Campos registrados

- `version` — por exemplo `7.161.20`
- `extra.revision`, quando a resposta traz um

A resposta também inclui `license`, `addons` e `entitlements` —
deliberadamente nunca lidos. Em uma instância de produção real, `license`
era uma impressão digital por instalação, não um literal fixo, e nenhum
dos três descreve o software em si.

## Correlação de CVEs

Correlacionado com o NVD e o BDU FSTEC quando um [bloco `cve:`](/pt-br/cve/) está configurado.

## Resolvedor de ciclo de vida

`endoflife:artifactory`.
