---
title: vCenter Server
description: Como configurar o enodia para sondar o VMware vCenter Server.
---

Chama `ServiceContent.about` por meio da própria chamada SOAP de
descoberta `RetrieveServiceContent` da API do vSphere, em `/sdk` — a mesma
chamada e o mesmo endpoint que o [ESXi](/pt-br/configuration/products/esxi/)
responde, diferenciados pelo campo `apiType`.

```yaml
targets:
  - id: vcenter-main
    product: vcenter
    address: https://vcenter.example.com
```

## Autenticação

Nenhuma — confirmado ao vivo com uma instância vCenter 8.0.3 real de
produção, sem credencial alguma.

## Verificação da identidade do fornecedor

`apiType` é comparado com `"VirtualCenter"` — um host ESXi real responde à
mesma chamada com `apiType=HostAgent` (consulte
[ESXi](/pt-br/configuration/products/esxi/), que executa essa mesma
verificação no sentido inverso). Apontar `product: vcenter` para um host
ESXi falha de forma explícita em vez de ser registrado como um fato
errado.

## Não é igual a uma versão anterior desta sonda

Esta sonda antes lia `/sdk/vimServiceVersions.xml`, que responde de forma
idêntica tanto para ESXi quanto para vCenter (então nunca conseguia
distinguir os dois) e informa a versão do schema da API `vim25` (por
exemplo `"8.0.3.0"`) em vez da versão comercial real do produto. A sonda
atual, baseada em `RetrieveServiceContent`, corrige os dois problemas —
versão real, verificação de identidade real.

## Campos registrados

- `version` — a versão comercial real, por exemplo `8.0.3`
- `extra.build`, quando presente

## Correlação de CVEs

Sem correlação — quase todas as suas entradas são literais no estilo `7.0` + `update_1`, que o correlacionador não lê, então o resultado seria nada ou tudo. Consulte [Correlação de CVEs](/pt-br/cve/#quais-produtos-têm-correspondência).

## Resolvedor de ciclo de vida

`endoflife:vcenter`.
