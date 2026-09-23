---
title: Logstash
description: Como configurar o enodia para sondar o Logstash.
---

Lê `GET /` na própria API HTTP de monitoramento do Logstash — **porta
9600 por padrão, não as portas do Elasticsearch ou do Kibana**.

```yaml
targets:
  - id: logstash-main
    product: logstash
    address: https://logstash.example.com:9600
```

## Autenticação

Nenhuma. A API de monitoramento do Logstash não tem nenhuma autenticação
embutida — ela foi feita para ficar isolada por firewall, e não protegida
por credenciais. Confirmado ao vivo com um contêiner
`docker.elastic.co/logstash/logstash` real.

## Campos registrados

Apenas `version` — esta sonda não registra nenhum campo `extra`.

## Correlação de CVEs

Correlacionado com o NVD e o BDU FSTEC quando um [bloco `cve:`](/pt-br/cve/) está configurado.

## Resolvedor de ciclo de vida

`endoflife:logstash`.
