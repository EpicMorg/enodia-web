---
title: Keycloak
description: Konfiguracja enodia do sondowania produktu Keycloak.
---

Odczytuje wersję z `GET /admin/serverinfo`.

```yaml
targets:
  - id: keycloak-main
    product: keycloak
    address: https://keycloak.example.com
    credentials: keycloak-token
```

## Uwierzytelnianie — wymagane

Keycloak to jedyny produkt tutaj, w którym **w ogóle nie ma anonimowej
drogi do wersji**: potwierdzono na żywo, że
`/realms/<realm>/.well-known/openid-configuration` (endpoint udostępniany
przez każdy realm bez tokenu) nigdzie nie zawiera pola wersji, a
`/admin/serverinfo` — który je zawiera — bez tokenu odpowiada `401`. Cel
bez skonfigurowanych poświadczeń jest podczas zbierania **pomijany**, a nie
oznaczany jako błąd.

```yaml
credentials:
  keycloak-token:
    kind: bearer
    value: "${KEYCLOAK_ACCESS_TOKEN}"
```

Akceptowany jest tylko `bearer`. Uzyskanie tego tokenu dostępu —
standardowym sposobem OpenID Connect, przez endpoint tokenów danego realmu —
wykracza poza zadania enodia (sondy odpowiadają za transport, a nie za
federację tożsamości): konfiguracja oczekuje tokenu już wydanego. Tokeny
dostępu są zwykle krótkotrwałe, więc to, co dostarcza
`KEYCLOAK_ACCESS_TOKEN` w chwili zbierania, musi dbać o jego aktualność;
samo enodia nie ma logiki odświeżania tokenów.

## Rejestrowane pola

- `version` — z `systemInfo.version`
- `extra.javaVersion`

## Korelacja CVE

Dopasowywany do NVD i BDU FSTEC, gdy skonfigurowano [blok `cve:`](/pl/cve/).

## Resolver cyklu życia

`endoflife:keycloak`.
