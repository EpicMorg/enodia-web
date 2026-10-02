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

Correlacionado **por pacote instalado** com o OVAL próprio do RED OS para o 7.3 ou 8.0 (`redos.xml` de `redos.red-soft.ru/support/secure/<7.3|8.0>/`, em `cve.oval.path`) — os dados do RHEL não se aplicam, já que as versões de pacotes do RED OS são próprias (`.el7` no 7.3, `.red80` no 8.0). A versão é correlacionada pelo major.minor. A sonda também lista os pacotes binários instalados (`rpm -qa`, com o stream de módulo AppStream de cada pacote) e lê `uname -r`/`-m`/`-v` na mesma ida e volta SSH — armazenados como `packages` e `modules` da observação, e `extra.kernelRelease`, `extra.arch`, `extra.kernelVersion`. Entre vários kernels instalados, é comparado o que está em execução. Os achados apontam para os boletins `ROS-…` do RED OS e trazem a severidade do próprio fornecedor. Consulte [Correlação de CVEs](/pt-br/cve/#cves-por-pacote-para-distribuições-linux).

## Resolvedor de ciclo de vida

Nenhum — o endoflife.date não tem hoje um calendário do RED OS. Apenas
inventário.
