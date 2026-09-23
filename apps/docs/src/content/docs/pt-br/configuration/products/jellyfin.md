---
title: Jellyfin
description: Como configurar o enodia para sondar o Jellyfin.
---

Lê `GET /System/Info/Public` para obter a versão — a variante "Public" do
endpoint de informações do sistema do Jellyfin, intencionalmente
acessível antes de existir qualquer login.

```yaml
targets:
  - id: jellyfin-main
    product: jellyfin
    address: https://jellyfin.example.com
```

## Autenticação

Nenhuma — o endpoint não aceita nenhum tipo de credencial.

## Verificação da identidade do fornecedor

O `ProductName` da resposta é comparado com `"Jellyfin Server"`. A mesma
resposta também traz o `ServerName` desta implantação, um `Id` persistente
da instalação e o seu `LocalAddress` — nada disso descreve o software em
si, então apenas `Version` e `ProductName` são lidos.

## Correlação de CVEs

Correlacionado com o NVD quando um [bloco `cve:`](/pt-br/cve/) está configurado.

## Resolvedor de ciclo de vida

`github:jellyfin/jellyfin` — o endoflife.date não tem um calendário do
Jellyfin (404 confirmado), então a resolução é feita pelos GitHub
Releases: apenas a tag publicada mais recente que não seja pré-lançamento,
sem datas de eol/support/lts (o GitHub não tem opinião sobre política de
ciclo de vida, apenas sobre "qual é o lançamento mais recente").
