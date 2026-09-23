---
title: vCenter Server
description: Configurarea enodia pentru a sonda VMware vCenter Server.
---

Apelează `ServiceContent.about` prin apelul SOAP de descoperire
`RetrieveServiceContent` al API-ului vSphere, la `/sdk` — același apel și
același endpoint la care răspunde și
[ESXi](/ro/configuration/products/esxi/), cele două fiind deosebite prin
câmpul `apiType`.

```yaml
targets:
  - id: vcenter-main
    product: vcenter
    address: https://vcenter.example.com
```

## Autentificare

Niciuna — confirmat live pe o instanță reală de producție vCenter 8.0.3,
fără nicio credențială.

## Verificarea identității producătorului

`apiType` este comparat cu `"VirtualCenter"` — o gazdă ESXi reală
răspunde la același apel cu `apiType=HostAgent` (consultați
[ESXi](/ro/configuration/products/esxi/), care efectuează aceeași
verificare în sens invers). A îndrepta `product: vcenter` spre o gazdă
ESXi eșuează explicit, în loc să fie înregistrat ca un fapt greșit.

## Nu este la fel ca o versiune anterioară a acestei sonde

Această sondă citea anterior `/sdk/vimServiceVersions.xml`, care răspunde
identic atât pentru ESXi, cât și pentru vCenter (deci nu le putea
deosebi niciodată) și raportează versiunea schemei API `vim25` (de
exemplu `"8.0.3.0"`), nu versiunea comercială reală a produsului. Sonda
actuală, bazată pe `RetrieveServiceContent`, rezolvă ambele probleme —
versiune reală, verificare reală a identității.

## Câmpuri înregistrate

- `version` — versiunea comercială reală, de exemplu `8.0.3`
- `extra.build`, atunci când este prezent

## Corelare CVE

Nu se corelează — aproape toate intrările sale sunt literale de forma `7.0` + `update_1` pe care mecanismul de corelare nu le citește, așa că rezultatul ar fi fie nimic, fie totul. Consultați [Corelare CVE](/ro/cve/#ce-produse-sunt-potrivite).

## Rezolvatorul ciclului de viață

`endoflife:vcenter`.
