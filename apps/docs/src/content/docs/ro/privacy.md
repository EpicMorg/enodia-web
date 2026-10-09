---
title: Confidențialitate
description: La ce se conectează enodia și ce stochează — fără telemetrie.
---

enodia este un instrument de linie de comandă pe care îl rulați pe
propria mașină. Nu are telemetrie, statistici de utilizare, verificare a
actualizărilor sau cont. EpicMorg nu operează niciun server cu care
enodia să comunice și nu primește nimic de la acesta.

Această pagină reflectă
[`PRIVACY.md`](https://github.com/EpicMorg/enodia/blob/master/PRIVACY.md)
al enodia.

## La ce se conectează enodia

- **Propriile dumneavoastră servicii** — țintele enumerate în
  `enodia.yaml`, prin HTTPS, SSH sau protocoalele lor native, cu
  credențialele pe care le configurați, pentru a le citi versiunea (și,
  pentru gazdele Linux, lista pachetelor instalate).
- **endoflife.date** (`https://endoflife.date/api/...`) — pentru a obține
  datele publice de lansare și de sfârșit al ciclului de viață. Cererea
  numește un produs (de exemplu `postgresql`); nu sunt trimise nume de
  gazde, adrese, versiuni sau alte date despre parcul dumneavoastră.
- **API-ul GitHub** (`https://api.github.com/repos/.../releases`,
  `.../tags`) — pentru produsele ale căror versiuni sunt publicate pe
  GitHub. La fel ca mai sus: în cerere se află doar numele public al
  depozitului. Dacă setați `GITHUB_TOKEN`, acesta este trimis doar către
  GitHub, pentru a ridica limita de rată.
- **Publicatorii bazelor de date CVE**, doar atunci când rulați
  `enodia cve update` și doar cei pe care îi numesc intrările
  dumneavoastră `cve.*.path`: nvd.nist.gov, bdu.fstec.ru,
  security-tracker.debian.org, publicatorii OVAL (Canonical, Red Hat,
  AlmaLinux, Oracle, Astra Linux, RED OS), secdb.alpinelinux.org,
  mariadb.com, api.atlassian.com, www.postgresql.org și nginx.org.
  Cererile sunt simple descărcări de fișiere publice; singurul lucru pe
  care îl spun despre parcul dumneavoastră este pentru ce versiuni de
  sistem de operare și ce versiuni majore PostgreSQL descărcați date.

Atât. Toate celelalte comenzi doar citesc fișierele CVE de pe disc —
consultați [Corelare CVE](/ro/cve/).

Raportul HTML încarcă Bootstrap de pe un CDN (jsDelivr / cdnjs) **în
browserul care îl deschide** atunci când este setat `html.assets: cdn`;
valoarea implicită (`inline`) nu face deloc cereri externe — consultați
[Rapoarte](/ro/reporting/).

## Ce stochează enodia

Doar pe mașina dumneavoastră și doar acolo unde îi indicați:

- fișierele de inventar, rapoartele și fișierele de istoric pe care le
  scrieți cu `-o`;
- un cache al răspunsurilor endoflife.date/GitHub și al bazelor de date
  CVE parsate, în directorul de cache al sistemului de operare
  (`~/.cache/enodia`, `%LocalAppData%\enodia`) — poate fi șters oricând
  fără probleme.

Nimic nu este trimis altundeva și nimic nu este păstrat de EpicMorg.

## Acest site web

Site-urile enodia.sh, get.enodia.sh și docs.enodia.sh — nu instrumentul
enodia — folosesc analiza web Yandex.Metrica pentru a număra vizitele.

## Contact

Întrebări: deschideți un issue la
[github.com/EpicMorg/enodia/issues](https://github.com/EpicMorg/enodia/issues).
