---
title: pfSense
description: Configurarea enodia pentru a sonda pfSense Community Edition prin SSH.
---

Folosește același mecanism SSH, aceleași credențiale și aceeași verificare
a cheii de gazdă ca familia [Identificarea sistemului de operare prin SSH](/ro/configuration/products/ssh-os-probes/),
dar citește fișierele proprii ale pfSense, `/etc/version` și
`/etc/platform`, într-o singură interogare.

```yaml
targets:
  - id: pfsense-fw
    product: pfsense
    address: fw.example.com
    credentials: linux-host-ssh
```

## Autentificare — obligatorie

O credențială SSH, `ssh-key` sau `password` — consultați
[Configurare → Credențiale](/ro/configuration/#credențiale).

## Doar Community Edition

Confirmat live pe trei gazde reale pfSense CE (`2.7.2-RELEASE`,
`2.8.1-RELEASE`): `/etc/version` conține exact versiunea afișată de
propriul dashboard al pfSense, iar `/etc/platform` conține `pfSense`.

**pfSense Plus**, varianta comercială a Netgate, este un produs diferit,
cu propria schemă de versionare bazată pe calendar (`24.11`, nu
`2.x.y-RELEASE`). Conform documentației sale, raportează `pfSense-Plus`
în `/etc/platform`; această sondă respinge această valoare în loc să
înregistreze o gazdă Plus ca un fapt CE. Nu a fost disponibilă nicio
gazdă Plus pentru a confirma acest lucru live — se bazează doar pe
documentație.

## Câmpuri înregistrate

- `version` — `/etc/version` ca atare, de exemplu `2.8.1-RELEASE`
- `extra.hostKeyVerified`

## Corelare CVE

Încă nu se corelează — pfSense este nou în 2.1, iar în amonte maparea
sa CVE a fost lăsată pentru o etapă ulterioară, dedicată. Consultați
[Corelare CVE](/ro/cve/#ce-produse-sunt-potrivite).

## Rezolvatorul ciclului de viață

Niciunul — endoflife.date nu are nicio pagină sub `pfsense`, `pfsense-ce`
sau `pfsense-plus` (404 confirmat). Doar pentru inventar, deocamdată.
