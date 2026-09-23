---
title: TestRail
description: Como configurar o enodia para sondar o TestRail.
---

Lê `GET /version.txt` — um arquivo estático simples que o TestRail traz na
raiz web, e não uma resposta de API REST. A API REST documentada do
próprio TestRail (`get_current_user` e similares) precisa de credenciais e
não traz a versão do produto, e é por isso que esta sonda lê o arquivo
estático.

```yaml
targets:
  - id: testrail-main
    product: testrail
    address: https://testrail.example.com
```

## Autenticação

Nenhuma — o endpoint não aceita nenhum tipo de credencial.

## Campos registrados

Apenas `version` — o conteúdo do arquivo sem espaços nas extremidades,
exatamente como servido.

## Correlação de CVEs

Correlacionado com o NVD quando um [bloco `cve:`](/pt-br/cve/) está configurado.

## Resolvedor de ciclo de vida

Nenhum — o endoflife.date não tem um calendário do TestRail (404
confirmado). Apenas inventário, por enquanto.
