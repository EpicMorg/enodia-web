---
title: Apache Kafka
description: Konfiguracja enodia do sondowania produktu Apache Kafka.
---

Sonda SSH: loguje się na hosta brokera i odczytuje wersję z własnego pliku
`kafka_<scala>-<version>.jar` brokera. Gdy port zostanie pominięty,
domyślnie używany jest `22`, bez schematu — ten sam mechanizm SSH,
poświadczenia i weryfikacja klucza hosta co w rodzinie
[identyfikacji systemów operacyjnych przez SSH](/pl/configuration/products/ssh-os-probes/).
Jako alias akceptowany jest `product: apache-kafka`.

```yaml
targets:
  - id: kafka-01
    product: kafka
    address: kafka-01.example.com
    credentials: linux-host-ssh
```

## Dlaczego SSH

Jedyna anonimowa wymiana protokołu Kafka, ApiVersions, wymienia zakresy
wersji API, ale żadnej wersji oprogramowania. JMX ją zawiera
(`kafka.server:type=app-info`), ale JMX to Java RMI na serializacji Javy —
stos protokołów JVM, którego enodia nie implementuje od nowa dla jednego
ciągu znaków — a port jest wyłączony, dopóki operator go nie włączy. Przez
SSH wersję podaje nazwa pliku jar brokera.

## Jak znajdowana jest wersja

Każda dystrybucja dostarcza `kafka_<scala>-<version>.jar` w swoim
katalogu bibliotek — obraz Apache `/opt/kafka/libs/kafka_2.13-4.3.1.jar`,
cp-kafka od Confluent `/usr/share/java/kafka/kafka_2.13-8.3.2-ccs.jar`.
Sonda szuka go w `$KAFKA_HOME`, `/opt/kafka`, `/opt/bitnami/kafka`,
`/usr/local/kafka` i `/usr/share/java/kafka`, a zapisywana jest nazwa
pliku jar. `kafka-topics.sh --version` (lub `kafka-topics --version`)
z `PATH` — uruchomienie JVM, kilka sekund — jest rozwiązaniem zapasowym
dla instalacji w innym miejscu.

## Kafka w kontenerze

Gdy Kafka działa w Dockerze lub Podmanie, a sam host nie ma instalacji,
należy podać nazwę kontenera w `options` — polecenie jest wtedy
uruchamiane przez `docker exec` (lub `podman exec`):

```yaml
targets:
  - id: kafka-01
    product: kafka
    address: kafka-01.example.com
    credentials: linux-host-ssh
    options:
      container: kafka               # nazwa kontenera
      container_runtime: podman      # opcjonalne: docker (domyślnie) lub podman
```

Użytkownik SSH musi mieć uprawnienia do korzystania z tego środowiska
uruchomieniowego. Nazwa kontenera jest sprawdzana względem własnego
wzorca nazw Dockera, zanim trafi do zdalnego polecenia.

## Confluent Platform

Kompilacje Confluent Platform (`8.3.2-ccs`, `-ce`) są numerowane według
własnej linii Confluent: od 7.0 CP x.y zawiera Apache Kafka (x-4).y
(7.6 → 3.6, 8.3 → 4.3; przed 7.0 to nie obowiązywało — 6.0 to było 2.6),
ale numery poprawek są własne Confluent. Taka kompilacja jest zgłaszana
bez zmian, z edycją `confluent`, a dla 7.0 i nowszych linia Apache Kafka,
którą zawiera, trafia do `extra.apacheKafka`. Numer poprawki nie jest
mapowany — oznaczałoby to wymyślanie wersji.

## Uwierzytelnianie — wymagane

Poświadczenie SSH, `ssh-key` lub `password` — zobacz
[Konfiguracja → Poświadczenia](/pl/configuration/#poświadczenia).

## Rejestrowane pola

- `version` — np. `4.3.1`, z `/opt/kafka/libs/kafka_2.13-4.3.1.jar`;
  `8.3.2-ccs` dla kompilacji Confluent
- `edition` — `confluent` dla kompilacji `-ccs`/`-ce`, w przeciwnym razie
  nieobecne
- `extra.apacheKafka` — major.minor Apache Kafka zawartej w kompilacji
  Confluent 7.0+, np. `4.3`
- `extra.container` — nazwa kontenera, gdy ustawiono `options.container`
- `extra.hostKeyVerified`

## Korelacja CVE

Dopasowywany do NVD i BDU FSTEC, gdy skonfigurowano [blok `cve:`](/pl/cve/).
Kompilacja Confluent Platform nie jest sprawdzana: jej własna numeracja
wypadałaby w porównaniu jako nowsza od każdej granicy Apache Kafka, a
zawarte w niej wydanie Apache jest znane tylko do poziomu major.minor —
za mało dla poprawki na poziomie numeru patch.

## Resolver cyklu życia

`endoflife:apache-kafka`. endoflife.date nie ma kalendarza dla Confluent
Platform.
