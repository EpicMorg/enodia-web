---
title: Mattermost
description: Como configurar o enodia para sondar o Mattermost.
---

Lê `GET /api/v4/config/client?format=old` para obter a versão — o mesmo
endpoint público de configuração do cliente de que uma página de login
precisa antes de existir qualquer sessão.

```yaml
targets:
  - id: mattermost-main
    product: mattermost
    address: https://mattermost.example.com
```

## Autenticação

Nenhuma — o endpoint não aceita nenhum tipo de credencial.

A resposta real é um dump completo da configuração do cliente — mais de
cem chaves, incluindo feature flags, cores de botões de SSO e campos que
de fato identificam a implantação (`SiteName`, `SupportEmail`, um ID de
telemetria/diagnóstico, uma chave pública de assinatura). Nada disso
descreve o software em si, então apenas `Version` e os campos `Build*`
são lidos.

## Campos registrados

- `version`
- `extra.buildNumber`, `extra.buildHash`

## Correlação de CVEs

Correlacionado com o NVD e o BDU FSTEC quando um [bloco `cve:`](/pt-br/cve/) está configurado.

## Resolvedor de ciclo de vida

`endoflife:mattermost`.
