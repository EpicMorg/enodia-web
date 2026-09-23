---
title: HAProxy
description: Como configurar o enodia para sondar o HAProxy.
---

Lê a versão do cabeçalho da própria **página de estatísticas** do HAProxy
— o HAProxy não tem endpoint de versão e, ao contrário do nginx, por
padrão não define nenhum cabeçalho `Server` que o identifique.

```yaml
targets:
  - id: haproxy-main
    product: haproxy
    address: https://haproxy.example.com
```

`/stats` é o caminho padrão desta sonda — defina `path:` explicitamente
apenas se a sua página de estatísticas estiver montada em outro lugar.

## A página de estatísticas precisa estar habilitada

Confirmado ao vivo com um contêiner `haproxy:3.0` real: a página de
estatísticas (`stats enable` na configuração do próprio HAProxy; **não
vem ativada por padrão**) é a única superfície anônima que traz alguma
versão — a exportação de estatísticas `;csv` não tem coluna de versão em
nenhum lugar do seu cabeçalho de ~140 colunas, então esta sonda lê
especificamente a forma HTML.

## Autenticação

Opcional. `stats auth user:pass` (a diretiva de configuração do próprio
HAProxy para esta página) é HTTP Basic comum:

```yaml
credentials:
  haproxy-stats:
    kind: basic
    username: admin
    password: "${HAPROXY_STATS_PASSWORD}"
```

## Campos registrados

Apenas `version` — esta sonda não registra nenhum campo `extra`.

## Correlação de CVEs

Correlacionado com o NVD e o BDU FSTEC quando um [bloco `cve:`](/pt-br/cve/) está configurado.

## Resolvedor de ciclo de vida

`endoflife:haproxy`.
