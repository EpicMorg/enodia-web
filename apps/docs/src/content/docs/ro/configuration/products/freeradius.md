---
title: FreeRADIUS
description: Configurarea enodia pentru a sonda FreeRADIUS prin SSH.
---

O sondă SSH: se autentifică și rulează propriul `-v` al serverului.
Portul implicit este `22`, fără schemă — același mecanism SSH, aceleași
credențiale și aceeași verificare a cheii de gazdă ca familia
[Identificarea sistemului de operare prin SSH](/ro/configuration/products/ssh-os-probes/).

```yaml
targets:
  - id: radius-01
    product: freeradius
    address: radius-01.example.com
    credentials: linux-host-ssh
```

## De ce SSH

RADIUS nu are un schimb de versiune și nici răspunsul Status-Server al
FreeRADIUS nu are — dicționarele sale definesc contoare statistice,
niciun atribut de versiune. Așadar, versiunea poate proveni doar din
binarul serverului însuși. Sonda încearcă `freeradius` (Debian/Ubuntu)
și `radiusd` (familia RHEL, compilări din surse), mai întâi după nume și
apoi după calea lor din `/usr/sbin`, deoarece `PATH`-ul unei sesiuni SSH
fără login nu conține adesea `/usr/sbin`.

## Autentificare — obligatorie

O credențială SSH, `ssh-key` sau `password` — consultați
[Configurare → Credențiale](/ro/configuration/#credențiale).

## FreeRADIUS într-un container

Când FreeRADIUS rulează în Docker sau Podman și gazda însăși nu are
binarul, indicați numele containerului în `options` — comanda rulează
atunci prin `docker exec` (sau `podman exec`):

```yaml
targets:
  - id: radius-01
    product: freeradius
    address: radius-01.example.com
    credentials: linux-host-ssh
    options:
      container: freeradius          # numele containerului
      container_runtime: podman      # opțional: docker (implicit) sau podman
```

Utilizatorul SSH trebuie să aibă dreptul de a folosi acel runtime.
Numele containerului este verificat față de modelul de nume propriu al
Docker înainte de a fi inclus în comanda de la distanță.

## Câmpuri înregistrate

- `version` — de exemplu `3.2.10`, din `FreeRADIUS Version 3.2.10 (git #9071ea041)`
- `extra.git` — hash-ul git al build-ului, atunci când este prezent
- `extra.container` — numele containerului, atunci când este setat `options.container`
- `extra.hostKeyVerified`

## Corelare CVE

Se corelează cu NVD și BDU FSTEC atunci când este configurat un
[bloc `cve:`](/ro/cve/). Ambele sunt urmate așa cum sunt publicate:
intervalul NVD pentru BlastRADIUS (CVE-2024-3596) acoperă doar versiunile
anterioare 3.0.27, fără nimic pentru ramura 3.2 (corectată în 3.2.5),
așa că o gazdă 3.2.3 nu primește nicio constatare pentru el.

## Rezolvatorul ciclului de viață

`github-tag-branches:FreeRADIUS/freeradius-server`. endoflife.date nu
are nicio pagină pentru FreeRADIUS (404 confirmat), iar FreeRADIUS
întreține 3.0.x și 3.2.x în paralel, etichetând lansările sub forma
`release_3_2_10`. Acest tip de rezolvator citește tag-urile ca **un
ciclu de viață per ramură major.minor**, fiecare cu propriul tag cel mai
recent, așa că un 3.0.28 complet actualizat apare ca `current` în
ramura sa, cu o ramură mai nouă disponibilă — nu „în urma lui 3.2.10”.
Este citită doar pagina maximă GitHub de 100 de tag-uri; ca și celelalte
rezolvatoare GitHub, nu conține date EOL, iar `GITHUB_TOKEN` îi mărește
limita de rată (consultați [Produse acceptate](/ro/products/)).
