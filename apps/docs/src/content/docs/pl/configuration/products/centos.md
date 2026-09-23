---
title: CentOS Linux (starszy)
description: Konfiguracja enodia do sondowania starszego, wycofanego (EOL) systemu CentOS Linux przez SSH.
---

Używa tego samego mechanizmu SSH, poświadczeń i weryfikacji klucza hosta co
rodzina [identyfikacji systemów operacyjnych przez SSH](/pl/configuration/products/ssh-os-probes/),
ale odczytuje inny plik: `/etc/redhat-release`, a nie
`/etc/os-release`.

```yaml
targets:
  - id: centos-host
    product: centos
    address: host.example.com
    credentials: linux-host-ssh
```

## Dlaczego nie rodzina os-release

To starszy, już wycofany (EOL) CentOS Linux (5/6/7/8) — w odróżnieniu od
[CentOS Stream](/pl/configuration/products/centos-stream/), jego wciąż
aktualnego następcy. Potwierdzono na żywo, że CentOS 5 i 6 w ogóle
poprzedzają konwencję os-release z systemd (brak jakiegokolwiek
`/etc/os-release`), podczas gdy `/etc/redhat-release` istnieje w całej
rodzinie RHEL od dawna wcześniej. Rzeczywiste floty nadal je uruchamiają —
osiągnięcie przez CentOS końca wsparcia (EOL) nie wycofuje maszyn, które
wciąż na nim działają, a to dokładnie ta sytuacja, którą enodia ma
ujawniać, a nie ukrywać.

Zweryfikowano na żywo na `centos:5` (`"CentOS release 5.11 (Final)"`),
`:6` (`"CentOS release 6.10 (Final)"`) i `:7` (`"CentOS Linux release
7.9.2009 (Core)"`). Własny `/etc/redhat-release` hosta CentOS Stream 9
(`"CentOS Stream release 9"`) **nie** pasuje do tego wzorca — dopasowanie
wymaga „CentOS release” lub „CentOS Linux release” bezpośrednio po
„CentOS ”, więc instancja Stream nigdy nie zostanie błędnie
zidentyfikowana jako starszy `centos`, mimo że oba pliki istnieją w obu
liniach produktu.

## Rejestrowane pola

- `version` — numer wydania wyodrębniony z `/etc/redhat-release`
- `extra.hostKeyVerified`

## Korelacja CVE

Brak dopasowania — CVE dystrybucji ogólnego przeznaczenia to podatności pakietów, a numer wydania nie mówi, które pakiety załatano od tego czasu. Zobacz stronę [Korelacja CVE](/pl/cve/#które-produkty-są-dopasowywane).

## Resolver cyklu życia

`endoflife:centos`.
