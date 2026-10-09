---
title: Sentry
description: Como configurar o enodia para sondar o Sentry.
---

Lê a página de login anônima de um Sentry auto-hospedado,
`GET /auth/login/` (que redireciona para a página de login da única
organização). Toda página embute `window.__initialData = {...}`, e o seu
`version.current` é a versão. O esquema padrão é `https`.

```yaml
targets:
  - id: sentry-main
    product: sentry
    address: https://sentry.example.com
```

## Por que a página de login

Confirmado ao vivo, anonimamente, em um 26.2.1 auto-hospedado de
produção. O mesmo objeto `version` também tem um campo `latest` — a
verificação de atualizações do próprio Sentry — que **não** é usado: com
essa verificação desativada, ele estava desatualizado (`21.7.0`). A raiz
da API, `/api/0/`, também é anônima, mas o seu `"version": "0"` é a
versão da API, não a do servidor; `/api/0/internal/health/` exige
autenticação.

## Autenticação

Nenhuma — a página de login é pública, e a sonda não aceita nenhum tipo
de credencial. Desde a 2.2.0, uma credencial associada a um alvo `sentry`
é um erro de configuração, e não é ignorada silenciosamente — consulte
[Configuração → Credenciais](/pt-br/configuration/#credenciais).

## Campos registrados

- `version` — de `version.current`, por exemplo `26.2.1`
- `extra.build` — o commit git de `version.build`
- `extra.mode` — `sentryMode`, por exemplo `SELF_HOSTED`

## Correlação de CVEs

Correlacionado com o NVD quando um [bloco `cve:`](/pt-br/cve/) está configurado.
As entradas "Sentry" do BDU tratam do SDK, não do servidor, e não são usadas.

## Resolvedor de ciclo de vida

`github:getsentry/self-hosted` — o endoflife.date não tem um calendário
do Sentry (404 confirmado), então a resolução é feita pelos GitHub
Releases: apenas a tag publicada mais recente que não seja pré-lançamento,
sem datas de eol/support/lts (o GitHub não tem opinião sobre política de
ciclo de vida, apenas sobre "qual é o lançamento mais recente"). As tags
de lançamento do getsentry/self-hosted (`26.8.0`, `26.9.0`, …) são as
versões do servidor que ele instala.
