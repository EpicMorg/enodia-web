---
title: RabbitMQ
description: Como configurar o enodia para sondar o RabbitMQ.
---

Lê `GET /api/overview` da API HTTP do plugin de gerenciamento (porta
`15672` por padrão — informe-a no endereço). A própria porta AMQP não tem
troca de versão anterior à autenticação que valha a pena ler; o plugin de
gerenciamento é o único lugar onde o RabbitMQ serve a sua versão.

```yaml
targets:
  - id: rabbitmq-main
    product: rabbitmq
    address: https://rabbitmq.example.com:15672
    credentials: rabbitmq-monitor
```

## Autenticação — obrigatória

A API de gerenciamento nunca é anônima: confirmado ao vivo em
`rabbitmq:4-management`, que respondeu `401` sem credenciais. As
credenciais HTTP Basic de um usuário de gerenciamento:

```yaml
credentials:
  rabbitmq-monitor:
    kind: basic
    username: monitor
    password: "${RABBITMQ_PASSWORD}"
```

Apenas `basic` é aceito; qualquer outro tipo é um erro de configuração.
Consulte [Configuração → Credenciais](/pt-br/configuration/#credenciais).

A API de gerenciamento é HTTP simples, a menos que o TLS esteja
configurado nela, e o enodia se recusa a enviar credenciais por HTTP
simples: um endereço `http://` exige `allow_insecure_transport`, de
propósito — consulte
[HTTPS primeiro](/pt-br/concepts/#https-primeiro-credenciais-nunca-enviadas-em-texto-claro-por-padrão).

## Campos registrados

- `version` — `rabbitmq_version`, por exemplo `4.3.6`
- `extra.productName` — por exemplo `RabbitMQ`
- `extra.productVersion` — por exemplo `4.3.6`
- `extra.erlangVersion` — por exemplo `27.3.4.18`
- `extra.clusterName` — por exemplo `rabbit@enodia-test`

Os mesmos campos estão na resposta da 3.8.34.

## Correlação de CVEs

Correlacionado com o NVD e o BDU FSTEC quando um [bloco `cve:`](/pt-br/cve/) está configurado.

## Resolvedor de ciclo de vida

`endoflife:rabbitmq`.
