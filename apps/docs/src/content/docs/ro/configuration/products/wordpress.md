---
title: WordPress
description: Configurarea enodia pentru a sonda WordPress.
---

Încearcă, în ordine, două suprafețe anonime și o folosește pe cea care
răspunde prima:

1. Linia `<generator>` din fluxul RSS (`/?feed=rss2` — forma cu șir de
   interogare, care funcționează indiferent dacă sunt configurate
   permalinkuri „pretty”).
2. Tag-ul `<meta name="generator" content="WordPress X.Y.Z" />` de pe
   pagina principală (`/`).

```yaml
targets:
  - id: wordpress-main
    product: wordpress
    address: https://blog.example.com
```

## Autentificare

Niciuna — endpointul nu acceptă nicio formă de credențiale.

## De ce este încercat mai întâi fluxul

Fluxul rezistă celui mai frecvent pas de securizare: WordPress își
înregistrează tag-ul generator pe hook-urile fluxului separat de acțiunea
`wp_head` a paginii principale, așa că fragmentul de o linie `remove_action('wp_head',
'wp_generator')` pe care îl oferă fiecare tutorial „ascundeți versiunea
WordPress” elimină doar tag-ul de pe pagina principală, nu și pe cel din
flux — confirmat prin citirea înregistrărilor de hook-uri din WordPress,
nu presupus. Un site care a mers mai departe și a dezactivat complet
fluxurile, sau a eliminat ambele semnale, ajunge la o eroare clară „not
supported”.

## Câmpuri înregistrate

Doar `version` — această sondă nu înregistrează niciun câmp `extra`.

## Corelare CVE

Se corelează cu NVD și BDU FSTEC atunci când este configurat un [bloc `cve:`](/ro/cve/).

## Rezolvatorul ciclului de viață

`endoflife:wordpress`.
