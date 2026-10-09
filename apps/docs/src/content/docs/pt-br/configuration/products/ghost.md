---
title: Ghost
description: Como configurar o enodia para sondar o Ghost.
---

Lê `GET /ghost/api/admin/site/` — o único endpoint da Admin API que o
Ghost serve sem sessão nem chave (o aplicativo de administração o lê
antes do login) — e obtém `site.version`. O esquema padrão é `https`.

```yaml
targets:
  - id: ghost-main
    product: ghost
    address: https://blog.example.com
```

## Apenas major.minor é público

Confirmado ao vivo em `ghost:6`: o endpoint informou `6.69`, o mesmo que
`<meta name="generator">` e o cabeçalho `Content-Version`, enquanto o
pacote instalado era o 6.69.0. A versão completa fica atrás da chave da
Admin API, um JWT assinado — um novo tipo de credencial por um único
dígito, o que não vale a pena: os lançamentos do Ghost são `x.y.0` quase
sem exceção, e `6.69` é comparado como igual à tag `v6.69.0`.

## Autenticação

Nenhuma — o endpoint é público, e a sonda não aceita nenhum tipo de
credencial. Desde a 2.2.0, uma credencial associada a um alvo `ghost` é
um erro de configuração, e não é ignorada silenciosamente — consulte
[Configuração → Credenciais](/pt-br/configuration/#credenciais).

## Campos registrados

Apenas `version` — major.minor, por exemplo `6.69`; esta sonda não
registra nenhum campo `extra`.

## Correlação de CVEs

Correlacionado com o NVD e o BDU FSTEC quando um [bloco `cve:`](/pt-br/cve/) está configurado.

## Resolvedor de ciclo de vida

`github:TryGhost/Ghost` — o endoflife.date não tem um calendário do Ghost
(404 confirmado), então a resolução é feita pelos GitHub Releases: apenas
a tag publicada mais recente que não seja pré-lançamento, sem datas de
eol/support/lts (o GitHub não tem opinião sobre política de ciclo de
vida, apenas sobre "qual é o lançamento mais recente").
