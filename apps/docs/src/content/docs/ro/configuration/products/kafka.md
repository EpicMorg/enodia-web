---
title: Apache Kafka
description: Configurarea enodia pentru a sonda Apache Kafka.
---

O sondă SSH: se autentifică pe gazda brokerului și citește versiunea din
propriul `kafka_<scala>-<version>.jar` al brokerului. Portul implicit este
`22`, fără schemă — același mecanism SSH, aceleași credențiale și aceeași
verificare a cheii de gazdă ca familia
[Identificarea sistemului de operare prin SSH](/ro/configuration/products/ssh-os-probes/).
`product: apache-kafka` este acceptat ca alias.

```yaml
targets:
  - id: kafka-01
    product: kafka
    address: kafka-01.example.com
    credentials: linux-host-ssh
```

## De ce SSH

Singurul schimb anonim al protocolului Kafka, ApiVersions, listează
intervale de versiuni ale API-ului și nicio versiune a software-ului. JMX
o conține (`kafka.server:type=app-info`), dar JMX înseamnă Java RMI peste
serializare Java — o stivă de protocoale JVM, nu ceva ce enodia
reimplementează pentru un singur șir — iar portul este dezactivat dacă
operatorul nu îl activează. Prin SSH, jar-ul brokerului numește versiunea.

## Cum este găsită versiunea

Fiecare distribuție livrează `kafka_<scala>-<version>.jar` în directorul
său de biblioteci — imaginea Apache `/opt/kafka/libs/kafka_2.13-4.3.1.jar`,
cp-kafka de la Confluent `/usr/share/java/kafka/kafka_2.13-8.3.2-ccs.jar`.
Sonda îl caută în `$KAFKA_HOME`, `/opt/kafka`, `/opt/bitnami/kafka`,
`/usr/local/kafka` și `/usr/share/java/kafka`, iar numele jar-ului este
ceea ce înregistrează. `kafka-topics.sh --version` (sau `kafka-topics --version`)
din `PATH` — o pornire de JVM, câteva secunde — este varianta de rezervă
pentru o instalare aflată în altă parte.

## Kafka într-un container

Când Kafka rulează în Docker sau Podman și gazda însăși nu are o
instalare, indicați numele containerului în `options` — comanda rulează
atunci prin `docker exec` (sau `podman exec`):

```yaml
targets:
  - id: kafka-01
    product: kafka
    address: kafka-01.example.com
    credentials: linux-host-ssh
    options:
      container: kafka               # numele containerului
      container_runtime: podman      # opțional: docker (implicit) sau podman
```

Utilizatorul SSH trebuie să aibă dreptul de a folosi acel runtime.
Numele containerului este verificat față de modelul de nume propriu al
Docker înainte de a fi inclus în comanda de la distanță.

## Confluent Platform

Build-urile Confluent Platform (`8.3.2-ccs`, `-ce`) sunt numerotate pe
linia proprie a Confluent: începând cu 7.0, CP x.y livrează Apache Kafka
(x-4).y (7.6 → 3.6, 8.3 → 4.3; înainte de 7.0 acest lucru nu era valabil —
6.0 era 2.6), dar numerele de patch sunt ale Confluent. Un astfel de build
este raportat ca atare, cu ediția `confluent`, iar pentru 7.0 și versiunile
ulterioare linia Apache Kafka pe care o conține ajunge în `extra.apacheKafka`.
Patch-ul nu este mapat — asta ar însemna inventarea unei versiuni.

## Autentificare — obligatorie

O credențială SSH, `ssh-key` sau `password` — consultați
[Configurare → Credențiale](/ro/configuration/#credențiale).

## Câmpuri înregistrate

- `version` — de exemplu `4.3.1`, din `/opt/kafka/libs/kafka_2.13-4.3.1.jar`;
  `8.3.2-ccs` pentru un build Confluent
- `edition` — `confluent` pentru un build `-ccs`/`-ce`, altfel absent
- `extra.apacheKafka` — major.minor-ul Apache Kafka pe care îl conține un
  build Confluent 7.0+, de exemplu `4.3`
- `extra.container` — numele containerului, atunci când este setat `options.container`
- `extra.hostKeyVerified`

## Corelare CVE

Se corelează cu NVD și BDU FSTEC atunci când este configurat un
[bloc `cve:`](/ro/cve/). Un build Confluent Platform nu este căutat:
numerotarea sa proprie ar apărea, la comparare, mai nouă decât orice
limită Apache Kafka, iar lansarea Apache pe care o conține este cunoscută
doar până la major.minor — insuficient pentru o remediere la nivel de patch.

## Rezolvatorul ciclului de viață

`endoflife:apache-kafka`. endoflife.date nu are un calendar pentru
Confluent Platform.
