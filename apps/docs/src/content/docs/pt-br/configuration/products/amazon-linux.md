---
title: Amazon Linux
description: Como configurar o enodia para sondar o Amazon Linux via SSH.
---

Faz parte da família de [identificação de SO via SSH](/pt-br/configuration/products/ssh-os-probes/)
— consulte essa página para o mecanismo compartilhado, as credenciais e a
verificação da chave do host. A correspondência é feita pelo campo `ID`
do `/etc/os-release`.

```yaml
targets:
  - id: amazon-linux-host
    product: amazon-linux
    address: host.example.com
    credentials: linux-host-ssh
```

Verificado ao vivo com `amazonlinux:2023`: `ID="amzn"` — o valor de `ID`
do os-release da própria Amazon, diferente do nome em `product:` — e
`VERSION_ID="2023"`.

## Correlação de CVEs

Sem correlação — as CVEs de uma distribuição de uso geral são vulnerabilidades de pacotes, e o número da versão não informa quais pacotes foram corrigidos desde então. Consulte [Correlação de CVEs](/pt-br/cve/#quais-produtos-têm-correspondência).

## Resolvedor de ciclo de vida

`endoflife:amazon-linux`.
