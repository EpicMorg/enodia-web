---
title: Identyfikacja systemów operacyjnych przez SSH
description: Jak działa rodzina sond enodia opartych na SSH/os-release/uname — wspólna dla 30 produktów OS.
---

30 produktów enodia — każda dystrybucja Linuksa, FreeBSD, OpenBSD,
NetBSD, macOS, Oracle Solaris, OPNsense oraz starszy CentOS — jest
identyfikowanych przez **SSH**, a nie HTTP. Ta strona raz opisuje wspólny
mechanizm; strona każdego systemu (dostępna z listy
[Obsługiwane produkty](/pl/products/)) podaje tylko jego konkretną wartość
`product:`, dokładne pole tożsamości, do którego jest dopasowywany, oraz
jego resolver cyklu życia.

## Jak to działa

Jedno połączenie SSH, jedno polecenie, jedno rozłączenie — to nie jest
klient zdalnego wykonywania ogólnego przeznaczenia, tylko tyle, ile trzeba,
by odczytać jeden fakt o tożsamości:

- **21 produktów** odczytuje `/etc/os-release` (ustandaryzowany przez
  systemd plik tożsamości, dostarczany przez każdą współczesną dystrybucję
  Linuksa, a także własny plik FreeBSD `/var/run/os-release`, generowany
  dynamicznie przy starcie w tym samym formacie `KEY=VALUE`) i sprawdza
  jego pole `ID` — to wspólny, generyczny mechanizm
  (`osReleaseFamilyProbe`).
- **2 kolejne** ([Debian](/pl/configuration/products/debian/),
  [Ubuntu](/pl/configuration/products/ubuntu/)) również odczytują
  `/etc/os-release`, ale przez własną, dedykowaną sondę zamiast
  opisanego wyżej generycznego mechanizmu — obie dystrybucje pozostawiają
  `VERSION_ID` nieprecyzyjnym (w Debianie nigdy nie zawiera ono wydania
  punktowego; w Ubuntu zostaje zamrożone przy pierwszym wydaniu i nigdy nie
  odzwierciedla późniejszego wydania punktowego), więc każda z nich szuka
  dalej prawdziwej wersji: Debian dodatkowo sprawdza `/etc/debian_version`,
  Ubuntu preferuje pole `VERSION` z tego samego pliku, gdy jest ono
  dokładniejsze. Dokładne powody opisano na ich własnych stronach.
- **2 produkty** (OpenBSD, NetBSD) w ogóle nie mają odpowiednika pliku
  os-release — źródłem tożsamości jest zamiast tego `uname -sr`
  (`"<kernel name> <release>"`, np. `"OpenBSD 7.9"`).
- **5 kolejnych** (Astra Linux, starszy CentOS, macOS, OPNsense, Oracle
  Solaris) odczytuje każdy własny, specyficzny dla produktu plik lub
  polecenie tożsamości — zobacz ich własne strony.

`product:` jest zawsze deklarowany jawnie i weryfikowany względem
rzeczywistego pola tożsamości, nigdy nie jest zgadywany z odpowiedzi (ta
sama zasada, której [sondy Atlassian](/pl/configuration/products/jira/)
używają dla `<typeId>` swojego manifestu) — wskazanie hosta z Debianem jako
`product: ubuntu` to realny błąd konfiguracji, który kończy się wyraźnym
błędem, zamiast zostać zapisanym jako nieprawdziwy fakt.

## Konfiguracja

```yaml
targets:
  - id: web-01
    product: debian          # lub dowolny inny produkt OS — zobacz jego stronę
    address: web-01.example.com
    credentials: linux-host-ssh
    tls:
      pin_sha256:
        - "AB:CD:...:EF"      # sha256 klucza SSH hosta
```

```yaml
credentials:
  linux-host-ssh:
    kind: ssh-key
    username: enodia-ro
    private_key_file: /etc/enodia/ssh/id_ed25519
```

Gdy `address` nie zawiera portu, domyślnie używany jest `22` — bez
schematu, tak samo jak w MySQL/Redis (samo `host:port`, a nie URL).

## Uwierzytelnianie — wymagane

Każda sonda z tej rodziny ma `Required: true` — w przeciwieństwie do
większości produktów opartych na HTTP nie ma anonimowej drogi do
tożsamości systemu. Działają dwa rodzaje poświadczeń, dokładnie jak
w każdym kliencie SSH:

- `kind: password` — `username` + `password`
- `kind: ssh-key` — `username` + `private_key_file` (+ `passphrase`, jeśli
  klucz jest zaszyfrowany)

Pełny opis pól znajduje się w
[Konfiguracja → Poświadczenia](/pl/configuration/#poświadczenia).

## Weryfikacja klucza hosta

Wykorzystuje ten sam blok `tls:`, którego sondy HTTPS używają do
przypinania certyfikatów — `tls.pin_sha256` przechowuje szesnastkowy
SHA-256 kodowania przewodowego (wire encoding) samego klucza hosta SSH
(a nie certyfikatu TLS), a `tls.insecure: true` to ta sama rezygnacja
w ostateczności, z takim samym ostrzeżeniem. **Jeśli żadne z nich nie jest
ustawione, połączenie zostaje odrzucone, zanim zostanie wysłane choćby
jedno poświadczenie.** Pełne wyjaśnienie znajduje się w
[Konfiguracja → Weryfikacja klucza hosta SSH](/pl/configuration/#weryfikacja-klucza-hosta-ssh).

## Rejestrowane pola

Każda sonda z tej rodziny zapisuje:

- `version` — z `VERSION_ID` (rodzina os-release) lub z wydania jądra
  (rodzina uname); Debian i Ubuntu szukają dalej precyzyjnego wydania
  punktowego, którego samo `VERSION_ID` nie zawiera — zobacz ich własne
  strony
- `extra.hostKeyVerified` — `"true"`/`"false"`, czy `tls.pin_sha256`
  faktycznie się zgodził (widoczne tak samo jak `TLSVerified` dla celów
  HTTPS — audyt całej floty pod kątem tego, które cele SSH mają
  przypięty klucz)

## Cel bez pasującego pliku lub polecenia kończy się wyraźnym błędem

Zarówno `cat /etc/os-release` na hoście, który takiego pliku nie ma, jak
i `uname -sr` zwracające niewłaściwą nazwę jądra dają jasny błąd „to nie
ten produkt” zamiast ogólnego błędu połączenia — sama sesja SSH się
powiodła, nie powiodło się sprawdzenie tożsamości.
