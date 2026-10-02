---
title: Rocky Linux
description: Configurarea enodia pentru a sonda Rocky Linux prin SSH.
---

Face parte din familia [Identificarea sistemului de operare prin SSH](/ro/configuration/products/ssh-os-probes/)
— consultați pagina respectivă pentru mecanismul comun, credențiale și
verificarea cheii de gazdă. Verifică câmpul `ID` din `/etc/os-release`.

```yaml
targets:
  - id: rocky-host
    product: rocky-linux
    address: host.example.com
    credentials: linux-host-ssh
```

Verificat live pe `rockylinux:9`: `ID="rocky"` — valoarea `ID` proprie
Rocky din os-release, diferită de numele din `product:` — și
`VERSION_ID="9.3"`.

## Corelare CVE

Se corelează **per pachet instalat** cu OVAL-ul **Red Hat** (`rhel-<N>.oval.xml.bz2`, în `cve.oval.path`) — Rocky recompilează pachetele Red Hat cu aceleași versiuni, iar fișierul OVAL propriu al Rocky este refuzat (conține doar o mică parte din avizele Rocky și nu trece validarea schemei OVAL). Sonda listează, de asemenea, pachetele binare instalate (`rpm -qa`, cu fluxul de module AppStream al fiecărui pachet) și citește `uname -r`/`-m`/`-v` în aceeași interogare SSH — stocate ca `packages` și `modules` ale observației, respectiv `extra.kernelRelease`, `extra.arch`, `extra.kernelVersion`. Dintre mai multe kerneluri instalate, se compară cel care rulează. Sunt raportate doar CVE-urile care au o corecție mai nouă decât ce este instalat, câte o constatare per pachet. Unele dintre ele provin din corecții pe care Red Hat le-a publicat ca avize de remediere a erorilor (RHBA), pe care `dnf updateinfo --security` nu le listează. Consultați [Corelare CVE](/ro/cve/#cve-uri-la-nivel-de-pachet-pentru-distribuțiile-linux).

## Rezolvatorul ciclului de viață

`endoflife:rocky-linux`.
