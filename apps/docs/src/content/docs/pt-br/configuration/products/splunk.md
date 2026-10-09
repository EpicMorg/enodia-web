---
title: Splunk
description: Como configurar o enodia para sondar o Splunk.
---

Lê `GET /services/server/info?output_mode=json` da porta de
gerenciamento do splunkd, não da interface web. Um endereço sem porta
recebe `8089` (a porta de gerenciamento do splunkd); o esquema padrão é
`https`.

```yaml
targets:
  - id: splunk-main
    product: splunk
    address: splunk.example.com
    credentials: splunk-monitor
```

## Por que a porta de gerenciamento

A interface web (porta 8000) é o lugar errado para perguntar: ela
costuma ser publicada atrás de um proxy ou CDN, e a sua página de login
não traz uma versão em que valha a pena confiar. A porta de
gerenciamento do splunkd é direta, e `/services/server/info` responde com
`entry[0].content` — `version`, `build`, `product_type`,
`isFree`/`isTrial`. A sonda não tem nada a ler na porta web, e é por isso
que um nome de host simples recebe `8089`, em vez da porta padrão do
esquema.

## Autenticação — obrigatória

Sem credenciais, o splunkd responde `401` com um XML
`<msg type="ERROR">Unauthorized</msg>` e `Server: Splunkd` (visto em um
9.4.1 de produção e em `splunk/splunk` 10.6.0.5). Dois tipos são aceitos
— um usuário do Splunk via HTTP Basic, ou um token de autenticação do
Splunk como Bearer:

```yaml
credentials:
  splunk-monitor:
    kind: basic
    username: monitor
    password: "${SPLUNK_PASSWORD}"
```

```yaml
credentials:
  splunk-token:
    kind: bearer
    value: "${SPLUNK_TOKEN}"
```

Qualquer outro tipo é um erro de configuração. Consulte
[Configuração → Credenciais](/pt-br/configuration/#credenciais).

## Campos registrados

- `version` — `entry[0].content.version`, por exemplo `10.6.0.5`
- `extra.build` — por exemplo `86587d4e3b27`
- `extra.license` — `free` ou `trial`, quando o splunkd informa um deles;
  ausente caso contrário
- `extra.productType` — o próprio `product_type` do splunkd, por exemplo
  `enterprise`

## Correlação de CVEs

Correlacionado com o NVD e o BDU FSTEC quando um [bloco `cve:`](/pt-br/cve/) está configurado.

Sensível à edição: o NVD divide `splunk:splunk` por edição em
`enterprise` e na há muito aposentada `light`, e `extra.productType`
(`enterprise`, `lite`) escolhe qual se aplica. Uma edição desconhecida
mantém todos os achados. O Splunk Cloud tem o seu próprio CPE e não é
mapeado.

## Resolvedor de ciclo de vida

`endoflife:splunk`. Um build mais novo que o calendário (10.6, numa época
em que o endoflife.date listava até a 10.4) aparece como
`cycle_unmatched` até o calendário o alcançar.
