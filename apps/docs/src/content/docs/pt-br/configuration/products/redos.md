---
title: RED OS
description: Como configurar o enodia para sondar o RED OS via SSH.
---

Faz parte da família de [identificação de SO via SSH](/pt-br/configuration/products/ssh-os-probes/)
— consulte essa página para o mecanismo compartilhado, as credenciais e a
verificação da chave do host. A correspondência é feita pelo campo `ID`
do `/etc/os-release`.

```yaml
targets:
  - id: redos-host
    product: redos
    address: host.example.com
    credentials: linux-host-ssh
```

Verificado ao vivo com `alrdockerhub/redos:7.3.1` (conteúdo real do RED OS
— `HOME_URL`/`BUG_REPORT_URL` apontam para red-soft.ru): `ID="redos"`,
`VERSION_ID="7.3.1"`.

## Correlação de CVEs

Sem correlação — as CVEs de uma distribuição de uso geral são vulnerabilidades de pacotes, e o número da versão não informa quais pacotes foram corrigidos desde então. Consulte [Correlação de CVEs](/pt-br/cve/#quais-produtos-têm-correspondência).

## Resolvedor de ciclo de vida

Nenhum — o endoflife.date não tem hoje um calendário do RED OS. Apenas
inventário.
