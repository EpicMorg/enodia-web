---
title: Logstash
description: Konfiguracja enodia do sondowania produktu Logstash.
---

Odczytuje `GET /` z własnego API monitorowania HTTP Logstash — **domyślnie
na porcie 9600, a nie na portach Elasticsearch czy Kibany**.

```yaml
targets:
  - id: logstash-main
    product: logstash
    address: https://logstash.example.com:9600
```

## Uwierzytelnianie

Brak. API monitorowania Logstash w ogóle nie ma wbudowanego
uwierzytelniania — ma być odcięte zaporą sieciową, a nie chronione
poświadczeniami. Potwierdzono na żywo na rzeczywistym kontenerze
`docker.elastic.co/logstash/logstash`.

## Rejestrowane pola

Tylko `version` — ta sonda nie zapisuje żadnych pól `extra`.

## Korelacja CVE

Dopasowywany do NVD i BDU FSTEC, gdy skonfigurowano [blok `cve:`](/pl/cve/).

## Resolver cyklu życia

`endoflife:logstash`.
