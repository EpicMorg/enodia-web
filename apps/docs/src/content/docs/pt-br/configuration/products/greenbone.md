---
title: Greenbone / OpenVAS
description: Como configurar o enodia para sondar o Greenbone / OpenVAS.
---

Lê a versão do gsad — o daemon web Greenbone Security Assistant que fica
na frente do OpenVAS — a partir de `GET /gmp`. O esquema padrão é
`https`. `product: openvas` e `product: gsad` são aceitos como aliases.

```yaml
targets:
  - id: greenbone-main
    product: greenbone
    address: https://greenbone.example.com
```

## Por que o 401 de `/gmp`

O gsad envolve cada resposta de `/gmp` em um envelope que traz a sua
versão, inclusive o 401 para uma requisição sem sessão:
`<envelope><version>24.12.0</version><vendor_version></vendor_version>…`
("Authentication required … (GSA 24.12.0)"). A sonda aceita esse 401 e
lê o envelope. A própria interface web é um bundle React estático, sem
versão nele.

A versão é a do gsad. O scanner (openvas-scanner) e o gvmd por trás dele
têm versões próprias e não são visíveis sem login.

## Autenticação

Nenhuma — o endpoint não aceita nenhum tipo de credencial.

## Campos registrados

- `version` — por exemplo `24.12.0`, de `<envelope><version>`
- `extra.vendorVersion` — `<vendor_version>`, quando não vazio

## Correlação de CVEs

Correlacionado com o NVD quando um [bloco `cve:`](/pt-br/cve/) está
configurado — como gsad (`greenbone_security_assistant`), não como o
daemon `openvas_manager`.

## Resolvedor de ciclo de vida

`github:greenbone/gsad` — o endoflife.date não tem um calendário do
Greenbone (404 confirmado), então a resolução é feita pelos GitHub
Releases: apenas a tag publicada mais recente que não seja pré-lançamento,
sem datas de eol/support/lts (o GitHub não tem opinião sobre política de
ciclo de vida, apenas sobre "qual é o lançamento mais recente").
