---
title: RabbitMQ
description: Configuración de enodia para sondear RabbitMQ.
---

Lee `GET /api/overview` de la API HTTP del plugin de gestión (puerto
`15672` por defecto; indíquelo en la dirección). El propio puerto AMQP no
tiene ningún intercambio de versiones previo a la autenticación que
merezca la pena leer; el plugin de gestión es el único lugar en el que
RabbitMQ sirve su versión.

```yaml
targets:
  - id: rabbitmq-main
    product: rabbitmq
    address: https://rabbitmq.example.com:15672
    credentials: rabbitmq-monitor
```

## Autenticación — obligatoria

La API de gestión nunca es anónima: confirmado en vivo contra
`rabbitmq:4-management`, que respondió `401` sin credenciales. Las
credenciales HTTP Basic de un usuario de gestión:

```yaml
credentials:
  rabbitmq-monitor:
    kind: basic
    username: monitor
    password: "${RABBITMQ_PASSWORD}"
```

Solo se acepta `basic`; cualquier otro tipo es un error de configuración.
Consulte [Configuración → Credenciales](/es/configuration/#credenciales).

La API de gestión es HTTP sin cifrar salvo que se configure TLS en ella, y
enodia se niega a enviar credenciales por HTTP sin cifrar: una dirección
`http://` necesita `allow_insecure_transport`, deliberadamente; consulte
[HTTPS primero](/es/concepts/#https-primero-por-defecto-las-credenciales-nunca-se-envían-en-claro).

## Campos registrados

- `version`: `rabbitmq_version`, p. ej. `4.3.6`
- `extra.productName`: p. ej. `RabbitMQ`
- `extra.productVersion`: p. ej. `4.3.6`
- `extra.erlangVersion`: p. ej. `27.3.4.18`
- `extra.clusterName`: p. ej. `rabbit@enodia-test`

Los mismos campos aparecen en la respuesta de la 3.8.34.

## Correlación de CVE

Se contrasta con NVD y BDU FSTEC cuando hay configurado un [bloque `cve:`](/es/cve/).

## Resolvedor del ciclo de vida

`endoflife:rabbitmq`.
