---
title: openSUSE
description: Como configurar o enodia para sondar o openSUSE via SSH.
---

Faz parte da família de [identificação de SO via SSH](/pt-br/configuration/products/ssh-os-probes/)
— consulte essa página para o mecanismo compartilhado, as credenciais e a
verificação da chave do host.

```yaml
targets:
  - id: opensuse-host
    product: opensuse
    address: host.example.com
    credentials: linux-host-ssh
```

## Corresponde tanto ao Leap quanto ao Tumbleweed

Ao contrário da maioria das verificações de igualdade simples de `ID`
desta família, esta aceita qualquer `ID` que comece com `opensuse-`.
Verificado ao vivo com `opensuse/leap:latest`: `ID="opensuse-leap"`,
`VERSION_ID="16.0"`. O Tumbleweed (`ID="opensuse-tumbleweed"`) não é
coberto aqui por um fixture real, mas compartilha o mesmo prefixo
`opensuse-`, então é aceito por este mesmo produto em vez de ficar sem
correspondência.

## Correlação de CVEs

Sem correlação — as CVEs de uma distribuição de uso geral são vulnerabilidades de pacotes, e o número da versão não informa quais pacotes foram corrigidos desde então. Consulte [Correlação de CVEs](/pt-br/cve/#quais-produtos-têm-correspondência).

## Resolvedor de ciclo de vida

`endoflife:opensuse`.
