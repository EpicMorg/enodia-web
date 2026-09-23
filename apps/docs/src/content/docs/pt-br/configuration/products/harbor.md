---
title: Harbor
description: Como configurar o enodia para sondar o Harbor (registro de contêineres).
---

Lê `GET /api/v2.0/systeminfo`.

```yaml
targets:
  - id: harbor-main
    product: harbor
    address: https://harbor.example.com
```

## Autenticação

Opcional. Confirmado ao vivo com uma stack `goharbor/harbor` v2.12.2
real: `harbor_version` é retornado sem credencial alguma em todas as
versões lançadas atualmente — credenciais inválidas ou inventadas são
tratadas silenciosamente como anônimas em vez de receberem `401`; este
endpoint nunca rejeita uma requisição de imediato.

:::note[Fique atento a mudanças no upstream]
O próprio código-fonte do Harbor (na versão com a qual esta sonda foi
verificada) já condiciona `harbor_version` a uma verificação de sessão
autenticada no seu branch principal, ainda não lançada no momento em que
isto foi escrito — caminhando para uma versão futura que exigirá
credenciais para este campo. `basic` já é oferecido aqui para quando isso
acontecer:

```yaml
credentials:
  harbor-admin:
    kind: basic
    username: admin
    password: "${HARBOR_PASSWORD}"
```
:::

## Campos registrados

Apenas `version` — esta sonda não registra nenhum campo `extra`.

## Correlação de CVEs

Correlacionado com o NVD e o BDU FSTEC quando um [bloco `cve:`](/pt-br/cve/) está configurado.

## Resolvedor de ciclo de vida

`endoflife:harbor`.
