---
title: nginx
description: Como configurar o enodia para sondar o nginx.
---

Lê o cabeçalho de resposta `Server` que o nginx define em toda resposta.
Não existe endpoint de versão: o nginx (ao contrário da API REST do NGINX
Plus) não expõe mais nada anonimamente — o `/stub_status` do
`ngx_http_stub_status_module` fornece contadores de conexão, nunca uma
versão.

```yaml
targets:
  - id: nginx-main
    product: nginx
    address: https://www.example.com
```

## Autenticação

Nenhuma — qualquer código de status é aceito, já que o nginx carimba o
seu próprio cabeçalho `Server` em páginas de erro e redirecionamentos da
mesma forma que em um `200`. Um alvo cujo `/` por acaso retorne 404 ou
fique atrás de um vhost com basic auth ainda informa a versão sem
problemas. Confirmado ao vivo com contêineres `nginx:1.27.4` reais para
os dois casos.

## `server_tokens off` remove a versão

A configuração de hardening do próprio nginx (comum em produção) carimba
o cabeçalho como um simples `"nginx"`, sem versão alguma — um produto
confirmado sem nada que possa ser comparado com um calendário de ciclo de
vida, não um bug do parser.

## Campos registrados

Apenas `version` — esta sonda não registra nenhum campo `extra`.

## Correlação de CVEs

Correlacionado com o NVD e o BDU FSTEC quando um [bloco `cve:`](/pt-br/cve/) está configurado.

## Resolvedor de ciclo de vida

`endoflife:nginx`.
