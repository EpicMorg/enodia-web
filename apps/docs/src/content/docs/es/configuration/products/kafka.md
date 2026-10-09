---
title: Apache Kafka
description: Configuración de enodia para sondear Apache Kafka.
---

Una sonda SSH: inicia sesión en el host del broker y lee la versión del
propio `kafka_<scala>-<version>.jar` del broker. El puerto predeterminado
es `22`, sin esquema: el mismo mecanismo SSH, las mismas credenciales y la
misma verificación de la clave de host que la familia de
[identificación del SO por SSH](/es/configuration/products/ssh-os-probes/).
Se acepta `product: apache-kafka` como alias.

```yaml
targets:
  - id: kafka-01
    product: kafka
    address: kafka-01.example.com
    credentials: linux-host-ssh
```

## Por qué SSH

El único intercambio anónimo del protocolo de Kafka, ApiVersions, enumera
rangos de versiones de la API y ninguna versión del software. JMX sí la
incluye (`kafka.server:type=app-info`), pero JMX es Java RMI sobre
serialización de Java (una pila de protocolos de la JVM, no algo que
enodia vaya a reimplementar por una cadena), y el puerto está desactivado
salvo que el operador lo active. Por SSH, el jar del broker nombra la
versión.

## Cómo se encuentra la versión

Todas las distribuciones incluyen `kafka_<scala>-<version>.jar` en su
directorio libs: la imagen de Apache, `/opt/kafka/libs/kafka_2.13-4.3.1.jar`;
la cp-kafka de Confluent, `/usr/share/java/kafka/kafka_2.13-8.3.2-ccs.jar`.
La sonda lo busca en `$KAFKA_HOME`, `/opt/kafka`, `/opt/bitnami/kafka`,
`/usr/local/kafka` y `/usr/share/java/kafka`, y lo que registra es el
nombre del jar. `kafka-topics.sh --version` (o `kafka-topics --version`)
desde el `PATH` (un arranque de la JVM, unos segundos) es la alternativa
para una instalación en otro lugar.

## Kafka en un contenedor

Cuando Kafka se ejecuta en Docker o Podman y el propio host no tiene
ninguna instalación, indique el contenedor en `options`: el comando se
ejecuta entonces mediante `docker exec` (o `podman exec`):

```yaml
targets:
  - id: kafka-01
    product: kafka
    address: kafka-01.example.com
    credentials: linux-host-ssh
    options:
      container: kafka               # el nombre del contenedor
      container_runtime: podman      # opcional: docker (predeterminado) o podman
```

El usuario SSH debe tener permiso para usar ese runtime. El nombre del
contenedor se comprueba contra el propio patrón de nombres de Docker
antes de incluirse en el comando remoto.

## Confluent Platform

Las compilaciones de Confluent Platform (`8.3.2-ccs`, `-ce`) se numeran en
la línea propia de Confluent: desde la 7.0, CP x.y incluye Apache Kafka
(x-4).y (7.6 → 3.6, 8.3 → 4.3; antes de la 7.0 no era así: la 6.0 era la
2.6), pero los números de parche son los propios de Confluent. Una
compilación así se notifica tal cual, con la edición `confluent`, y a
partir de la 7.0 la línea de Apache Kafka que incluye va a
`extra.apacheKafka`. El parche no se traduce: eso sería inventarse una
versión.

## Autenticación — obligatoria

Una credencial SSH, `ssh-key` o `password`: consulte
[Configuración → Credenciales](/es/configuration/#credenciales).

## Campos registrados

- `version`: p. ej. `4.3.1`, de `/opt/kafka/libs/kafka_2.13-4.3.1.jar`;
  `8.3.2-ccs` para una compilación de Confluent
- `edition`: `confluent` para una compilación `-ccs`/`-ce`; ausente en
  caso contrario
- `extra.apacheKafka`: el major.minor de Apache Kafka que incluye una
  compilación de Confluent 7.0+, p. ej. `4.3`
- `extra.container`: el nombre del contenedor, cuando se define `options.container`
- `extra.hostKeyVerified`

## Correlación de CVE

Se contrasta con NVD y BDU FSTEC cuando hay configurado un
[bloque `cve:`](/es/cve/). Una compilación de Confluent Platform no se
consulta: su propia numeración se compararía como más reciente que
cualquier límite de Apache Kafka, y de la versión de Apache que incluye
solo se conoce el major.minor, lo que no basta para una corrección a
nivel de parche.

## Resolvedor del ciclo de vida

`endoflife:apache-kafka`. endoflife.date no tiene un calendario de
Confluent Platform.
