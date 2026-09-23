---
title: WordPress
description: Como configurar o enodia para sondar o WordPress.
---

Tenta duas superfícies anônimas, em ordem, e usa a que responder
primeiro:

1. A linha `<generator>` do próprio feed RSS (`/?feed=rss2` — a forma com
   query string, que funciona independentemente de permalinks amigáveis
   estarem configurados).
2. A tag `<meta name="generator" content="WordPress X.Y.Z" />` da página
   inicial (`/`).

```yaml
targets:
  - id: wordpress-main
    product: wordpress
    address: https://blog.example.com
```

## Autenticação

Nenhuma — o endpoint não aceita nenhum tipo de credencial.

## Por que o feed é tentado primeiro

O feed sobrevive à etapa de hardening mais comum de todas: o WordPress
registra a sua tag generator nos hooks do feed separadamente da própria
action `wp_head` da página inicial, então o snippet de uma linha
`remove_action('wp_head', 'wp_generator')` que todo tutorial de "esconda a
versão do seu WordPress" oferece remove apenas a tag da página inicial, e
não a do feed — confirmado lendo os próprios registros de hooks do
WordPress, e não suposto. Um site que foi além e desabilitou os feeds
completamente, ou removeu os dois sinais, recai em um erro claro de "não
suportado".

## Campos registrados

Apenas `version` — esta sonda não registra nenhum campo `extra`.

## Correlação de CVEs

Correlacionado com o NVD e o BDU FSTEC quando um [bloco `cve:`](/pt-br/cve/) está configurado.

## Resolvedor de ciclo de vida

`endoflife:wordpress`.
