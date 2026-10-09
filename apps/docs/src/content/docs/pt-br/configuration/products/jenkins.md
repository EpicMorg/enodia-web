---
title: Jenkins
description: Como configurar o enodia para sondar o Jenkins.
---

Lê a versão do **cabeçalho de resposta `X-Jenkins`**, não do corpo da
resposta — o Jenkins define esse cabeçalho em toda resposta, inclusive em
um `403` para uma requisição sem autenticação, enquanto o corpo que uma
requisição autenticada recebe não tem campo de versão em lugar nenhum.

```yaml
targets:
  - id: jenkins-main
    product: jenkins
    address: https://jenkins.example.com
```

## Autenticação

Opcional. Uma instância nova com o seu security realm padrão responde a
`/api/json` com `403` para uma requisição anônima — isso não é uma falha
aqui, pois `X-Jenkins` continua definido nessa mesma resposta. A
autenticação Basic é aceita caso você prefira se autenticar:

```yaml
credentials:
  jenkins-admin:
    kind: basic
    username: admin
    password: "${JENKINS_TOKEN}"
```

## Campos registrados

- `version` — a partir do cabeçalho `X-Jenkins`
- `extra.mode`, `extra.useSecurity` — preenchidos apenas quando a
  requisição foi autenticada o suficiente para receber um corpo `200`;
  ausentes em um `403` anônimo

## Correlação de CVEs

Correlacionado com o NVD e o BDU FSTEC quando um [bloco `cve:`](/pt-br/cve/) está configurado. As versões weekly (`2.580`) e LTS
(`2.568.3`) recebem a mesma correção com números diferentes; desde a
2.2, o próprio formato da versão escolhe a linha de versões, então uma LTS
corrigida não é mais marcada pelo intervalo weekly da mesma correção —
consulte [Correspondência sensível à edição](/pt-br/cve/#correspondência-sensível-à-edição).

## Resolvedor de ciclo de vida

`endoflife:jenkins`.
