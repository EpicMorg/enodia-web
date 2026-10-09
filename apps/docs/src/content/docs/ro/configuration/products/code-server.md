---
title: code-server
description: Configurarea enodia pentru a sonda code-server.
---

Citește `GET /login`, anonim. Schema implicită este `https`. Pagina de
autentificare încorporează `<meta id="coder-options" data-settings="{...}">`
— JSON cu escape HTML — iar `codeServerVersion` din acesta este versiunea
serverului; sonda elimină escape-ul atributului și îl decodează.

```yaml
targets:
  - id: code-main
    product: code-server
    address: https://code.example.com
```

## De ce pagina de autentificare

`/version` al code-server necesită parola, iar `/healthz` nu conține
nicio versiune. Pagina de autentificare este accesibilă fără autentificare
și conține aceleași opțiuni cu care este pornit editorul. O pagină fără
elementul `coder-options` este raportată ca neacceptată (nu este code-server).

## Autentificare

Niciuna — sonda citește o pagină anonimă și nu acceptă niciun tip de
credențială. Începând cu 2.2.0, o credențială configurată pe această țintă
este o eroare de configurare, în loc să fie ignorată; consultați
[Configurare → Credențiale](/ro/configuration/#credențiale).

## Câmpuri înregistrate

Doar `version` — de exemplu `4.141.0` (confirmat live pe
`codercom/code-server:latest`, al cărui `code-server --version` indica
4.141.0 cu Code 1.141.0). Această sondă nu înregistrează niciun câmp `extra`.

## Corelare CVE

Se corelează cu NVD atunci când este configurat un [bloc `cve:`](/ro/cve/).

## Rezolvatorul ciclului de viață

`github:coder/code-server` — endoflife.date nu are un calendar pentru
code-server (404 confirmat), așa că rezolvarea se face în schimb pe baza
GitHub Releases: doar cel mai recent tag publicat care nu este prerelease,
fără date eol/support/lts (GitHub nu are nicio opinie despre politica
ciclului de viață, doar despre „care este cea mai recentă versiune”).
