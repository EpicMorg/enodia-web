---
title: Keycloak
description: Configurarea enodia pentru a sonda Keycloak.
---

Citește `GET /admin/serverinfo` pentru versiune.

```yaml
targets:
  - id: keycloak-main
    product: keycloak
    address: https://keycloak.example.com
    credentials: keycloak-token
```

## Autentificare — obligatorie

Keycloak este singurul produs de aici **fără nicio cale anonimă către
versiune**: confirmat live, `/realms/<realm>/.well-known/openid-configuration`
(endpointul pe care fiecare realm îl expune fără token) nu conține niciun
câmp de versiune, iar `/admin/serverinfo` — care îl conține — răspunde
`401` fără token. O țintă fără credențiale configurate este **omisă**, nu
marcată ca eșuată, în momentul colectării.

```yaml
credentials:
  keycloak-token:
    kind: bearer
    value: "${KEYCLOAK_ACCESS_TOKEN}"
```

Este acceptat doar `bearer`. Obținerea acestui access token — în modul
standard OpenID Connect, prin endpointul de tokenuri al realm-ului — nu
ține de rolul enodia (sondele se ocupă de transport, nu de federarea
identităților): configurația așteaptă un token deja emis. Access
tokenurile au de obicei o durată de viață scurtă, așa că ceea ce
furnizează `KEYCLOAK_ACCESS_TOKEN` în momentul colectării trebuie să îl
mențină actualizat; enodia însăși nu are logică de reîmprospătare a
tokenurilor.

## Câmpuri înregistrate

- `version` — din `systemInfo.version`
- `extra.javaVersion`

## Corelare CVE

Se corelează cu NVD și BDU FSTEC atunci când este configurat un [bloc `cve:`](/ro/cve/).

## Rezolvatorul ciclului de viață

`endoflife:keycloak`.
