---
title: HashiCorp Vault
description: Como configurar o enodia para sondar o HashiCorp Vault.
---

Lê `GET /v1/sys/health` para obter a versão — o endpoint de health check
de cluster do Vault, deliberadamente anônimo para que um balanceador de
carga possa consultá-lo. Enviar um token não faz diferença alguma aqui.

```yaml
targets:
  - id: vault-main
    product: vault
    address: https://vault.example.com
```

## Autenticação

Nenhuma — o endpoint não aceita nenhum tipo de credencial, por design.

## Estado do cluster não é falha

`/sys/health` responde com códigos de status diferentes dependendo da
topologia do cluster — selado (`503`), standby (`429`), standby de
DR/performance (`472`/`473`), não inicializado (`501`) — e **todos eles
ainda trazem o mesmo corpo JSON, com a versão incluída**. O enodia trata
todos como observações bem-sucedidas, e não como erros: um nó do Vault
selado é um fato sobre esse nó, e não uma falha da sonda (consulte
[Conceitos](/pt-br/concepts/#fatos-e-julgamento-são-separados)).

## Campos registrados

- `version`
- `extra.initialized`, `extra.sealed`, `extra.standby` — `"true"`/`"false"`
- `extra.clusterName`, quando presente
- `extra.enterprise` — `"true"`/`"false"`, apenas quando `/sys/health` traz o seu campo `enterprise`

## Correlação de CVEs

Correlacionado com o NVD e o BDU FSTEC quando um [bloco `cve:`](/pt-br/cve/) está configurado. Com reconhecimento de edição: a sonda registra a edição do próprio servidor em `extra.enterprise`, e uma instância community não vê achados exclusivos da edição enterprise. Uma edição desconhecida mantém todos os achados.

## Resolvedor de ciclo de vida

`endoflife:hashicorp-vault`.
