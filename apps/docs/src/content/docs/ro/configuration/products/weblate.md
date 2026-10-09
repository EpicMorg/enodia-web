---
title: Weblate
description: Configurarea enodia pentru a sonda Weblate.
---

Citește `GET /about/`, anonim. Schema implicită este `https`.

```yaml
targets:
  - id: weblate-main
    product: weblate
    address: https://weblate.example.com
```

## De unde provine versiunea

Subsolul fiecărei pagini Weblate indică `Powered by <a href="https://weblate.org/">Weblate 2026.10</a>`,
iar linkul său Documentation indică `docs.weblate.org/en/weblate-2026.10/`.
Sonda citește mai întâi subsolul, iar linkul către documentație dacă
subsolul a fost eliminat prin personalizare; o pagină fără niciunul dintre
ele este raportată ca neacceptată. Este citit `/about/` deoarece există pe
orice Weblate; un site cu `REQUIRE_LOGIN` îl redirecționează către pagina
de autentificare, care conține același subsol. Rădăcina API-ului REST
(`/api/`) este și ea anonimă, dar nu conține nicio versiune, iar
`/api/metrics/` necesită un token.

Weblate a trecut la versiuni calendaristice după 5.x (`2026.9`, `2026.9.1`,
`2026.10`); ambele forme sunt parsate.

## Autentificare

Niciuna — sonda citește o pagină anonimă și nu acceptă niciun tip de
credențială. Începând cu 2.2.0, o credențială configurată pe această țintă
este o eroare de configurare, în loc să fie ignorată; consultați
[Configurare → Credențiale](/ro/configuration/#credențiale).

## Câmpuri înregistrate

Doar `version` — de exemplu `2026.10` (confirmat live pe
`weblate/weblate:latest`). Această sondă nu înregistrează niciun câmp `extra`.

## Corelare CVE

Se corelează cu NVD atunci când este configurat un [bloc `cve:`](/ro/cve/).

## Rezolvatorul ciclului de viață

`github:WeblateOrg/weblate` — endoflife.date nu are un calendar pentru
Weblate (404 confirmat), așa că rezolvarea se face în schimb pe baza
GitHub Releases: doar cel mai recent tag publicat care nu este prerelease,
fără date eol/support/lts (GitHub nu are nicio opinie despre politica
ciclului de viață, doar despre „care este cea mai recentă versiune”).
Weblate își etichetează lansările sub forma `weblate-2026.10`; începând cu
2.2.0, rezolvatorul elimină un `<repo>-` sau `<repo>_` de la începutul
tag-urilor de lansare, astfel încât LATEST și CYCLE indică `2026.10`.
