---
title: postmarketOS
description: Como configurar o enodia para sondar o postmarketOS via SSH.
---

Faz parte da família de [identificação de SO via SSH](/pt-br/configuration/products/ssh-os-probes/)
— consulte essa página para o mecanismo compartilhado, as credenciais e a
verificação da chave do host. A correspondência é feita pelo campo `ID`
do `/etc/os-release`.

```yaml
targets:
  - id: postmarketos-host
    product: postmarketos
    address: host.example.com
    credentials: linux-host-ssh
```

Verificado com uma captura real do rootfs de uma ISO: `ID="postmarketos"`,
`VERSION_ID="v26.06"` — o `v` inicial é o formato do próprio fornecedor,
repassado como está; a comparação de versões do `enodia` já remove um
`v`/`V` inicial antes de comparar, o mesmo tratamento que as tags de
release `v1.2.3` do GitHub recebem em outras partes da ferramenta.

## Correlação de CVEs

Sem correlação — as CVEs de uma distribuição de uso geral são vulnerabilidades de pacotes, e o número da versão não informa quais pacotes foram corrigidos desde então. Consulte [Correlação de CVEs](/pt-br/cve/#quais-produtos-têm-correspondência).

## Resolvedor de ciclo de vida

`endoflife:postmarketos`.
