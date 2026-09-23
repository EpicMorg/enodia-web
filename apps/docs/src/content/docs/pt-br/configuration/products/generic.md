---
title: Generic
description: Como configurar a sonda genérica do enodia para sistemas internos ou não suportados.
---

A válvula de escape para tudo que não tem uma sonda dedicada — um bloco
`parser:` escrito à mão em vez de lógica Go compilada. A referência
completa dos campos, o vocabulário congelado `json`/`xml`/`header`/`plaintext`/`regex`
e a observação sobre a grafia do campo `clean_regex` estão em
[Configuração → A sonda genérica](/pt-br/configuration/#a-sonda-genérica);
esta página existe apenas para que `generic` apareça ao lado dos outros 89
produtos na barra lateral.

```yaml
targets:
  - id: in-house-api
    product: generic
    address: https://internal.example.com
    parser:
      type: regex
      regex: 'v(\d+\.\d+\.\d+)'
```

## Autenticação

`none`, `bearer`, `token-header` e `basic` são todos aceitos — o que o
seu serviço interno realmente espera.

## Correlação de CVEs

Sem correlação — um parser escrito à mão não tem identidade de produto pela qual procurar CVEs. Consulte [Correlação de CVEs](/pt-br/cve/#quais-produtos-têm-correspondência).

## Resolvedor de ciclo de vida

Nenhum — um alvo feito à mão, por definição, não tem calendário a
consultar. Não encontrou o seu produto na lista das 89 sondas dedicadas?
Consulte [Produtos suportados](/pt-br/products/#não-encontrou-o-seu-produto) para
os dois caminhos possíveis: esta válvula de escape ou a solicitação de uma
sonda de verdade.
