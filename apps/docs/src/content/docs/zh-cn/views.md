---
title: 视图
description: compact、lifecycle、drift 和 fleet——同一份数据的四个切面。
---

`check` 和 `export` 都会渲染四种关注点之一，通过 `--view` 选择（未传入该标志时使用
`settings.yaml` 的 `render.default_view`）。每个视图都是同一份清单 + 评估结果数据的不同切面，而不是不同的数据源。

## `compact`（默认）

每个目标一行：三个维度、总体严重级别，以及如有需要关注之处时的原因。

```console
$ enodia check
ID           PRODUCT  PATCH   LIFECYCLE  BRANCH     SEVERITY  REASON  CVES
jira-main    jira     behind  active     newer_lts  warn      -       12
gitlab-main  gitlab   behind  eol        newer      fail      -       -
```

最后一列 `CVES` 是影响该确切版本的不同 CVE 的数量——没有时显示 `-`，包括未配置[`cve:` 块](/zh-cn/cve/)或产品未能匹配的情况。`drift` 也带有同样的列；`lifecycle` 和 `fleet`
则没有。CVE 永远不会改变 `SEVERITY` 或退出码。

## `lifecycle`

每个目标的生命周期实际何时结束：

```console
$ enodia check --from inventory.jsonl --view lifecycle
ID           PRODUCT  LIFECYCLE  EOL         SUPPORT-ENDS  DAYS-TO-EOL
jira-main    jira     active     2026-12-05  -             338
gitlab-main  gitlab   eol        2025-01-16  2024-11-21    -350
```

## `drift`

已安装版本与同一周期内最新发布版本的对比：

```console
$ enodia check --from inventory.jsonl --view drift
ID           PRODUCT  CURRENT  LATEST   CYCLE  PATCH   CVES
jira-main    jira     10.3.1   10.3.25  10.3   behind  12
gitlab-main  gitlab   17.5.0   17.5.5   17.5   behind  -
```

## `fleet`

某个产品所有实例的版本分布和可达性，按组汇总，而不是每个目标列一行。这是**仅离线**视图——
除了清单本身之外什么都不需要，不需要生命周期解析器，也完全不需要互联网访问。同一产品的两个失败实例如果失败类型不同（auth 与 unreachable），会各自单独成行，而不是共用一个 `(unknown)` 分组：

```console
$ enodia check --from inventory.jsonl --view fleet
PRODUCT  VERSION    STATUS       COUNT  INSTANCES
gitlab   (unknown)  auth         1      gitlab-2
gitlab   18.2.1     ok           1      gitlab-1
jira     (unknown)  unreachable  1      jira-staging
jira     10.3.1     ok           1      jira-3
jira     10.3.2     ok           2      jira-1, jira-2
```

## 哪些输出会忽略 `--view`

`export --format json` 和 `export --format prometheus` 会完全忽略 `--view`——它们始终包含所有观测结果和评估结果。视图只影响表格输出和 HTML 报告（`export --format html`）——请参阅[报告](/zh-cn/reporting/)。
