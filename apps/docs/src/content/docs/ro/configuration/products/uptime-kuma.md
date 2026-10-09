---
title: Uptime Kuma
description: Configurarea enodia pentru a sonda Uptime Kuma.
---

Se autentifică prin API-ul socket.io propriu al Uptime Kuma și citește
versiunea din evenimentul `info` pe care serverul îl trimite după
autentificare.

```yaml
targets:
  - id: uptime-kuma-main
    product: uptime-kuma
    address: https://uptime-kuma.example.com
    credentials: kuma-monitor
```

## De ce o autentificare

Nimic anonim nu conține versiunea. Evenimentul `info` al serverului o
conține, dar o conexiune nouă îl primește fără versiune până când socketul
este autentificat. `/metrics` nu are nicio serie cu versiunea, iar cheile
API deschid doar `/metrics`. Confirmat live pe 1.23.17 și 2.5.5, precum și
pe pagina publică de stare a unei instanțe de producție, ale cărei
`/api/status-page/*` și socket nu o conțin nici ele.

Așadar, sonda vorbește exact cât trebuie din transportul HTTP
long-polling al Engine.IO v4 (`/socket.io/?EIO=4&transport=polling`)
pentru a deschide o sesiune, a emite `login` și a interoga până când
sosește un eveniment `info` cu `version` — apoi se deconectează. 1.23.17
trimite `info` cu versiune după confirmarea autentificării, 2.5.5 înainte
de aceasta; ambele ordini sunt tratate.

## Autentificare — obligatorie

Un nume de utilizator și o parolă, `kind: password`:

```yaml
credentials:
  kuma-monitor:
    kind: password
    username: monitor
    password: "${UPTIME_KUMA_PASSWORD}"
```

Este acceptat doar `password`; orice alt tip este o eroare de configurare.
Consultați [Configurare → Credențiale](/ro/configuration/#credențiale).

- O autentificare refuzată este un eșec de autentificare care conține
  mesajul propriu al Uptime Kuma (`Incorrect username or password.`).
- **Un utilizator cu 2FA nu se poate autentifica în acest mod** —
  confirmarea autentificării cere un token. Acest lucru este raportat, nu
  ocolit: folosiți un utilizator de monitorizare fără 2FA.
- Uptime Kuma limitează rata autentificărilor: o rulare imediat după mai
  multe parole greșite a eșuat o dată pe 2.5.5 și a reușit la fiecare
  rulare ulterioară.
- Un Uptime Kuma prin HTTP simplu necesită `allow_insecure_transport`, ca
  pentru orice credențială — consultați
  [HTTPS mai întâi](/ro/concepts/#https-mai-întâi-credențialele-nu-sunt-niciodată-trimise-în-clar-în-mod-implicit).

## Câmpuri înregistrate

- `version` — de exemplu `2.5.5`
- `extra.latestVersion` — verificarea proprie de actualizări a Uptime
  Kuma, de exemplu `2.5.5`
- `extra.dbType` — de exemplu `sqlite`

## Corelare CVE

Se corelează cu NVD atunci când este configurat un [bloc `cve:`](/ro/cve/).

## Rezolvatorul ciclului de viață

`github:louislam/uptime-kuma` — endoflife.date nu are un calendar pentru
Uptime Kuma (404 confirmat), așa că rezolvarea se face în schimb pe baza
GitHub Releases: doar cel mai recent tag publicat care nu este prerelease,
fără date eol/support/lts (GitHub nu are nicio opinie despre politica
ciclului de viață, doar despre „care este cea mai recentă versiune”).
