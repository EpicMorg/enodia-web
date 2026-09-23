---
title: SonarQube
description: Configurarea enodia pentru a sonda SonarQube Server sau Community Build.
---

Citește `GET /api/system/status` pentru versiune — același endpoint,
indiferent de varianta SonarQube pe care o rulați efectiv (vedeți mai
jos).

```yaml
targets:
  - id: sonarqube-main
    product: sonarqube
    address: https://sonarqube.example.com
```

## Autentificare

Niciuna — acest endpoint (împreună cu `/api/server/version` și
`/api/system/ping`) rămâne accesibil fără credențiale chiar și după
activarea setării globale „Force user authentication” din SonarQube.
SonarQube îl tratează ca pe o rută de verificare a stării pe care un
load balancer trebuie să o poată accesa fără autentificare, nu ca pe un
API protejat obișnuit.

## SonarQube Server și SonarQube Community Build

La sfârșitul anului 2024, SonarSource a împărțit „SonarQube” în două
produse: **SonarQube Server** (continuarea directă a tuturor fostelor
ediții Community/Developer/Enterprise/Data Center, în continuare cu
versionare calendaristică `2025.1`, `2026.4`, ...) și **SonarQube
Community Build** (un build nou, separat, întotdeauna gratuit, cu propria
cadență mai rapidă, versionat `24.12`, `25.12`, `26.9`, ... — aceeași
schemă calendaristică, doar cu anul pe două cifre în loc de patru).
endoflife.date le urmărește ca două pagini distincte, cu date ale
ciclurilor cu adevărat diferite — `product:
sonarqube` nu are nevoie de o a doua intrare de configurare pentru a le
deosebi, deoarece varianta aplicabilă poate fi citită în mod fiabil din
șirul de versiune pe care `sonarqubeProbe` îl obține deja:

- Un an inițial pe patru cifre (`2025.x`, `2026.x`) → **SonarQube Server**.
- Unul pe două cifre, începând cu `24` (`24.x`, `25.x`, `26.x`) →
  **SonarQube Community Build**.
- Orice valoare mai mică (o versiune majoră simplă, dinaintea împărțirii,
  de exemplu `9.9.8.100196`, `10.7.0.96327`) → tratată ca Community
  Build, deoarece ambele pagini au un istoric identic pentru versiunile
  dinaintea împărțirii.

## Câmpuri înregistrate

- `version`
- `extra.id`
- `extra.status` — una dintre valorile `UP`, `DOWN`, `STARTING`,
  `RESTARTING`, `DB_MIGRATION_NEEDED`, `DB_MIGRATION_RUNNING`; un fapt
  despre starea serverului, înregistrat ca atare, nu transformat într-o
  eroare atunci când nu este `UP`

## Corelare CVE

Se corelează cu NVD și BDU FSTEC atunci când este configurat un [bloc `cve:`](/ro/cve/).

## Rezolvatorul ciclului de viață

Ales per observație, nu fix: `endoflife:sonarqube-server` sau
`endoflife:sonarqube-community`, în funcție de șirul de versiune, așa
cum este descris mai sus. Lista afișată de `enodia products` (care
rulează fără ca ceva să fi fost deja sondat) arată
`endoflife:sonarqube-server` ca valoare de rezervă statică — aceasta este
doar ceea ce se afișează înainte ca vreo țintă să fi fost verificată
efectiv, nu neapărat rezolvatorul pe care îl folosește fiecare
observație.
