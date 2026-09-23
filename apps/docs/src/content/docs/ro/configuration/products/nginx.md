---
title: nginx
description: Configurarea enodia pentru a sonda nginx.
---

Citește antetul de răspuns `Server` pe care nginx îl setează la fiecare
răspuns. Nu există un endpoint de versiune: nginx (spre deosebire de API-ul
REST al NGINX Plus) nu expune nimic altceva în mod anonim —
`/stub_status` din `ngx_http_stub_status_module` oferă contoare de
conexiuni, niciodată o versiune.

```yaml
targets:
  - id: nginx-main
    product: nginx
    address: https://www.example.com
```

## Autentificare

Niciuna — orice cod de stare este acceptat, deoarece nginx își pune
propriul antet `Server` pe paginile de eroare și pe redirecționări la fel
ca pe un `200`. O țintă al cărei `/` răspunde cu 404 sau se află în
spatele unui vhost cu basic auth raportează în continuare fără probleme
o versiune. Confirmat live pe containere reale `nginx:1.27.4` pentru
ambele cazuri.

## `server_tokens off` elimină versiunea

Setarea de securizare proprie a nginx (frecventă în producție) setează
antetul ca simplu `"nginx"`, fără nicio versiune — un produs confirmat,
fără nimic rămas de comparat cu un calendar al ciclului de viață, nu o
eroare a parserului.

## Câmpuri înregistrate

Doar `version` — această sondă nu înregistrează niciun câmp `extra`.

## Corelare CVE

Se corelează cu NVD și BDU FSTEC atunci când este configurat un [bloc `cve:`](/ro/cve/).

## Rezolvatorul ciclului de viață

`endoflife:nginx`.
