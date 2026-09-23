---
title: GitLab
description: Configurarea enodia pentru a sonda GitLab.
---

Citește `GET /api/v4/version` pentru versiune.

```yaml
targets:
  - id: gitlab-main
    product: gitlab
    address: https://gitlab.example.com
    credentials: gitlab-token
```

## Autentificare

GitLab cere implicit o credențială pentru acest endpoint — o cerere
neautentificată primește `401`. Un personal access token funcționează în
ambele moduri, confirmat live pe o instanță reală:

```yaml
credentials:
  gitlab-token:
    kind: token-header
    header: PRIVATE-TOKEN
    value: "${GITLAB_TOKEN}"

  # la fel de valid — același token ca simplu bearer token
  gitlab-token-bearer:
    kind: bearer
    value: "${GITLAB_TOKEN}"
```

## Câmpuri înregistrate

- `version`
- `extra.revision`, atunci când este prezent
- `extra.enterprise` — `"true"`/`"false"`, GitLab EE sau CE

## Corelare CVE

Se corelează cu NVD și BDU FSTEC atunci când este configurat un [bloc `cve:`](/ro/cve/). Ține cont de ediție: sonda înregistrează ediția serverului în `extra.enterprise`, iar o instanță community nu vede constatările specifice ediției enterprise. O ediție necunoscută păstrează toate constatările.

## Rezolvatorul ciclului de viață

`endoflife:gitlab`.
