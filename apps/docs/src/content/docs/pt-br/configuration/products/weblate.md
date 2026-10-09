---
title: Weblate
description: Como configurar o enodia para sondar o Weblate.
---

Lê `GET /about/`, anonimamente. O esquema padrão é `https`.

```yaml
targets:
  - id: weblate-main
    product: weblate
    address: https://weblate.example.com
```

## De onde vem a versão

O rodapé de toda página do Weblate diz `Powered by <a href="https://weblate.org/">Weblate 2026.10</a>`,
e o seu link de documentação aponta para `docs.weblate.org/en/weblate-2026.10/`.
A sonda lê primeiro o rodapé e, se o rodapé tiver sido removido por
personalização, o link da documentação; uma página sem nenhum dos dois é
relatada como não suportada. `/about/` é lido porque existe em todo
Weblate; um site com `REQUIRE_LOGIN` o redireciona para a página de
login, que traz o mesmo rodapé. A raiz da API REST (`/api/`) também é
anônima, mas não traz versão, e `/api/metrics/` exige um token.

O Weblate passou a usar versões de calendário depois da 5.x (`2026.9`,
`2026.9.1`, `2026.10`); os dois formatos são interpretados.

## Autenticação

Nenhuma — a sonda lê uma página anônima e não aceita nenhum tipo de
credencial. Desde a 2.2.0, uma credencial configurada neste alvo é um
erro de configuração, em vez de ser ignorada; consulte
[Configuração → Credenciais](/pt-br/configuration/#credenciais).

## Campos registrados

Apenas `version` — por exemplo `2026.10` (confirmado ao vivo em
`weblate/weblate:latest`). Esta sonda não registra nenhum campo `extra`.

## Correlação de CVEs

Correlacionado com o NVD quando um [bloco `cve:`](/pt-br/cve/) está configurado.

## Resolvedor de ciclo de vida

`github:WeblateOrg/weblate` — o endoflife.date não tem um calendário do
Weblate (404 confirmado), então a resolução é feita pelos GitHub
Releases: apenas a tag publicada mais recente que não seja pré-lançamento,
sem datas de eol/support/lts (o GitHub não tem opinião sobre política de
ciclo de vida, apenas sobre "qual é o lançamento mais recente"). O
Weblate marca os seus lançamentos como `weblate-2026.10`; desde a 2.2.0,
o resolvedor remove um `<repo>-` ou `<repo>_` inicial das tags de
lançamento, então LATEST e CYCLE mostram `2026.10`.
