---
title: Perforce Helix Swarm
description: Como configurar o enodia para sondar o Perforce Helix Swarm.
---

Lê `GET /api/version` para obter a versão — deliberadamente o caminho sem
versão em vez de um `/api/v11/version` específico. A Perforce mudou a
versão mínima desta API ao longo dos anos (o Swarm 2017.3 só fala v7; o
2018.2 fala v9), e requisitar um `vN` fora do intervalo recebe um `401`
em um endpoint que, de resto, é totalmente anônimo. A forma sem versão
evita ter de adivinhar qual `vN` uma determinada instalação ainda aceita.

```yaml
targets:
  - id: swarm-main
    product: perforce-swarm
    address: https://swarm.example.com
```

## Autenticação

Nenhuma — o endpoint não aceita nenhum tipo de credencial.

## Análise da versão

O campo bruto tem o formato `SWARM/2024.6/2710109 (2025/01/28)` — que é
decomposto em uma versão simples (`2024.6`), um changelist e uma data de
lançamento. Um formato não reconhecido recai em manter a string bruta
como `version`, em vez de falhar de imediato, já que ela ainda é o fato
que o servidor informou.

## Campos registrados

- `version` — por exemplo `2024.6`
- `extra.raw` — a string completa, sem análise
- `extra.changelist`, `extra.releaseDate` — apenas quando o formato foi
  reconhecido

## Correlação de CVEs

Sem correlação — nenhum dos dois bancos de dados tem dados utilizáveis para ele. Consulte [Correlação de CVEs](/pt-br/cve/#quais-produtos-têm-correspondência).

## Resolvedor de ciclo de vida

Nenhum — o endoflife.date não tem calendário em `perforce-swarm`,
`helix-swarm`, `swarm` ou `perforce` (todos com 404 confirmado). Apenas
inventário, por enquanto.
