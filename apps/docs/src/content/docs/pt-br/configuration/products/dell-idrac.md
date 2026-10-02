---
title: Dell iDRAC
description: Como configurar o enodia para sondar um Dell iDRAC via Redfish.
---

Duas requisições via Redfish: `GET /redfish/v1` para a identidade do
fornecedor e, em seguida, `GET /redfish/v1/Managers/iDRAC.Embedded.1`
para a versão do firmware.

```yaml
targets:
  - id: blade-1a-idrac
    product: dell-idrac
    address: https://idrac-blade-1a.example.com
    credentials: idrac-ro
```

## Autenticação — obrigatória

Autenticação HTTP Basic; sem ela, os endpoints respondem `401`
(confirmado ao vivo).

```yaml
credentials:
  idrac-ro:
    kind: basic
    username: enodia
    password: "${IDRAC_PASSWORD}"
```

Uma conta do iDRAC somente leitura é suficiente. Os iDRACs costumam
servir um certificado autoassinado — fixe-o em vez de desativar a
verificação; consulte [Configuração → TLS](/pt-br/configuration/#tls-tls).

## Verificação da identidade do fornecedor

Por que duas requisições: confirmado ao vivo em um iDRAC 12G real, o
próprio recurso Manager não traz nenhum marcador de fornecedor, enquanto a
raiz do serviço `/redfish/v1` traz `Oem.Dell` (com a service tag) e a
string de produto "Integrated Dell Remote Access Controller". A primeira
requisição confirma que se trata de um Dell; a segunda lê a versão.
`iDRAC.Embedded.1` é o id padrão da Dell para o controlador embutido, o
que é verificado.

Um **CMC** da Dell (o controlador em nível de chassi de um gabinete de
blades) é um produto diferente, sem nenhum endpoint Redfish, e não é
coberto.

## Campos registrados

- `version` — `FirmwareVersion`, por exemplo `2.65.65.65`
- `extra.model`, quando presente
- `extra.serviceTag`, quando presente

## Correlação de CVEs

Ainda sem correlação — as sondas de BMC são novas na 2.1, e o upstream
deixou o mapeamento de CVEs delas para uma etapa posterior, dedicada.
Consulte [Correlação de CVEs](/pt-br/cve/#quais-produtos-têm-correspondência).

## Resolvedor de ciclo de vida

Nenhum — o firmware de BMC não tem um calendário público de ciclo de vida
(404 confirmado em todos os slugs testados). Apenas inventário.
