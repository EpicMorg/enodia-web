---
title: CentOS Stream
description: Como configurar o enodia para sondar o CentOS Stream via SSH.
---

Faz parte da família de [identificação de SO via SSH](/pt-br/configuration/products/ssh-os-probes/)
— consulte essa página para o mecanismo compartilhado, as credenciais e a
verificação da chave do host.

```yaml
targets:
  - id: centos-stream-host
    product: centos-stream
    address: host.example.com
    credentials: linux-host-ssh
```

## Verificação da identidade do fornecedor — mais do que uma simples correspondência de `ID`

Verificado ao vivo com `quay.io/centos/centos:stream9`: `/etc/os-release`
informa `ID="centos"` — **o mesmo `ID` que o
[CentOS Linux](/pt-br/configuration/products/centos/) legado, já em EOL, usa** —
então este produto também verifica `NAME="CentOS Stream"`, o campo que
realmente distingue os dois. `product: centos-stream` apontado para um
host CentOS 7 legado (ou vice-versa) falha na verificação de identidade
em vez de ser registrado sob o produto errado.

## Campos registrados

Os mesmos do restante da família: `version` a partir de `VERSION_ID`,
mais `extra.hostKeyVerified`.

## Correlação de CVEs

Sem correlação — as CVEs de uma distribuição de uso geral são vulnerabilidades de pacotes, e o número da versão não informa quais pacotes foram corrigidos desde então. Consulte [Correlação de CVEs](/pt-br/cve/#quais-produtos-têm-correspondência).

## Resolvedor de ciclo de vida

`endoflife:centos-stream`.
