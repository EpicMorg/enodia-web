---
title: Oracle Solaris
description: Configurarea enodia pentru a sonda Oracle Solaris prin SSH.
---

Folosește același mecanism SSH, aceleași credențiale și aceeași verificare
a cheii de gazdă ca familia [Identificarea sistemului de operare prin SSH](/ro/configuration/products/ssh-os-probes/),
dar citește `/etc/release` în locul unui fișier os-release sau al
`uname -sr`.

```yaml
targets:
  - id: solaris-host
    product: oracle-solaris
    address: host.example.com
    credentials: linux-host-ssh
```

## De ce nu `uname -sr`

Spre deosebire de OpenBSD/NetBSD, `uname -sr` nu funcționează aici: pe
Solaris raportează întotdeauna doar versiunea kernelului SunOS
(`"SunOS 5.11"` pentru fiecare versiune Solaris 11.x — versionarea SunOS
este decuplată de versiunea produsului), așa că nu poate deosebi 11.3 de
11.4. Linia `"Oracle Solaris 11.4 X86"` din `/etc/release` conține
versiunea reală.

Nicio imagine descărcabilă nu poate fi obținută fără un cont Oracle/o
licență OTN, așa că verificarea s-a făcut prin `vmactions/solaris-vm`,
care construiește și republică Solaris 11.4 CBE (Common Build
Environment, destinat exact acestui tip de utilizare în CI), pe care
Oracle îl permite redistribuit gratuit.

## Câmpuri înregistrate

- `version` — extras din `/etc/release`
- `extra.hostKeyVerified`

## Corelare CVE

Nu se corelează — NVD înregistrează nivelurile de patch într-un câmp CPE pe care mecanismul de corelare nu îl citește, astfel încât o corelare doar după versiune ar semnala o gazdă complet actualizată cu toate CVE-urile remediate vreodată în acea versiune. Consultați [Corelare CVE](/ro/cve/#ce-produse-sunt-potrivite).

## Rezolvatorul ciclului de viață

`endoflife:oracle-solaris`.
