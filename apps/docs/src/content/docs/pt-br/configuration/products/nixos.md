---
title: NixOS
description: Como configurar o enodia para sondar o NixOS via SSH.
---

Faz parte da família de [identificação de SO via SSH](/pt-br/configuration/products/ssh-os-probes/)
— consulte essa página para o mecanismo compartilhado, as credenciais e a
verificação da chave do host. A correspondência é feita pelo campo `ID`
do `/etc/os-release`.

```yaml
targets:
  - id: nixos-host
    product: nixos
    address: host.example.com
    credentials: linux-host-ssh
```

Verificado com uma captura real do rootfs de uma ISO: `ID=nixos`,
`VERSION_ID="26.05"`. A única imagem no Docker Hub, `nixos/nix`, é apenas
o gerenciador de pacotes Nix rodando sobre uma base que não é NixOS, sem
nenhum `/etc/os-release` — não é um alvo de verificação utilizável, e por
isso foi usada uma captura do rootfs de uma ISO.

## Correlação de CVEs

Sem correlação — as CVEs de uma distribuição de uso geral são vulnerabilidades de pacotes, e o número da versão não informa quais pacotes foram corrigidos desde então. Consulte [Correlação de CVEs](/pt-br/cve/#quais-produtos-têm-correspondência).

## Resolvedor de ciclo de vida

`endoflife:nixos`.
