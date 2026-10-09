---
title: Euro-Office Docs
description: Como configurar o enodia para sondar o Euro-Office Docs.
---

O Euro-Office Docs é o fork do ONLYOFFICE Docs que o Nextcloud distribui
(`nextcloud/aio-eurooffice`). Assim como o
[ONLYOFFICE Docs](/pt-br/configuration/products/onlyoffice/), ele é lido
anonimamente a partir da raiz do servidor de documentos, `GET /index.html`
— "Version: 9.3.1. Build: 37. Release date: 2016-06-29…" — e depois
`GET /welcome/` é lido para verificar a marca. O esquema padrão é `https`.

```yaml
targets:
  - id: eurooffice-main
    product: euro-office
    address: https://office.example.com
```

## Uma sonda, dois produtos

O Euro-Office compartilha a sonda com o
[`onlyoffice`](/pt-br/configuration/products/onlyoffice/), mas tem a sua
própria linha de lançamentos (Euro-Office/DocumentServer: v9.3.3, v9.3.4,
v9.3.4-hotfix.1), separada da do ONLYOFFICE (v9.3.1, v9.4.0), então é um
produto próprio, com o seu próprio resolvedor — comparado com os
lançamentos do ONLYOFFICE, um Euro-Office atualizado sempre pareceria
atrasado. A data de lançamento no seu `/index.html` é um valor fictício;
a versão é real (o pacote da própria imagem é
`euro-office-documentserver 9.3.1-dev.1`).

O `/index.html` é idêntico em ambos, então a marca vem do título de
`/welcome/`: "Euro-Office Docs Community Edition" vs "ONLYOFFICE Docs
Community Edition". **Um servidor da outra marca é recusado, com o
produto a usar**: `product: euro-office` apontado para um servidor
ONLYOFFICE falha com `this document server is ONLYOFFICE, not Euro-Office —
use product: onlyoffice`. Se a página de boas-vindas estiver desativada
(404), o servidor é considerado aquilo que a configuração diz.

## Autenticação

Nenhuma — as duas páginas são públicas, e a sonda não aceita nenhum tipo
de credencial. Desde a 2.2.0, uma credencial associada a um alvo
`euro-office` é um erro de configuração, e não é ignorada silenciosamente
— consulte [Configuração → Credenciais](/pt-br/configuration/#credenciais).

## Campos registrados

- `version` — por exemplo `9.3.1`
- `extra.build` — o número do build, por exemplo `37`
- `extra.edition` — a partir do tipo de pacote: `community` (0),
  `enterprise` (1) ou `developer` (2)
- `extra.brand` — a marca do título de `/welcome/` (`Euro-Office`),
  quando a página de boas-vindas está ativa

## Correlação de CVEs

Sem correlação — nenhum dos dois bancos de dados tem dados utilizáveis para ele. Consulte [Correlação de CVEs](/pt-br/cve/#quais-produtos-têm-correspondência).
É um fork sem entradas próprias; as entradas do ONLYOFFICE não são
aplicadas a ele.

## Resolvedor de ciclo de vida

`github:Euro-Office/DocumentServer` — o endoflife.date não tem um
calendário do Euro-Office (404 confirmado), então a resolução é feita
pelos GitHub Releases: apenas a tag publicada mais recente que não seja
pré-lançamento, sem datas de eol/support/lts (o GitHub não tem opinião
sobre política de ciclo de vida, apenas sobre "qual é o lançamento mais
recente").
