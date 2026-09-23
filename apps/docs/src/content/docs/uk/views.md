---
title: Подання
description: compact, lifecycle, drift і fleet — чотири зрізи тих самих даних.
---

І `check`, і `export` відображають одне з чотирьох подань, яке обирається
через `--view` (або через `render.default_view` у `settings.yaml`, коли
прапорець не передано). Кожне подання — це інший зріз тих самих даних
інвентарю та оцінок, а не інше джерело даних.

## `compact` (за замовчуванням)

Один рядок на ціль: три осі, загальна критичність і причина, якщо щось
потребує уваги.

```console
$ enodia check
ID           PRODUCT  PATCH   LIFECYCLE  BRANCH     SEVERITY  REASON  CVES
jira-main    jira     behind  active     newer_lts  warn      -       12
gitlab-main  gitlab   behind  eol        newer      fail      -       -
```

Останній стовпець, `CVES`, — це кількість різних CVE, що зачіпають саме
цю версію; `-`, коли їх немає, зокрема коли
[блок `cve:`](/uk/cve/) не налаштовано або продукт не зіставлено.
`drift` містить той самий стовпець; `lifecycle` і `fleet` — ні. CVE
ніколи не змінюють `SEVERITY` чи код завершення.

## `lifecycle`

Коли насправді завершується життєвий цикл кожної цілі:

```console
$ enodia check --from inventory.jsonl --view lifecycle
ID           PRODUCT  LIFECYCLE  EOL         SUPPORT-ENDS  DAYS-TO-EOL
jira-main    jira     active     2026-12-05  -             338
gitlab-main  gitlab   eol        2025-01-16  2024-11-21    -350
```

## `drift`

Встановлена версія порівняно з останнім релізом у тому самому циклі:

```console
$ enodia check --from inventory.jsonl --view drift
ID           PRODUCT  CURRENT  LATEST   CYCLE  PATCH   CVES
jira-main    jira     10.3.1   10.3.25  10.3   behind  12
gitlab-main  gitlab   17.5.0   17.5.5   17.5   behind  -
```

## `fleet`

Розкид версій і досяжність по всіх екземплярах продукту — згруповано, а
не перелічено по рядку на ціль. Це подання **суто офлайнове**: йому не
потрібно нічого, крім самого інвентарю, — ні резолвера життєвого циклу,
ні доступу до інтернету взагалі. Два екземпляри одного продукту, що
завершилися невдачею з різних причин (автентифікація проти
недосяжності), отримують окремі рядки, а не спільний кошик `(unknown)`:

```console
$ enodia check --from inventory.jsonl --view fleet
PRODUCT  VERSION    STATUS       COUNT  INSTANCES
gitlab   (unknown)  auth         1      gitlab-2
gitlab   18.2.1     ok           1      gitlab-1
jira     (unknown)  unreachable  1      jira-staging
jira     10.3.1     ok           1      jira-3
jira     10.3.2     ok           2      jira-1, jira-2
```

## Що ігнорує `--view`

`export --format json` і `export --format prometheus` повністю ігнорують
`--view` — вони завжди містять усі спостереження та оцінки. Подання
впливають лише на табличний вивід і HTML-звіт (`export --format
html`) — див. [Звіти](/uk/reporting/).
