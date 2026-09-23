---
title: SonarQube
description: Como configurar o enodia para sondar o SonarQube Server ou o Community Build.
---

Lê `GET /api/system/status` para obter a versão — o mesmo endpoint,
independentemente de qual SonarQube você de fato executa (veja abaixo).

```yaml
targets:
  - id: sonarqube-main
    product: sonarqube
    address: https://sonarqube.example.com
```

## Autenticação

Nenhuma — este endpoint (junto com `/api/server/version` e
`/api/system/ping`) continua acessível sem credenciais mesmo depois de
habilitar a configuração global "Force user authentication" do SonarQube.
O SonarQube o trata como uma rota de health check que um balanceador de
carga precisa acessar sem login, e não como uma API protegida comum.

## SonarQube Server vs. SonarQube Community Build

A SonarSource dividiu o "SonarQube" em dois produtos no final de 2024:
o **SonarQube Server** (a continuação direta de todas as antigas edições
Community/Developer/Enterprise/Data Center, ainda com versionamento por
calendário `2025.1`, `2026.4`, ...) e o **SonarQube Community Build** (um
build novo, separado e sempre gratuito, com cadência própria mais rápida,
versionado como `24.12`, `25.12`, `26.9`, ... — o mesmo esquema de
calendário, só que com o ano em dois dígitos em vez de quatro). O
endoflife.date acompanha os dois como páginas distintas, com dados de
ciclos realmente diferentes — `product: sonarqube` não precisa de uma
segunda entrada de configuração para diferenciá-los, já que qual deles se
aplica pode ser lido de forma confiável na string de versão que o
`sonarqubeProbe` já obtém:

- Um ano inicial de quatro dígitos (`2025.x`, `2026.x`) → **SonarQube Server**.
- Um de dois dígitos a partir de `24` (`24.x`, `25.x`, `26.x`) →
  **SonarQube Community Build**.
- Qualquer valor menor (um major simples anterior à divisão, por exemplo
  `9.9.8.100196`, `10.7.0.96327`) → tratado como Community Build, já que
  as duas páginas trazem histórico idêntico para versões anteriores à
  divisão.

## Campos registrados

- `version`
- `extra.id`
- `extra.status` — um de `UP`, `DOWN`, `STARTING`, `RESTARTING`,
  `DB_MIGRATION_NEEDED`, `DB_MIGRATION_RUNNING`; um fato sobre a saúde do
  servidor registrado como está, e não transformado em erro quando não é
  `UP`

## Correlação de CVEs

Correlacionado com o NVD e o BDU FSTEC quando um [bloco `cve:`](/pt-br/cve/) está configurado.

## Resolvedor de ciclo de vida

Escolhido por observação, não fixo: `endoflife:sonarqube-server` ou
`endoflife:sonarqube-community`, conforme a string de versão, como
descrito acima. A própria listagem de `enodia products` (que é executada
sem nada ter sido sondado ainda) mostra `endoflife:sonarqube-server` como
fallback estático — isso é apenas o que aparece antes de qualquer alvo
ter sido de fato verificado, e não necessariamente aquilo contra o qual
toda observação é resolvida.
