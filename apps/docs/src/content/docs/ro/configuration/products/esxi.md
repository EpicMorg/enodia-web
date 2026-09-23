---
title: VMware ESXi
description: Configurarea enodia pentru a sonda VMware ESXi.
---

Apelează `ServiceContent.about` prin apelul SOAP de descoperire
`RetrieveServiceContent` al API-ului vSphere, la `/sdk` — același apel și
același endpoint la care răspunde și
[vCenter Server](/ro/configuration/products/vcenter/), cele două fiind
deosebite prin câmpul `apiType`.

```yaml
targets:
  - id: esxi-main
    product: esxi
    address: https://esxi-host.example.com
```

## Autentificare

Niciuna — confirmat live pe o gazdă reală de producție ESXi 8.0.3, fără
nicio credențială.

## Verificarea identității producătorului

`apiType` este comparat cu `"HostAgent"` — un vCenter Server real răspunde
la același apel cu `apiType=VirtualCenter` (consultați
[vCenter Server](/ro/configuration/products/vcenter/), care efectuează
aceeași verificare în sens invers). A îndrepta `product: esxi` spre o
instanță vCenter eșuează explicit, în loc să fie înregistrat ca un fapt
greșit.

## Câmpuri înregistrate

- `version` — de exemplu `8.0.3`
- `extra.build`, atunci când este prezent

## Corelare CVE

Nu se corelează — aproape toate intrările sale sunt literale de forma `7.0` + `update_1` pe care mecanismul de corelare nu le citește, așa că rezultatul ar fi fie nimic, fie totul. Consultați [Corelare CVE](/ro/cve/#ce-produse-sunt-potrivite).

## Rezolvatorul ciclului de viață

`endoflife:esxi`.
