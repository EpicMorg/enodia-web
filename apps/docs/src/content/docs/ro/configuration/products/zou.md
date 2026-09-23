---
title: Zou
description: Configurarea enodia pentru a sonda Zou (backendul API CG-Wire).
---

Citește `GET /api/status` pentru versiune — backendul API real din
spatele stack-ului CG-Wire de urmărire a producției, cunoscut în mod
obișnuit sub marca [Kitsu](/ro/configuration/products/kitsu/), frontendul
său Vue.js, care nu are un endpoint de versiune propriu.

```yaml
targets:
  - id: zou-main
    product: zou
    address: https://kitsu.example.com
```

## Autentificare

Niciuna — endpointul nu acceptă nicio formă de credențiale.

## Verificarea identității producătorului

Câmpul `name` din răspuns este comparat cu `"Zou"` — același raționament
ca la sondele Atlassian și Jellyfin: numirea explicită a produsului în
configurație are rolul de a detecta un URL îndreptat spre serviciul
greșit.

## `zou` și `kitsu` — aceeași sondă, rezolvatori diferiți, nu un alias

`product: kitsu` accesează exact același endpoint și aceeași
implementare de sondă — consultați
[pagina sa](/ro/configuration/products/kitsu/) pentru motivul pentru
care cele două sunt înregistrate ca produse separate, nu ca un singur
produs cu un alias: depozitul GitHub propriu al `zou` nu publică
Releases utilizabile (doar tag-uri git simple, confirmat live), așa că
`product: zou` rămâne fără rezolvator, în loc să riște o comparație cu
numerele de versiune ale componentei greșite.

## Câmpuri înregistrate

- `version`
- `extra.databaseUp`, `extra.keyValueStoreUp`, `extra.eventStreamUp`,
  `extra.jobQueueUp`, `extra.indexerUp` — indicatori de sănătate ai
  componentelor, `"true"`/`"false"`

## Corelare CVE

Nu se corelează — niciuna dintre baze de date nu are date utilizabile pentru acest produs. Consultați [Corelare CVE](/ro/cve/#ce-produse-sunt-potrivite).

## Rezolvatorul ciclului de viață

Niciunul — depozitul GitHub al `cgwire/zou` nu are Releases utilizabile
pe baza cărora să se facă rezolvarea (confirmat live: API-ul său Releases
returnează o listă goală — doar tag-uri git simple). Dacă vă considerați
instalarea ca „rulând Kitsu”, și nu „rulând Zou”, `product: kitsu` vă
oferă în schimb un rezolvator real pe baza `cgwire/kitsu`, îndreptat spre
exact același backend.
