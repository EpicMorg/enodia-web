---
title: Visões
description: compact, lifecycle, drift e fleet - quatro recortes dos mesmos dados.
---

O `check` e o `export` renderizam um de quatro focos, escolhido com
`--view` (ou com `render.default_view` do `settings.yaml` quando a flag não
é passada). Cada visão é um recorte diferente dos mesmos dados de inventário
e avaliação, e não uma fonte de dados diferente.

## `compact` (o padrão)

Uma linha por alvo: os três eixos, a severidade geral e o motivo, caso algo
precise de atenção.

```console
$ enodia check
ID           PRODUCT  PATCH   LIFECYCLE  BRANCH     SEVERITY  REASON  CVES
jira-main    jira     behind  active     newer_lts  warn      -       12
gitlab-main  gitlab   behind  eol        newer      fail      -       -
```

A última coluna, `CVES`, é o número de CVEs distintas que afetam aquela
versão exata — `-` quando não há nenhuma, inclusive quando nenhum
[bloco `cve:`](/pt-br/cve/) está configurado ou o produto não tem
correspondência. A visão `drift` tem a mesma coluna; `lifecycle` e `fleet`
não têm. As CVEs nunca alteram a `SEVERITY` nem o código de saída.

## `lifecycle`

Quando o ciclo de vida de cada alvo de fato termina:

```console
$ enodia check --from inventory.jsonl --view lifecycle
ID           PRODUCT  LIFECYCLE  EOL         SUPPORT-ENDS  DAYS-TO-EOL
jira-main    jira     active     2026-12-05  -             338
gitlab-main  gitlab   eol        2025-01-16  2024-11-21    -350
```

## `drift`

A versão instalada em comparação com a versão mais recente do mesmo ciclo:

```console
$ enodia check --from inventory.jsonl --view drift
ID           PRODUCT  CURRENT  LATEST   CYCLE  PATCH   CVES
jira-main    jira     10.3.1   10.3.25  10.3   behind  12
gitlab-main  gitlab   17.5.0   17.5.5   17.5   behind  -
```

## `fleet`

Distribuição de versões e acessibilidade entre todas as instâncias de um
produto, agrupadas em vez de listadas uma linha por alvo. Esta é a visão
**exclusivamente offline** — ela não precisa de nada além do próprio
inventário, nenhum resolvedor de ciclo de vida, nenhum acesso à internet.
Duas instâncias com falha do mesmo produto, com tipos de falha diferentes
(autenticação vs. inacessível), ganham linhas próprias, e não um grupo
`(unknown)` compartilhado:

```console
$ enodia check --from inventory.jsonl --view fleet
PRODUCT  VERSION    STATUS       COUNT  INSTANCES
gitlab   (unknown)  auth         1      gitlab-2
gitlab   18.2.1     ok           1      gitlab-1
jira     (unknown)  unreachable  1      jira-staging
jira     10.3.1     ok           1      jira-3
jira     10.3.2     ok           2      jira-1, jira-2
```

## O que ignora `--view`

O `export --format json` e o `export --format prometheus` ignoram `--view`
completamente — eles sempre trazem todas as observações e avaliações. As
visões só moldam a saída em tabela e o relatório HTML (`export --format
html`) — consulte [Relatórios](/pt-br/reporting/).
