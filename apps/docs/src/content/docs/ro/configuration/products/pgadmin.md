---
title: pgAdmin
description: Configurarea enodia pentru a sonda pgAdmin.
---

Decodează versiunea din șirul de interogare `?ver=NNNNN` pentru
invalidarea cache-ului, pe care pgAdmin îl adaugă fiecărei resurse
statice de pe propria pagină de autentificare — anonim prin design,
deoarece pagina trebuie să se afișeze înainte de a exista vreo sesiune.

```yaml
targets:
  - id: pgadmin-main
    product: pgadmin
    address: https://pgadmin.example.com
```

## Autentificare

Niciuna — endpointul nu acceptă nicio formă de credențiale.

## Cum este decodată versiunea

Confirmat pe un container real `dpage/pgadmin4` și în codul sursă al
pgAdmin (`version.py`): `NNNNN` este `APP_VERSION_INT`, documentat acolo
ca `[X]XYYZZ` — release, revision, apoi un cod de sufix — de exemplu
`91700` pentru release 9, revision 17, sufix `00` (GA). Doar scheletul
release.revision este reconstruit în `version`; un cod de sufix nenul (un
build beta/dev) nu are o corespondență textuală documentată care să
poată fi reconstruită doar din cod, așa că este expus ca
`extra.suffixCode`, în loc să fie ghicit.

## Câmpuri înregistrate

- `version` — de exemplu `9.17`
- `extra.suffixCode`, doar atunci când este nenul

## Corelare CVE

Se corelează cu NVD și BDU FSTEC atunci când este configurat un [bloc `cve:`](/ro/cve/).

## Rezolvatorul ciclului de viață

`github-tags:pgadmin-org/pgadmin4`. endoflife.date nu are un calendar
pentru pgAdmin (404 confirmat), iar `pgadmin-org/pgadmin4` nu are deloc
GitHub Releases (confirmat live: endpointul releases returnează o listă
goală) — doar tag-uri, de forma `REL-9_17`, nu o versiune cu puncte.
Tipul de rezolvator `github-tags` există tocmai pentru acest caz:
convertește această formă în `9.17` și alege tag-ul cu *cea mai mare
valoare parsată* din pagina obținută, în loc să se bazeze pe ordinea din
listă, deoarece endpointul de tag-uri nu documentează nicio garanție de
ordonare, așa cum o face ordinea cronologică inversă a Releases. La fel
ca rezolvatorul simplu `github:`, cunoaște întotdeauna doar „cea mai
recentă versiune” — fără date eol/support/lts, deoarece endpointul de
tag-uri nu conține astfel de date. Consultați
[Produse acceptate](/ro/products/#aplicații-și-servicii-de-infrastructură)
pentru variabila de mediu `GITHUB_TOKEN`, care mărește limita de rată a
acestui rezolvator.
