---
title: Astra Linux
description: Como configurar o enodia para sondar o Astra Linux via SSH.
---

Usa o mesmo mecanismo SSH, as mesmas credenciais e a mesma verificação da
chave do host da família de [identificação de SO via SSH](/pt-br/configuration/products/ssh-os-probes/),
mas lê um arquivo diferente: `/etc/astra_version`, o arquivo de identidade
próprio do Astra, em vez de `/etc/os-release`.

```yaml
targets:
  - id: astra-host
    product: astra-linux
    address: host.example.com
    credentials: linux-host-ssh
```

## Por que não `/etc/os-release`

O Astra Linux é baseado no Debian e traz, sim, `/etc/os-release`
(`ID_LIKE=debian`), mas o seu `VERSION_ID` é inutilizável: foi confirmado
ao vivo (`epicmorg/astralinux:1.7-main` e `:1.8-main`) que ele contém
`"1.8_x86-64"` — um sufixo de arquitetura embutido diretamente na string
de versão. `/etc/astra_version` não tem nada disso: um simples
`"1.8.6"`/`"1.7.9"`, a point release real que o próprio Astra acompanha.

## Campos registrados

- `version` — a partir de `/etc/astra_version`
- `extra.hostKeyVerified`

## Correlação de CVEs

Correlacionado **por pacote instalado** com o OVAL próprio do Astra Linux para o SE 1.7 ou 1.8 (`oval-definitions-alse-<1.7|1.8>.xml`, em `cve.oval.path`) — os dados do Debian não se aplicam, já que as versões de pacotes do Astra são recompilações próprias. A versão é correlacionada pelo major.minor (`1.8.6` → 1.8). A sonda também lista os pacotes binários instalados (`dpkg-query`) na mesma ida e volta SSH que `/etc/astra_version` — armazenados como `packages` da observação, além de `extra.kernelRelease`, `extra.arch`, `extra.kernelVersion`. Os achados apontam para o boletim próprio do Astra, ou para o BDU quando o fornecedor não cita nenhum (1.7). Os dados do Astra não trazem severidade, e os seus pacotes de kernel são comparados como instalados, não como em execução. Consulte [Correlação de CVEs](/pt-br/cve/#cves-por-pacote-para-distribuições-linux).

## Resolvedor de ciclo de vida

Nenhum — o endoflife.date não tem um calendário do Astra Linux (404
confirmado em `astra`, `astralinux` e `astra-linux`). Apenas inventário.
