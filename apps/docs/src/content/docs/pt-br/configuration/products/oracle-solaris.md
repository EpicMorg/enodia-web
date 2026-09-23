---
title: Oracle Solaris
description: Como configurar o enodia para sondar o Oracle Solaris via SSH.
---

Usa o mesmo mecanismo SSH, as mesmas credenciais e a mesma verificação da
chave do host da família de [identificação de SO via SSH](/pt-br/configuration/products/ssh-os-probes/),
mas lê `/etc/release` em vez de um arquivo os-release ou de
`uname -sr`.

```yaml
targets:
  - id: solaris-host
    product: oracle-solaris
    address: host.example.com
    credentials: linux-host-ssh
```

## Por que não `uname -sr`

Ao contrário do OpenBSD/NetBSD, `uname -sr` não funciona aqui: no Solaris
ele só informa a versão do kernel SunOS (`"SunOS 5.11"` para todas as
releases Solaris 11.x — o versionamento do SunOS é desacoplado da versão
do produto), então não consegue distinguir 11.3 de 11.4. A linha
`"Oracle Solaris 11.4 X86"` do próprio `/etc/release` traz a versão real.

Não é possível obter uma imagem para download sem uma conta Oracle/licença
OTN, então a verificação foi feita via `vmactions/solaris-vm`, que compila
e republica o Solaris 11.4 CBE da própria Oracle, de redistribuição livre
(Common Build Environment, destinado exatamente a esse tipo de uso em CI).

## Campos registrados

- `version` — extraída de `/etc/release`
- `extra.hostKeyVerified`

## Correlação de CVEs

Sem correlação — o NVD registra os níveis de patch em um campo da CPE que o correlacionador não lê, então correlacionar apenas pela release marcaria um host totalmente atualizado com todas as CVEs já corrigidas nessa release. Consulte [Correlação de CVEs](/pt-br/cve/#quais-produtos-têm-correspondência).

## Resolvedor de ciclo de vida

`endoflife:oracle-solaris`.
