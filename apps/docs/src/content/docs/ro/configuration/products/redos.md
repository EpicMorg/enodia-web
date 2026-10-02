---
title: RED OS
description: Configurarea enodia pentru a sonda RED OS prin SSH.
---

Face parte din familia [Identificarea sistemului de operare prin SSH](/ro/configuration/products/ssh-os-probes/)
— consultați pagina respectivă pentru mecanismul comun, credențiale și
verificarea cheii de gazdă. Verifică câmpul `ID` din `/etc/os-release`.

```yaml
targets:
  - id: redos-host
    product: redos
    address: host.example.com
    credentials: linux-host-ssh
```

Verificat live pe `alrdockerhub/redos:7.3.1` (conținut RED OS real —
`HOME_URL`/`BUG_REPORT_URL` indică red-soft.ru): `ID="redos"`,
`VERSION_ID="7.3.1"`.

## Corelare CVE

Se corelează **per pachet instalat** cu OVAL-ul propriu al RED OS pentru 7.3 sau 8.0 (`redos.xml` din `redos.red-soft.ru/support/secure/<7.3|8.0>/`, în `cve.oval.path`) — datele RHEL nu se aplică, deoarece versiunile pachetelor RED OS sunt proprii (`.el7` pe 7.3, `.red80` pe 8.0). Versiunea se potrivește după major.minor. Sonda listează, de asemenea, pachetele binare instalate (`rpm -qa`, cu fluxul de module AppStream al fiecărui pachet) și citește `uname -r`/`-m`/`-v` în aceeași interogare SSH — stocate ca `packages` și `modules` ale observației, respectiv `extra.kernelRelease`, `extra.arch`, `extra.kernelVersion`. Dintre mai multe kerneluri instalate, se compară cel care rulează. Constatările au link către buletinele `ROS-…` ale RED OS și poartă severitatea proprie a producătorului. Consultați [Corelare CVE](/ro/cve/#cve-uri-la-nivel-de-pachet-pentru-distribuțiile-linux).

## Rezolvatorul ciclului de viață

Niciunul — endoflife.date nu are astăzi un calendar pentru RED OS. Doar
pentru inventar.
