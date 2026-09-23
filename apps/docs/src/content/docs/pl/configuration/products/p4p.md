---
title: Perforce Proxy (p4p)
description: Konfiguracja enodia do sondowania produktu Perforce Proxy (p4p).
---

Uruchamia `p4 -Ztag -p <address> info` — to samo polecenie i ten sam
mechanizm zewnętrznego CLI, którego używa
[`p4d`](/pl/configuration/products/p4d/); na tamtej stronie wyjaśniono,
dlaczego sonda wywołuje własną binarkę `p4` operatora zamiast bezpośrednio
mówić protokołem przewodowym Perforce.

```yaml
targets:
  - id: p4p-main
    product: p4p
    address: p4p.example.com:1666
```

## Wymaga CLI `p4` na maszynie, na której działa enodia

Tak samo jak w [`p4d`](/pl/configuration/products/p4d/#wymaga-cli-p4-na-maszynie-na-której-działa-enodia)
— jeśli `p4` nie znajduje się w `$PATH`, ścieżkę binarki można nadpisać za
pomocą `options.binary`:

```yaml
targets:
  - id: p4p-main
    product: p4p
    address: p4p.example.com:1666
    options:
      binary: /opt/perforce/bin/p4
```

## Limit czasu

`timeout` (dla danego celu, z wartością zastępczą `defaults.timeout`)
dotyczy podprocesu `p4` w taki sam sposób, jak własnego transportu każdej
innej sondy. Dlaczego ma to konkretne znaczenie właśnie w przypadku
Perforce, wyjaśnia [uwaga na stronie `p4d`](/pl/configuration/products/p4d/#limit-czasu).
Poprawione w 1.2.1.

## Uwierzytelnianie

Brak — potwierdzono na żywo, że `info` odpowiada w pełni bez
uwierzytelnienia na rzeczywistym produkcyjnym proxy.

## Weryfikacja tożsamości producenta

Proxy odpowiada na `info` wszystkim tym, co bezpośredni serwer, **oraz
własnym polem `proxyVersion`** — `serverVersion`/`ServerID`/`serverServices`
serwera backendowego przechodzą bez zmian i opisują serwer za proxy, a nie
samo proxy. Ta sonda wymaga obecności `proxyVersion` i odrzuca odpowiedź
bezpośredniego serwera (który takiego pola nie ma), zamiast zgłaszać
wersję niewłaściwego produktu — to samo sprawdzenie, które
[`p4d`](/pl/configuration/products/p4d/) wykonuje w odwrotną stronę.

## Rejestrowane pola

- `version` — np. `2024.2`, wyodrębniona z `proxyVersion` w postaci
  `P4P/LINUX26X86_64/2024.2/2832881 (2025/09/30)`
- `extra.raw` — pełny, nieparsowany ciąg `proxyVersion`
- `extra.backendServerVersion`, `extra.backendServerID` — własna
  wersja/ID backendowego `p4d`, przekazywane z tej samej odpowiedzi, jeśli
  występują

## Korelacja CVE

Brak dopasowania — żadna z baz nie ma dla niego użytecznych danych. Zobacz stronę [Korelacja CVE](/pl/cve/#które-produkty-są-dopasowywane).

## Resolver cyklu życia

Brak — Perforce to oprogramowanie własnościowe, bez strony endoflife.date
pod żadnym z wypróbowanych slugów (potwierdzone 404) i bez publicznych
wydań na GitHubie, na których można by się oprzeć. Wyłącznie do
inwentarza, tak samo jak
[`p4d`](/pl/configuration/products/p4d/).
