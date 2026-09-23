---
title: openEuler
description: Como configurar o enodia para sondar o openEuler via SSH.
---

Faz parte da família de [identificação de SO via SSH](/pt-br/configuration/products/ssh-os-probes/)
— consulte essa página para o mecanismo compartilhado, as credenciais e a
verificação da chave do host. A correspondência é feita pelo campo `ID`
do `/etc/os-release`.

```yaml
targets:
  - id: openeuler-host
    product: openeuler
    address: host.example.com
    credentials: linux-host-ssh
```

Verificado ao vivo via `vmactions/openeuler-vm` (24.03-LTS-SP4, a release
padrão da action): `ID="openEuler"` — **com E maiúsculo, confirmado ao
vivo, não minúsculo** — e `VERSION_ID="24.03"`.

## Correlação de CVEs

Sem correlação — as CVEs de uma distribuição de uso geral são vulnerabilidades de pacotes, e o número da versão não informa quais pacotes foram corrigidos desde então. Consulte [Correlação de CVEs](/pt-br/cve/#quais-produtos-têm-correspondência).

## Resolvedor de ciclo de vida

Nenhum — o endoflife.date não tem hoje um calendário do openEuler. Apenas
inventário.
