---
title: Synology DSM
description: Konfiguracja enodia do sondowania produktu Synology DSM.
---

Loguje się do własnego Web API Synology (`SYNO.API.Auth`), a następnie
odczytuje wersję z `SYNO.DSM.Info`, używając uzyskanej sesji — to jedyna
sonda HTTP w enodia, która wymaga rzeczywistego kroku logowania zamiast
statycznych poświadczeń.

```yaml
targets:
  - id: nas-main
    product: synology-dsm
    address: https://nas.example.com:5001
    credentials: synology-admin
```

## Uwierzytelnianie — wymagane, nazwa użytkownika i hasło

```yaml
credentials:
  synology-admin:
    kind: password
    username: enodia-ro
    password: "${SYNOLOGY_PASSWORD}"
```

Potwierdzono na żywo: `SYNO.DSM.Info` zawsze odpowiada
`{"error":{"code":119}}` („brak sesji”) bez identyfikatora sesji oraz —
gdy włączona jest ochrona CSRF — `SynoToken`; żadnego z nich nie da się
uzyskać bez uprzedniego wywołania metody logowania `SYNO.API.Auth`
z prawdziwym kontem i hasłem. To rzeczywiście lżejszy przypadek niż pełne
logowanie przez formularz HTML: zwykłe API JSON przyjmujące nazwę
użytkownika i hasło jako normalne parametry i zwracające identyfikator
sesji jako normalne pole JSON, bez słoika ciasteczek (cookie jar) czy
wyciągania tokenu CSRF ze strony. Po odczytaniu wersji następuje
wylogowanie w miarę możliwości (best-effort), aby zbieranie nie
gromadziło otwartych sesji na NAS-ie przy każdym kolejnym uruchomieniu.

Błędy uwierzytelniania nie używają tu w ogóle kodów statusu HTTP: każde
wywołanie Web API Synology odpowiada `200` nawet w razie niepowodzenia,
z `success: false` w treści — potwierdzono na żywo, dlatego ta sonda
odczytuje treść, a nie kod statusu, aby wykryć odrzucone logowanie.

## Rejestrowane pola

- `version` — wyodrębniona z `version_string` w postaci `"DSM <version>
  Update <n>"`, np. `"DSM 7.3.2-86009 Update 4"` → `7.3.2-86009`
- `extra.update` — numer Update (`4`), od wersji 2.2, jeśli ciąg go
  zawiera; przechowywany oddzielnie od `version`, aby drift i cykl życia
  nadal porównywały samo wydanie

## Korelacja CVE

Dopasowywany do NVD i BDU FSTEC, gdy skonfigurowano [blok `cve:`](/pl/cve/). Od wersji 2.2. Wydanie DSM
to wersja, kompilacja i Update (`7.2.1-69057 Update 6`), a bazy
zapisują jego granice jako `7.2.1-69057-6`; `version` i `extra.update`
z sondy są na potrzeby wyszukiwania składane w jedną porównywalną
wersję. Inwentarz zebrany przed 2.2 nie ma `extra.update` i jest
odczytywany jako Update 0 — naprawione Update mogą zostać oznaczone, ale
żadne nie zostanie pominięte. Zakresy BDU dla poszczególnych gałęzi
nadal zgłaszają nadmiarowo w starszych gałęziach (zakresy NVD nie) —
zobacz [Dell iDRAC i Synology DSM](/pl/cve/#dell-idrac-i-synology-dsm)
oraz [Znane ograniczenia](/pl/cve/#znane-ograniczenia).

## Resolver cyklu życia

Brak — endoflife.date nie ma kalendarza pod `synology-dsm`, `synology`
ani `dsm` (potwierdzone 404). Na razie wyłącznie do inwentarza.
