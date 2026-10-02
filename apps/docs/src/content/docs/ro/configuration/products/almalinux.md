---
title: AlmaLinux
description: Configurarea enodia pentru a sonda AlmaLinux prin SSH.
---

Face parte din familia [Identificarea sistemului de operare prin SSH](/ro/configuration/products/ssh-os-probes/)
— consultați pagina respectivă pentru mecanismul comun, credențiale și
verificarea cheii de gazdă. Verifică câmpul `ID` din `/etc/os-release`.

```yaml
targets:
  - id: almalinux-host
    product: almalinux
    address: host.example.com
    credentials: linux-host-ssh
```

Verificat live pe `docker.io/almalinux:9`: `ID=almalinux`,
`VERSION_ID="9.8"`.

## Corelare CVE

Se corelează **per pachet instalat** cu OVAL-ul propriu al AlmaLinux (`org.almalinux.alsa-<N>.xml.bz2`, în `cve.oval.path`), nu după versiune. Sonda listează, de asemenea, pachetele binare instalate (`rpm -qa`, cu fluxul de module AppStream al fiecărui pachet) și citește `uname -r`/`-m`/`-v` în aceeași interogare SSH — stocate ca `packages` și `modules` ale observației, respectiv `extra.kernelRelease`, `extra.arch`, `extra.kernelVersion`. Dintre mai multe kerneluri instalate, se compară cel care rulează. Sunt raportate doar CVE-urile care au o corecție mai nouă decât ce este instalat, câte o constatare per pachet, cu link către ALSA-ul său. Consultați [Corelare CVE](/ro/cve/#cve-uri-la-nivel-de-pachet-pentru-distribuțiile-linux).

## Rezolvatorul ciclului de viață

`endoflife:almalinux`.
