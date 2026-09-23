---
title: MongoDB
description: Configurarea enodia pentru a sonda MongoDB.
---

O sondă pe protocolul de rețea nativ, nu HTTP — `address` este `host` sau
`host:port`, fără schemă. Portul implicit este `27017` atunci când este
omis. Rulează comanda `buildInfo` prin protocolul de rețea (`OP_MSG`) și
citește câmpul `version` — fără bibliotecă client, fără o interogare de
tip `SELECT`.

```yaml
targets:
  - id: mongodb-main
    product: mongodb
    address: db.example.com:27017
```

## Autentificare

Niciuna — `buildInfo` face parte din setul restrâns de comenzi la care
MongoDB răspunde întotdeauna înainte de autentificare. Confirmat live pe
două containere reale `mongo:7`, unul fără niciun control al accesului și
unul cu `--auth` și un utilizator root configurat: ambele au returnat
același document `buildInfo` complet, fără a fi trimisă nicio
credențială.

## Câmpuri înregistrate

- `version`
- `extra.enterprise` — `"true"` atunci când `modules` din `buildInfo`
  conține `enterprise`, `"false"` atunci când nu îl conține (un server
  community are o listă goală); neraportat atunci când câmpul lipsește

## Corelare CVE

Se corelează cu NVD și BDU FSTEC atunci când este configurat un [bloc `cve:`](/ro/cve/). Ține cont de ediție: sonda înregistrează ediția serverului în `extra.enterprise`, iar o instanță community nu vede constatările specifice ediției enterprise. O ediție necunoscută păstrează toate constatările.

## Rezolvatorul ciclului de viață

`endoflife:mongodb`.
