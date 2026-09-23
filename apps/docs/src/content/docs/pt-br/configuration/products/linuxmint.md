---
title: Linux Mint
description: Como configurar o enodia para sondar o Linux Mint via SSH.
---

Faz parte da família de [identificação de SO via SSH](/pt-br/configuration/products/ssh-os-probes/)
— consulte essa página para o mecanismo compartilhado, as credenciais e a
verificação da chave do host. A correspondência é feita pelo campo `ID`
do `/etc/os-release`.

```yaml
targets:
  - id: mint-host
    product: linuxmint
    address: host.example.com
    credentials: linux-host-ssh
```

Verificado com uma captura real do rootfs de uma ISO: `ID=linuxmint`,
`VERSION_ID="22.3"` — de fato a identidade do próprio Mint, ao contrário
da única imagem encontrada no Docker Hub (`linuxmintd/mint22-amd64`, o
chroot de build de CI do próprio Mint), que informa a base Ubuntu
subjacente e teria sido a coisa errada para usar na correspondência.

## Correlação de CVEs

Sem correlação — as CVEs de uma distribuição de uso geral são vulnerabilidades de pacotes, e o número da versão não informa quais pacotes foram corrigidos desde então. Consulte [Correlação de CVEs](/pt-br/cve/#quais-produtos-têm-correspondência).

## Resolvedor de ciclo de vida

`endoflife:linuxmint`.
