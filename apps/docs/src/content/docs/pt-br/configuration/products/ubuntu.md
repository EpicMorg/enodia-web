---
title: Ubuntu
description: Como configurar o enodia para sondar o Ubuntu via SSH.
---

Usa o mesmo mecanismo SSH, as mesmas credenciais e a mesma verificação da
chave do host da família de [identificação de SO via SSH](/pt-br/configuration/products/ssh-os-probes/),
mas — desde a 1.1.1 — não faz mais parte do mecanismo compartilhado
`osReleaseFamilyProbe` descrito naquela página; veja abaixo.

```yaml
targets:
  - id: ubuntu-host
    product: ubuntu
    address: host.example.com
    credentials: linux-host-ssh
```

## Uma sonda própria, não a os-release compartilhada, desde a 1.1.1

O `VERSION_ID` do `/etc/os-release` do Ubuntu deliberadamente nunca muda
depois que uma release é lançada — confirmado ao vivo (de `14.04` a
`24.10`): um host `22.04` com todas as atualizações aplicadas, já com
várias point releases e novas mídias de instalação lançadas, ainda informa
`VERSION_ID="22.04"`, e não `22.04.5`. A point release existe apenas no
campo `VERSION` do mesmo arquivo (`VERSION="22.04.5 LTS
(Jammy Jellyfish)"`), e somente para uma release LTS que já teve mais de
uma — o `VERSION` de uma release não LTS não traz nenhum segmento extra
(confirmado ao vivo: `VERSION="24.10 (Oracular Oriole)"`, idêntico a
`VERSION_ID`). Esta sonda prefere o número de `VERSION` ao de
`VERSION_ID` sempre que ele for estritamente mais preciso e compartilhar o
mesmo prefixo major.minor — sem um segundo arquivo para ler, ao contrário
da correção do [Debian](/pt-br/configuration/products/debian/) para a mesma
lacuna subjacente, já que a precisão já está no mesmo arquivo, apenas em
outro campo. Todos os outros produtos da família os-release compartilhada
foram auditados da mesma forma; nenhum dos demais tem essa lacuna.

Verificado ao vivo com `ubuntu:24.04`: `ID=ubuntu`, `VERSION_ID="24.04"`.

## Campos registrados

- `version` — a point release precisa quando `VERSION` tem uma, por
  exemplo `22.04.5`; caso contrário, o `VERSION_ID` simples
- `extra.hostKeyVerified`

## Correlação de CVEs

Sem correlação — as CVEs de uma distribuição de uso geral são vulnerabilidades de pacotes, e o número da versão não informa quais pacotes foram corrigidos desde então. Consulte [Correlação de CVEs](/pt-br/cve/#quais-produtos-têm-correspondência).

## Resolvedor de ciclo de vida

`endoflife:ubuntu` — inalterado.
