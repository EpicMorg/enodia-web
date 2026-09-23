---
title: SonarQube
description: Konfiguracja enodia do sondowania produktu SonarQube Server lub Community Build.
---

Odczytuje wersję z `GET /api/system/status` — tego samego endpointu
niezależnie od tego, który SonarQube faktycznie działa (zobacz poniżej).

```yaml
targets:
  - id: sonarqube-main
    product: sonarqube
    address: https://sonarqube.example.com
```

## Uwierzytelnianie

Brak — ten endpoint (wraz z `/api/server/version` i `/api/system/ping`)
pozostaje dostępny bez poświadczeń nawet po włączeniu globalnego
ustawienia SonarQube „Force user authentication”. SonarQube traktuje go
jako trasę kontroli stanu, do której load balancer musi mieć dostęp bez
logowania, a nie jako zwykłe chronione API.

## SonarQube Server a SonarQube Community Build

Pod koniec 2024 roku SonarSource podzielił „SonarQube” na dwa produkty:
**SonarQube Server** (bezpośrednią kontynuację wszystkich dawnych edycji
Community/Developer/Enterprise/Data Center, nadal wersjonowaną według
kalendarza: `2025.1`, `2026.4`, ...) oraz **SonarQube Community Build**
(nową, oddzielną, zawsze darmową kompilację z własnym, szybszym rytmem
wydań, wersjonowaną `24.12`, `25.12`, `26.9`, ... — ten sam schemat
kalendarzowy, tylko z dwucyfrowym zamiast czterocyfrowego rokiem).
endoflife.date śledzi je jako dwie odrębne strony z rzeczywiście różnymi
danymi cykli — `product: sonarqube` nie potrzebuje drugiego wpisu
konfiguracji, aby je rozróżnić, ponieważ to, który z nich ma zastosowanie,
można niezawodnie odczytać z ciągu wersji, który `sonarqubeProbe` już
pobiera:

- Czterocyfrowy rok na początku (`2025.x`, `2026.x`) → **SonarQube Server**.
- Dwucyfrowy, od `24` wzwyż (`24.x`, `25.x`, `26.x`) →
  **SonarQube Community Build**.
- Cokolwiek mniejszego (sam numer główny sprzed podziału, np.
  `9.9.8.100196`, `10.7.0.96327`) → traktowane jako Community Build,
  ponieważ obie strony zawierają identyczną historię dla wersji sprzed
  podziału.

## Rejestrowane pola

- `version`
- `extra.id`
- `extra.status` — jedno z `UP`, `DOWN`, `STARTING`, `RESTARTING`,
  `DB_MIGRATION_NEEDED`, `DB_MIGRATION_RUNNING`; fakt o stanie serwera
  zapisywany bez zmian, a nie zamieniany na błąd, gdy nie jest `UP`

## Korelacja CVE

Dopasowywany do NVD i BDU FSTEC, gdy skonfigurowano [blok `cve:`](/pl/cve/).

## Resolver cyklu życia

Wybierany dla każdej obserwacji osobno, a nie stały:
`endoflife:sonarqube-server` lub `endoflife:sonarqube-community`,
wybierany na podstawie ciągu wersji, jak opisano powyżej. Lista
wyświetlana przez `enodia products` (uruchamiane, zanim cokolwiek zostało
odpytane) pokazuje `endoflife:sonarqube-server` jako statyczną wartość
zastępczą — to tylko to, co jest wypisywane, zanim jakikolwiek cel
zostanie faktycznie sprawdzony, a nie to, względem czego musi być
rozwiązywana każda obserwacja.
