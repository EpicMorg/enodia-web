---
title: NetBSD
description: Configurarea enodia pentru a sonda NetBSD prin SSH.
---

Face parte din familia [Identificarea sistemului de operare prin SSH](/ro/configuration/products/ssh-os-probes/),
dar nu din grupul os-release — NetBSD nu livrează deloc un echivalent
os-release, așa că sursa identității este în schimb `uname -sr`.
Consultați pagina familiei pentru mecanismul comun, credențiale și
verificarea cheii de gazdă.

```yaml
targets:
  - id: netbsd-host
    product: netbsd
    address: host.example.com
    credentials: linux-host-ssh
```

Verificat live prin `vmactions/netbsd-vm` (altfel nu există nicio imagine
preinstalată descărcabilă): `uname -sr` → `"NetBSD 11.0"`, fără niciun nume de
gazdă în rezultat — spre deosebire de `uname -a`, pe care această sondă
în mod deliberat nu îl folosește.

## Corelare CVE

Nu se corelează — NVD înregistrează nivelurile de patch într-un câmp CPE pe care mecanismul de corelare nu îl citește, astfel încât o corelare doar după versiune ar semnala o gazdă complet actualizată cu toate CVE-urile remediate vreodată în acea versiune. Consultați [Corelare CVE](/ro/cve/#ce-produse-sunt-potrivite).

## Rezolvatorul ciclului de viață

`endoflife:netbsd`.
