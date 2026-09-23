---
title: Perforce Helix Core Server (p4d)
description: Konfiguracja enodia do sondowania produktu Perforce Helix Core Server (p4d).
---

Uruchamia `p4 -Ztag -p <address> info` — **jedyna sonda w tym projekcie,
która wywołuje zewnętrzną binarkę** zamiast bezpośrednio mówić protokołem
przewodowym lub HTTP. Zobacz [dlaczego](#dlaczego-cli-zamiast-klienta-protokołu-przewodowego)
poniżej.

```yaml
targets:
  - id: p4d-main
    product: p4d
    address: p4d.example.com:1666
```

## Wymaga CLI `p4` na maszynie, na której działa enodia

To nie jest wymaganie dotyczące poświadczeń ani sieci — obok samego enodia
musi być zainstalowana rzeczywista binarka (własny klient wiersza poleceń
Perforce, do pobrania za darmo). Brakująca binarka kończy się jasnym
błędem, zamiast zostać pomylona z problemem sieciowym. Jeśli `p4` nie
znajduje się w `$PATH`, ścieżkę można nadpisać za pomocą `options.binary`
(działa to identycznie w systemie Windows, ze wskazaniem na `p4.exe`):

```yaml
targets:
  - id: p4d-main
    product: p4d
    address: p4d.example.com:1666
    options:
      binary: /opt/perforce/bin/p4
```

## Dlaczego CLI zamiast klienta protokołu przewodowego

Własny protokół RPC Perforce został w pełni odtworzony metodą inżynierii
wstecznej na żywo (przechwytywanie pakietów oraz prawdziwa binarka `p4`
na rzeczywistym produkcyjnym proxy), a ręcznie zbudowany klient poprawnie
odtworzył cały handshake — co potwierdzono bajt po bajcie względem
przechwyconego ruchu. Jednak dokładnie ten sam, zweryfikowany jako
poprawny handshake jest po cichu porzucany przez rzeczywiste, bezpośrednie
serwery `p4d` (obowiązkowe TLS i ograniczanie liczby żądań zostały
wykluczone na żywo: brak błędu, brak resetu, po prostu brak odpowiedzi),
podczas gdy prawdziwa binarka `p4` łączy się z tymi samymi adresami bez
żadnego problemu. Zamiast dostarczać sondę, która działa tylko z proxy,
zarówno ta sonda, jak i
[Perforce Proxy](/pl/configuration/products/p4p/) wywołują zamiast tego
własne CLI `p4` operatora.

## Limit czasu

`timeout` (dla danego celu, z wartością zastępczą `defaults.timeout`)
dotyczy podprocesu `p4` w taki sam sposób, jak własnego transportu każdej
innej sondy. Ma to tutaj konkretne znaczenie: proces `p4`, który utknął
przy łączeniu z nieosiągalnym bezpośrednim serwerem, zawiesza się bez
odpowiedzi i bez resetu na poziomie TCP — dokładnie tak, jak opisano
powyżej — więc bez limitu czasu wstrzymałby cały przebieg zbierania,
zamiast zakończyć błędem tylko ten jeden cel. (Poprawione w 1.2.1 —
wcześniejsza wersja w ogóle nie przekazywała limitu czasu do podprocesu.)

## Uwierzytelnianie

Brak — potwierdzono na żywo, że `info` odpowiada w pełni bez
uwierzytelnienia na rzeczywistych serwerach produkcyjnych.

## Weryfikacja tożsamości producenta

Odpowiedź zawierająca pole `proxyVersion` oznacza, że adres to w
rzeczywistości [Perforce Proxy](/pl/configuration/products/p4p/), a nie
bezpośredni serwer — ta sonda ją odrzuca, zamiast zgłaszać wersję
niewłaściwego produktu, tak samo jak `p4p` odrzuca, odwrotnie, odpowiedź
bezpośredniego serwera.

## To nie ten sam produkt co Perforce Helix Swarm

[`perforce-swarm`](/pl/configuration/products/perforce-swarm/) to webowy
interfejs Perforce do przeglądu kodu, sondowany przez HTTP — inny produkt
niż sam serwer `p4d`, którego dotyczy ta strona.

## Rejestrowane pola

- `version` — np. `2024.2`, wyodrębniona z `serverVersion` w postaci
  `P4D/LINUX26X86_64/2024.2/2726408 (2025/02/27)`
- `extra.raw` — pełny, nieparsowany ciąg `serverVersion`
- `extra.serverID`, `extra.serverServices`, jeśli występują

## Korelacja CVE

Dopasowywany do NVD i BDU FSTEC, gdy skonfigurowano [blok `cve:`](/pl/cve/).

## Resolver cyklu życia

Brak — Perforce to oprogramowanie własnościowe, bez strony endoflife.date
pod żadnym z wypróbowanych slugów (potwierdzone 404) i bez publicznych
wydań na GitHubie, na których można by się oprzeć. Wyłącznie do
inwentarza, tak samo jak
[Gentoo](/pl/configuration/products/gentoo/)/
[Kali Linux](/pl/configuration/products/kali-linux/).
