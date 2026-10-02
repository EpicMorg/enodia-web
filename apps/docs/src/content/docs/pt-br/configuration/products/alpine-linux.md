---
title: Alpine Linux
description: Como configurar o enodia para sondar o Alpine Linux via SSH.
---

Faz parte da família de [identificação de SO via SSH](/pt-br/configuration/products/ssh-os-probes/)
— consulte essa página para o mecanismo compartilhado, as credenciais e a
verificação da chave do host. A correspondência é feita pelo campo `ID`
do `/etc/os-release`.

```yaml
targets:
  - id: alpine-host
    product: alpine-linux
    address: host.example.com
    credentials: linux-host-ssh
```

Verificado ao vivo com `alpine:latest`: `ID=alpine` (observação: o campo
`ID` simples, não `alpine-linux` — o valor de `product:` acrescenta
`-linux` para maior clareza, mas a correspondência em si é feita com a
string mais curta do fornecedor), `VERSION_ID=3.24.1`.

## Correlação de CVEs

Correlacionado **por pacote instalado** com o secdb do Alpine para o branch do host (`main.json` e `community.json`, em `cve.alpine.path`), não pela versão. O branch é o major.minor de `VERSION_ID` (3.20.3 → v3.20); o edge não tem branch numerado e não recebe achados. A sonda também lê `/lib/apk/db/installed` na mesma ida e volta SSH e identifica os pacotes pela **origem** (a própria chave do secdb: `libcrypto3` e `libssl3` são ambos `openssl`) — armazenados como `packages` da observação, além de `extra.kernelRelease`, `extra.arch`, `extra.kernelVersion`. Só são informadas as CVEs com uma correção mais nova do que a instalada, um achado por origem, com link para a sua página em security.alpinelinux.org; o secdb não traz severidade. Consulte [Correlação de CVEs](/pt-br/cve/#cves-por-pacote-para-distribuições-linux).

## Resolvedor de ciclo de vida

`endoflife:alpine-linux`.
