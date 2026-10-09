---
title: Greenbone / OpenVAS
description: Configurarea enodia pentru a sonda Greenbone / OpenVAS.
---

Citește versiunea gsad — daemonul web Greenbone Security Assistant din
fața OpenVAS — din `GET /gmp`. Schema implicită este `https`.
`product: openvas` și `product: gsad` sunt acceptate ca aliasuri.

```yaml
targets:
  - id: greenbone-main
    product: greenbone
    address: https://greenbone.example.com
```

## De ce 401-ul de la `/gmp`

gsad împachetează fiecare răspuns `/gmp` într-un plic care îi conține
versiunea, inclusiv răspunsul 401 la o cerere fără sesiune:
`<envelope><version>24.12.0</version><vendor_version></vendor_version>…`
(„Authentication required … (GSA 24.12.0)”). Sonda acceptă acel 401 și
citește plicul. Interfața web în sine este un bundle React static, fără
nicio versiune în el.

Versiunea este a gsad. Scannerul (openvas-scanner) și gvmd din spatele
lui au versiuni separate și nu sunt vizibile fără autentificare.

## Autentificare

Niciuna — endpointul nu acceptă nicio formă de credențiale.

## Câmpuri înregistrate

- `version` — de exemplu `24.12.0`, din `<envelope><version>`
- `extra.vendorVersion` — `<vendor_version>`, atunci când nu este gol

## Corelare CVE

Se corelează cu NVD atunci când este configurat un [bloc `cve:`](/ro/cve/) — ca
gsad (`greenbone_security_assistant`), nu ca daemonul `openvas_manager`.

## Rezolvatorul ciclului de viață

`github:greenbone/gsad` — endoflife.date nu are un calendar pentru
Greenbone (404 confirmat), așa că rezolvarea se face în schimb pe baza
GitHub Releases: doar cel mai recent tag publicat care nu este prerelease,
fără date eol/support/lts (GitHub nu are nicio opinie despre politica
ciclului de viață, doar despre „care este cea mai recentă versiune”).
