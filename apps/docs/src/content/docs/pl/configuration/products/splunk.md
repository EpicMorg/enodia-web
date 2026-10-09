---
title: Splunk
description: Konfiguracja enodia do sondowania produktu Splunk.
---

Odczytuje `GET /services/server/info?output_mode=json` z portu
zarządzania splunkd, a nie z interfejsu WWW. Adres bez portu otrzymuje
`8089` (port zarządzania splunkd); domyślnym schematem jest `https`.

```yaml
targets:
  - id: splunk-main
    product: splunk
    address: splunk.example.com
    credentials: splunk-monitor
```

## Dlaczego port zarządzania

Interfejs WWW (port 8000) to złe miejsce na pytanie: często jest
publikowany za proxy lub CDN, a jego strona logowania nie zawiera wersji,
na której warto by polegać. Port zarządzania splunkd
jest bezpośredni, a `/services/server/info` odpowiada
`entry[0].content` — `version`, `build`, `product_type`,
`isFree`/`isTrial`. Sonda nie ma czego odczytywać na porcie WWW, dlatego
sama nazwa hosta otrzymuje `8089`, a nie domyślny port schematu.

## Uwierzytelnianie — wymagane

Bez poświadczeń splunkd odpowiada `401` z XML-em
`<msg type="ERROR">Unauthorized</msg>` i `Server: Splunkd` (zaobserwowane
na produkcyjnym 9.4.1 i na `splunk/splunk` 10.6.0.5). Akceptowane są dwa
rodzaje — użytkownik Splunk przez HTTP Basic lub token uwierzytelniania
Splunk jako Bearer:

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

Każdy inny rodzaj jest błędem konfiguracji. Zobacz
[Konfiguracja → Poświadczenia](/pl/configuration/#poświadczenia).

## Rejestrowane pola

- `version` — `entry[0].content.version`, np. `10.6.0.5`
- `extra.build` — np. `86587d4e3b27`
- `extra.license` — `free` lub `trial`, gdy splunkd zgłasza jedną z tych
  wartości; w przeciwnym razie nieobecne
- `extra.productType` — własne `product_type` splunkd, np. `enterprise`

## Korelacja CVE

Dopasowywany do NVD i BDU FSTEC, gdy skonfigurowano [blok `cve:`](/pl/cve/).

Z uwzględnieniem edycji: NVD dzieli `splunk:splunk` według edycji na
`enterprise` i dawno wycofaną `light`, a `extra.productType` (`enterprise`,
`lite`) wybiera, która z nich ma zastosowanie. Nieznana edycja zachowuje
wszystkie znaleziska. Splunk Cloud ma własny CPE i nie jest mapowany.

## Resolver cyklu życia

`endoflife:splunk`. Kompilacja nowsza niż kalendarz (10.6, w czasie gdy
endoflife.date wymieniał wersje do 10.4) jest odczytywana jako
`cycle_unmatched`, dopóki kalendarz jej nie dogoni.
