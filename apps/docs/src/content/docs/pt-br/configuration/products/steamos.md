---
title: SteamOS
description: Como configurar o enodia para sondar o SteamOS via SSH.
---

Faz parte da família de [identificação de SO via SSH](/pt-br/configuration/products/ssh-os-probes/)
— consulte essa página para o mecanismo compartilhado, as credenciais e a
verificação da chave do host. A correspondência é feita pelo campo `ID`
do `/etc/os-release`.

```yaml
targets:
  - id: steamos-host
    product: steamos
    address: host.example.com
    credentials: linux-host-ssh
```

Verificado com uma captura real do rootfs de uma ISO do SteamOS 2
(baseado no Debian, codinome "brewmaster"): `ID=steamos`,
`VERSION_ID="2"`. Espera-se que o SteamOS 3.x (baseado no Arch, o SO atual
do Steam Deck, codinome "holo") compartilhe o mesmo `ID=steamos` — a
identidade da marca da própria Valve é consistente ao longo da reescrita
—, mas isso ainda não foi confirmado ao vivo, apenas a 2.x foi; a
correspondência simples `ID=steamos` cobre as duas sem precisar de
tratamento especial para nenhuma.

## Correlação de CVEs

Sem correlação — as CVEs de uma distribuição de uso geral são vulnerabilidades de pacotes, e o número da versão não informa quais pacotes foram corrigidos desde então. Consulte [Correlação de CVEs](/pt-br/cve/#quais-produtos-têm-correspondência).

## Resolvedor de ciclo de vida

`endoflife:steamos`.
