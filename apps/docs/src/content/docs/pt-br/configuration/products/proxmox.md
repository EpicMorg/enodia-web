---
title: Proxmox VE
description: Como configurar o enodia para sondar o Proxmox VE.
---

Lê `GET /api2/json/version`.

```yaml
targets:
  - id: proxmox-main
    product: proxmox
    address: https://proxmox.example.com:8006
    credentials: proxmox-token
```

## Autenticação — obrigatória

Confirmado ao vivo com um host Proxmox VE 9.2.2 real: este endpoint
responde `401` sem credenciais. O formato de token de API do próprio
Proxmox é um valor simples de cabeçalho `Authorization` —
`PVEAPIToken=user@realm!tokenid=secret`, a string inteira como um único
token —, então `token-header` se encaixa diretamente, com o seu cabeçalho
padrão (`Authorization`) já correto:

```yaml
credentials:
  proxmox-token:
    kind: token-header
    value: "PVEAPIToken=enodia@pve!readonly=${PROXMOX_TOKEN_SECRET}"
```

O fluxo alternativo de ticket com usuário/senha (`POST /access/ticket`
para um cookie de sessão mais um token CSRF) deliberadamente não é
suportado — é um formato de login por sessão mais pesado, e a própria
documentação do Proxmox recomenda o token de API para automação não
assistida de qualquer forma.

## Campos registrados

- `version`
- `extra.repoid`, quando presente

## Correlação de CVEs

Correlacionado com o NVD e o BDU FSTEC quando um [bloco `cve:`](/pt-br/cve/) está configurado.

Este alvo cobre o próprio Proxmox VE. Para CVEs nos pacotes instalados
no host, adicione um segundo alvo para o mesmo host com
[`product: debian`](/pt-br/configuration/products/debian/) via SSH — o
seu os-release é o do Debian. O pacote `linux` do Debian só é
correlacionado com um kernel Debian em execução, então o kernel próprio
do Proxmox não é confundido com um, e os pacotes compilados pelo Proxmox
não recebem achados (não há um feed público para eles). Consulte
[Correlação de CVEs](/pt-br/cve/#cves-por-pacote-para-distribuições-linux).

## Resolvedor de ciclo de vida

`endoflife:proxmox-ve`.
