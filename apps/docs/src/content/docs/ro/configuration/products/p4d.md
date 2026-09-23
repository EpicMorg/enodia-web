---
title: Perforce Helix Core Server (p4d)
description: Configurarea enodia pentru a sonda Perforce Helix Core Server (p4d).
---

Rulează `p4 -Ztag -p <address> info` — **singura sondă din acest proiect
care apelează un binar extern** în loc să comunice direct printr-un
protocol de rețea sau prin HTTP. Consultați [motivul](#de-ce-un-cli-în-locul-unui-client-pentru-protocolul-de-rețea)
mai jos.

```yaml
targets:
  - id: p4d-main
    product: p4d
    address: p4d.example.com:1666
```

## Necesită CLI-ul `p4` pe mașina care rulează enodia

Nu este o cerință de credențiale sau de rețea — un binar propriu-zis
trebuie să fie instalat alături de enodia (clientul în linie de comandă
propriu al Perforce, descărcabil gratuit). Un binar lipsă eșuează clar,
în loc să fie confundat cu o problemă de rețea. Suprascrieți calea cu
`options.binary` dacă `p4` nu se află în `$PATH` (funcționează identic
pe Windows, cu calea către `p4.exe`):

```yaml
targets:
  - id: p4d-main
    product: p4d
    address: p4d.example.com:1666
    options:
      binary: /opt/perforce/bin/p4
```

## De ce un CLI în locul unui client pentru protocolul de rețea

Protocolul RPC propriu al Perforce a fost analizat complet prin inginerie
inversă, live (captură de pachete plus binarul real `p4` pe un proxy
real de producție), iar un client construit manual a reprodus corect
întregul handshake — confirmat octet cu octet față de captură. Însă
exact acest handshake, verificat ca fiind corect, este ignorat în tăcere
de serverele `p4d` reale accesate direct (atât TLS obligatoriu, cât și
limitarea ratei au fost excluse live: nicio eroare, niciun reset, pur și
simplu niciun răspuns), în timp ce binarul real `p4` se conectează la
aceleași adrese fără nicio problemă. În loc să livreze o sondă care
funcționează doar cu proxy-uri, atât această sondă, cât și
[Perforce Proxy](/ro/configuration/products/p4p/) apelează în schimb
CLI-ul `p4` al operatorului.

## Timp limită

`timeout` (per țintă, cu revenire la `defaults.timeout`) se aplică
subprocesului `p4` în același mod în care se aplică transportului propriu
al oricărei alte sonde. Acest lucru contează concret aici: un proces `p4` blocat
în încercarea de a contacta un server direct inaccesibil rămâne agățat,
fără răspuns și fără reset la nivel TCP — exact comportamentul descris
mai sus — așa că, fără un timp limită, ar bloca o întreagă rulare de
colectare în loc să marcheze ca eșuată doar acea țintă. (Corectat în
1.2.1 — o versiune anterioară nu transmitea deloc un timp limită
subprocesului.)

## Autentificare

Niciuna — confirmat live că `info` răspunde complet neautentificat pe
servere reale de producție.

## Verificarea identității producătorului

Un răspuns care conține un câmp `proxyVersion` înseamnă că adresa este de
fapt un [Perforce Proxy](/ro/configuration/products/p4p/), nu un server
direct — această sondă îl respinge, în loc să raporteze versiunea
produsului greșit, la fel cum `p4p` respinge, invers, răspunsul unui
server direct.

## Nu este același produs ca Perforce Helix Swarm

[`perforce-swarm`](/ro/configuration/products/perforce-swarm/) este
interfața web a Perforce pentru code review, sondată prin HTTP — un
produs diferit de serverul `p4d` însuși, pe care îl acoperă această
pagină.

## Câmpuri înregistrate

- `version` — de exemplu `2024.2`, extras din forma
  `P4D/LINUX26X86_64/2024.2/2726408 (2025/02/27)` a `serverVersion`
- `extra.raw` — șirul `serverVersion` complet, neprelucrat
- `extra.serverID`, `extra.serverServices`, atunci când sunt prezente

## Corelare CVE

Se corelează cu NVD și BDU FSTEC atunci când este configurat un [bloc `cve:`](/ro/cve/).

## Rezolvatorul ciclului de viață

Niciunul — Perforce este proprietar, fără o pagină endoflife.date pentru
vreunul dintre slug-urile încercate (404 confirmat) și fără release-uri
GitHub publice la care să se poată reveni. Doar pentru inventar, la fel ca
[Gentoo](/ro/configuration/products/gentoo/)/
[Kali Linux](/ro/configuration/products/kali-linux/).
