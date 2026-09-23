---
title: oauth2-proxy
description: Como configurar o enodia para sondar o oauth2-proxy.
---

Lê a versão carimbada no rodapé de `/oauth2/sign_in`. O oauth2-proxy não
tem nenhum endpoint JSON de versão — a página de login é a única
superfície anônima (ela precisa ser renderizada antes de existir qualquer
sessão), e o seu template padrão escreve a versão diretamente no texto do
rodapé.

```yaml
targets:
  - id: oauth2-proxy-main
    product: oauth2-proxy
    address: https://auth.example.com
```

## Autenticação

Nenhuma — confirmado ao vivo com a página padrão de um contêiner
`oauth2-proxy/oauth2-proxy` real.

## A flag `--footer` pode ocultar a versão

A própria flag `--footer` de uma implantação pode substituir ou ocultar
(`-`) essa linha inteira — nesse caso, não há alternativa anônima. Trata-se
de um produto confirmado com a versão omitida pela própria configuração
da implantação, não de um bug da sonda.

## Campos registrados

Apenas `version` — esta sonda não registra nenhum campo `extra`.

## Correlação de CVEs

Correlacionado com o NVD e o BDU FSTEC quando um [bloco `cve:`](/pt-br/cve/) está configurado.

## Resolvedor de ciclo de vida

`github:oauth2-proxy/oauth2-proxy` — hoje não há calendário no
endoflife.date, então a resolução é feita pelos GitHub Releases: apenas a
tag publicada mais recente que não seja pré-lançamento, sem datas de
eol/support/lts.
