---
title: Jenkins
description: Configurarea enodia pentru a sonda Jenkins.
---

Citește versiunea din **antetul de răspuns `X-Jenkins`**, nu din corpul
răspunsului — Jenkins setează acest antet la fiecare răspuns, inclusiv la
un `403` pentru o cerere neautentificată, în timp ce corpul primit de o
cerere autentificată nu conține niciun câmp de versiune.

```yaml
targets:
  - id: jenkins-main
    product: jenkins
    address: https://jenkins.example.com
```

## Autentificare

Opțională. O instanță nouă cu security realm-ul implicit răspunde la
`/api/json` cu `403` pentru o cerere anonimă — aici acesta nu este un
eșec, `X-Jenkins` este setat și pe acest răspuns. Basic auth este
acceptat dacă preferați să vă autentificați:

```yaml
credentials:
  jenkins-admin:
    kind: basic
    username: admin
    password: "${JENKINS_TOKEN}"
```

## Câmpuri înregistrate

- `version` — din antetul `X-Jenkins`
- `extra.mode`, `extra.useSecurity` — completate doar atunci când cererea
  a fost suficient de autentificată pentru a primi un corp `200`; absente
  la un `403` anonim

## Corelare CVE

Se corelează cu NVD și BDU FSTEC atunci când este configurat un [bloc `cve:`](/ro/cve/).

## Rezolvatorul ciclului de viață

`endoflife:jenkins`.
