---
title: CentOS Linux (vechi)
description: Configurarea enodia pentru a sonda vechiul CentOS Linux, ajuns la EOL, prin SSH.
---

Folosește același mecanism SSH, aceleași credențiale și aceeași verificare
a cheii de gazdă ca familia [Identificarea sistemului de operare prin SSH](/ro/configuration/products/ssh-os-probes/),
dar citește un alt fișier: `/etc/redhat-release`, nu `/etc/os-release`.

```yaml
targets:
  - id: centos-host
    product: centos
    address: host.example.com
    credentials: linux-host-ssh
```

## De ce nu familia os-release

Acesta este vechiul CentOS Linux (5/6/7/8), deja ajuns la EOL — spre
deosebire de [CentOS Stream](/ro/configuration/products/centos-stream/),
succesorul său încă actual. S-a confirmat live că CentOS 5 și 6 sunt
anterioare convenției os-release din systemd (nu au deloc
`/etc/os-release`), în timp ce `/etc/redhat-release` există în întreaga
familie RHEL cu mult înainte de aceasta. Flotele reale încă rulează aceste
sisteme — faptul că CentOS a ajuns la EOL nu scoate din uz mașinile care
încă îl rulează, iar aceasta este exact situația pe care enodia există să
o scoată la iveală, nu să o ascundă.

Verificat live pe `centos:5` (`"CentOS release 5.11 (Final)"`),
`:6` (`"CentOS release 6.10 (Final)"`) și `:7` (`"CentOS Linux release
7.9.2009 (Core)"`). Fișierul `/etc/redhat-release` al unei gazde CentOS
Stream 9 (`"CentOS Stream release 9"`) **nu** se potrivește cu acest
model — potrivirea cere „CentOS release” sau „CentOS Linux release”
imediat după „CentOS ”, așa că o instanță Stream nu este niciodată
identificată greșit ca `centos` vechi, chiar dacă ambele fișiere există
pe ambele linii de produs.

## Câmpuri înregistrate

- `version` — numărul versiunii extras din `/etc/redhat-release`
- `extra.hostKeyVerified`

## Corelare CVE

Nu se corelează — CVE-urile unei distribuții de uz general sunt vulnerabilități ale pachetelor, iar numărul versiunii nu poate spune ce pachete au fost corectate între timp. Consultați [Corelare CVE](/ro/cve/#ce-produse-sunt-potrivite).

## Rezolvatorul ciclului de viață

`endoflife:centos`.
