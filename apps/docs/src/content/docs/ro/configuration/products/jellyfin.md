---
title: Jellyfin
description: Configurarea enodia pentru a sonda Jellyfin.
---

Citește `GET /System/Info/Public` pentru versiune — varianta „Public” a
endpointului system-info al Jellyfin, accesibilă intenționat înainte de a
exista o autentificare.

```yaml
targets:
  - id: jellyfin-main
    product: jellyfin
    address: https://jellyfin.example.com
```

## Autentificare

Niciuna — endpointul nu acceptă nicio formă de credențiale.

## Verificarea identității producătorului

`ProductName` din răspuns este comparat cu `"Jellyfin Server"`. Același
răspuns conține și `ServerName` al acestei instalări, un `Id` persistent
al instalării și `LocalAddress` al acesteia — nimic din toate acestea nu
descrie software-ul în sine, așa că sunt citite doar `Version` și
`ProductName`.

## Corelare CVE

Se corelează cu NVD atunci când este configurat un [bloc `cve:`](/ro/cve/).

## Rezolvatorul ciclului de viață

`github:jellyfin/jellyfin` — endoflife.date nu are un calendar pentru
Jellyfin (404 confirmat),
așa că rezolvarea se face în schimb pe baza GitHub Releases: doar cel mai
recent tag publicat care nu este prerelease, fără date eol/support/lts
(GitHub nu are nicio opinie despre politica ciclului de viață, doar
despre „care este cea mai recentă versiune”).
