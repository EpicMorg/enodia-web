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
- `extra.hostKeyVerified`

## Correlação de CVEs

Sem correlação — as CVEs de uma distribuição de uso geral são vulnerabilidades de pacotes, e o número da versão não informa quais pacotes foram corrigidos desde então. Consulte [Correlação de CVEs](/pt-br/cve/#quais-produtos-têm-correspondência).

## Resolvedor de ciclo de vida

`endoflife:debian` — inalterado.
