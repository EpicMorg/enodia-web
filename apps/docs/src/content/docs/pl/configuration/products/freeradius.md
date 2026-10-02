---
title: FreeRADIUS
description: Konfiguracja enodia do sondowania serwera FreeRADIUS przez SSH.
---

Sonda SSH: loguje się i uruchamia własne `-v` serwera. Gdy port
zostanie pominięty, domyślnie używany jest `22`, bez schematu — ten sam
mechanizm SSH, poświadczenia i weryfikacja klucza hosta co w rodzinie
[identyfikacji systemów operacyjnych przez SSH](/pl/configuration/products/ssh-os-probes/).

```yaml
targets:
  - id: radius-01
    product: freeradius
    address: radius-01.example.com
    credentials: linux-host-ssh
```

## Dlaczego SSH

RADIUS nie ma wymiany wersji, podobnie jak odpowiedź Status-Server
FreeRADIUS — jego słowniki definiują liczniki statystyk, ale żadnego
atrybutu wersji. Wersja może więc pochodzić tylko z samej binarki
serwera. Sonda próbuje `freeradius` (Debian/Ubuntu) i `radiusd` (rodzina
RHEL, kompilacje ze źródeł), najpierw po nazwie, a potem po ścieżce
w `/usr/sbin`, ponieważ `PATH` sesji SSH bez logowania często nie
zawiera `/usr/sbin`.

## Uwierzytelnianie — wymagane

Poświadczenie SSH, `ssh-key` lub `password` — zobacz
[Konfiguracja → Poświadczenia](/pl/configuration/#poświadczenia).

## FreeRADIUS w kontenerze

Gdy FreeRADIUS działa w Dockerze lub Podmanie, a sam host nie ma
binarki, należy podać nazwę kontenera w `options` — polecenie jest wtedy
uruchamiane przez `docker exec` (lub `podman exec`):

```yaml
targets:
  - id: radius-01
    product: freeradius
    address: radius-01.example.com
    credentials: linux-host-ssh
    options:
      container: freeradius          # nazwa kontenera
      container_runtime: podman      # opcjonalne: docker (domyślnie) lub podman
```

Użytkownik SSH musi mieć uprawnienia do korzystania z tego środowiska
uruchomieniowego. Nazwa kontenera jest sprawdzana względem własnego
wzorca nazw Dockera, zanim trafi do zdalnego polecenia.

## Rejestrowane pola

- `version` — np. `3.2.10`, z `FreeRADIUS Version 3.2.10 (git #9071ea041)`
- `extra.git` — hash git kompilacji, jeśli występuje
- `extra.container` — nazwa kontenera, gdy ustawiono `options.container`
- `extra.hostKeyVerified`

## Korelacja CVE

Dopasowywany do NVD i BDU FSTEC, gdy skonfigurowano [blok `cve:`](/pl/cve/).
Oba źródła są stosowane w opublikowanej postaci: zakres NVD dla
BlastRADIUS (CVE-2024-3596) obejmuje tylko wersje sprzed 3.0.27, bez
niczego dla gałęzi 3.2 (naprawionej w 3.2.5), więc host 3.2.3 nie
otrzymuje dla niego znaleziska.

## Resolver cyklu życia

`github-tag-branches:FreeRADIUS/freeradius-server`. endoflife.date nie ma
strony FreeRADIUS (potwierdzone 404), a FreeRADIUS utrzymuje równolegle
3.0.x i 3.2.x, oznaczając wydania tagami w rodzaju `release_3_2_10`. Ten
typ resolvera odczytuje tagi jako **jeden cykl życia na każdą gałąź
major.minor**, każdy z własnym najnowszym tagiem, więc w pełni załatane
3.0.28 jest odczytywane jako `current` w swojej gałęzi z dostępną nowszą
gałęzią — a nie jako „w tyle za 3.2.10”. Odczytywana jest tylko
maksymalna strona GitHuba licząca 100 tagów; podobnie jak inne resolvery
GitHuba nie zawiera dat EOL, a `GITHUB_TOKEN` podnosi jego limit żądań
(zobacz [Obsługiwane produkty](/pl/products/)).
