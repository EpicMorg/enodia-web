---
title: Debian
description: Como configurar o enodia para sondar o Debian via SSH.
---

Usa o mesmo mecanismo SSH, as mesmas credenciais e a mesma verificação da
chave do host da família de [identificação de SO via SSH](/pt-br/configuration/products/ssh-os-probes/),
mas — desde a 1.1.1 — não faz mais parte do mecanismo compartilhado
`osReleaseFamilyProbe` descrito naquela página; veja abaixo.

```yaml
targets:
  - id: debian-host
    product: debian
    address: host.example.com
    credentials: linux-host-ssh
```

## Uma sonda própria, não a os-release compartilhada, desde a 1.1.1

O `VERSION_ID` do `/etc/os-release` do Debian nunca traz uma point release
— confirmado ao vivo: uma instalação do Debian 13 com todas as
atualizações aplicadas ainda informa apenas `VERSION_ID="13"`, idêntico a
uma instalação do primeiro dia. A point release real (`13.6`) está
somente em `/etc/debian_version`. Esse arquivo, porém, não é confiável por
si só: foi confirmado ao vivo que uma imagem real do Ubuntu 24.04 também
traz um, herdado da sua linhagem de build, com o conteúdo `trixie/sid` —
sem significado para a versão do próprio Ubuntu. Esta sonda lê os dois
arquivos em uma única ida e volta SSH, confirma primeiro `ID=debian` e só
confia no conteúdo de `debian_version` quando ele é um número simples com
pontos — a cópia do próprio Debian testing (`forky/sid`) e a herdada pelo
Ubuntu recaem corretamente em `VERSION_ID`.

Verificado ao vivo com `debian:bookworm-slim`: `ID=debian`,
`VERSION_ID="12"`.

## Campos registrados

- `version` — a point release quando `/etc/debian_version` tem uma, por
  exemplo `13.6`; caso contrário, o `VERSION_ID` simples
- `extra.debianVersion` — o conteúdo bruto de `/etc/debian_version`,
  sempre que o arquivo existe e não está vazio, mesmo quando não era um
  número simples com pontos (como o `forky/sid` do Debian testing, útil
  de ver como está em vez de descartado silenciosamente)
- `extra.codename` — `VERSION_CODENAME` do os-release, que escolhe a
  versão no tracker
- `extra.kernel` — a versão Debian do kernel em execução, de `uname -v`
- `packages` — os pacotes fonte instalados e as suas versões (veja abaixo)
- `extra.hostKeyVerified`

## Correlação de CVEs

Correlacionado **por pacote instalado** com o Debian Security Tracker (`cve.debian.path`), não pela versão. A sonda lê os pacotes *fonte* instalados (`source:Package`/`source:Version` do `dpkg-query` — a própria chave do tracker) e a versão Debian do kernel em execução (de `uname -v`) na mesma ida e volta SSH que a própria versão. Só são informadas as CVEs que o Debian já corrigiu em uma versão mais nova do que a instalada, um achado por pacote fonte, com link para a sua página no tracker. O tracker só cobre as versões que a equipe de segurança do Debian ainda suporta (bookworm, trixie, testing, sid); hosts mais antigos não recebem achados de pacotes. Um host Proxmox VE é coberto por um alvo `debian` como este — consulte [Correlação de CVEs](/pt-br/cve/#cves-por-pacote-para-distribuições-linux).

## Resolvedor de ciclo de vida

`endoflife:debian` — inalterado.
