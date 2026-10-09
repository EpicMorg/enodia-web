---
title: pfSense
description: Como configurar o enodia para sondar o pfSense Community Edition via SSH.
---

Usa o mesmo mecanismo SSH, as mesmas credenciais e a mesma verificação da
chave do host da família de [identificação de SO via SSH](/pt-br/configuration/products/ssh-os-probes/),
mas lê os próprios `/etc/version` e `/etc/platform` do pfSense em uma
única ida e volta.

```yaml
targets:
  - id: pfsense-fw
    product: pfsense
    address: fw.example.com
    credentials: linux-host-ssh
```

## Autenticação — obrigatória

Uma credencial SSH, `ssh-key` ou `password` — consulte
[Configuração → Credenciais](/pt-br/configuration/#credenciais).

## Apenas Community Edition

Confirmado ao vivo com três hosts pfSense CE reais (`2.7.2-RELEASE`,
`2.8.1-RELEASE`): `/etc/version` contém exatamente a versão que o próprio
painel do pfSense mostra, e `/etc/platform` contém `pfSense`.

O **pfSense Plus** comercial da Netgate é um produto diferente, com o seu
próprio esquema de versões baseado em calendário (`24.11`, e não
`2.x.y-RELEASE`). Segundo a sua documentação, ele informa `pfSense-Plus`
em `/etc/platform`; esta sonda rejeita isso em vez de registrar um host
Plus como um fato do CE. Nenhum host Plus estava disponível para confirmar
isso ao vivo — baseia-se apenas na documentação.

## Campos registrados

- `version` — `/etc/version` como está, por exemplo `2.8.1-RELEASE`
- `extra.hostKeyVerified`

## Correlação de CVEs

Correlacionado com o NVD e o BDU FSTEC quando um [bloco `cve:`](/pt-br/cve/) está configurado. Desde a 2.2. A sonda informa
apenas a Community Edition, então os intervalos do pfSense Plus no NVD
(`sw_edition: plus`) nunca se aplicam — consulte
[Correspondência sensível à edição](/pt-br/cve/#correspondência-sensível-à-edição).

## Resolvedor de ciclo de vida

Nenhum — o endoflife.date não tem página em `pfsense`, `pfsense-ce` nem
`pfsense-plus` (404 confirmado). Apenas inventário, por enquanto.
