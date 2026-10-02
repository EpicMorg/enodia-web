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

Correlacionado **por pacote instalado** com o OVAL da Canonical para a base Ubuntu do host (`UBUNTU_CODENAME` do os-release, registrado como `extra.codename`; o arquivo vai em `cve.oval.path`). A sonda também lista os pacotes binários instalados (`dpkg-query`) e lê `uname -r`/`-m`/`-v` na mesma ida e volta SSH — armazenados como `packages` da observação, e `extra.kernelRelease`, `extra.arch`, `extra.kernelVersion`. Só são informadas as CVEs com uma correção mais nova do que a instalada, um achado por pacote, com link para o seu USN. Consulte [Correlação de CVEs](/pt-br/cve/#cves-por-pacote-para-distribuições-linux).

## Resolvedor de ciclo de vida

`endoflife:linuxmint`.
