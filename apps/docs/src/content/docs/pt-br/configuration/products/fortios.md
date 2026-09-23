---
title: Fortinet FortiOS (FortiGate)
description: Como configurar o enodia para sondar um Fortinet FortiGate com FortiOS.
---

Lê `GET /api/v2/monitor/system/status` — a própria API REST do FortiOS.
Verificado com um FortiGate 601E real executando o FortiOS 7.4.12.

```yaml
targets:
  - id: fw-edge
    product: fortios
    address: https://fw.example.com
    credentials: fortigate-api
```

## Autenticação — obrigatória

Um token de **REST API Admin**: crie um REST API Admin na interface
gráfica do FortiGate (System → Administrators) e copie a chave de API
gerada — o FortiOS a exibe uma única vez. Ela é enviada como um bearer
token simples; sem login de sessão, sem token CSRF, sem parâmetro de
consulta `access_token`:

```yaml
credentials:
  fortigate-api:
    kind: bearer
    value: "${FORTIGATE_API_TOKEN}"
```

Um token ausente ou incorreto recebe `401` (com uma página de erro HTML,
não JSON) — informado como erro de autenticação, como em qualquer outra
sonda. Um REST API Admin pode ser restrito a hosts confiáveis no próprio
FortiOS; se você fizer isso, inclua o endereço a partir do qual o enodia
se conecta.

## Campos registrados

- `version` — como o FortiOS a informa, por exemplo `v7.4.12` (o `v`
  inicial é removido na comparação, não no registro)
- `extra.model` — por exemplo `FG6H1E` (o 601E)
- `extra.build` — o número do build do FortiOS

O hostname do dispositivo está na mesma resposta, mas deliberadamente não
é registrado.

## Correlação de CVEs

Correlacionado com o NVD e o BDU FSTEC quando um [bloco `cve:`](/pt-br/cve/) está configurado.

## Resolvedor de ciclo de vida

`endoflife:fortios`. A página do FortiOS no endoflife.date traz ciclos de
lançamento e datas, mas nenhuma "versão mais recente" para qualquer ciclo,
então o eixo de ciclo de vida funciona enquanto `drift` mostra
`LATEST: -` e `PATCH: unknown` — uma lacuna nos dados de origem, não um
bug da sonda.
