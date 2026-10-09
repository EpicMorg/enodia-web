---
title: MinIO
description: Konfiguracja enodia do sondowania serwera MinIO przez SSH.
---

Sonda SSH: loguje się i uruchamia własne `--version` binarki serwera —
najpierw `minio` po nazwie, potem `/usr/local/bin/minio`. Gdy port
zostanie pominięty, domyślnie używany jest `22`, bez schematu — ten sam
mechanizm SSH, poświadczenia i weryfikacja klucza hosta co w rodzinie
[identyfikacji systemów operacyjnych przez SSH](/pl/configuration/products/ssh-os-probes/).

```yaml
targets:
  - id: minio-01
    product: minio
    address: minio-01.example.com
    credentials: linux-host-ssh
```

## Dlaczego SSH

MinIO nie podaje wersji anonimowo na żadnej powierzchni sieciowej:
nagłówek `Server` API S3 to samo `MinIO`, anonimowy `/api/v1/login`
konsoli zwraca tylko strategię logowania, a API administracyjne i metryki
Prometheus wymagają klucza administratora lub tokenu bearer
wygenerowanego przez `mc`.

## MinIO w kontenerze

Gdy MinIO działa w Dockerze lub Podmanie, a sam host nie ma binarki,
należy podać nazwę kontenera w `options` — polecenie jest wtedy
uruchamiane przez `docker exec` (lub `podman exec`):

```yaml
targets:
  - id: minio-01
    product: minio
    address: minio-01.example.com
    credentials: linux-host-ssh
    options:
      container: minio               # nazwa kontenera
      container_runtime: podman      # opcjonalne: docker (domyślnie) lub podman
```

Użytkownik SSH musi mieć uprawnienia do korzystania z tego środowiska
uruchomieniowego. Nazwa kontenera jest sprawdzana względem własnego
wzorca nazw Dockera, zanim trafi do zdalnego polecenia.

## Nazwy wydań jako wersje

MinIO nazywa wydania znacznikiem czasu UTC — `RELEASE.2025-10-15T17-29-55Z` —
zarówno w `--version`, jak i w swoich tagach na GitHubie. enodia
przekształca taką nazwę, z `_<MARKER>` po `RELEASE` lub bez niego
(kompilacje wewnętrzne mają postać `RELEASE_INHOUSE.…`), w porównywalne
`2025.10.15.17.29.55` — zarówno w zaobserwowanej wersji, jak i w tagu
resolvera.

## Uwierzytelnianie — wymagane

Poświadczenie SSH, `ssh-key` lub `password` — zobacz
[Konfiguracja → Poświadczenia](/pl/configuration/#poświadczenia).

## Rejestrowane pola

- `version` — np. `RELEASE_INHOUSE.2025-03-12T18-04-18Z`, z
  `minio version RELEASE_INHOUSE.2025-03-12T18-04-18Z (commit-id=…)`
- `extra.build` — znacznik po `RELEASE_` w kompilacji spoza upstreamu,
  np. `INHOUSE`
- `extra.commit` — `commit-id`, jeśli występuje
- `extra.runtime` — środowisko uruchomieniowe Go z wiersza `Runtime:`, np.
  `go1.24.4`
- `extra.container` — nazwa kontenera, gdy ustawiono `options.container`
- `extra.hostKeyVerified`

## Korelacja CVE

Dopasowywany do NVD i BDU FSTEC, gdy skonfigurowano [blok `cve:`](/pl/cve/).
Oba źródła zapisują swoje granice jako znaczniki czasu wydań
(`2025-10-15t17-29-55z`, w dowolnej wielkości liter), przekształcane do tej
samej postaci z kropkami co sondowana wersja, aby dało się je porównać;
granica podana jako zwykła data nadal nie jest parsowana.

## Resolver cyklu życia

`github:minio/minio` — endoflife.date nie ma strony MinIO (potwierdzone
404), więc zamiast tego jest rozwiązywany przez GitHub Releases: wyłącznie
najnowszy opublikowany tag niebędący wydaniem wstępnym (prerelease), bez
dat eol/support/lts. Repozytorium jest zarchiwizowane: ostatnie wydanie
edycji społecznościowej to `RELEASE.2025-10-15T17-29-55Z` i to z nim
MinIO będzie odtąd porównywane.
