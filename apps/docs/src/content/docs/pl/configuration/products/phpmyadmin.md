---
title: phpMyAdmin
description: Konfiguracja enodia do sondowania produktu phpMyAdmin.
---

Odczytuje wersję z wywołania inicjalizującego `CommonParams.setAll({...})`
na stronie logowania — JS phpMyAdmin używa tego obiektu w każdym
wykonywanym żądaniu AJAX, więc jest on dostarczany na każdej stronie,
uwierzytelnionej lub nie, bez potrzeby osobnego endpointu wersji.

```yaml
targets:
  - id: phpmyadmin-main
    product: phpmyadmin
    address: https://phpmyadmin.example.com
```

## Uwierzytelnianie

Brak — potwierdzono na żywo na rzeczywistym kontenerze
`phpmyadmin/phpmyadmin`.

## Rejestrowane pola

Tylko `version` — ta sonda nie zapisuje żadnych pól `extra`.

## Korelacja CVE

Dopasowywany do NVD i BDU FSTEC, gdy skonfigurowano [blok `cve:`](/pl/cve/).

## Resolver cyklu życia

`endoflife:phpmyadmin`.
