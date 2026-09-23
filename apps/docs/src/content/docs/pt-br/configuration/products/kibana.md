---
title: Kibana
description: Como configurar o enodia para sondar o Kibana.
---

Lê `GET /api/status` — deliberadamente sem autenticação por design (é o
que os orquestradores usam como probe de liveness/readiness; o próprio
readiness probe do Helm chart oficial da Elastic faz curl exatamente
neste caminho, sem credenciais).

```yaml
targets:
  - id: kibana-main
    product: kibana
    address: https://kibana.example.com
```

## Autenticação

Nenhuma. Confirmado ao vivo com um contêiner
`docker.elastic.co/kibana/kibana` real (com um Elasticsearch real por
trás): a resposta traz a versão completa mesmo enquanto o Kibana ainda
está inicializando e respondendo `503` para "ainda não está pronto" — o
corpo já a contém, independentemente do código de status.

## Campos registrados

Apenas `version` — esta sonda não registra nenhum campo `extra`.

## Correlação de CVEs

Correlacionado com o NVD e o BDU FSTEC quando um [bloco `cve:`](/pt-br/cve/) está configurado.

## Resolvedor de ciclo de vida

`endoflife:kibana`.
