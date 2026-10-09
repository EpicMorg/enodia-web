---
title: openHAB
description: Como configurar o enodia para sondar o openHAB.
---

Lê a raiz da API REST, `GET /rest/`, que o openHAB serve sem login.

```yaml
targets:
  - id: openhab-main
    product: openhab
    address: https://openhab.example.com
```

## Qual versão é qual

`/rest/` responde com duas versões: um `version` de nível superior
(`"8"`), que é o da própria API REST, e `runtimeInfo.version` (`"5.2.2"`),
que é o do openHAB — confirmado ao vivo em `openhab/openhab:latest`, cujo
`version.properties` informava openhab-distro 5.2.2. A sonda informa
`runtimeInfo.version`; a versão da API REST vai para `extra`.

## Autenticação

Opcional. `/rest/` responde anonimamente por padrão; `/rest/systeminfo`
exige login e não é usado. Para uma instância que desativa o acesso
anônimo, credenciais `bearer` ou `basic` são repassadas, se configuradas:

```yaml
credentials:
  openhab-token:
    kind: bearer
    value: "${OPENHAB_TOKEN}"
```

Qualquer outro tipo é um erro de configuração. Consulte
[Configuração → Credenciais](/pt-br/configuration/#credenciais).

## Campos registrados

- `version` — `runtimeInfo.version`, por exemplo `5.2.2`
- `extra.build` — `runtimeInfo.buildString`, por exemplo `Release Build`
- `extra.restApiVersion` — o `version` de nível superior, por exemplo `8`

## Correlação de CVEs

Correlacionado com o NVD quando um [bloco `cve:`](/pt-br/cve/) está configurado.

## Resolvedor de ciclo de vida

`github:openhab/openhab-distro` — o endoflife.date não tem um calendário
do openHAB (404 confirmado), então a resolução é feita pelos GitHub
Releases: apenas a tag publicada mais recente que não seja pré-lançamento,
sem datas de eol/support/lts (o GitHub não tem opinião sobre política de
ciclo de vida, apenas sobre "qual é o lançamento mais recente"). O
openhab-distro publica milestones (`5.3.0.M2`) como lançamentos comuns,
sem marcá-los como pré-lançamentos; o resolvedor os ignora pelo nome da
tag, para que um milestone não faça todo openHAB estável parecer
atrasado.
