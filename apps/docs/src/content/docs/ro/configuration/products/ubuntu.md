---
title: Ubuntu
description: Configurarea enodia pentru a sonda Ubuntu prin SSH.
---

Folosește același mecanism SSH, aceleași credențiale și aceeași verificare
a cheii de gazdă ca familia [Identificarea sistemului de operare prin SSH](/ro/configuration/products/ssh-os-probes/),
dar — începând cu 1.1.1 — nu mai face parte din mecanismul comun
`osReleaseFamilyProbe` descris pe acea pagină; vedeți mai jos.

```yaml
targets:
  - id: ubuntu-host
    product: ubuntu
    address: host.example.com
    credentials: linux-host-ssh
```

## Sondă proprie, nu cea comună os-release, începând cu 1.1.1

`VERSION_ID` din `/etc/os-release` al Ubuntu nu se schimbă, în mod
deliberat, după lansarea unei versiuni — confirmat live (de la `14.04` la
`24.10`): o gazdă `22.04` complet actualizată, după mai multe versiuni de
întreținere și noi medii de instalare, raportează în continuare
`VERSION_ID="22.04"`, nu `22.04.5`. Versiunea de întreținere există doar
în câmpul `VERSION` al aceluiași fișier (`VERSION="22.04.5 LTS
(Jammy Jellyfish)"`) și doar pentru o versiune LTS care a avut mai multe
astfel de versiuni — câmpul `VERSION` al unei versiuni non-LTS nu conține
niciun segment suplimentar (confirmat live: `VERSION="24.10 (Oracular Oriole)"`, identic cu `VERSION_ID`). Această sondă preferă numărul din
`VERSION` în locul `VERSION_ID` ori de câte ori este strict mai precis și
are același prefix major.minor — fără un al doilea fișier de citit, spre
deosebire de corecția pentru
[Debian](/ro/configuration/products/debian/) a aceleiași probleme de
fond, deoarece precizia se află deja în același fișier, doar într-un alt
câmp. Toate celelalte produse din familia comună os-release au fost
verificate în același mod; niciunul dintre ele nu are această problemă.

Verificat live pe `ubuntu:24.04`: `ID=ubuntu`, `VERSION_ID="24.04"`.

## Câmpuri înregistrate

- `version` — versiunea de întreținere precisă atunci când `VERSION` o
  conține, de exemplu `22.04.5`; altfel, simplul `VERSION_ID`
- `extra.hostKeyVerified`

## Corelare CVE

Nu se corelează — CVE-urile unei distribuții de uz general sunt vulnerabilități ale pachetelor, iar numărul versiunii nu poate spune ce pachete au fost corectate între timp. Consultați [Corelare CVE](/ro/cve/#ce-produse-sunt-potrivite).

## Rezolvatorul ciclului de viață

`endoflife:ubuntu` — neschimbat.
