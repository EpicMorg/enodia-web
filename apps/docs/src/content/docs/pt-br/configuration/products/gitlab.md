---
title: GitLab
description: Como configurar o enodia para sondar o GitLab.
---

Lê `GET /api/v4/version` para obter a versão.

```yaml
targets:
  - id: gitlab-main
    product: gitlab
    address: https://gitlab.example.com
    credentials: gitlab-token
```

## Autenticação

O GitLab exige uma credencial para este endpoint por padrão — uma
requisição sem autenticação recebe um `401`. Um personal access token
funciona das duas formas, confirmado ao vivo com uma instância real:

```yaml
credentials:
  gitlab-token:
    kind: token-header
    header: PRIVATE-TOKEN
    value: "${GITLAB_TOKEN}"

  # igualmente válido — o mesmo token como bearer token simples
  gitlab-token-bearer:
    kind: bearer
    value: "${GITLAB_TOKEN}"
```

## Campos registrados

- `version`
- `extra.revision`, quando presente
- `extra.enterprise` — `"true"`/`"false"`, GitLab EE vs. CE

## Correlação de CVEs

Correlacionado com o NVD e o BDU FSTEC quando um [bloco `cve:`](/pt-br/cve/) está configurado. Com reconhecimento de edição: a sonda registra a edição do próprio servidor em `extra.enterprise`, e uma instância community não vê achados exclusivos da edição enterprise. Uma edição desconhecida mantém todos os achados.

## Resolvedor de ciclo de vida

`endoflife:gitlab`.
