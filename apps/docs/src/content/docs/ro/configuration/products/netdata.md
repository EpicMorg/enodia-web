---
title: Netdata
description: Configurarea enodia pentru a sonda Netdata.
---

Citește `GET /api/v1/info` al agentului, servit implicit fără
autentificare. Schema implicită este `https`.

```yaml
targets:
  - id: netdata-01
    product: netdata
    address: https://netdata-01.example.com
```

## Ce se citește

Răspunsul începe cu `"version": "v2.12.1"`, alături de `release-channel`.
Restul descrie gazda — uid, kernel, etichete, hardware, cloud — nimic din
toate acestea nu descrie software-ul în sine, așa că sunt citite doar
versiunea și canalul de lansare. Un răspuns fără `version` este raportat
ca neacceptat (nu este Netdata).

## Autentificare

Opțională — agentul răspunde implicit anonim. `basic` sau `bearer` sunt
transmise atunci când sunt configurate, pentru un agent din spatele unui
proxy care le cere; începând cu 2.2.0, orice alt tip este o eroare de
configurare. Consultați
[Configurare → Credențiale](/ro/configuration/#credențiale).

```yaml
credentials:
  netdata-proxy:
    kind: basic
    username: enodia
    password: "${NETDATA_PROXY_PASSWORD}"
```

## Câmpuri înregistrate

- `version` — așa cum o raportează agentul, de exemplu `v2.12.1` (confirmat
  live pe `netdata/netdata:stable`)
- `extra.releaseChannel` — de exemplu `stable` sau `nightly`, atunci când
  este prezent

## Corelare CVE

Se corelează cu NVD și BDU FSTEC atunci când este configurat un
[bloc `cve:`](/ro/cve/).

## Rezolvatorul ciclului de viață

`github:netdata/netdata` — endoflife.date nu are un calendar pentru
Netdata (404 confirmat), așa că rezolvarea se face în schimb pe baza
GitHub Releases: doar cel mai recent tag publicat care nu este prerelease,
fără date eol/support/lts (GitHub nu are nicio opinie despre politica
ciclului de viață, doar despre „care este cea mai recentă versiune”).
