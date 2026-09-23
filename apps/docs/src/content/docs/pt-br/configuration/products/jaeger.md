---
title: Jaeger
description: Como configurar o enodia para sondar o Jaeger.
---

Lê a versão que o query-service do Jaeger (o componente que serve a
interface, porta 16686 por padrão) embute no seu próprio `index.html` por
meio de um search/replace em tempo de build — não existe uma API de
versão separada.

```yaml
targets:
  - id: jaeger-main
    product: jaeger
    address: https://jaeger.example.com
```

## Autenticação

Nenhuma — o Jaeger não tem autenticação própria alguma. Uma implantação
atrás de um proxy reverso ou de um gateway de SSO (o oauth2-proxy é uma
escolha real comum) responde com um redirecionamento para o fluxo de
login desse gateway em vez do HTML do Jaeger, o que aparece como o erro
"no JAEGER_VERSION found" desta sonda — não é algo que esta sonda consiga
concluir por conta própria, o mesmo tipo de lacuna que um produto com
login por formulário teria.

## Campos registrados

Apenas `version` — esta sonda não registra nenhum campo `extra`.

## Correlação de CVEs

Correlacionado com o NVD quando um [bloco `cve:`](/pt-br/cve/) está configurado.

## Resolvedor de ciclo de vida

`endoflife:jaeger`.
