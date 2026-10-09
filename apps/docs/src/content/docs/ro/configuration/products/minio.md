---
title: MinIO
description: Configurarea enodia pentru a sonda MinIO prin SSH.
---

O sondă SSH: se autentifică și rulează propriul `--version` al binarului
serverului — `minio` după nume, apoi `/usr/local/bin/minio`. Portul
implicit este `22`, fără schemă — același mecanism SSH, aceleași
credențiale și aceeași verificare a cheii de gazdă ca familia
[Identificarea sistemului de operare prin SSH](/ro/configuration/products/ssh-os-probes/).

```yaml
targets:
  - id: minio-01
    product: minio
    address: minio-01.example.com
    credentials: linux-host-ssh
```

## De ce SSH

MinIO nu oferă anonim nicio versiune pe nicio suprafață de rețea: antetul
`Server` al API-ului S3 este un simplu `MinIO`, `/api/v1/login` anonim al
Console returnează doar strategia de autentificare, iar API-ul de
administrare și metricile Prometheus necesită o cheie de administrator sau
un bearer token generat cu `mc`.

## MinIO într-un container

Când MinIO rulează în Docker sau Podman și gazda însăși nu are binarul,
indicați numele containerului în `options` — comanda rulează atunci prin
`docker exec` (sau `podman exec`):

```yaml
targets:
  - id: minio-01
    product: minio
    address: minio-01.example.com
    credentials: linux-host-ssh
    options:
      container: minio               # numele containerului
      container_runtime: podman      # opțional: docker (implicit) sau podman
```

Utilizatorul SSH trebuie să aibă dreptul de a folosi acel runtime.
Numele containerului este verificat față de modelul de nume propriu al
Docker înainte de a fi inclus în comanda de la distanță.

## Numele lansărilor ca versiuni

MinIO denumește lansările după marcajul de timp UTC —
`RELEASE.2025-10-15T17-29-55Z` — atât în `--version`, cât și în tag-urile
sale GitHub. enodia transformă acest nume, cu sau fără un `_<MARKER>` după
`RELEASE` (build-urile interne indică `RELEASE_INHOUSE.…`), într-un
`2025.10.15.17.29.55` comparabil, atât pentru versiunea observată, cât și
pentru tag-ul rezolvatorului.

## Autentificare — obligatorie

O credențială SSH, `ssh-key` sau `password` — consultați
[Configurare → Credențiale](/ro/configuration/#credențiale).

## Câmpuri înregistrate

- `version` — de exemplu `RELEASE_INHOUSE.2025-03-12T18-04-18Z`, din
  `minio version RELEASE_INHOUSE.2025-03-12T18-04-18Z (commit-id=…)`
- `extra.build` — marcajul de după `RELEASE_` pe un build care nu este
  upstream, de exemplu `INHOUSE`
- `extra.commit` — `commit-id`, atunci când este prezent
- `extra.runtime` — runtime-ul Go din linia `Runtime:`, de exemplu
  `go1.24.4`
- `extra.container` — numele containerului, atunci când este setat `options.container`
- `extra.hostKeyVerified`

## Corelare CVE

Se corelează cu NVD și BDU FSTEC atunci când este configurat un
[bloc `cve:`](/ro/cve/). Ambele surse își scriu limitele ca marcaje de
timp ale lansărilor (`2025-10-15t17-29-55z`, cu litere mici sau mari),
transformate în aceeași formă cu puncte ca versiunea sondată, astfel încât
cele două să poată fi comparate; o limită dată ca simplă dată tot nu poate
fi parsată.

## Rezolvatorul ciclului de viață

`github:minio/minio` — endoflife.date nu are o pagină pentru MinIO (404
confirmat), așa că rezolvarea se face în schimb pe baza GitHub Releases:
doar cel mai recent tag publicat care nu este prerelease, fără date
eol/support/lts. Depozitul este arhivat: ultima lansare a ediției
community este `RELEASE.2025-10-15T17-29-55Z`, cu care va fi comparat
orice MinIO de acum înainte.
