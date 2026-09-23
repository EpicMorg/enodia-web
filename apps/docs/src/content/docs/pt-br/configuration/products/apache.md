---
title: Apache HTTP Server
description: Como configurar o enodia para sondar o Apache HTTP Server.
---

Lê o cabeçalho de resposta `Server` que o Apache httpd define em toda
resposta — o mesmo tipo de problema do [nginx](/pt-br/configuration/products/nginx/):
não existe endpoint de versão, e qualquer código de status ainda traz o
cabeçalho. `product: httpd` é aceito como alias.

```yaml
targets:
  - id: apache-main
    product: apache
    address: https://www.example.com
```

## Autenticação

Nenhuma — o cabeçalho `Server` é enviado em toda resposta, independentemente da autenticação.

## `ServerTokens Prod` remove a versão

Confirmado ao vivo com contêineres `httpd:2.4` reais: o build padrão
responde `"Apache/2.4.68 (Unix)"`; `ServerTokens Prod` (a diretiva de
hardening do próprio Apache, comum em produção) reduz isso a um simples
`"Apache"`, sem versão alguma — um produto confirmado sem nada que possa
ser comparado com um calendário de ciclo de vida, não um bug do parser.

## Campos registrados

Apenas `version` — esta sonda não registra nenhum campo `extra`.

## Correlação de CVEs

Correlacionado com o NVD e o BDU FSTEC quando um [bloco `cve:`](/pt-br/cve/) está configurado.

## Resolvedor de ciclo de vida

`endoflife:apache-http-server` — tanto `apache` quanto `httpd` fazem
redirecionamento 301 para esse slug no endoflife.date; o enodia resolve o
slug de destino diretamente, em vez de dar esse salto extra a cada
consulta.
