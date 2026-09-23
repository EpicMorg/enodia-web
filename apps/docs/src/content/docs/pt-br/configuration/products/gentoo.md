---
title: Gentoo Linux
description: Como configurar o enodia para sondar o Gentoo Linux via SSH.
---

Faz parte da família de [identificação de SO via SSH](/pt-br/configuration/products/ssh-os-probes/)
— consulte essa página para o mecanismo compartilhado, as credenciais e a
verificação da chave do host. A correspondência é feita pelo campo `ID`
do `/etc/os-release`.

```yaml
targets:
  - id: gentoo-host
    product: gentoo
    address: host.example.com
    credentials: linux-host-ssh
```

Verificado ao vivo com `gentoo/stage3` (a imagem oficial do gentoo.org):
`ID=gentoo`, `VERSION_ID=2.18` — o número de release do próprio Gentoo
Base System, não uma versão de distribuição no sentido tradicional.

## Correlação de CVEs

Sem correlação — as CVEs de uma distribuição de uso geral são vulnerabilidades de pacotes, e o número da versão não informa quais pacotes foram corrigidos desde então. Consulte [Correlação de CVEs](/pt-br/cve/#quais-produtos-têm-correspondência).

## Resolvedor de ciclo de vida

Nenhum — o Gentoo é rolling release, e o endoflife.date não tem calendário
para ele (404 confirmado) pelo mesmo motivo: não há uma versão discreta
contra a qual acompanhar o EOL. Apenas inventário.
