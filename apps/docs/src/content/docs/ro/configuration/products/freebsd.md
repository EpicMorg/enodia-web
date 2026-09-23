---
title: FreeBSD
description: Configurarea enodia pentru a sonda FreeBSD prin SSH.
---

Face parte din familia [Identificarea sistemului de operare prin SSH](/ro/configuration/products/ssh-os-probes/)
— consultați pagina respectivă pentru mecanismul comun, credențiale și
verificarea cheii de gazdă.

```yaml
targets:
  - id: freebsd-host
    product: freebsd
    address: host.example.com
    credentials: linux-host-ssh
```

## Singurul produs din această familie care citește o altă cale

Toate celelalte produse din această familie citesc `/etc/os-release`;
FreeBSD este excepția. FreeBSD generează singur `/var/run/os-release`,
dinamic, la pornire (`/etc/rc.d/os-release`) — exact în aceeași formă
`KEY=VALUE` pe care distribuțiile Linux o livrează static în
`/etc/os-release`. Verificat live prin QEMU (imaginea cloud qcow2
oficială a FreeBSD — nu există nicio imagine Docker pentru FreeBSD):
`ID=freebsd`, `VERSION_ID="15.1"`.

## Corelare CVE

Nu se corelează — NVD înregistrează nivelurile de patch într-un câmp CPE pe care mecanismul de corelare nu îl citește, astfel încât o corelare doar după versiune ar semnala o gazdă complet actualizată cu toate CVE-urile remediate vreodată în acea versiune. Consultați [Corelare CVE](/ro/cve/#ce-produse-sunt-potrivite).

## Rezolvatorul ciclului de viață

`endoflife:freebsd`.
