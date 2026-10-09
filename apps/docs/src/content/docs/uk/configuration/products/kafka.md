---
title: Apache Kafka
description: Налаштування enodia для опитування Apache Kafka.
---

SSH-проба: вона входить на хост брокера й читає версію з власного
`kafka_<scala>-<version>.jar` брокера. Якщо порт не вказано,
використовується `22`, без схеми — той самий механізм SSH, облікові дані
та перевірка ключа хоста, що й у сімейства
[ідентифікації ОС через SSH](/uk/configuration/products/ssh-os-probes/).
`product: apache-kafka` приймається як псевдонім.

```yaml
targets:
  - id: kafka-01
    product: kafka
    address: kafka-01.example.com
    credentials: linux-host-ssh
```

## Чому SSH

Єдиний анонімний обмін протоколу Kafka, ApiVersions, перелічує діапазони
версій API, але не версію програмного забезпечення. JMX її містить
(`kafka.server:type=app-info`), але JMX — це Java RMI поверх серіалізації
Java, стек протоколів JVM, а не те, що enodia реалізовуватиме заради
одного рядка, — до того ж порт вимкнено, доки оператор його не ввімкне.
Через SSH версію називає jar-файл брокера.

## Як визначається версія

Кожен дистрибутив постачає `kafka_<scala>-<version>.jar` у своєму каталозі
libs — образ Apache `/opt/kafka/libs/kafka_2.13-4.3.1.jar`, cp-kafka від
Confluent `/usr/share/java/kafka/kafka_2.13-8.3.2-ccs.jar`. Проба шукає
його в `$KAFKA_HOME`, `/opt/kafka`, `/opt/bitnami/kafka`, `/usr/local/kafka`
і `/usr/share/java/kafka`, і записує саме назву jar-файлу.
`kafka-topics.sh --version` (або `kafka-topics --version`) з `PATH` —
запуск JVM, кілька секунд, — запасний варіант для встановлення в іншому
місці.

## Kafka у контейнері

Якщо Kafka працює в Docker або Podman, а на самому хості її не
встановлено, вкажіть контейнер в `options` — тоді команда виконується
через `docker exec` (або `podman exec`):

```yaml
targets:
  - id: kafka-01
    product: kafka
    address: kafka-01.example.com
    credentials: linux-host-ssh
    options:
      container: kafka               # назва контейнера
      container_runtime: podman      # необовʼязково: docker (за замовчуванням) або podman
```

Користувачеві SSH має бути дозволено використовувати це середовище
виконання. Назва контейнера перевіряється за власним шаблоном назв
Docker, перш ніж потрапити у віддалену команду.

## Confluent Platform

Збірки Confluent Platform (`8.3.2-ccs`, `-ce`) нумеруються за власною
лінійкою Confluent: починаючи з 7.0, CP x.y постачає Apache Kafka (x-4).y
(7.6 → 3.6, 8.3 → 4.3; до 7.0 це не виконувалося — 6.0 відповідала 2.6),
але номери патчів у Confluent власні. Така збірка повідомляється як є, з
редакцією `confluent`, а для 7.0 і новіших лінійка Apache Kafka, яку вона
містить, потрапляє в `extra.apacheKafka`. Патч не зіставляється — це
означало б вигадати версію.

## Автентифікація — обовʼязкова

Облікові дані SSH, `ssh-key` або `password` — див.
[Конфігурація → Облікові дані](/uk/configuration/#облікові-дані).

## Записувані поля

- `version` — напр. `4.3.1`, з `/opt/kafka/libs/kafka_2.13-4.3.1.jar`;
  `8.3.2-ccs` для збірки Confluent
- `edition` — `confluent` для збірки `-ccs`/`-ce`, інакше відсутнє
- `extra.apacheKafka` — major.minor Apache Kafka, яку містить збірка
  Confluent 7.0+, напр. `4.3`
- `extra.container` — назва контейнера, якщо задано `options.container`
- `extra.hostKeyVerified`

## Зіставлення з CVE

Зіставляється з NVD і БДУ ФСТЕК, якщо налаштовано [блок `cve:`](/uk/cve/).
Для збірки Confluent Platform пошук не виконується: її власна нумерація
порівнювалася б як новіша за будь-яку межу Apache Kafka, а реліз Apache,
який вона містить, відомий лише до major.minor — цього замало для
виправлення на рівні патча.

## Резолвер життєвого циклу

`endoflife:apache-kafka`. endoflife.date не має календаря Confluent
Platform.
