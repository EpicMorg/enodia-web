---
title: Widoki
description: compact, lifecycle, drift i fleet - cztery przekroje tych samych danych.
---

`check` i `export` renderują jeden z czterech widoków, wybierany flagą
`--view` (albo przez `render.default_view` w `settings.yaml`, gdy flaga
nie jest podana). Każdy widok to inny przekrój tych samych danych
inwentarza i ocen, a nie inne źródło danych.

## `compact` (domyślny)

Jeden wiersz na cel: trzy osie, ogólna ważność i przyczyna, jeśli coś
wymaga uwagi.

```console
$ enodia check
ID           PRODUCT  PATCH   LIFECYCLE  BRANCH     SEVERITY  REASON  CVES
jira-main    jira     behind  active     newer_lts  warn      -       12
gitlab-main  gitlab   behind  eol        newer      fail      -       -
```

Ostatnia kolumna, `CVES`, to liczba różnych CVE dotyczących dokładnie
tej wersji — `-`, gdy nie ma żadnych, w tym gdy nie skonfigurowano
[bloku `cve:`](/pl/cve/) lub produkt nie został dopasowany. `drift` ma
tę samą kolumnę; `lifecycle` i `fleet` jej nie mają. CVE nigdy nie
zmieniają `SEVERITY` ani kodu wyjścia.

## `lifecycle`

Kiedy faktycznie kończy się cykl życia każdego celu:

```console
$ enodia check --from inventory.jsonl --view lifecycle
ID           PRODUCT  LIFECYCLE  EOL         SUPPORT-ENDS  DAYS-TO-EOL
jira-main    jira     active     2026-12-05  -             338
gitlab-main  gitlab   eol        2025-01-16  2024-11-21    -350
```

## `drift`

Zainstalowana wersja w porównaniu z najnowszym wydaniem w tym samym
cyklu:

```console
$ enodia check --from inventory.jsonl --view drift
ID           PRODUCT  CURRENT  LATEST   CYCLE  PATCH   CVES
jira-main    jira     10.3.1   10.3.25  10.3   behind  12
gitlab-main  gitlab   17.5.0   17.5.5   17.5   behind  -
```

## `fleet`

Rozrzut wersji i osiągalność wszystkich instancji danego produktu,
pogrupowane zamiast wymienione po jednym wierszu na cel. To widok
**wyłącznie offline** — nie potrzebuje niczego poza samym inwentarzem:
żadnego resolvera cyklu życia, żadnego dostępu do internetu. Dwie
nieudane instancje tego samego produktu z różnymi rodzajami błędów
(uwierzytelnianie vs. brak osiągalności) dostają osobne wiersze, a nie
wspólny koszyk `(unknown)`:

```console
$ enodia check --from inventory.jsonl --view fleet
PRODUCT  VERSION    STATUS       COUNT  INSTANCES
gitlab   (unknown)  auth         1      gitlab-2
gitlab   18.2.1     ok           1      gitlab-1
jira     (unknown)  unreachable  1      jira-staging
jira     10.3.1     ok           1      jira-3
jira     10.3.2     ok           2      jira-1, jira-2
```

## Co ignoruje `--view`

`export --format json` i `export --format prometheus` całkowicie
ignorują `--view` — zawsze zawierają każdą obserwację i ocenę. Widoki
kształtują jedynie wynik w postaci tabeli oraz raport HTML (`export
--format html`) — zobacz [Raporty](/pl/reporting/).
