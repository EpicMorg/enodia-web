---
title: HashiCorp Vault
description: Konfiguracja enodia do sondowania produktu HashiCorp Vault.
---

Odczytuje wersję z `GET /v1/sys/health` — endpointu kontroli stanu
klastra Vault, celowo anonimowego, aby load balancer mógł go odpytywać.
Wysłanie tokenu nie ma na to żadnego wpływu.

```yaml
targets:
  - id: vault-main
    product: vault
    address: https://vault.example.com
```

## Uwierzytelnianie

Brak — endpoint z założenia nie przyjmuje żadnego rodzaju poświadczeń.

## Stan klastra nie jest błędem

`/sys/health` odpowiada różnymi kodami statusu w zależności od topologii
klastra — zapieczętowany (`503`), standby (`429`), standby DR/performance
(`472`/`473`), niezainicjowany (`501`) — i **każdy z nich nadal zawiera tę
samą treść JSON, łącznie z wersją**. enodia traktuje je wszystkie jako
udane obserwacje, a nie błędy: zapieczętowany węzeł Vault to fakt o tym
węźle, a nie awaria sondy (zobacz
[Koncepcje](/pl/concepts/#fakty-i-ocena-są-rozdzielone)).

## Rejestrowane pola

- `version`
- `extra.initialized`, `extra.sealed`, `extra.standby` — `"true"`/`"false"`
- `extra.clusterName`, jeśli występuje
- `extra.enterprise` — `"true"`/`"false"`, tylko gdy `/sys/health` zawiera pole `enterprise`

## Korelacja CVE

Dopasowywany do NVD i BDU FSTEC, gdy skonfigurowano [blok `cve:`](/pl/cve/). Uwzględnia edycję: sonda zapisuje edycję serwera w `extra.enterprise`, a instancja community nie widzi wyników dotyczących wyłącznie edycji enterprise. Przy nieznanej edycji zachowywane są wszystkie wyniki.

## Resolver cyklu życia

`endoflife:hashicorp-vault`.
