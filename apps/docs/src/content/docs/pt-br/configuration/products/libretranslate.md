---
title: LibreTranslate
description: Como configurar o enodia para sondar o LibreTranslate.
---

Lê `GET /spec`, o próprio documento OpenAPI (Swagger 2.0) da API, que é
público mesmo onde traduzir exige uma chave de API. O esquema padrão é
`https`.

```yaml
targets:
  - id: translate-main
    product: libretranslate
    address: https://translate.example.com
```

## Verificação da identidade do fornecedor

`info.version` é a versão do servidor. A sonda também exige que
`info.title` seja `"LibreTranslate"`, para que o documento Swagger de
outro serviço não seja lido como o do LibreTranslate.

## Autenticação

Nenhuma — `/spec` é público e a sonda não aceita nenhum tipo de
credencial (uma chave de API só é necessária para traduzir, o que a sonda
nunca faz). Desde a 2.2.0, uma credencial configurada neste alvo é um
erro de configuração, em vez de ser ignorada; consulte
[Configuração → Credenciais](/pt-br/configuration/#credenciais).

## Campos registrados

Apenas `version` — por exemplo `1.9.6`, de `info.version` (confirmado ao
vivo em `libretranslate/libretranslate:latest`, versão v1.9.6). Esta
sonda não registra nenhum campo `extra`.

## Correlação de CVEs

Sem correlação — nenhum dos dois bancos de dados tem dados utilizáveis
para ele. Consulte
[Correlação de CVEs](/pt-br/cve/#quais-produtos-têm-correspondência).

## Resolvedor de ciclo de vida

`github:LibreTranslate/LibreTranslate` — o endoflife.date não tem um
calendário do LibreTranslate (404 confirmado), então a resolução é feita
pelos GitHub Releases: apenas a tag publicada mais recente que não seja
pré-lançamento, sem datas de eol/support/lts (o GitHub não tem opinião
sobre política de ciclo de vida, apenas sobre "qual é o lançamento mais
recente").
