---
title: RabbitMQ
description: Configurarea enodia pentru a sonda RabbitMQ.
---

Citește `GET /api/overview` din API-ul HTTP al pluginului de management
(portul `15672` în mod implicit — indicați-l în adresă). Portul AMQP în
sine nu are un schimb de versiune înainte de autentificare care să merite
citit; pluginul de management este singurul loc în care RabbitMQ își
servește versiunea.

```yaml
targets:
  - id: rabbitmq-main
    product: rabbitmq
    address: https://rabbitmq.example.com:15672
    credentials: rabbitmq-monitor
```

## Autentificare — obligatorie

API-ul de management nu este niciodată anonim: confirmat live pe
`rabbitmq:4-management`, care a răspuns `401` fără credențiale.
Credențialele HTTP Basic ale unui utilizator de management:

```yaml
credentials:
  rabbitmq-monitor:
    kind: basic
    username: monitor
    password: "${RABBITMQ_PASSWORD}"
```

Este acceptat doar `basic`; orice alt tip este o eroare de configurare.
Consultați [Configurare → Credențiale](/ro/configuration/#credențiale).

API-ul de management este HTTP simplu, cu excepția cazului în care pe el
este configurat TLS, iar enodia refuză să trimită credențiale prin HTTP
simplu: o adresă `http://` necesită `allow_insecure_transport`, în mod
deliberat — consultați
[HTTPS mai întâi](/ro/concepts/#https-mai-întâi-credențialele-nu-sunt-niciodată-trimise-în-clar-în-mod-implicit).

## Câmpuri înregistrate

- `version` — `rabbitmq_version`, de exemplu `4.3.6`
- `extra.productName` — de exemplu `RabbitMQ`
- `extra.productVersion` — de exemplu `4.3.6`
- `extra.erlangVersion` — de exemplu `27.3.4.18`
- `extra.clusterName` — de exemplu `rabbit@enodia-test`

Aceleași câmpuri se află și în răspunsul versiunii 3.8.34.

## Corelare CVE

Se corelează cu NVD și BDU FSTEC atunci când este configurat un [bloc `cve:`](/ro/cve/).

## Rezolvatorul ciclului de viață

`endoflife:rabbitmq`.
