---
title: Jenkins
description: Konfiguracja enodia do sondowania produktu Jenkins.
---

Odczytuje wersję z **nagłówka odpowiedzi `X-Jenkins`**, a nie z treści
odpowiedzi — Jenkins ustawia ten nagłówek w każdej odpowiedzi, łącznie
z `403` na nieuwierzytelnione żądanie, podczas gdy treść zwracana na
uwierzytelnione żądanie nie zawiera nigdzie pola z wersją.

```yaml
targets:
  - id: jenkins-main
    product: jenkins
    address: https://jenkins.example.com
```

## Uwierzytelnianie

Opcjonalne. Świeża instancja z domyślnym mechanizmem zabezpieczeń (security
realm) odpowiada na anonimowe żądanie do `/api/json` kodem `403` — nie jest
to tutaj błąd, `X-Jenkins` jest ustawiony również w tej odpowiedzi. Jeśli
uwierzytelnianie jest preferowane, akceptowane jest Basic:

```yaml
credentials:
  jenkins-admin:
    kind: basic
    username: admin
    password: "${JENKINS_TOKEN}"
```

## Rejestrowane pola

- `version` — z nagłówka `X-Jenkins`
- `extra.mode`, `extra.useSecurity` — wypełniane tylko wtedy, gdy żądanie
  było uwierzytelnione na tyle, by otrzymać treść z `200`; nieobecne przy
  anonimowym `403`

## Korelacja CVE

Dopasowywany do NVD i BDU FSTEC, gdy skonfigurowano [blok `cve:`](/pl/cve/).

## Resolver cyklu życia

`endoflife:jenkins`.
