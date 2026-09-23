---
title: Kali Linux
description: Como configurar o enodia para sondar o Kali Linux via SSH.
---

Faz parte da família de [identificação de SO via SSH](/pt-br/configuration/products/ssh-os-probes/)
— consulte essa página para o mecanismo compartilhado, as credenciais e a
verificação da chave do host. A correspondência é feita pelo campo `ID`
do `/etc/os-release`.

```yaml
targets:
  - id: kali-host
    product: kali-linux
    address: host.example.com
    credentials: linux-host-ssh
```

Verificado ao vivo com `kalilinux/kali-rolling`: `ID=kali`,
`VERSION_ID="2026.3"` — um snapshot datado de rolling release, não uma
versão discreta.

## Correlação de CVEs

Sem correlação — as CVEs de uma distribuição de uso geral são vulnerabilidades de pacotes, e o número da versão não informa quais pacotes foram corrigidos desde então. Consulte [Correlação de CVEs](/pt-br/cve/#quais-produtos-têm-correspondência).

## Resolvedor de ciclo de vida

Nenhum — o Kali é rolling release, e o endoflife.date não tem calendário
para ele (404 confirmado) pelo mesmo motivo que o Gentoo. Apenas
inventário.
