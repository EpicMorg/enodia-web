---
title: Prywatność
description: Z czym łączy się enodia i co przechowuje — bez telemetrii.
---

enodia to narzędzie wiersza poleceń uruchamiane na własnej maszynie. Nie
ma telemetrii, statystyk użycia, sprawdzania aktualizacji ani konta.
EpicMorg nie prowadzi żadnego serwera, z którym enodia by się łączyła,
i niczego od niej nie otrzymuje.

Ta strona odzwierciedla
[`PRIVACY.md`](https://github.com/EpicMorg/enodia/blob/master/PRIVACY.md)
samej enodia.

## Z czym łączy się enodia

- **Własne usługi** — cele wymienione w `enodia.yaml`, przez HTTPS, SSH
  lub ich natywne protokoły, ze skonfigurowanymi poświadczeniami, aby
  odczytać ich wersję (a w przypadku hostów z Linuksem — listę
  zainstalowanych pakietów).
- **endoflife.date** (`https://endoflife.date/api/...`) — aby pobrać
  publiczne daty wydań i końca cyklu życia. Żądanie zawiera nazwę
  produktu (na przykład `postgresql`); nie są wysyłane nazwy hostów,
  adresy, wersje ani żadne inne dane o flocie.
- **API GitHub** (`https://api.github.com/repos/.../releases`,
  `.../tags`) — dla produktów, których wydania są publikowane na GitHubie.
  Tak samo jak wyżej: w żądaniu jest tylko publiczna nazwa repozytorium.
  Jeśli ustawiono `GITHUB_TOKEN`, jest on wysyłany wyłącznie do GitHuba,
  aby podnieść limit zapytań.

To wszystko. Bazy CVE (NVD, BDU FSTEC, Debian, OVAL, Alpine, MariaDB) to
pliki pobierane samodzielnie; enodia jedynie odczytuje je z dysku —
zobacz [Korelacja CVE](/pl/cve/).

Raport HTML ładuje Bootstrap z CDN (jsDelivr / cdnjs) **w przeglądarce,
która go otwiera**, gdy ustawiono `html.assets: cdn`; ustawienie domyślne
(`inline`) nie wykonuje żadnych zewnętrznych żądań — zobacz
[Raporty](/pl/reporting/).

## Co przechowuje enodia

Wyłącznie na własnej maszynie i wyłącznie tam, gdzie się to wskaże:

- pliki inwentarza, raportów i historii zapisywane za pomocą `-o`;
- pamięć podręczną odpowiedzi endoflife.date/GitHub oraz sparsowanych
  baz CVE w katalogu pamięci podręcznej systemu operacyjnego
  (`~/.cache/enodia`, `%LocalAppData%\enodia`) — można ją bezpiecznie
  usunąć w dowolnym momencie.

Nic nie jest wysyłane nigdzie indziej i nic nie jest przechowywane przez
EpicMorg.

## Ta witryna

Witryny enodia.sh, get.enodia.sh i docs.enodia.sh — nie narzędzie
enodia — korzystają z analityki internetowej Yandex.Metrica do liczenia
odwiedzin.

## Kontakt

Pytania: należy otworzyć zgłoszenie (issue) na
[github.com/EpicMorg/enodia/issues](https://github.com/EpicMorg/enodia/issues).
