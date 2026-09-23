---
title: Perforce Helix Core Server (p4d)
description: Como configurar o enodia para sondar o Perforce Helix Core Server (p4d).
---

Executa `p4 -Ztag -p <address> info` — **a única sonda deste projeto que
invoca um binário externo** em vez de falar diretamente um protocolo de
rede ou HTTP. Veja [por quê](#por-que-uma-cli-em-vez-de-um-cliente-de-protocolo-de-rede)
abaixo.

```yaml
targets:
  - id: p4d-main
    product: p4d
    address: p4d.example.com:1666
```

## Requer a CLI `p4` na máquina que executa o enodia

Não é um requisito de credencial nem de rede — um binário de verdade
precisa estar instalado junto com o próprio enodia (o cliente de linha de
comando da própria Perforce, de download gratuito). Um binário ausente
falha de forma clara, em vez de ser confundido com um problema de rede.
Substitua o caminho com `options.binary` se `p4` não estiver no `$PATH`
(isso funciona da mesma forma no Windows, apontando para `p4.exe`):

```yaml
targets:
  - id: p4d-main
    product: p4d
    address: p4d.example.com:1666
    options:
      binary: /opt/perforce/bin/p4
```

## Por que uma CLI em vez de um cliente de protocolo de rede

O protocolo RPC da própria Perforce foi totalmente decifrado por
engenharia reversa ao vivo (captura de pacotes mais o binário `p4` real
contra um proxy de produção real), e um cliente construído à mão
reproduziu corretamente todo o handshake — confirmado byte a byte com a
captura. Mas esse handshake exato, verificado como correto, é descartado
silenciosamente por servidores `p4d` diretos reais (TLS obrigatório e
limitação de taxa foram ambos descartados ao vivo como causa: nenhum
erro, nenhum reset, apenas nenhuma resposta), enquanto o binário `p4`
real se conecta a esses mesmos endereços sem problema algum. Em vez de
lançar uma sonda que só funciona contra proxies, tanto esta sonda quanto
o [Perforce Proxy](/pt-br/configuration/products/p4p/) invocam a CLI `p4`
do próprio operador.

## Tempo limite

`timeout` (por alvo, recorrendo a `defaults.timeout`) se aplica ao
subprocesso `p4` da mesma forma que se aplica ao transporte de qualquer
outra sonda. Isso importa concretamente aqui: um processo `p4` preso
tentando conectar a um servidor direto inacessível fica travado sem
resposta e sem reset no nível do TCP — exatamente o comportamento descrito
acima —, então sem um tempo limite ele paralisaria toda uma execução de
coleta em vez de falhar apenas aquele alvo. (Corrigido na 1.2.1 — uma
versão anterior não passava nenhum tempo limite ao subprocesso.)

## Autenticação

Nenhuma — confirmado ao vivo que `info` responde completamente sem
autenticação em servidores de produção reais.

## Verificação da identidade do fornecedor

Uma resposta que traz um campo `proxyVersion` significa que o endereço é,
na verdade, um [Perforce Proxy](/pt-br/configuration/products/p4p/), e não
um servidor direto — esta sonda a rejeita em vez de informar a versão do
produto errado, da mesma forma que `p4p` rejeita, no sentido inverso, a
resposta de um servidor direto.

## Não é o mesmo produto que o Perforce Helix Swarm

O [`perforce-swarm`](/pt-br/configuration/products/perforce-swarm/) é a
interface web de revisão de código da Perforce, sondada via HTTP — um
produto diferente do próprio servidor `p4d`, que é o assunto desta página.

## Campos registrados

- `version` — por exemplo `2024.2`, extraída do formato
  `P4D/LINUX26X86_64/2024.2/2726408 (2025/02/27)` de `serverVersion`
- `extra.raw` — a string `serverVersion` completa, sem análise
- `extra.serverID`, `extra.serverServices`, quando presentes

## Correlação de CVEs

Correlacionado com o NVD e o BDU FSTEC quando um [bloco `cve:`](/pt-br/cve/) está configurado.

## Resolvedor de ciclo de vida

Nenhum — a Perforce é proprietária, sem página no endoflife.date em
nenhum dos slugs testados (404 confirmado) e sem releases públicos no
GitHub como alternativa. Apenas inventário, assim como o
[Gentoo](/pt-br/configuration/products/gentoo/)/
[Kali Linux](/pt-br/configuration/products/kali-linux/).
