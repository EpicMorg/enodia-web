---
title: Perforce Proxy (p4p)
description: Como configurar o enodia para sondar o Perforce Proxy (p4p).
---

Executa `p4 -Ztag -p <address> info` — o mesmo comando e o mesmo
mecanismo de CLI externa que o [`p4d`](/pt-br/configuration/products/p4d/)
usa; consulte essa página para saber por que isto invoca o binário `p4`
do próprio operador em vez de falar diretamente o protocolo de rede da
Perforce.

```yaml
targets:
  - id: p4p-main
    product: p4p
    address: p4p.example.com:1666
```

## Requer a CLI `p4` na máquina que executa o enodia

Igual ao [`p4d`](/pt-br/configuration/products/p4d/#requer-a-cli-p4-na-máquina-que-executa-o-enodia)
— substitua o caminho do binário com `options.binary` se `p4` não estiver
no `$PATH`:

```yaml
targets:
  - id: p4p-main
    product: p4p
    address: p4p.example.com:1666
    options:
      binary: /opt/perforce/bin/p4
```

## Tempo limite

`timeout` (por alvo, recorrendo a `defaults.timeout`) se aplica ao
subprocesso `p4` da mesma forma que se aplica ao transporte de qualquer
outra sonda — consulte
[a observação na página do `p4d`](/pt-br/configuration/products/p4d/#tempo-limite)
para saber por que isso importa concretamente no caso específico da
Perforce. Corrigido na 1.2.1.

## Autenticação

Nenhuma — confirmado ao vivo que `info` responde completamente sem
autenticação em um proxy de produção real.

## Verificação da identidade do fornecedor

Um proxy responde a `info` com tudo o que um servidor direto responde,
**mais o seu próprio campo `proxyVersion`** — `serverVersion`/
`ServerID`/`serverServices` do servidor de backend passam inalterados,
descrevendo o servidor por trás do proxy, e não o proxy em si. Esta sonda
exige que `proxyVersion` esteja presente, rejeitando a resposta de um
servidor direto (que não tem esse campo) em vez de informar a versão do
produto errado — a mesma verificação que o
[`p4d`](/pt-br/configuration/products/p4d/) executa no sentido inverso.

## Campos registrados

- `version` — por exemplo `2024.2`, extraída do formato
  `P4P/LINUX26X86_64/2024.2/2832881 (2025/09/30)` de `proxyVersion`
- `extra.raw` — a string `proxyVersion` completa, sem análise
- `extra.backendServerVersion`, `extra.backendServerID` — a versão/ID do
  `p4d` de backend, repassados da mesma resposta, quando presentes

## Correlação de CVEs

Sem correlação — nenhum dos dois bancos de dados tem dados utilizáveis para ele. Consulte [Correlação de CVEs](/pt-br/cve/#quais-produtos-têm-correspondência).

## Resolvedor de ciclo de vida

Nenhum — a Perforce é proprietária, sem página no endoflife.date em
nenhum dos slugs testados (404 confirmado) e sem releases públicos no
GitHub como alternativa. Apenas inventário, assim como o
[`p4d`](/pt-br/configuration/products/p4d/).
