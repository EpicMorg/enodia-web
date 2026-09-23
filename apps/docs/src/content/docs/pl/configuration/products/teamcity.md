---
title: TeamCity
description: Konfiguracja enodia do sondowania produktu JetBrains TeamCity.
---

Odczytuje wersję z `GET /app/rest/server` — punktu wejścia, na który
w pierwszej kolejności wskazuje dokumentacja REST API TeamCity.

```yaml
targets:
  - id: teamcity-main
    product: teamcity
    address: https://teamcity.example.com
    credentials: teamcity-pat
```

## Uwierzytelnianie — wymagane i łatwe do pomylenia

Domyślnie nie ma dostępu anonimowego — świeża instancja odpowiada `401`
z żądaniami uwierzytelnienia zarówno Basic, jak i Bearer (logowanie gościa
jest domyślnie wyłączone). TeamCity ma **dwa różne rodzaje tokenów, co
potwierdzono na żywo, które działają tylko jako przeciwne rodzaje
poświadczeń**:

- Jednorazowy **token startowy superużytkownika** (bootstrap token), który
  świeży serwer zapisuje w logu przy pierwszym uruchomieniu, działa tylko
  jako **Basic** — pusta nazwa użytkownika, token jako hasło. Wysłany jako
  samo `Authorization: Bearer` jest odrzucany.
- **Osobisty token dostępu** (personal access token) zwykłego użytkownika
  (Profile → Access Tokens — sposób, w jaki faktycznie uwierzytelnia się
  rzeczywista, długotrwała automatyzacja) działa odwrotnie: potwierdzono na
  siedmiu rzeczywistych instancjach produkcyjnych, że działa jako
  **Bearer**, a jako Basic jest stanowczo odrzucany („Incorrect username or
  password”, nawet z pustą nazwą użytkownika).

```yaml
credentials:
  # token startowy — Basic, pusta nazwa użytkownika
  teamcity-bootstrap:
    kind: basic
    username: ""
    password: "${TEAMCITY_BOOTSTRAP_TOKEN}"

  # osobisty token dostępu — Bearer
  teamcity-pat:
    kind: bearer
    value: "${TEAMCITY_TOKEN}"
```

W każdej długo działającej konfiguracji należy używać osobistego tokenu
dostępu — token startowy jest przeznaczony do wycofania po pierwszym
zalogowaniu.

## Rejestrowane pola

- `version` — pełny ciąg, np. `2026.2 (build 238924)`
- `extra.buildNumber`, `extra.internalId`

## Korelacja CVE

Dopasowywany do NVD i BDU FSTEC, gdy skonfigurowano [blok `cve:`](/pl/cve/).

## Resolver cyklu życia

Brak — endoflife.date nie ma kalendarza dla TeamCity (potwierdzone 404).
Na razie wyłącznie do inwentarza.
