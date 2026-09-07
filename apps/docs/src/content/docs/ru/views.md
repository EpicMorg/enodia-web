---
title: Представления
description: compact, lifecycle, drift и fleet - четыре среза одних и тех же данных.
---

`check` и `export` оба рисуют одно из четырёх представлений, выбираемое
через `--view` (либо `render.default_view` из `settings.yaml`, когда флаг
не передан). Каждое представление — это другой срез одних и тех же
данных инвентаря + оценки, а не другой источник данных.

## `compact` (по умолчанию)

Одна строка на таргет: три оси, общий severity и причина, если что-то
требует внимания.

```console
$ enodia check
ID           PRODUCT  PATCH   LIFECYCLE  BRANCH     SEVERITY  REASON
jira-main    jira     behind  active     newer_lts  warn      -
gitlab-main  gitlab   behind  eol        newer      fail      -
```

## `lifecycle`

Когда у каждого таргета реально заканчивается жизненный цикл:

```console
$ enodia check --from inventory.jsonl --view lifecycle
ID           PRODUCT  LIFECYCLE  EOL         SUPPORT-ENDS  DAYS-TO-EOL
jira-main    jira     active     2026-12-05  -             338
gitlab-main  gitlab   eol        2025-01-16  2024-11-21    -350
```

## `drift`

Установленная версия против последнего релиза в той же ветке:

```console
$ enodia check --from inventory.jsonl --view drift
ID           PRODUCT  CURRENT  LATEST   CYCLE  PATCH
jira-main    jira     10.3.1   10.3.25  10.3   behind
gitlab-main  gitlab   17.5.0   17.5.5   17.5   behind
```

## `fleet`

Разброс версий и доступность по всем инстансам продукта, сгруппированные,
а не построчно на каждый таргет. Это **офлайн-only** представление — ему
нужен только сам инвентарь, никакого резолвера жизненного цикла, никакого
интернета вообще. Два упавших инстанса одного продукта с разными видами
отказа (auth vs. unreachable) получают собственные строки, а не общий
бакет `(unknown)`:

```console
$ enodia check --from inventory.jsonl --view fleet
PRODUCT  VERSION    STATUS       COUNT  INSTANCES
gitlab   (unknown)  auth         1      gitlab-2
gitlab   18.2.1     ok           1      gitlab-1
jira     (unknown)  unreachable  1      jira-staging
jira     10.3.1     ok           1      jira-3
jira     10.3.2     ok           2      jira-1, jira-2
```

## Что игнорирует `--view`

`export --format json` и `export --format prometheus` полностью
игнорируют `--view` — они всегда несут каждый observation и каждый
assessment. Представления влияют только на табличный вывод и на
HTML-отчёт (`export --format html`) — см. [Отчёты](/ru/reporting/).
