---
title: Nextcloud
description: Como configurar o enodia para sondar o Nextcloud.
---

Lê `GET /status.php` para obter a versão — um endpoint de health check
para balanceadores de carga, acessível até mesmo antes de a configuração
inicial ter sido executada e enquanto o modo de manutenção está ativo.

```yaml
targets:
  - id: nextcloud-main
    product: nextcloud
    address: https://nextcloud.example.com
```

## Autenticação

Nenhuma — o endpoint não aceita nenhum tipo de credencial.

## Qual campo de versão

O valor informado é `versionstring` (por exemplo `34.0.3`), e não
`version` (por exemplo `34.0.3.2`) — confirmado ao vivo: `versionstring`
é o que os ciclos do [endoflife.date](https://endoflife.date/nextcloud)
usam para `latest`, e o quarto componente interno de build de `version`
nunca aparece no calendário de ciclo de vida.

## Campos registrados

- `version` — a partir de `versionstring`
- `extra.installed`, `extra.maintenance` — `"true"`/`"false"`
- `extra.buildVersion` — o campo `version` bruto, mantido como referência
- `extra.enterprise` — a partir do `edition` do `status.php`: vazio (o
  servidor community, confirmado ao vivo) → `"false"`, `enterprise` →
  `"true"`; qualquer outro valor fica sem ser informado em vez de
  adivinhado

## Correlação de CVEs

Correlacionado com o NVD e o BDU FSTEC quando um [bloco `cve:`](/pt-br/cve/) está configurado. Com reconhecimento de edição: a sonda registra a edição do próprio servidor em `extra.enterprise`, e uma instância community não vê achados exclusivos da edição enterprise. Uma edição desconhecida mantém todos os achados.

## Resolvedor de ciclo de vida

`endoflife:nextcloud`.
