---
title: Securitate
description: Cum gestionează enodia credențialele pe care le deține pentru infrastructura dumneavoastră.
---

enodia deține credențiale pentru infrastructura dumneavoastră. Câteva
consecințe sunt deliberate, nu întâmplătoare:

- **Credențialele nu apar niciodată** în inventar, în rapoartele
  exportate sau în jurnale.
- **HTTPS este încercat înaintea HTTP.** Credențialele nu sunt trimise
  niciodată prin HTTP simplu decât dacă optați explicit pentru aceasta,
  pentru fiecare serviciu, cu `allow_insecure_transport: true` —
  consultați
  [Concepte](/ro/concepts/#https-mai-întâi-credențialele-nu-sunt-niciodată-trimise-în-clar-în-mod-implicit).
- **Verificarea TLS este activată în mod implicit.** Un CA personalizat
  (`tls.ca_file`) și fixarea certificatului (`tls.pin_sha256`) sunt
  acceptate, astfel încât `tls.insecure: true` să rămână cu adevărat o
  ultimă soluție — consultați
  [Configurare](/ro/configuration/#tls-tls). Serviciile verificate fără
  validare sunt semnalate în raport, nu acceptate tacit.
- **Secretele sunt păstrate separat.** O intrare `credentials:` cu nume
  sau un fișier `credentials.yaml` separat, referit prin
  `credentials_file` — consultați
  [Configurare](/ro/configuration/#credentials_file) — astfel încât
  inventarul serviciilor dumneavoastră (`enodia.yaml`) să poată fi
  inclus în git, în timp ce secretele nu.

Ați găsit o problemă de securitate? Consultați
[SECURITY.md](https://github.com/EpicMorg/enodia/blob/master/SECURITY.md)
al enodia pe GitHub pentru a afla cum să o raportați în mod responsabil.

## Licență

enodia este licențiat sub **AGPL-3.0-or-later**. Dacă AGPL nu se
potrivește situației dumneavoastră, este disponibilă o licență
comercială — contactați
[developer@epicm.org](mailto:developer@epicm.org).

Contribuția necesită semnarea CLA-ului enodia (bot-ul se ocupă de acest
lucru la primul dumneavoastră pull request) — acesta există pentru ca
proiectul să poată fi oferit în condiții comerciale alături de AGPL, iar
dumneavoastră păstrați drepturile de autor asupra propriei munci.
