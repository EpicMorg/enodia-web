---
title: Logstash
description: Configurarea enodia pentru a sonda Logstash.
---

Citește `GET /` din API-ul de monitorizare HTTP propriu al Logstash —
**implicit pe portul 9600, nu pe porturile Elasticsearch sau Kibana**.

```yaml
targets:
  - id: logstash-main
    product: logstash
    address: https://logstash.example.com:9600
```

## Autentificare

Niciuna. API-ul de monitorizare al Logstash nu are deloc autentificare
integrată — este gândit să fie izolat printr-un firewall, nu protejat
prin credențiale. Confirmat live pe un container real
`docker.elastic.co/logstash/logstash`.

## Câmpuri înregistrate

Doar `version` — această sondă nu înregistrează niciun câmp `extra`.

## Corelare CVE

Se corelează cu NVD și BDU FSTEC atunci când este configurat un [bloc `cve:`](/ro/cve/).

## Rezolvatorul ciclului de viață

`endoflife:logstash`.
