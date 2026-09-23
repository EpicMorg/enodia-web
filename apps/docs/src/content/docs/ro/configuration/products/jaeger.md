---
title: Jaeger
description: Configurarea enodia pentru a sonda Jaeger.
---

Citește versiunea pe care query-service-ul Jaeger (componenta care
servește interfața, implicit pe portul 16686) o încorporează în propriul
`index.html` printr-o căutare/înlocuire la momentul build-ului — nu
există un API de versiune separat.

```yaml
targets:
  - id: jaeger-main
    product: jaeger
    address: https://jaeger.example.com
```

## Autentificare

Niciuna — Jaeger nu are deloc un mecanism propriu de autentificare. O
instalare aflată în spatele unui reverse proxy sau al unui gateway SSO
(oauth2-proxy este o alegere reală frecventă) răspunde cu o
redirecționare către fluxul de autentificare al acelui gateway în locul
HTML-ului Jaeger, ceea ce apare ca eroarea proprie a acestei sonde „no
JAEGER_VERSION found” — nu este ceva ce această sondă poate finaliza
singură, aceeași formă de lacună pe care ar avea-o un produs cu
autentificare prin formular.

## Câmpuri înregistrate

Doar `version` — această sondă nu înregistrează niciun câmp `extra`.

## Corelare CVE

Se corelează cu NVD atunci când este configurat un [bloc `cve:`](/ro/cve/).

## Rezolvatorul ciclului de viață

`endoflife:jaeger`.
