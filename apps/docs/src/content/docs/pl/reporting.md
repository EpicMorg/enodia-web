---
title: Raporty
description: export --format json/prometheus/html oraz to, co settings.yaml zmienia w raporcie HTML.
---

`enodia export` zapisuje raport w jednym z trzech formatów. Wszystkie
trzy przyjmują `--from` (odczyt istniejącego inwentarza zamiast
zbierania danych) oraz `-o`/`--output` (ścieżkę pliku lub `-` dla
stdout, co jest wartością domyślną).

```bash
enodia export --format json
enodia export --format prometheus
enodia export --format html -o report.html
```

Wbudowaną wartością domyślną `--format` jest `json`, ale
`export.default_format` w `settings.yaml` nadpisuje ją zawsze, gdy samo
`--format` nie zostało podane — jawne `--format` zawsze wygrywa; to ta
sama kolejność pierwszeństwa, której gdzie indziej używają już
`render.default_view`/`html.view`. Zobacz
[Konfiguracja](/pl/configuration/#settingsyaml).

## `--format json`

Każda obserwacja i każda ocena w całości — `--view` jest ignorowane. To
format do wykorzystania, jeśli na faktach enodia ma zostać zastosowana
własna polityka ważności (zobacz
[Koncepcje](/pl/concepts/#fakty-i-ocena-są-rozdzielone)).

Po skonfigurowaniu [bloku `cve:`](/pl/cve/) każda ocena zawiera także
tablicę `cves` — jeden wpis na znalezisko i źródło (CVE obecne zarówno
w BDU, jak i w NVD pojawia się dwukrotnie; z NVD — raz na każde pasujące
CPE):

```json
{
  "Source": "bdu",
  "AdvisoryID": "BDU:2026-11879",
  "CVEIDs": ["CVE-2026-19478"],
  "Title": "Уязвимость программной платформы … GitLab EE/ CE …",
  "Severity": "Высокий уровень опасности (базовая оценка CVSS 2.0 составляет 9,7) …",
  "MatchedName": "Gitlab",
  "RangeText": "от 19.2.0 до 19.2.4",
  "FixStatus": "Уязвимость устранена",
  "CVSS": { "Version": "3.1", "Score": 9.4, "Severity": "CRITICAL" }
}
```

`Severity` i `RangeText` to dosłowny tekst źródła; `CVSS` to jedna
ocena z niego wyodrębniona, wybierana w kolejności: najpierw CVSS
3.1/3.0, potem 4.0, a na końcu 2.0 — wersję 3.x ma niemal każde CVE
w obu źródłach, więc wyniki na jednej liście pozostają w tej samej
skali. Kolumna `CVES` w widokach tabelarycznych liczy różne CVE w tych
wpisach, a nie same wpisy.

## `--format prometheus`

Plik tekstowy Prometheus przeznaczony dla
[kolektora textfile w `node_exporter`](https://github.com/prometheus/node_exporter)
— należy go zapisywać według harmonogramu w miejscu, które `node_exporter`
ma skonfigurowane do skanowania, tak jak każdą inną metrykę textfile.
Znaleziska CVE nie są eksportowane jako metryki.

## `--format html`

Jeden samodzielny plik. Nie ma wbudowanego serwera WWW — `enodia` sama
go nie serwuje (zobacz
[Koncepcje](/pl/concepts/#brak-wbudowanego-serwera-www-który-odpytuje-na-żądanie));
należy skierować na niego nginx i generować go na nowo z crona lub
timera systemd. `enodia serve` (zobacz
[Dokumentacja CLI](/pl/cli-reference/#enodia-serve)) to alternatywa,
jeśli raport ma być serwowany automatycznie, według własnego
harmonogramu.

`--view` ogranicza raport do jednego widoku zamiast czterech sekcji
ułożonych jedna pod drugą. `html.view` w `settings.yaml` robi to samo,
gdy flaga nie jest podana.

### Domyślnie offline

`html.assets` w `settings.yaml` określa, czego potrzebuje wygenerowany
plik:

- **`inline`** (domyślnie) — zero zasobów zewnętrznych. Sprawdzone:
  w wyniku nie ma nigdzie `<script` ani niczego ładowanego przez
  `http(s)://` — jedyne takie adresy URL to zwykłe linki (stopka, strony
  NVD/cve.org/BDU na liście CVE). Renderuje się identycznie w całkowicie
  zamkniętej sieci.
- **`cdn`** — ładuje Bootstrap i motyw
  [Bootswatch](https://bootswatch.com/) z CDN oraz dodaje widoczne na
  stronie ostrzeżenie, że raport do renderowania ze stylami potrzebuje
  dostępu do internetu. `html.theme` wybiera motyw (`none`, `default`
  lub dowolny z 26 prawdziwych motywów Bootswatch); `html.cdn` wybiera
  CDN — `auto` (domyślnie) ściga jsdelivr z cdnjs, wysyłając do każdego
  żądanie `HEAD`, i przełącza się na ten, który odpowie pierwszy, więc
  zablokowanie jednego CDN w danej sieci nie pozbawia raportu stylów.
  Pierwsze renderowanie zawsze używa jsdelivr; wyścig jedynie
  *podmienia* potem arkusz stylów na lepszy. Raport dostaje też wybór
  motywu, zapamiętywany dla każdego odbiorcy w `localStorage`
  przeglądarki, a przycisk zamknięcia ostrzeżenia jest zapamiętywany tak
  samo — raz zamknięte ostrzeżenie pozostaje zamknięte w tej
  przeglądarce również w ponownie wygenerowanych raportach.

Pełny przykład `settings.yaml` znajduje się w sekcji
[Konfiguracja](/pl/configuration/#settingsyaml).

### Lista CVE

Po skonfigurowaniu [bloku `cve:`](/pl/cve/) komórka `CVES` w sekcjach
`compact` i `drift` staje się linkiem otwierającym listę CVE danego
celu: jeden wiersz na CVE, od najpoważniejszego, z linkami do NVD,
cve.org oraz — dla znalezisk z BDU — strony bdu.fstec.ru, a ocena jest
pokazana jako kolorowe plakietki (`CRITICAL · CVSS 3.1 9.8`). Opis to
rosyjski tekst BDU, jeśli BDU zawiera dane CVE, a w przeciwnym razie
angielski tekst NVD. To czysty CSS (modal oparty na `:target`), więc
działa tak samo w trybie `inline`, bez żadnego skryptu.

### Kolory wierszy w trybie CDN

Przy `html.assets: cdn` każdy wiersz dostaje kontekstową klasę
Bootstrap — czerwoną dla nieudanej instancji, zieloną dla osiągalnej —
w dowolnym skonfigurowanym motywie, a nie kolor zakodowany na sztywno
i utrzymywany przez enodia dla każdego motywu:

```html
<table class="table table-striped table-hover table-sm align-middle">
<thead><tr><th>PRODUCT</th><th>VERSION</th><th>STATUS</th><th>COUNT</th><th>INSTANCES</th></tr></thead>
<tbody>
<tr class="table-danger"><td>gitlab</td><td>(unknown)</td><td>auth</td><td>1</td><td>gitlab-2</td></tr>
<tr class="table-success"><td>gitlab</td><td>18.2.1</td><td>ok</td><td>1</td><td>gitlab-1</td></tr>
<tr class="table-danger"><td>jira</td><td>(unknown)</td><td>unreachable</td><td>1</td><td>jira-staging</td></tr>
<tr class="table-success"><td>jira</td><td>10.3.1</td><td>ok</td><td>1</td><td>jira-3</td></tr>
<tr class="table-success"><td>jira</td><td>10.3.2</td><td>ok</td><td>2</td><td>jira-1, jira-2</td></tr>
</tbody>
</table>
```

### Stopka i favicon

Stopka każdego wygenerowanego raportu zawiera linki do projektu na
GitHubie oraz do `enodia.sh` i `docs.enodia.sh` — to zwykłe `<a href>`,
a nie pobieranie zasobów, więc nie wpływa to na gwarancję pracy offline
w trybie `inline` (która dotyczy konkretnie *ładowanych* zasobów, a nie
biernego tekstu hiperłączy). Oba tryby mają też favicon karty: `inline`
osadza bezpośrednio w pliku małą kopię base64 pliku
`apple-touch-icon.png` z `enodia.sh` (a nie pełnego, wielorozdzielczego
`favicon.ico`, który dodawałby do każdego raportu około pół megabajta
tylko na ikonę karty); tryb `cdn` linkuje zamiast tego ikony dostępne na
żywo w `enodia.sh`, ponieważ ten tryb i tak potrzebuje dostępu do
internetu, aby w ogóle się wyrenderować.

### Zasoby zewnętrzne

`html.assets: cdn` ładuje Bootstrap oraz, o ile nie ustawiono
`html.theme: none`, motyw Bootswatch — oba na licencji MIT — z jsdelivr
lub cdnjs w chwili, gdy ktoś otwiera raport w przeglądarce. Żaden z nich
nie jest dołączony do samej enodia ani do żadnego artefaktu wydania;
każdy raport w trybie CDN wymienia oba z nazwy w swojej stopce, wraz
z linkiem do ich licencji.

## Historia na podstawie wielu inwentarzy

`enodia collect -o "$(date +%F).jsonl"` uruchamiane według harmonogramu
już wytwarza większość tego, czego potrzebuje `enodia history` — katalog
inwentarzy opatrzonych datami. `history --dir <that directory>` odczytuje
każdy plik `*.jsonl` w tym katalogu i ocenia każdy z nich według stanu
z chwili jego zebrania, budując jedną oś czasu na każdy identyfikator
celu. Zobacz [Dokumentacja CLI](/pl/cli-reference/#enodia-history).
