---
title: phpMyAdmin
description: Como configurar o enodia para sondar o phpMyAdmin.
---

Lê a versão da própria chamada de bootstrap `CommonParams.setAll({...})`
da página de login — o JS do phpMyAdmin usa esse objeto em toda
requisição AJAX que faz, então ele vem em todas as páginas, autenticadas
ou não, sem necessidade de um endpoint de versão separado.

```yaml
targets:
  - id: phpmyadmin-main
    product: phpmyadmin
    address: https://phpmyadmin.example.com
```

## Autenticação

Nenhuma — confirmado ao vivo com um contêiner `phpmyadmin/phpmyadmin`
real.

## Campos registrados

Apenas `version` — esta sonda não registra nenhum campo `extra`.

## Correlação de CVEs

Correlacionado com o NVD e o BDU FSTEC quando um [bloco `cve:`](/pt-br/cve/) está configurado.

## Resolvedor de ciclo de vida

`endoflife:phpmyadmin`.
