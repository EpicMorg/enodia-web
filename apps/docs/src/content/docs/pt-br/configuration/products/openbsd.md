---
title: OpenBSD
description: Como configurar o enodia para sondar o OpenBSD via SSH.
---

Faz parte da família de [identificação de SO via SSH](/pt-br/configuration/products/ssh-os-probes/),
mas não do grupo os-release — o OpenBSD não traz nenhum equivalente ao
os-release, então a fonte de identidade é `uname -sr`. Consulte a página
da família para o mecanismo compartilhado, as credenciais e a verificação
da chave do host.

```yaml
targets:
  - id: openbsd-host
    product: openbsd
    address: host.example.com
    credentials: linux-host-ssh
```

Verificado ao vivo via `vmactions/openbsd-vm` (não existe outra imagem
pré-instalada para download): `uname -sr` → `"OpenBSD 7.9"`, sem nenhum
hostname — ao contrário de `uname -a`, que esta sonda deliberadamente não
usa.

## Correlação de CVEs

Sem correlação — o NVD registra os níveis de patch em um campo da CPE que o correlacionador não lê, então correlacionar apenas pela release marcaria um host totalmente atualizado com todas as CVEs já corrigidas nessa release. Consulte [Correlação de CVEs](/pt-br/cve/#quais-produtos-têm-correspondência).

## Resolvedor de ciclo de vida

`endoflife:openbsd`.
