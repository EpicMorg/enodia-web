---
title: Oracle Linux
description: Como configurar o enodia para sondar o Oracle Linux via SSH.
---

Faz parte da família de [identificação de SO via SSH](/pt-br/configuration/products/ssh-os-probes/)
— consulte essa página para o mecanismo compartilhado, as credenciais e a
verificação da chave do host. A correspondência é feita pelo campo `ID`
do `/etc/os-release`.

```yaml
targets:
  - id: oraclelinux-host
    product: oracle-linux
    address: host.example.com
    credentials: linux-host-ssh
```

Verificado ao vivo com `oraclelinux:9`: `ID="ol"` — o valor de `ID` do
os-release da própria Oracle, diferente do nome em `product:` — e
`VERSION_ID="9.8"`.

## Correlação de CVEs

Correlacionado **por pacote instalado** com o OVAL da Oracle (`com.oracle.elsa-ol<N>.xml.bz2`, em `cve.oval.path`), não pela versão. A sonda também lista os pacotes binários instalados (`rpm -qa`, com o stream de módulo AppStream de cada pacote) e lê `uname -r`/`-m`/`-v` na mesma ida e volta SSH — armazenados como `packages` e `modules` da observação, e `extra.kernelRelease`, `extra.arch`, `extra.kernelVersion`. Entre vários kernels instalados, é comparado o que está em execução. Os branches separados x86_64 e aarch64 da Oracle são correlacionados com `uname -m`, e as recompilações FIPS e Ksplice só são correlacionadas com as correções da sua própria variante. Só são informadas as CVEs com uma correção mais nova do que a instalada, um achado por pacote, com link para o seu ELSA. Consulte [Correlação de CVEs](/pt-br/cve/#cves-por-pacote-para-distribuições-linux).

## Resolvedor de ciclo de vida

`endoflife:oracle-linux`.
