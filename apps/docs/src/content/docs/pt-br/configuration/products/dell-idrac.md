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

Correlacionado com o NVD e o BDU FSTEC quando um [bloco `cve:`](/pt-br/cve/) está configurado. Desde a 2.2. Os dois bancos de
dados tratam cada geração do iDRAC como um produto próprio, com números de
firmware que se sobrepõem, então a geração é lida de `extra.model` (o
modelo do Redfish, por exemplo `12G Modular` → iDRAC7; 11G iDRAC6, 13G
iDRAC8, 14G–16G iDRAC9, 17G iDRAC10). Sem um modelo, só o firmware 3.x e
posterior é consultado (só pode ser um iDRAC9) — consulte
[Dell iDRAC e Synology DSM](/pt-br/cve/#dell-idrac-e-synology-dsm).

## Resolvedor de ciclo de vida

Nenhum — o firmware de BMC não tem um calendário público de ciclo de vida
(404 confirmado em todos os slugs testados). Apenas inventário.
