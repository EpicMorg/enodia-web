---
title: CentOS Linux (legado)
description: Como configurar o enodia para sondar o CentOS Linux legado, já em EOL, via SSH.
---

Usa o mesmo mecanismo SSH, as mesmas credenciais e a mesma verificação da
chave do host da família de [identificação de SO via SSH](/pt-br/configuration/products/ssh-os-probes/),
mas lê um arquivo diferente: `/etc/redhat-release`, não
`/etc/os-release`.

```yaml
targets:
  - id: centos-host
    product: centos
    address: host.example.com
    credentials: linux-host-ssh
```

## Por que não a família os-release

Este é o CentOS Linux legado, já em EOL (5/6/7/8) — em contraste com o
[CentOS Stream](/pt-br/configuration/products/centos-stream/), o seu sucessor
ainda vigente. Foi confirmado ao vivo que o CentOS 5 e o 6 são totalmente
anteriores à convenção os-release do systemd (não há `/etc/os-release`
algum), enquanto `/etc/redhat-release` existe em toda a família RHEL desde
muito antes disso. Frotas reais ainda executam essas versões — o CentOS
chegar ao EOL não aposenta as máquinas que ainda o executam, e essa é
exatamente a situação que o enodia existe para evidenciar, não para
esconder.

Verificado ao vivo com `centos:5` (`"CentOS release 5.11 (Final)"`),
`:6` (`"CentOS release 6.10 (Final)"`) e `:7` (`"CentOS Linux release
7.9.2009 (Core)"`). O próprio `/etc/redhat-release` de um host CentOS
Stream 9 (`"CentOS Stream release 9"`) **não** corresponde a esse padrão
— a correspondência exige "CentOS release" ou "CentOS Linux release"
imediatamente após "CentOS ", então uma instância Stream nunca é
identificada erroneamente como `centos` legado, mesmo que os dois arquivos
existam nas duas linhas de produto.

## Campos registrados

- `version` — o número da release extraído de `/etc/redhat-release`
- `extra.hostKeyVerified`

## Correlação de CVEs

Sem correlação — as CVEs de uma distribuição de uso geral são vulnerabilidades de pacotes, e o número da versão não informa quais pacotes foram corrigidos desde então. Consulte [Correlação de CVEs](/pt-br/cve/#quais-produtos-têm-correspondência).

## Resolvedor de ciclo de vida

`endoflife:centos`.
