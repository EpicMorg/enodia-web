---
title: Довідник CLI
description: Кожна команда enodia, прямо з --help.
---

Кожна команда також приймає `-h`/`--help`. Ця сторінка складена з того
самого виводу й синхронізується вручну з реально зібраним бінарником, а
не пишеться з памʼяті.

## Глобальні прапорці

Доступні в кожній команді:

```
--config string     path to enodia.yaml (default: search standard locations)
--settings string   path to settings.yaml (default: search standard locations; missing is not an error)
```

## `enodia collect`

```
collect only gathers facts: an unreachable target is recorded as an
observation with an error, not treated as a command failure. The exit
code reflects whether collection itself ran, not what it found - that
judgement is check's job.
```

```
-o, --output string   output file, or - for stdout (default "-")
```

## `enodia check`

```
check evaluates the patch, lifecycle and newer-branch axes for every
target as of the moment its data was collected. Without --from it
collects first, in this same process - not a second code path. With
--from it reads an existing inventory and only ever reaches the network
for the lifecycle resolver.

--view selects the table focus: compact (default), lifecycle, drift, or
fleet - the offline-only view of version spread across a product's
instances. When --view is not passed, settings.yaml's render.default_view
applies instead of the compact default, if set.
```

```
--fail-on strings   escalate an axis value to a hard failure, e.g. --fail-on=patch:behind (repeatable)
--from string       read an existing inventory instead of collecting
--view string       table view: compact, lifecycle, drift, or fleet (default "compact")
--warn-days int      warn this many days before a lifecycle boundary is reached
```

## `enodia export`

```
export writes one self-contained file - nothing here serves it; nginx,
a cron job, or a systemd timer regenerating it is what does.

--format selects json, prometheus, or html. When --format is not passed,
settings.yaml's export.default_format applies instead, if set; the
built-in default stays json either way.

--view restricts an html export to one view (compact, lifecycle, drift,
or fleet) instead of all four stacked sections; ignored by
json/prometheus, which always carry every observation and assessment.
```

```
--fail-on strings   escalate an axis value to a hard failure (repeatable)
--format string     output format: json, prometheus, or html (default "json")
--from string       read an existing inventory instead of collecting
-o, --output string  output file, or - for stdout (default "-")
--view string        html only: restrict the report to one view (compact, lifecycle, drift, fleet); default is all four
--warn-days int       warn this many days before a lifecycle boundary is reached
```

## `enodia config`

Три підкоманди, власних прапорців, окрім глобальних, немає.

### `enodia config path`

Виводить, який файл конфігурації буде фактично використано з огляду на
поточний порядок пошуку, — див. [Конфігурація](/uk/configuration/#розташування-файлів).

### `enodia config resolve`

```
resolve tries https, then http (never http first - that would put a
credential on the wire in the clear), for every target whose address
has no explicit scheme. It sends no credentials and does not modify the
config file - it only reports what scheme each target would use.
```

### `enodia config validate`

Перевіряє файл конфігурації та посилання на облікові дані — зокрема, чи
справді оголошене в цілі імʼя `credentials:` вказує на запис, який
розуміє проба, — повністю офлайн.

## `enodia products`

Виводить усі підтримувані продукти — повну таблицю див. на сторінці
[Підтримувані продукти](/uk/products/).

## `enodia history`

```
history reads every "*.jsonl" file in --dir and evaluates each one
against its own collection time - not today - building one timeline
per target ID. Producing that directory needs no code at all, just
"enodia collect -o \"$(date +%F).jsonl\"" on a schedule. This command is
the other half: reading many of them back as one history.
```

```
--dir string         directory of dated *.jsonl inventories (required)
--fail-on strings    escalate an axis value to a hard failure (repeatable)
--format string      output format: table or json (default "table")
-o, --output string   output file, or - for stdout (default "-")
--warn-days int        warn this many days before a lifecycle boundary is reached
```

## `enodia serve`

```
serve collects and evaluates on a timer (--interval) and serves
whatever the last successful cycle produced - a request never triggers
a new collection. There is no built-in authentication or TLS: put this
behind a reverse proxy.

Endpoints: / (HTML, all four views), /report.json, /metrics
(Prometheus), /healthz (liveness only - never touches the snapshot).
```

```
--fail-on strings     escalate an axis value to a hard failure (repeatable) - reflected in the served report, not a process exit code
--interval duration    how often to refresh the snapshot (default 1h0m0s)
--listen string         address to listen on (default ":8080")
--warn-days int          warn this many days before a lifecycle boundary is reached
```

## `enodia version`

Виводить версію enodia, коміт і дату збирання.

## `enodia about`

Виводить логотип enodia та інформацію про збірку: версію, коміт, дату
збирання, версію Go, платформу, кількість продуктів (проб), ліцензію та
URL репозиторію.

## `enodia completion`

Генерує скрипт автодоповнення для оболонки. Запустіть
`enodia completion --help` для конкретної оболонки, яку Ви використовуєте
(bash, zsh, fish, powershell).
