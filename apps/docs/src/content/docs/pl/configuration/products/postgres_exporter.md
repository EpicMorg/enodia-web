---
title: postgres_exporter
description: Konfiguracja enodia do sondowania produktu prometheus-community/postgres_exporter.
---

Odczytuje miernik (gauge) `postgres_exporter_build_info` z `/metrics` —
„version collector” z `prometheus/common`, który każdy eksporter
Prometheus w tym ekosystemie udostępnia w ten sam sposób (stała `1`,
z wersją w etykiecie, a nie w wartości). Jako alias akceptowany jest
`product: postgres-exporter`.

```yaml
targets:
  - id: postgres-exporter-main
    product: postgres_exporter
    address: https://exporter.example.com:9187
```

## Uwierzytelnianie

Opcjonalne — `/metrics` domyślnie nie wymaga poświadczeń i odpowiada nawet
wtedy, gdy sam docelowy PostgreSQL jest nieosiągalny (`build_info` opisuje
binarkę eksportera, a nie bazę danych, z której zbiera dane).
`exporter-toolkit` (biblioteka stojąca za `--web.config.file`) może dodać
do tego endpointu HTTP Basic:

```yaml
credentials:
  postgres-exporter-basic:
    kind: basic
    username: metrics
    password: "${EXPORTER_PASSWORD}"
```

## Rejestrowane pola

Tylko `version` — ta sonda nie zapisuje żadnych pól `extra`.

## Korelacja CVE

Brak dopasowania — żadna z baz nie ma dla niego użytecznych danych. Zobacz stronę [Korelacja CVE](/pl/cve/#które-produkty-są-dopasowywane).

## Resolver cyklu życia

`github:prometheus-community/postgres_exporter` — to eksporter Prometheus,
a nie produkt z własną polityką cyklu życia/EOL, więc jest rozwiązywany
przez GitHub Releases: wyłącznie najnowszy opublikowany tag niebędący wydaniem wstępnym (prerelease), bez dat eol/support/lts.
