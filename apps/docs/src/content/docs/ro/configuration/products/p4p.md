---
title: Perforce Proxy (p4p)
description: Configurarea enodia pentru a sonda Perforce Proxy (p4p).
---

Rulează `p4 -Ztag -p <address> info` — aceeași comandă și același
mecanism cu CLI extern pe care îl folosește
[`p4d`](/ro/configuration/products/p4d/); consultați pagina respectivă
pentru motivul pentru care se apelează binarul `p4` al operatorului în
loc să se comunice direct prin protocolul de rețea al Perforce.

```yaml
targets:
  - id: p4p-main
    product: p4p
    address: p4p.example.com:1666
```

## Necesită CLI-ul `p4` pe mașina care rulează enodia

La fel ca la [`p4d`](/ro/configuration/products/p4d/#necesită-cli-ul-p4-pe-mașina-care-rulează-enodia)
— suprascrieți calea binarului cu `options.binary` dacă `p4` nu se află
în `$PATH`:

```yaml
targets:
  - id: p4p-main
    product: p4p
    address: p4p.example.com:1666
    options:
      binary: /opt/perforce/bin/p4
```

## Timp limită

`timeout` (per țintă, cu revenire la `defaults.timeout`) se aplică
subprocesului `p4` în același mod în care se aplică transportului propriu
al oricărei alte sonde — consultați
[nota de pe pagina `p4d`](/ro/configuration/products/p4d/#timp-limită)
pentru motivul pentru care acest lucru contează concret în cazul
Perforce. Corectat în 1.2.1.

## Autentificare

Niciuna — confirmat live că `info` răspunde complet neautentificat pe un
proxy real de producție.

## Verificarea identității producătorului

Un proxy răspunde la `info` cu tot ce răspunde un server direct, **plus
propriul câmp `proxyVersion`** — `serverVersion`/`ServerID`/
`serverServices` ale serverului backend trec toate neschimbate și descriu
serverul din spatele proxy-ului, nu proxy-ul însuși. Această sondă cere
ca `proxyVersion` să fie prezent și respinge răspunsul unui server direct
(care nu are un astfel de câmp), în loc să raporteze versiunea produsului
greșit — aceeași verificare pe care
[`p4d`](/ro/configuration/products/p4d/) o efectuează în sens invers.

## Câmpuri înregistrate

- `version` — de exemplu `2024.2`, extras din forma
  `P4P/LINUX26X86_64/2024.2/2832881 (2025/09/30)` a `proxyVersion`
- `extra.raw` — șirul `proxyVersion` complet, neprelucrat
- `extra.backendServerVersion`, `extra.backendServerID` — versiunea/ID-ul
  propriu al `p4d` din backend, transmise din același răspuns, atunci
  când sunt prezente

## Corelare CVE

Nu se corelează — niciuna dintre baze de date nu are date utilizabile pentru acest produs. Consultați [Corelare CVE](/ro/cve/#ce-produse-sunt-potrivite).

## Rezolvatorul ciclului de viață

Niciunul — Perforce este proprietar, fără o pagină endoflife.date pentru
vreunul dintre slug-urile încercate (404 confirmat) și fără release-uri
GitHub publice la care să se poată reveni. Doar pentru inventar, la fel ca
[`p4d`](/ro/configuration/products/p4d/).
