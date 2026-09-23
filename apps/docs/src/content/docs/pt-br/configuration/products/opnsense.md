---
title: OPNsense
description: Como configurar o enodia para sondar o OPNsense via SSH.
---

Usa o mesmo mecanismo SSH, as mesmas credenciais e a mesma verificação da
chave do host da família de [identificação de SO via SSH](/pt-br/configuration/products/ssh-os-probes/),
mas executa `opnsense-version` em vez de ler um arquivo.

```yaml
targets:
  - id: opnsense-host
    product: opnsense
    address: host.example.com
    credentials: linux-host-ssh
```

## Por que um comando, e não um arquivo

O OPNsense roda sobre uma base FreeBSD sem nenhum `/etc/os-release`, e a
sua versão real está dividida entre vários arquivos de componentes em
`/usr/local/opnsense/version/` (base, kernel, core, pkgs) — não há um
único arquivo de identidade óbvio. `opnsense-version` é o wrapper próprio
do OPNsense que lê o arquivo certo e imprime tudo em uma linha. Verificado
ao vivo com uma instância real do OPNsense 26.7, acessada via
`vmactions/opnsense-vm`: `"OPNsense 26.7 (amd64)"`.

## Campos registrados

- `version` — extraída da saída de `opnsense-version`
- `extra.hostKeyVerified`

## Correlação de CVEs

Correlacionado com o NVD e o BDU FSTEC quando um [bloco `cve:`](/pt-br/cve/) está configurado.

## Resolvedor de ciclo de vida

`endoflife:opnsense`.
