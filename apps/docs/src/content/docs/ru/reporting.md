---
title: Отчёты
description: export --format json/prometheus/html, и что settings.yaml меняет в HTML-отчёте.
---

`enodia export` пишет отчёт в одном из трёх форматов. Все три принимают
`--from` (читать существующий инвентарь вместо сбора) и `-o`/`--output`
(путь к файлу, либо `-` для stdout — по умолчанию).

```bash
enodia export --format json
enodia export --format prometheus
enodia export --format html -o report.html
```

Встроенный дефолт `--format` — `json`, но `export.default_format` в
`settings.yaml` переопределяет его, когда сам `--format` не передан —
явный `--format` всегда побеждает, тот же приоритет, что уже используют
`render.default_view`/`html.view`. См.
[Конфигурацию](/ru/configuration/#settingsyaml).

## `--format json`

Каждый observation и каждый assessment, целиком — `--view` игнорируется.
Это формат для тех, кто хочет применить собственную политику severity
поверх фактов enodia (см.
[Концепции](/ru/concepts/#факты-и-суждение-разделены)).

## `--format prometheus`

Prometheus textfile, рассчитанный на
[textfile-коллектор `node_exporter`](https://github.com/prometheus/node_exporter)
— пишите его туда, куда `node_exporter` настроен сканировать, по
расписанию, как любую другую textfile-метрику.

## `--format html`

Один самодостаточный файл. Встроенного веб-сервера нет — сама `enodia`
его не отдаёт (см.
[Концепции](/ru/concepts/#никакого-встроенного-веб-сервера-опрашивающего-по-запросу));
направь на него nginx и пересобирай по cron или systemd-таймеру.
`enodia serve` (см. [Справочник CLI](/ru/cli-reference/#enodia-serve))
— альтернатива, если нужно, чтобы отчёт отдавался автоматически, по
собственному расписанию.

`--view` ограничивает отчёт одним представлением вместо всех четырёх
секций подряд. `html.view` из `settings.yaml` делает то же самое, когда
флаг не передан.

### Офлайн по умолчанию

`html.assets` из `settings.yaml` управляет тем, что нужно
сгенерированному файлу:

- **`inline`** (по умолчанию) — ноль внешних ресурсов. Проверено: ни
  одного `http(s)://` или `<script` во всём выводе. Рендерится
  одинаково внутри полностью закрытой сети.
- **`cdn`** — грузит Bootstrap и тему
  [Bootswatch](https://bootswatch.com/) с CDN и добавляет заметное
  предупреждение прямо на странице о том, что для стилизованного
  рендера нужен интернет. `html.theme` выбирает тему (`none`,
  `default`, либо любая из 26 настоящих тем Bootswatch); `html.cdn`
  выбирает CDN — `auto` (по умолчанию) устраивает гонку между jsdelivr
  и cdnjs через `HEAD`-запрос к каждому и переключается на того, кто
  ответил первым, так что блокировка одного CDN в конкретной сети не
  роняет стили отчёта целиком. Самый первый рендер всегда использует
  jsdelivr; гонка только *обновляет* стиль уже после этого.

Полный пример `settings.yaml` см. в
[Конфигурации](/ru/configuration/#settingsyaml).

### Цвет строк в CDN-режиме

С `html.assets: cdn` каждая строка получает контекстный класс
Bootstrap — красный для недоступного инстанса, зелёный для доступного —
в той теме, что настроена, а не жёстко заданный enodia цвет на каждую
тему отдельно:

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

### Футер и favicon

Футер каждого сгенерированного отчёта ссылается обратно на проект на
GitHub, а также на `enodia.sh` и `docs.enodia.sh` — обычные `<a href>`,
не загрузка ресурса, так что это никак не влияет на офлайн-гарантию
режима `inline` (она конкретно про *загружаемые* ресурсы, не про
инертный текст ссылки). Оба режима также получают favicon для вкладки:
`inline` встраивает небольшую base64-копию `apple-touch-icon.png` с
`enodia.sh` прямо в файл (не полный многоразмерный `favicon.ico`,
который добавил бы примерно полмегабайта к каждому отчёту ради иконки
вкладки); режим `cdn` вместо этого ссылается на живые иконки на
`enodia.sh` — этому режиму и так уже нужен интернет, чтобы отрендериться
вообще.

### Сторонние ресурсы

`html.assets: cdn` грузит Bootstrap и, если не выставлено
`html.theme: none`, тему Bootswatch — обе лицензии MIT — с jsdelivr или
cdnjs в момент, когда кто-то открывает отчёт в браузере. Ни одна из них
не встроена ни в саму enodia, ни в артефакты релиза; каждый отчёт в
CDN-режиме указывает авторство обеих со ссылкой на лицензию прямо в
собственном футере.

## История по многим инвентарям

`enodia collect -o "$(date +%F).jsonl"` по расписанию уже даёт почти всё,
что нужно `enodia history` — директорию датированных инвентарей.
`history --dir <эта директория>` читает каждый `*.jsonl`-файл в ней и
оценивает каждый на момент его собственного сбора, выстраивая одну
временную шкалу на каждый ID таргета. См.
[Справочник CLI](/ru/cli-reference/#enodia-history).
