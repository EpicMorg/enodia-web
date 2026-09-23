---
title: Alpine Linux
description: Como configurar o enodia para sondar o Alpine Linux via SSH.
---

Faz parte da família de [identificação de SO via SSH](/pt-br/configuration/products/ssh-os-probes/)
— consulte essa página para o mecanismo compartilhado, as credenciais e a
verificação da chave do host. A correspondência é feita pelo campo `ID`
do `/etc/os-release`.

```yaml
targets:
  - id: alpine-host
    product: alpine-linux
    address: host.example.com
    credentials: linux-host-ssh
```

Verificado ao vivo com `alpine:latest`: `ID=alpine` (observação: o campo
`ID` simples, não `alpine-linux` — o valor de `product:` acrescenta
`-linux` para maior clareza, mas a correspondência em si é feita com a
string mais curta do fornecedor), `VERSION_ID=3.24.1`.

## Correlação de CVEs

Sem correlação — as CVEs de uma distribuição de uso geral são vulnerabilidades de pacotes, e o número da versão não informa quais pacotes foram corrigidos desde então. Consulte [Correlação de CVEs](/pt-br/cve/#quais-produtos-têm-correspondência).

## Resolvedor de ciclo de vida

`endoflife:alpine-linux`.
