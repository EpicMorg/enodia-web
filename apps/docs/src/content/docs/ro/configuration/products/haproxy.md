---
title: HAProxy
description: Configurarea enodia pentru a sonda HAProxy.
---

Citește versiunea din titlul **paginii de statistici** proprii a HAProxy —
HAProxy nu are un endpoint de versiune și, spre deosebire de nginx, nu
setează implicit niciun antet `Server` care să îl identifice.

```yaml
targets:
  - id: haproxy-main
    product: haproxy
    address: https://haproxy.example.com
```

`/stats` este calea implicită a acestei sonde — setați `path:` explicit
doar dacă pagina dumneavoastră de statistici este montată în altă parte.

## Pagina de statistici trebuie să fie activată

Confirmat live pe un container real `haproxy:3.0`: pagina de statistici
(`stats enable` în configurația HAProxy; **nu este activată implicit**)
este singura suprafață anonimă care conține o versiune — exportul de
statistici `;csv` nu are nicio coloană de versiune în antetul său de
aproximativ 140 de coloane, așa că această sondă citește în mod specific
forma HTML.

## Autentificare

Opțională. `stats auth user:pass` (directiva de configurare proprie a
HAProxy pentru această pagină) este HTTP Basic obișnuit:

```yaml
credentials:
  haproxy-stats:
    kind: basic
    username: admin
    password: "${HAPROXY_STATS_PASSWORD}"
```

## Câmpuri înregistrate

Doar `version` — această sondă nu înregistrează niciun câmp `extra`.

## Corelare CVE

Se corelează cu NVD și BDU FSTEC atunci când este configurat un [bloc `cve:`](/ro/cve/).

## Rezolvatorul ciclului de viață

`endoflife:haproxy`.
