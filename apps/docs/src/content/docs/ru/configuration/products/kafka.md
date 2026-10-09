---
title: Apache Kafka
description: Настройка enodia для опроса Apache Kafka.
---

SSH-проба: заходит на хост брокера и читает версию из собственного
`kafka_<scala>-<version>.jar` брокера. Порт по умолчанию — `22`, без
схемы; тот же механизм SSH, credentials и проверка ключа хоста, что и у
семейства
[SSH-проб для определения ОС](/ru/configuration/products/ssh-os-probes/).
`product: apache-kafka` принимается как алиас.

```yaml
targets:
  - id: kafka-01
    product: kafka
    address: kafka-01.example.com
    credentials: linux-host-ssh
```

## Почему SSH

Единственный анонимный обмен в протоколе Kafka, ApiVersions, перечисляет
диапазоны версий API, а не версию программы. В JMX она есть
(`kafka.server:type=app-info`), но JMX — это Java RMI поверх
Java-сериализации, целый протокольный стек JVM, который enodia не
реализует заново ради одной строки, — и порт выключен, пока его не
включит оператор. По SSH версию называет jar-файл брокера.

## Как находится версия

Каждый дистрибутив кладёт `kafka_<scala>-<version>.jar` в свой каталог
libs — в образе Apache это `/opt/kafka/libs/kafka_2.13-4.3.1.jar`, в
cp-kafka от Confluent — `/usr/share/java/kafka/kafka_2.13-8.3.2-ccs.jar`.
Проба ищет его в `$KAFKA_HOME`, `/opt/kafka`, `/opt/bitnami/kafka`,
`/usr/local/kafka` и `/usr/share/java/kafka` и записывает версию из имени
jar-файла. `kafka-topics.sh --version` (или `kafka-topics --version`) из
`PATH` — запуск JVM, несколько секунд — запасной вариант для установки в
другом месте.

## Kafka в контейнере

Если Kafka работает в Docker или Podman, а на самом хосте установки нет,
укажите контейнер в `options` — тогда команда выполняется через
`docker exec` (или `podman exec`):

```yaml
targets:
  - id: kafka-01
    product: kafka
    address: kafka-01.example.com
    credentials: linux-host-ssh
    options:
      container: kafka               # имя контейнера
      container_runtime: podman      # опционально: docker (по умолчанию) или podman
```

SSH-пользователю должно быть разрешено пользоваться этим рантаймом. Имя
контейнера сверяется с собственным шаблоном имён Docker, прежде чем
попасть в удалённую команду.

## Confluent Platform

Сборки Confluent Platform (`8.3.2-ccs`, `-ce`) нумеруются по собственной
линейке Confluent: начиная с 7.0, CP x.y содержит Apache Kafka (x-4).y
(7.6 → 3.6, 8.3 → 4.3; до 7.0 это не выполнялось — 6.0 была 2.6), но
номера патчей у Confluent свои. Такая сборка записывается как есть, с
редакцией `confluent`, а для 7.0 и новее линейка Apache Kafka, которую
она содержит, попадает в `extra.apacheKafka`. Патч не пересчитывается —
это значило бы выдумать версию.

## Аутентификация — обязательна

SSH-credential, `ssh-key` или `password` — см.
[Конфигурация → Credentials](/ru/configuration/#credentials).

## Записываемые поля

- `version` — например, `4.3.1`, из `/opt/kafka/libs/kafka_2.13-4.3.1.jar`;
  `8.3.2-ccs` для сборки Confluent
- `edition` — `confluent` для сборки `-ccs`/`-ce`, иначе отсутствует
- `extra.apacheKafka` — major.minor Apache Kafka, которую содержит сборка
  Confluent 7.0+, например `4.3`
- `extra.container` — имя контейнера, если задан `options.container`
- `extra.hostKeyVerified`

## Сопоставление с CVE

Сверяется с NVD и БДУ ФСТЭК, если настроен [блок `cve:`](/ru/cve/). Для
сборки Confluent Platform поиск не выполняется: её собственная нумерация
сравнивалась бы как более новая, чем любая граница Apache Kafka, а
содержащийся в ней релиз Apache известен только до major.minor — этого
мало для исправления на уровне патча.

## Резолвер жизненного цикла

`endoflife:apache-kafka`. Календаря Confluent Platform у endoflife.date
нет.
