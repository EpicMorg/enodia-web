---
title: OpenSearch
description: Como configurar o enodia para sondar o OpenSearch.
---

Lê `GET /` — o mesmo endpoint e o mesmo formato do
[Elasticsearch](/pt-br/configuration/products/elasticsearch/), já que o
OpenSearch é um fork do Elasticsearch 7.10.2 que manteve o formato da
resposta raiz quase inalterado.

```yaml
targets:
  - id: opensearch-main
    product: opensearch
    address: https://opensearch.example.com:9200
```

## Verificação da identidade do fornecedor

`version.distribution` é comparado com `"opensearch"` — confirmado ao vivo
com contêineres reais de ambos: um Elasticsearch real não tem nem esse
campo nem o slogan "The OpenSearch Project" do OpenSearch. Apontar
`product: opensearch` para um Elasticsearch comum falha de forma
explícita em vez de informar silenciosamente a versão do Elasticsearch
como sendo a do OpenSearch.

## Autenticação

Opcional. A postura de segurança é exatamente a mesma do Elasticsearch:
um contêiner novo exige que `OPENSEARCH_INITIAL_ADMIN_PASSWORD` esteja
definido e, por padrão, responde via HTTPS exigindo autenticação Basic;
`DISABLE_SECURITY_PLUGIN=true` (uma configuração real e documentada)
responde à mesma requisição anonimamente, via HTTP simples.

```yaml
credentials:
  opensearch-admin:
    kind: basic
    username: admin
    password: "${OPENSEARCH_PASSWORD}"
```

## Campos registrados

- `version` — a partir de `version.number`
- `extra.clusterName`, `extra.luceneVersion`

## Correlação de CVEs

Correlacionado com o NVD e o BDU FSTEC quando um [bloco `cve:`](/pt-br/cve/) está configurado.

## Resolvedor de ciclo de vida

`endoflife:opensearch`.
