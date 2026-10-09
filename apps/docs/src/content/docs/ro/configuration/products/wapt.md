---
title: WAPT
description: Configurarea enodia pentru a sonda WAPT.
---

Citește `GET /ping` al serverului WAPT (Tranquil IT), pe care acesta îl
servește fără sesiune.

```yaml
targets:
  - id: wapt-main
    product: wapt
    address: https://wapt.example.com
```

## Ce versiune este raportată

`/ping` conține atât `version` (`1.8.2`), cât și `git_hash`
(`1.8.2.7334-2d15afd9-debian-10-amd64`), care începe cu numărul complet al
build-ului. Atunci când acest număr de build extinde `version`, el este
raportat în schimb — `1.8.2.7334`, nu `1.8.2`. Confirmat live pe un server
WAPT 1.8.2 de producție.

## Autentificare

Niciuna — endpointul nu acceptă nicio formă de credențiale.

## Câmpuri înregistrate

- `version` — de exemplu `1.8.2.7334`
- `extra.edition` — de exemplu `community`
- `extra.apiVersion` — de exemplu `v3`
- `extra.gitHash` — de exemplu `1.8.2.7334-2d15afd9-debian-10-amd64`

## Corelare CVE

Se corelează cu NVD atunci când este configurat un [bloc `cve:`](/ro/cve/).

Ține cont de ediție: ediția proprie a WAPT (`community`/`enterprise`) este
deja exprimată în termenii NVD și este transmisă ca atare. Orice altă
valoare este tratată ca ediție necunoscută, care păstrează toate
constatările.

## Rezolvatorul ciclului de viață

Niciunul — WAPT nu are o pagină endoflife.date (404 confirmat), iar
tag-urile GitHub ale Tranquil IT s-au oprit la 1.5; lansările sunt
publicate pe propriul site, pe care niciun rezolvator de aici nu îl
citește. Doar pentru inventar.
