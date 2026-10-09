---
title: Home Assistant
description: Como configurar o enodia para sondar o Home Assistant.
---

Lê `GET /api/config` da API REST do Home Assistant, com um token de
acesso de longa duração. O alias `homeassistant` também é aceito como
`product:`.

```yaml
targets:
  - id: home-assistant-main
    product: home-assistant
    address: https://home-assistant.example.com
    credentials: ha-token
```

## Autenticação — obrigatória

Nada anônimo traz a versão do Home Assistant: `/api/` e `/api/config`
respondem `401`, e `/manifest.json`, `/auth/providers` e os endpoints de
onboarding não a trazem (confirmado ao vivo em
`ghcr.io/home-assistant/home-assistant:stable` 2026.10.0). A autenticação
documentada da API REST é um token de acesso de longa duração (Profile →
Security → Long-lived access tokens), enviado como
`Authorization: Bearer`:

```yaml
credentials:
  ha-token:
    kind: bearer
    value: "${HOME_ASSISTANT_TOKEN}"
```

Apenas `bearer` é aceito; qualquer outro tipo é um erro de configuração.
Consulte [Configuração → Credenciais](/pt-br/configuration/#credenciais).

## O que é lido

`/api/config` também retorna as coordenadas da casa, caminhos e URLs.
Nada disso é lido — apenas `version`, `state` e os indicadores de modo
seguro/de recuperação.

## Campos registrados

- `version` — por exemplo `2026.10.0`
- `extra.state` — por exemplo `RUNNING`
- `extra.recoveryMode` — `true` quando o Home Assistant informa modo
  seguro ou modo de recuperação; ausente caso contrário

## Correlação de CVEs

Correlacionado com o NVD quando um [bloco `cve:`](/pt-br/cve/) está configurado.

## Resolvedor de ciclo de vida

`github:home-assistant/core` — o endoflife.date não tem um calendário do
Home Assistant (404 confirmado), então a resolução é feita pelos GitHub
Releases: apenas a tag publicada mais recente que não seja pré-lançamento,
sem datas de eol/support/lts (o GitHub não tem opinião sobre política de
ciclo de vida, apenas sobre "qual é o lançamento mais recente"). Um
lançamento cuja tag indica um pré-lançamento (`2026.10.0b7`) é ignorado
mesmo quando o GitHub não o marca como tal.
