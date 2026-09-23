---
title: TrueNAS
description: Como configurar o enodia para sondar o TrueNAS.
---

Lê `GET /api/v2.0/system/info`.

```yaml
targets:
  - id: truenas-main
    product: truenas
    address: https://truenas.example.com
    credentials: truenas-key
```

## Autenticação — obrigatória

Confirmado ao vivo com um host TrueNAS 25.10.7 real: este endpoint
responde `401` sem credenciais. Uma chave de API funciona como bearer
token simples:

```yaml
credentials:
  truenas-key:
    kind: bearer
    value: "${TRUENAS_API_KEY}"
```

## Não é uma sonda SSH, apesar de ser um SO de appliance

Uma versão anterior desta sonda lia `/etc/version` via SSH (o próprio
`/etc/os-release` do TrueNAS informa a base Debian subjacente, e não o
TrueNAS em si — a mesma lacuna de arquivo de identidade que o
[Astra Linux](/pt-br/configuration/products/astra-linux/) tem). Assim que
um alvo de API real ficou disponível para verificação, a versão HTTP
substituiu a SSH por completo — o enodia não tem fallback de transporte
duplo por produto, então o formato mais simples e mais adequado prevalece,
em vez de os dois coexistirem.

## Campos registrados

Apenas `version` — esta sonda não registra nenhum campo `extra`.

## Correlação de CVEs

Sem correlação — há poucas entradas, com versionamento diferente do que a sonda informa. Consulte [Correlação de CVEs](/pt-br/cve/#quais-produtos-têm-correspondência).

## Resolvedor de ciclo de vida

`endoflife:truenas`.
