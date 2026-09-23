---
title: postgres_exporter
description: Como configurar o enodia para sondar o prometheus-community/postgres_exporter.
---

Lê o gauge `postgres_exporter_build_info` de `/metrics` — o "version
collector" do `prometheus/common` que todo exporter Prometheus deste
ecossistema expõe da mesma forma (uma constante `1`, com a versão em um
label, não no valor). `product: postgres-exporter` é aceito como alias.

```yaml
targets:
  - id: postgres-exporter-main
    product: postgres_exporter
    address: https://exporter.example.com:9187
```

## Autenticação

Opcional — `/metrics` não precisa de credenciais por padrão e responde
mesmo quando o próprio PostgreSQL alvo está inacessível (`build_info`
descreve o binário do exporter, não o banco de dados que ele coleta). O
`exporter-toolkit` (a biblioteca por trás de `--web.config.file`) pode
adicionar HTTP Basic a este endpoint:

```yaml
credentials:
  postgres-exporter-basic:
    kind: basic
    username: metrics
    password: "${EXPORTER_PASSWORD}"
```

## Campos registrados

Apenas `version` — esta sonda não registra nenhum campo `extra`.

## Correlação de CVEs

Sem correlação — nenhum dos dois bancos de dados tem dados utilizáveis para ele. Consulte [Correlação de CVEs](/pt-br/cve/#quais-produtos-têm-correspondência).

## Resolvedor de ciclo de vida

`github:prometheus-community/postgres_exporter` — este é um exporter
Prometheus, não um produto com política própria de ciclo de vida/EOL,
então a resolução é feita pelos GitHub Releases: apenas a tag publicada
mais recente que não seja pré-lançamento, sem datas de eol/support/lts.
