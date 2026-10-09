---
title: ONLYOFFICE Docs
description: Como configurar o enodia para sondar o ONLYOFFICE Docs.
---

Lê a raiz do servidor de documentos, `GET /index.html`, anonimamente — ela
responde mesmo com o JWT ativado: "Server is functioning normally.
Version: 9.4.0. Build: 129. Release date: … Package type: 0. …". Depois
lê `GET /welcome/` para verificar a marca. O esquema padrão é `https`.

```yaml
targets:
  - id: onlyoffice-main
    product: onlyoffice
    address: https://office.example.com
```

## Uma sonda, dois produtos

O ONLYOFFICE Docs e o seu fork
[Euro-Office](/pt-br/configuration/products/euro-office/) (como
distribuído para o Nextcloud) são o mesmo servidor e compartilham uma
sonda, mas cada um tem a sua própria linha de lançamentos, então cada um
é um produto próprio, com o seu próprio resolvedor — comparado com os
lançamentos do ONLYOFFICE, um Euro-Office atualizado sempre pareceria
atrasado.

O `/index.html` é idêntico em ambos, então a marca vem do título de
`/welcome/`: "ONLYOFFICE Docs Community Edition" vs "Euro-Office Docs
Community Edition". **Um servidor da outra marca é recusado, com o
produto a usar**: `product: onlyoffice` apontado para um servidor
Euro-Office falha com `this document server is Euro-Office, not ONLYOFFICE —
use product: euro-office`, em vez de registrá-lo como um fato do
ONLYOFFICE (da mesma forma que o [`mysql`](/pt-br/configuration/products/mysql/)
recusa o MariaDB). Se a página de boas-vindas estiver desativada (404), o
servidor é considerado aquilo que a configuração diz.

O comando `version` do serviço de coautoria exige o segredo JWT, e o
`api.js` não traz versão — daí o `/index.html`.

## Autenticação

Nenhuma — as duas páginas são públicas, e a sonda não aceita nenhum tipo
de credencial. Desde a 2.2.0, uma credencial associada a um alvo
`onlyoffice` é um erro de configuração, e não é ignorada silenciosamente
— consulte [Configuração → Credenciais](/pt-br/configuration/#credenciais).

## Campos registrados

- `version` — por exemplo `9.4.0`
- `extra.build` — o número do build, por exemplo `129`
- `extra.edition` — a partir do tipo de pacote: `community` (0),
  `enterprise` (1) ou `developer` (2)
- `extra.brand` — a marca do título de `/welcome/` (`ONLYOFFICE`), quando
  a página de boas-vindas está ativa

## Correlação de CVEs

Correlacionado com o NVD e o BDU FSTEC quando um [bloco `cve:`](/pt-br/cve/) está configurado.
É usado o `onlyoffice:document_server` do NVD — `onlyoffice:server` é o
Community Server, um produto separado.

## Resolvedor de ciclo de vida

`github:ONLYOFFICE/DocumentServer` — o endoflife.date não tem um
calendário do ONLYOFFICE (404 confirmado), então a resolução é feita
pelos GitHub Releases: apenas a tag publicada mais recente que não seja
pré-lançamento, sem datas de eol/support/lts (o GitHub não tem opinião
sobre política de ciclo de vida, apenas sobre "qual é o lançamento mais
recente").
