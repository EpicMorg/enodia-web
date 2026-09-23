---
title: Grafana
description: Como configurar o enodia para sondar o Grafana.
---

Lê `GET /api/health` para obter a versão.

```yaml
targets:
  - id: grafana-main
    product: grafana
    address: https://grafana.example.com
```

## Autenticação

Nenhuma — confirmado ao vivo: este endpoint responde `200` com um corpo
válido mesmo com credenciais Basic erradas. Ele existe para a verificação
de liveness de um balanceador de carga, não como uma rota de API
protegida, então não há caminho com credenciais a oferecer aqui.

## Campos registrados

- `version`
- `extra.commit`, `extra.database`

## Correlação de CVEs

Correlacionado com o NVD e o BDU FSTEC quando um [bloco `cve:`](/pt-br/cve/) está configurado.

## Resolvedor de ciclo de vida

`endoflife:grafana`.
