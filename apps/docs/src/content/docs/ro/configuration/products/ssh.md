---
title: SSH
description: Configurarea enodia pentru a sonda bannerul unui server SSH.
---

O sondă TCP nativă, nu HTTP — `address` este `host` sau `host:port`, fără
schemă. Portul implicit este `22` atunci când este omis. Citește șirul de
identificare pe care fiecare server SSH îl trimite din proprie inițiativă
în momentul în care un client se conectează (RFC 4253 §4.2) — fără
autentificare, fără schimb de chei, doar conexiunea TCP.

Nu este legată de un anumit producător: OpenSSH, Dropbear și orice altă
implementare a protocolului de transport SSH se identifică în același
mod, motiv pentru care produsul este genericul `ssh`, nu câte o sondă
pentru fiecare implementare.

```yaml
targets:
  - id: bastion-main
    product: ssh
    address: bastion.example.com:22
```

## Autentificare

Niciuna — bannerul este trimis înainte de a exista vreun pas de
autentificare.

## Ce înseamnă „versiune” aici

`version` este șirul software exact așa cum este raportat, de exemplu
`OpenSSH_10.3` sau `OpenSSH_9.6p1` — nu un număr normalizat, deoarece
`ssh` acoperă mai multe implementări fără legătură între ele. Orice
comentariu final al distribuției (de exemplu sufixul
`Ubuntu-3ubuntu13.18` al Ubuntu) este eliminat, nu tratat ca parte a
versiunii.

## Câmpuri înregistrate

- `version` — șirul software
- `extra.protocol` — versiunea protocolului SSH, de exemplu `2.0`

## Corelare CVE

Se corelează cu NVD și BDU FSTEC atunci când este configurat un [bloc `cve:`](/ro/cve/). Corelarea se face după banner: `OpenSSH_…` ca OpenSSH, `dropbear_…` ca Dropbear; orice altă implementare SSH nu este căutată deloc, în loc să primească CVE-urile OpenSSH.

## Rezolvatorul ciclului de viață

Niciunul — `ssh` nu este un singur produs cu un singur calendar al
ciclului de viață; OpenSSH și Dropbear au fiecare propriul calendar, iar
`Meta` al unei sonde este static, indiferent de ce se dovedește că
rulează o anumită țintă. Doar pentru inventar.
