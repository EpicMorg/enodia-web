---
title: HashiCorp Vault
description: Configurarea enodia pentru a sonda HashiCorp Vault.
---

Citește `GET /v1/sys/health` pentru versiune — endpointul de verificare a
stării clusterului Vault, anonim în mod deliberat, astfel încât un load
balancer să îl poată interoga. Trimiterea unui token nu schimbă nimic din
toate acestea.

```yaml
targets:
  - id: vault-main
    product: vault
    address: https://vault.example.com
```

## Autentificare

Niciuna — endpointul nu acceptă nicio formă de credențiale, prin design.

## Starea clusterului nu este un eșec

`/sys/health` răspunde cu coduri de stare diferite în funcție de
topologia clusterului — sealed (`503`), standby (`429`), DR/performance
standby (`472`/`473`), neinițializat (`501`) — și **fiecare dintre
acestea conține același corp JSON, inclusiv versiunea**. enodia le
tratează pe toate ca observații reușite, nu ca erori: un nod Vault sealed
este un fapt despre acel nod, nu un eșec al sondei (consultați
[Concepte](/ro/concepts/#faptele-și-judecata-sunt-separate)).

## Câmpuri înregistrate

- `version`
- `extra.initialized`, `extra.sealed`, `extra.standby` — `"true"`/`"false"`
- `extra.clusterName`, atunci când este prezent
- `extra.enterprise` — `"true"`/`"false"`, doar atunci când `/sys/health` conține câmpul `enterprise`

## Corelare CVE

Se corelează cu NVD și BDU FSTEC atunci când este configurat un [bloc `cve:`](/ro/cve/). Ține cont de ediție: sonda înregistrează ediția serverului în `extra.enterprise`, iar o instanță community nu vede constatările specifice ediției enterprise. O ediție necunoscută păstrează toate constatările.

## Rezolvatorul ciclului de viață

`endoflife:hashicorp-vault`.
