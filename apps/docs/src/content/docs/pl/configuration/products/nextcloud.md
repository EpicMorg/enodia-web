---
title: Nextcloud
description: Konfiguracja enodia do sondowania produktu Nextcloud.
---

Odczytuje wersję z `GET /status.php` — endpointu kontroli stanu dla load
balancera, dostępnego nawet przed wykonaniem konfiguracji początkowej
i przy włączonym trybie konserwacji.

```yaml
targets:
  - id: nextcloud-main
    product: nextcloud
    address: https://nextcloud.example.com
```

## Uwierzytelnianie

Brak — endpoint nie przyjmuje żadnego rodzaju poświadczeń.

## Które pole wersji

Zgłaszane jest `versionstring` (np. `34.0.3`), a nie `version` (np.
`34.0.3.2`) — potwierdzono na żywo: `versionstring` to wartość, której
cykle [endoflife.date](https://endoflife.date/nextcloud) używają jako
`latest`, a wewnętrzny czwarty składnik kompilacji z `version` w ogóle
nie pojawia się w kalendarzu cyklu życia.

## Rejestrowane pola

- `version` — z `versionstring`
- `extra.installed`, `extra.maintenance` — `"true"`/`"false"`
- `extra.buildVersion` — surowe pole `version`, zachowane informacyjnie
- `extra.enterprise` — z pola `edition` w `status.php`: puste (serwer
  community, potwierdzone na żywo) → `"false"`, `enterprise` → `"true"`;
  każda inna wartość pozostaje niezgłoszona, zamiast zgadywać

## Korelacja CVE

Dopasowywany do NVD i BDU FSTEC, gdy skonfigurowano [blok `cve:`](/pl/cve/). Uwzględnia edycję: sonda zapisuje edycję serwera w `extra.enterprise`, a instancja community nie widzi wyników dotyczących wyłącznie edycji enterprise. Przy nieznanej edycji zachowywane są wszystkie wyniki.

## Resolver cyklu życia

`endoflife:nextcloud`.
