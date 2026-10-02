---
title: Supermicro BMC
description: Como configurar o enodia para sondar um BMC Supermicro via Redfish.
---

Lê `GET /redfish/v1/Managers/1` — o próprio recurso de manager Redfish do
BMC — para obter a versão do firmware.

```yaml
targets:
  - id: srv125-bmc
    product: supermicro-bmc
    address: https://bmc-srv125.example.com
    credentials: bmc-admin
```

## Autenticação — obrigatória

Autenticação HTTP Basic; sem ela, o endpoint responde `401` (confirmado
ao vivo).

```yaml
credentials:
  bmc-admin:
    kind: basic
    username: ADMIN
    password: "${BMC_PASSWORD}"
```

Uma conta do BMC somente leitura é suficiente. Os BMCs costumam servir um
certificado autoassinado — fixe-o em vez de desativar a verificação;
consulte [Configuração → TLS](/pt-br/configuration/#tls-tls).

## Verificação da identidade do fornecedor

Confirmado ao vivo com duas gerações — uma placa da série X12 (AST2600,
firmware `01.05.25`) e uma mais antiga, da era X9/X10 (firmware
`01.73.13`). Nenhuma delas traz um campo de fabricante que esta sonda
consiga alcançar em uma única requisição, mas ambas trazem uma chave
`Oem.Supermicro` exatamente neste recurso, e é isso que é verificado. O
BMC de outro fornecedor que responda no mesmo caminho falha, em vez de ser
registrado como Supermicro.

## Campos registrados

- `version` — `FirmwareVersion`, por exemplo `01.05.25`
- `extra.model`, quando presente

## Correlação de CVEs

Ainda sem correlação — as sondas de BMC são novas na 2.1, e o upstream
deixou o mapeamento de CVEs delas para uma etapa posterior, dedicada.
Consulte [Correlação de CVEs](/pt-br/cve/#quais-produtos-têm-correspondência).

## Resolvedor de ciclo de vida

Nenhum — o firmware de BMC não tem um calendário público de ciclo de vida
(404 confirmado em todos os slugs testados). Apenas inventário.
