---
title: Traefik
description: Konfiguracja enodia do sondowania produktu Traefik.
---

Odczytuje `GET /api/version`.

```yaml
targets:
  - id: traefik-main
    product: traefik
    address: https://traefik.example.com
```

## Uwierzytelnianie

Opcjonalne. Potwierdzono na żywo na rzeczywistym kontenerze `traefik:v3.1`:
gdy router API jest w ogóle włączony (domyślnie wyłączony — w standardowej
instancji nie jest ustawione ani `--api`, ani `--api.insecure`) z
`--api.insecure=true`, ten endpoint nie wymaga poświadczeń. Wdrożenie,
które zamiast tego umieszcza router API za własnym middleware
uwierzytelniania Basic/Digest (udokumentowany przez Traefik „bezpieczny”
sposób jego udostępnienia), odpowiada zwykłymi żądaniami uwierzytelnienia
HTTP Basic:

```yaml
credentials:
  traefik-basic:
    kind: basic
    username: admin
    password: "${TRAEFIK_PASSWORD}"
```

Instancja, w której API w ogóle nie jest włączone, odpowiada tutaj `404`,
czego nie da się odróżnić od błędnego adresu.

## Rejestrowane pola

Tylko `version` — ta sonda nie zapisuje żadnych pól `extra` (`Codename`
i `startDate` opisują wydanie, a nie wdrożenie, i nie są odczytywane).

## Korelacja CVE

Dopasowywany do NVD i BDU FSTEC, gdy skonfigurowano [blok `cve:`](/pl/cve/).

## Resolver cyklu życia

`endoflife:traefik`.
