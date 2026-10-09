---
title: Splunk
description: Configurarea enodia pentru a sonda Splunk.
---

Citește `GET /services/server/info?output_mode=json` de pe portul de
management al splunkd, nu din interfața web. O adresă fără port primește
`8089` (portul de management al splunkd); schema implicită este `https`.

```yaml
targets:
  - id: splunk-main
    product: splunk
    address: splunk.example.com
    credentials: splunk-monitor
```

## De ce portul de management

Interfața web (portul 8000) este locul greșit pentru întrebare: este
adesea publicată în spatele unui proxy sau CDN, iar pagina sa de
autentificare nu conține nicio versiune pe care să vă puteți baza.
Portul de
management al splunkd este direct, iar `/services/server/info` răspunde cu
`entry[0].content` — `version`, `build`, `product_type`,
`isFree`/`isTrial`. Sonda nu are nimic de citit pe portul web, motiv
pentru care un simplu nume de gazdă primește `8089`, nu portul implicit al
schemei.

## Autentificare — obligatorie

Fără credențiale, splunkd răspunde `401` cu un XML
`<msg type="ERROR">Unauthorized</msg>` și `Server: Splunkd` (văzut pe un
9.4.1 de producție și pe `splunk/splunk` 10.6.0.5). Sunt acceptate două
tipuri — un utilizator Splunk prin HTTP Basic sau un token de
autentificare Splunk ca Bearer:

```yaml
credentials:
  splunk-monitor:
    kind: basic
    username: monitor
    password: "${SPLUNK_PASSWORD}"
```

```yaml
credentials:
  splunk-token:
    kind: bearer
    value: "${SPLUNK_TOKEN}"
```

Orice alt tip este o eroare de configurare. Consultați
[Configurare → Credențiale](/ro/configuration/#credențiale).

## Câmpuri înregistrate

- `version` — `entry[0].content.version`, de exemplu `10.6.0.5`
- `extra.build` — de exemplu `86587d4e3b27`
- `extra.license` — `free` sau `trial`, atunci când splunkd raportează
  una dintre ele; absent în caz contrar
- `extra.productType` — `product_type` propriu al splunkd, de exemplu `enterprise`

## Corelare CVE

Se corelează cu NVD și BDU FSTEC atunci când este configurat un [bloc `cve:`](/ro/cve/).

Ține cont de ediție: NVD împarte `splunk:splunk` după ediție în
`enterprise` și `light`, retras de mult, iar `extra.productType`
(`enterprise`, `lite`) alege care se aplică. O ediție necunoscută
păstrează toate constatările. Splunk Cloud are propriul CPE și nu este mapat.

## Rezolvatorul ciclului de viață

`endoflife:splunk`. Un build mai nou decât calendarul (10.6, într-un
moment în care endoflife.date lista până la 10.4) apare ca
`cycle_unmatched` până când calendarul îl ajunge din urmă.
