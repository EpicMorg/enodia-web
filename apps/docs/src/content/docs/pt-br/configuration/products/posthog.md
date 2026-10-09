---
title: PostHog
description: Como configurar o enodia para sondar o PostHog.
---

Lê a página de login anônima, `GET /login`, de um PostHog auto-hospedado.
A página embute `window.POSTHOG_APP_CONTEXT = JSON.parse("{...}")` — um
documento JSON dentro de um literal de string JavaScript — e o seu
`commit_sha` é informado como a versão. O esquema padrão é `https`.

```yaml
targets:
  - id: posthog-main
    product: posthog
    address: https://posthog.example.com
```

## O commit git é a versão

O PostHog não publica mais lançamentos numerados: uma instalação
auto-hospedada (hobby) acompanha o branch principal, e o único
identificador que ela expõe é o commit a partir do qual foi construída
(confirmado ao vivo, anonimamente, em uma instância auto-hospedada de
produção). Então `version` aqui é um hash de commit como `55babe9554`, e
não um número de versão. `/_preflight/` também é anônimo, mas traz apenas
a saúde dos serviços e o realm; `/api/instance_status` exige login.

## Autenticação

Nenhuma — a página de login é pública, e a sonda não aceita nenhum tipo
de credencial. Desde a 2.2.0, uma credencial associada a um alvo
`posthog` é um erro de configuração, e não é ignorada silenciosamente —
consulte [Configuração → Credenciais](/pt-br/configuration/#credenciais).

## Campos registrados

- `version` — o commit git, por exemplo `55babe9554`
- `extra.commit` — o mesmo commit
- `extra.realm` — por exemplo `hosted-clickhouse`, quando a página traz um

## Correlação de CVEs

Sem correlação — nenhum dos dois bancos de dados tem dados utilizáveis para ele. Consulte [Correlação de CVEs](/pt-br/cve/#quais-produtos-têm-correspondência).
Os limites de versão do NVD para o PostHog são hashes de commit, que não
podem ser comparados.

## Resolvedor de ciclo de vida

Nenhum — não há lançamentos com que comparar um commit. Dizer o quanto um
commit está atrás do branch principal exigiria a API de comparação do
GitHub, um tipo de resolvedor diferente de qualquer um que o enodia tem;
não foi feito. Apenas inventário.
