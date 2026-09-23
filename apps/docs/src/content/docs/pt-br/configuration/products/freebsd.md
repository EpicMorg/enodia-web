---
title: FreeBSD
description: Como configurar o enodia para sondar o FreeBSD via SSH.
---

Faz parte da família de [identificação de SO via SSH](/pt-br/configuration/products/ssh-os-probes/)
— consulte essa página para o mecanismo compartilhado, as credenciais e a
verificação da chave do host.

```yaml
targets:
  - id: freebsd-host
    product: freebsd
    address: host.example.com
    credentials: linux-host-ssh
```

## O único produto desta família que lê outro caminho

Todos os outros produtos desta família leem `/etc/os-release`; o FreeBSD é
a exceção. O FreeBSD gera `/var/run/os-release` por conta própria,
dinamicamente, na inicialização (`/etc/rc.d/os-release`) — exatamente no
mesmo formato `KEY=VALUE` que as distribuições Linux trazem estaticamente
em `/etc/os-release`. Verificado ao vivo via QEMU (a imagem qcow2 oficial
de nuvem do próprio FreeBSD — não existe imagem Docker do FreeBSD):
`ID=freebsd`, `VERSION_ID="15.1"`.

## Correlação de CVEs

Sem correlação — o NVD registra os níveis de patch em um campo da CPE que o correlacionador não lê, então correlacionar apenas pela release marcaria um host totalmente atualizado com todas as CVEs já corrigidas nessa release. Consulte [Correlação de CVEs](/pt-br/cve/#quais-produtos-têm-correspondência).

## Resolvedor de ciclo de vida

`endoflife:freebsd`.
