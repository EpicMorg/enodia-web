---
title: Koncepcje
description: Decyzje projektowe stojące za enodia - dlaczego wygląda tak, a nie inaczej.
---

Oto decyzje, na których opiera się architektura enodia. Ich zrozumienie
wyjaśnia wiele zachowań, które w przeciwnym razie mogłyby wyglądać na
arbitralne.

## Dwie fazy, celowo rozdzielne

Zbieranie danych komunikuje się z usługami. Ocena komunikuje się
z internetem (kalendarzami cyklu życia producentów). W wielu realnych
infrastrukturach nic nie ma dostępu sieciowego do obu jednocześnie.

```
collect  →  inventory.jsonl  →  evaluate  →  assessment  →  render
```

```bash
# wewnątrz sieci zamkniętej - dostęp do internetu nie jest potrzebny
enodia collect --config config.yaml -o inventory.jsonl

# gdziekolwiek indziej - dostęp do usług nie jest potrzebny
enodia check --from inventory.jsonl
```

`enodia check` bez `--from` to te same dwie fazy złożone w jednym
procesie, a nie druga ścieżka kodu — inwentarz powstający po drodze jest
prawdziwym, pełnoprawnym artefaktem (z własnym schematem i wersją),
a nie tylko pośrednią wartością w pamięci.

## Trzy niezależne osie, a nie jeden status

Gałąź może być w pełni sprawna, choć istnieje nowsza wersja główna —
Confluence 10 LTS jest aktualny w obrębie swojej gałęzi, aktywnie
wspierany, a jednocześnie wydano już nowszą wersję główną. Sprowadzenie
tego do jednego statusu wyrzuca informację, o którą faktycznie chodziło.

| Oś | Wartości |
|---|---|
| Poprawka | `current` · `behind` · `ahead` · `unknown` |
| Cykl życia | `active` · `security` · `eol` · `unknown` |
| Nowsza gałąź | `latest` · `newer` · `newer_lts` · `unknown` |

`ahead` nie jest niczym egzotycznym — wersje kandydujące i opóźnienie
między ogłoszeniem producenta a jego stroną pobierania rutynowo do tego
prowadzą.

Znane CVE, jeśli są [skonfigurowane](/pl/cve/), stanowią osobny fakt
obok trzech osi, a nie czwartą oś: są wymieniane w każdej ocenie, ale
nigdy nie wpływają na ważność, kod wyjścia ani `--fail-on`.

## Fakty i ocena są rozdzielone

`Observation` przechowuje to, co faktycznie zaobserwowano: ciąg wersji,
informację, czy cel był osiągalny, i jaki błąd (jeśli jakikolwiek)
wystąpił. `Assessment` przechowuje to, co polityka enodia sądzi o tych
faktach — ważność, wyliczaną na ich podstawie według polityki, którą
kontroluje użytkownik.

Eksport `--format json` emituje fakty. Konsument o innych priorytetach
może zastosować na nich własną politykę zamiast polityki enodia.
Wpisanie ważności bezpośrednio w obserwację uniemożliwiłoby to.

## Czas jest parametrem

Ocena przyjmuje jawny znacznik czasu `asOf` — nic na ścieżce oceny nie
wywołuje bezpośrednio zegara systemowego. `check --from` pobiera `asOf`
z nagłówka samego inwentarza (`collectedAt`), więc miesięczny inwentarz
jest oceniany według stanu *z chwili jego zebrania*, a nie po cichu
oceniany na nowo względem dnia dzisiejszego. Ponowne uruchomienie tej
samej oceny później daje ten sam wynik.

## Sondy są wkompilowane, a nie opisane w DSL-u YAML

API każdego producenta różni się na tyle, że deklaratywny język sond
wygląda na uniwersalny tylko do pierwszego producenta spoza zestawu, dla
którego go zbudowano. Każda sonda to jeden plik Go z jednym jawnym
wpisem w rejestrze — zapisanie wiedzy o producencie w kodzie oznacza,
że `if` jest po prostu `if`-em, czytelnym i łatwym do debugowania,
a nie warunkiem wyrażonym na nowo w YAML-u.

Oznacza to, że dodanie nowego produktu wymaga wydania, a nie tylko
edycji własnej konfiguracji. Furtka awaryjna: `product: generic`
przyjmuje specyfikację parsera (`json` / `xml` / `header` / `plaintext`
/ `regex`) bezpośrednio z konfiguracji, dla wewnętrznych systemów, które
nigdy nie doczekają się dedykowanej sondy — zobacz
[Konfiguracja](/pl/configuration/#sonda-generyczna). Słownik sondy
generycznej jest celowo zamrożony: żadnych warunków, żadnych pętli,
żadnych łańcuchów żądań. Cel, który potrzebuje czegokolwiek z tego,
potrzebuje prawdziwej sondy napisanej w Go.

## Najpierw HTTPS, poświadczenia domyślnie nigdy nie są wysyłane otwartym tekstem

Rozpoznawanie schematu dla celu bez jawnego `https://`/`http://`
w adresie: najpierw próba `https`, potem powrót do `http`, a w obu
przypadkach ostrzeżenie. enodia nigdy nie próbuje najpierw `http` —
pierwsze żądanie przeniosłoby już poświadczenie otwartym tekstem,
a późniejsze przekierowanie na `https` nie cofnęłoby jego wysłania. Cel
`http://` z dołączonymi poświadczeniami jest twardym błędem, chyba że
dla tej konkretnej usługi ustawiono `allow_insecure_transport: true`.

## Brak wbudowanego serwera WWW, który odpytuje na żądanie

`enodia serve` i `export --format html` pokazują ostatnią zakończoną
migawkę — żadne z nich nigdy nie uruchamia nowego zbierania danych
w odpowiedzi na żądanie. Przycisk odświeżania, który przy każdym
kliknięciu odpytuje całą flotę, to samodzielnie zadany atak typu
denial-of-service na własną produkcję. Zbieranie działa według
harmonogramu (`serve --interval` albo cron/timer systemd generujący
na nowo eksport HTML); HTTP zawsze tylko odczytuje to, co wytworzył
ostatni udany cykl.
