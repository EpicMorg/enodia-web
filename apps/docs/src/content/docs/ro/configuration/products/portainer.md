---
title: Portainer
description: Configurarea enodia pentru a sonda Portainer.
---

Citește `GET /api/system/status` pentru versiune (aliasul mai vechi
`/api/status` răspunde identic, dar această sondă folosește întotdeauna
calea actuală).

```yaml
targets:
  - id: portainer-main
    product: portainer
    address: https://portainer.example.com
```

## Autentificare

Niciuna — endpointul este public în mod intenționat, accesibil chiar
înainte de crearea contului obligatoriu de administrator la prima
pornire.

## Câmpuri înregistrate

- `version`
- `extra.instanceId`

## Corelare CVE

Se corelează cu NVD și BDU FSTEC atunci când este configurat un [bloc `cve:`](/ro/cve/).

## Rezolvatorul ciclului de viață

`github:portainer/portainer` — endoflife.date nu are un calendar pentru
Portainer (404 confirmat),
așa că rezolvarea se face în schimb pe baza GitHub Releases: doar cel mai
recent tag publicat care nu este prerelease, fără date eol/support/lts
(GitHub nu are nicio opinie despre politica ciclului de viață, doar
despre „care este cea mai recentă versiune”).
