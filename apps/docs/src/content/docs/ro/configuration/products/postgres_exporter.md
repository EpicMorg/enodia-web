---
title: postgres_exporter
description: Configurarea enodia pentru a sonda prometheus-community/postgres_exporter.
---

Citește gauge-ul `postgres_exporter_build_info` din `/metrics` —
„version collector”-ul din `prometheus/common` pe care fiecare exporter
Prometheus din acest ecosistem îl expune în același mod (o constantă
`1`, cu versiunea într-o etichetă, nu în valoare). `product: postgres-exporter` este acceptat ca alias.

```yaml
targets:
  - id: postgres-exporter-main
    product: postgres_exporter
    address: https://exporter.example.com:9187
```

## Autentificare

Opțională — `/metrics` nu necesită implicit credențiale și răspunde chiar
și atunci când PostgreSQL-ul țintă este inaccesibil (`build_info`
descrie binarul exporterului, nu baza de date pe care o interoghează).
`exporter-toolkit` (biblioteca din spatele `--web.config.file`) poate
adăuga HTTP Basic acestui endpoint:

```yaml
credentials:
  postgres-exporter-basic:
    kind: basic
    username: metrics
    password: "${EXPORTER_PASSWORD}"
```

## Câmpuri înregistrate

Doar `version` — această sondă nu înregistrează niciun câmp `extra`.

## Corelare CVE

Nu se corelează — niciuna dintre baze de date nu are date utilizabile pentru acest produs. Consultați [Corelare CVE](/ro/cve/#ce-produse-sunt-potrivite).

## Rezolvatorul ciclului de viață

`github:prometheus-community/postgres_exporter` — acesta este un exporter
Prometheus, nu un produs cu propria politică de ciclu de viață/EOL, așa
că rezolvarea se face pe baza GitHub Releases: doar cel mai recent tag
publicat care nu este prerelease, fără date eol/support/lts.
