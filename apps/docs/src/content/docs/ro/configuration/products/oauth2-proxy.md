---
title: oauth2-proxy
description: Configurarea enodia pentru a sonda oauth2-proxy.
---

Citește versiunea inclusă în subsolul paginii `/oauth2/sign_in`.
oauth2-proxy nu are deloc un endpoint JSON de versiune — pagina de
autentificare este singura suprafață anonimă (trebuie să se afișeze
înainte de a exista vreo sesiune), iar șablonul său implicit scrie
versiunea direct în textul subsolului.

```yaml
targets:
  - id: oauth2-proxy-main
    product: oauth2-proxy
    address: https://auth.example.com
```

## Autentificare

Niciuna — confirmat live pe pagina implicită a unui container real
`oauth2-proxy/oauth2-proxy`.

## Flag-ul `--footer` poate ascunde versiunea

Flag-ul `--footer` al unei instalări poate înlocui sau ascunde (`-`)
întreaga linie — în acest caz nu există nicio alternativă anonimă. Este
un produs confirmat, cu versiunea reținută de configurația proprie a
instalării, nu o eroare a sondei.

## Câmpuri înregistrate

Doar `version` — această sondă nu înregistrează niciun câmp `extra`.

## Corelare CVE

Se corelează cu NVD și BDU FSTEC atunci când este configurat un [bloc `cve:`](/ro/cve/).

## Rezolvatorul ciclului de viață

`github:oauth2-proxy/oauth2-proxy` — astăzi nu există un calendar
endoflife.date, așa că rezolvarea se face în schimb pe baza GitHub
Releases: doar cel mai recent tag publicat care nu este prerelease, fără
date eol/support/lts.
