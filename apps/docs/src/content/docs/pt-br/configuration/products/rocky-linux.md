---
title: Rocky Linux
description: Como configurar o enodia para sondar o Rocky Linux via SSH.
---

Faz parte da família de [identificação de SO via SSH](/pt-br/configuration/products/ssh-os-probes/)
— consulte essa página para o mecanismo compartilhado, as credenciais e a
verificação da chave do host. A correspondência é feita pelo campo `ID`
do `/etc/os-release`.

```yaml
targets:
  - id: rocky-host
    product: rocky-linux
    address: host.example.com
    credentials: linux-host-ssh
```

Verificado ao vivo com `rockylinux:9`: `ID="rocky"` — o valor de `ID` do
os-release do próprio Rocky, diferente do nome em `product:` — e
`VERSION_ID="9.3"`.

## Correlação de CVEs

Correlacionado **por pacote instalado** com o OVAL **da Red Hat** (`rhel-<N>.oval.xml.bz2`, em `cve.oval.path`) — o Rocky recompila os pacotes da Red Hat com as mesmas versões, e o arquivo OVAL próprio do Rocky é recusado (ele contém uma pequena fração dos avisos do Rocky e não passa na validação do esquema OVAL). A sonda também lista os pacotes binários instalados (`rpm -qa`, com o stream de módulo AppStream de cada pacote) e lê `uname -r`/`-m`/`-v` na mesma ida e volta SSH — armazenados como `packages` e `modules` da observação, e `extra.kernelRelease`, `extra.arch`, `extra.kernelVersion`. Entre vários kernels instalados, é comparado o que está em execução. Só são informadas as CVEs com uma correção mais nova do que a instalada, um achado por pacote. Algumas delas vêm de correções que a Red Hat publicou como avisos de correção de bugs (RHBA), que `dnf updateinfo --security` não lista. Consulte [Correlação de CVEs](/pt-br/cve/#cves-por-pacote-para-distribuições-linux).

## Resolvedor de ciclo de vida

`endoflife:rocky-linux`.
