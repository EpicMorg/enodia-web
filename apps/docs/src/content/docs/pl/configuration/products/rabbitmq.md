---
title: RabbitMQ
description: Konfiguracja enodia do sondowania produktu RabbitMQ.
---

Odczytuje `GET /api/overview` z API HTTP wtyczki zarządzania (domyślnie
port `15672` — należy go podać w adresie). Sam port AMQP nie ma wymiany
wersji przed uwierzytelnieniem, którą warto by odczytywać; wtyczka
zarządzania to jedyne miejsce, w którym RabbitMQ serwuje swoją wersję.

```yaml
targets:
  - id: rabbitmq-main
    product: rabbitmq
    address: https://rabbitmq.example.com:15672
    credentials: rabbitmq-monitor
```

## Uwierzytelnianie — wymagane

API zarządzania nigdy nie jest anonimowe: potwierdzone na żywo na
`rabbitmq:4-management`, które bez poświadczeń odpowiedziało `401`.
Poświadczenia HTTP Basic użytkownika zarządzającego:

```yaml
credentials:
  rabbitmq-monitor:
    kind: basic
    username: monitor
    password: "${RABBITMQ_PASSWORD}"
```

Akceptowany jest tylko `basic`; każdy inny rodzaj jest błędem
konfiguracji. Zobacz
[Konfiguracja → Poświadczenia](/pl/configuration/#poświadczenia).

API zarządzania działa na zwykłym HTTP, chyba że skonfigurowano na nim
TLS, a enodia odmawia wysyłania poświadczeń przez zwykłe HTTP: adres
`http://` wymaga `allow_insecure_transport`, celowo — zobacz
[Najpierw HTTPS](/pl/concepts/#najpierw-https-poświadczenia-domyślnie-nigdy-nie-są-wysyłane-otwartym-tekstem).

## Rejestrowane pola

- `version` — `rabbitmq_version`, np. `4.3.6`
- `extra.productName` — np. `RabbitMQ`
- `extra.productVersion` — np. `4.3.6`
- `extra.erlangVersion` — np. `27.3.4.18`
- `extra.clusterName` — np. `rabbit@enodia-test`

Te same pola występują w odpowiedzi wersji 3.8.34.

## Korelacja CVE

Dopasowywany do NVD i BDU FSTEC, gdy skonfigurowano [blok `cve:`](/pl/cve/).

## Resolver cyklu życia

`endoflife:rabbitmq`.
