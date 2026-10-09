---
title: TeamCity
description: Konfiguracja enodia do sondowania produktu JetBrains TeamCity.
---

Odczytuje wersję anonimowo z `GET /app/rest/server/version`, gdy nie
skonfigurowano poświadczeń, albo z `GET /app/rest/server` — punktu
wejścia, na który w pierwszej kolejności wskazuje dokumentacja REST API
TeamCity — gdy skonfigurowano token.

```yaml
targets:
  - id: teamcity-main
    product: teamcity
    address: https://teamcity.example.com
    # credentials: teamcity-pat    # opcjonalne, zobacz niżej
```

## Uwierzytelnianie — opcjonalne i łatwe do pomylenia, jeśli zostanie dodane

**Poświadczenia nie są potrzebne.** TeamCity udostępnia
`/app/rest/server/version` każdemu, jako zwykły tekst —
`2026.1.1 (build 222577)` — nawet przy wyłączonym logowaniu gościa.
Potwierdzono na świeżych serwerach od 2017.2 do 2026.1 bez utworzonego
administratora oraz na siedmiu instancjach produkcyjnych (od 2024.03 do
2026.1.3) bez poświadczeń. To nie jest dostęp gościa: `/app/rest/server`
i punkty końcowe dostępne tylko dla gościa są na tych samych serwerach
odrzucane. Podczas uruchamiania TeamCity odpowiada na każdą ścieżkę
stroną konserwacyjną HTML z kodem 200, więc odpowiedź musi w całości
pasować do `YYYY.N[.N] (build N)`, w przeciwnym razie cel kończy się
błędem jako niemożliwy do sparsowania.

**Przy skonfigurowanym tokenie** sonda odczytuje zamiast tego
`/app/rest/server` — skoro zażądano uwierzytelnionego odczytu, zawiera
on też `internalId`, a błędny token pozostaje widocznym błędem
uwierzytelniania, zamiast zostać zamaskowany przez ścieżkę anonimową.
`/app/rest/server` nigdy nie jest anonimowy: świeża instancja odpowiada
`401` z żądaniami uwierzytelnienia zarówno Basic, jak i Bearer. TeamCity
ma **dwa różne rodzaje tokenów, co
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
- `extra.buildNumber`
- `extra.internalId` — tylko z tokenem (`/app/rest/server`)

## Korelacja CVE

Dopasowywany do NVD i BDU FSTEC, gdy skonfigurowano [blok `cve:`](/pl/cve/).

## Resolver cyklu życia

Brak — endoflife.date nie ma kalendarza dla TeamCity (potwierdzone 404).
Na razie wyłącznie do inwentarza.
