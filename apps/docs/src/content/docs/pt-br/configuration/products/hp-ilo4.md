---
title: HP iLO 4
description: Como configurar o enodia para sondar um HP iLO 4.
---

Lê `GET /redfish/v1/Managers/1/` — com a barra final, que foi confirmado
ao vivo que faz diferença — para obter a versão do firmware do
controlador.

```yaml
targets:
  - id: vm43-ilo
    product: hp-ilo4
    address: https://ilo-vm43.example.com
    credentials: ilo-ro
```

## Autenticação — obrigatória

Autenticação HTTP Basic; sem ela, o endpoint responde `401` (confirmado
ao vivo).

```yaml
credentials:
  ilo-ro:
    kind: basic
    username: enodia
    password: "${ILO_PASSWORD}"
```

Uma conta do iLO somente leitura é suficiente. Os iLOs costumam servir um
certificado autoassinado — fixe-o em vez de desativar a verificação;
consulte [Configuração → TLS](/pt-br/configuration/#tls-tls).

## Apenas iLO 4

A API do iLO 4 chama a si mesma de "HP RESTful Root Service" — uma API da
HP anterior ao Redfish, e não uma implementação do Redfish —, mas este
recurso específico se sobrepõe ao Redfish o suficiente para ser lido da
mesma forma. A identidade é verificada pela sua chave `Oem.Hp`. O iLO 5 é
totalmente compatível com o Redfish e muito provavelmente precisa de uma
verificação diferente; nenhum iLO 5 estava disponível para confirmar isso
ao vivo, então ele ainda não tem sonda, em vez de ter uma baseada em
suposições.

## Campos registrados

- `version` — extraída de `FirmwareVersion`: `iLO 4 v2.82` → `2.82`
- `extra.raw` — a string `FirmwareVersion` completa

## Correlação de CVEs

Correlacionado com o NVD e o BDU FSTEC quando um [bloco `cve:`](/pt-br/cve/) está configurado. Desde a 2.2; a versão de firmware
da sonda (`2.82`) é comparada como está com os intervalos
`integrated_lights-out_4` do NVD e com o "HP iLO 4" do BDU.

## Resolvedor de ciclo de vida

Nenhum — o firmware de BMC não tem um calendário público de ciclo de vida
(404 confirmado em todos os slugs testados). Apenas inventário.
