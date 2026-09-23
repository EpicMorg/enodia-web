---
title: Portainer
description: Como configurar o enodia para sondar o Portainer.
---

Lê `GET /api/system/status` para obter a versão (o alias mais antigo
`/api/status` responde de forma idêntica, mas esta sonda sempre usa o
caminho atual).

```yaml
targets:
  - id: portainer-main
    product: portainer
    address: https://portainer.example.com
```

## Autenticação

Nenhuma — o endpoint é intencionalmente público, acessível antes mesmo de
a conta de administrador obrigatória da primeira execução ter sido
criada.

## Campos registrados

- `version`
- `extra.instanceId`

## Correlação de CVEs

Correlacionado com o NVD e o BDU FSTEC quando um [bloco `cve:`](/pt-br/cve/) está configurado.

## Resolvedor de ciclo de vida

`github:portainer/portainer` — o endoflife.date não tem um calendário do
Portainer (404 confirmado), então a resolução é feita pelos GitHub
Releases: apenas a tag publicada mais recente que não seja pré-lançamento,
sem datas de eol/support/lts (o GitHub não tem opinião sobre política de
ciclo de vida, apenas sobre "qual é o lançamento mais recente").
