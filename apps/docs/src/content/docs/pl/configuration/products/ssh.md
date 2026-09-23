---
title: SSH
description: Konfiguracja enodia do sondowania banera serwera SSH.
---

Surowa sonda TCP, a nie HTTP — `address` to `host` lub `host:port`, bez
schematu. Gdy port zostanie pominięty, domyślnie używany jest `22`.
Odczytuje ciąg identyfikacyjny, który każdy serwer SSH wysyła
bez pytania w chwili połączenia klienta (RFC 4253 §4.2) — bez
uwierzytelniania, bez wymiany kluczy, samo połączenie TCP.

Nie jest związana z jednym dostawcą: OpenSSH, Dropbear i wszystko inne,
co mówi protokołem transportowym SSH, identyfikuje się w ten sam sposób,
dlatego produktem jest ogólny `ssh`, a nie osobna sonda dla każdej
implementacji.

```yaml
targets:
  - id: bastion-main
    product: ssh
    address: bastion.example.com:22
```

## Uwierzytelnianie

Brak — baner jest wysyłany, zanim w ogóle pojawi się jakikolwiek krok
uwierzytelniania.

## Co oznacza tutaj „wersja”

`version` to ciąg oprogramowania dokładnie w takiej postaci, w jakiej
został zgłoszony, np. `OpenSSH_10.3` lub `OpenSSH_9.6p1` — a nie
znormalizowany numer, ponieważ `ssh` obejmuje wiele niepowiązanych
implementacji. Końcowy komentarz dystrybucji (np. sufiks Ubuntu
`Ubuntu-3ubuntu13.18`) jest odrzucany, a nie traktowany jako część wersji.

## Rejestrowane pola

- `version` — ciąg oprogramowania
- `extra.protocol` — wersja protokołu SSH, np. `2.0`

## Korelacja CVE

Dopasowywany do NVD i BDU FSTEC, gdy skonfigurowano [blok `cve:`](/pl/cve/). Dopasowanie według banera: `OpenSSH_…` jako OpenSSH, `dropbear_…` jako Dropbear; każda inna implementacja SSH nie jest wyszukiwana, zamiast otrzymać CVE OpenSSH.

## Resolver cyklu życia

Brak — `ssh` to nie jeden produkt z jednym kalendarzem cyklu życia;
OpenSSH i Dropbear mają każdy własny, a `Meta` sondy jest statyczne
niezależnie od tego, co faktycznie działa na danym celu. Wyłącznie do
inwentarza.
