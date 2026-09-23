---
title: oauth2-proxy
description: Konfiguracja enodia do sondowania produktu oauth2-proxy.
---

Odczytuje wersję umieszczoną w stopce `/oauth2/sign_in`. oauth2-proxy
w ogóle nie ma endpointu wersji w JSON — strona logowania to jedyna
anonimowa powierzchnia (musi się wyrenderować, zanim istnieje
jakakolwiek sesja), a jej domyślny szablon wpisuje wersję bezpośrednio
w tekst stopki.

```yaml
targets:
  - id: oauth2-proxy-main
    product: oauth2-proxy
    address: https://auth.example.com
```

## Uwierzytelnianie

Brak — potwierdzono na żywo na domyślnej stronie rzeczywistego kontenera
`oauth2-proxy/oauth2-proxy`.

## Flaga `--footer` może ukryć wersję

Własna flaga `--footer` wdrożenia może zastąpić lub ukryć (`-`) cały ten
wiersz — w takim przypadku nie istnieje żadna anonimowa alternatywa. To
potwierdzony produkt z wersją ukrytą przez własną konfigurację wdrożenia,
a nie błąd sondy.

## Rejestrowane pola

Tylko `version` — ta sonda nie zapisuje żadnych pól `extra`.

## Korelacja CVE

Dopasowywany do NVD i BDU FSTEC, gdy skonfigurowano [blok `cve:`](/pl/cve/).

## Resolver cyklu życia

`github:oauth2-proxy/oauth2-proxy` — obecnie brak kalendarza
endoflife.date, więc zamiast tego jest rozwiązywany przez GitHub Releases:
wyłącznie najnowszy opublikowany tag niebędący wydaniem wstępnym (prerelease), bez dat eol/support/lts.
