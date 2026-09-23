---
title: Keycloak
description: Como configurar o enodia para sondar o Keycloak.
---

Lê `GET /admin/serverinfo` para obter a versão.

```yaml
targets:
  - id: keycloak-main
    product: keycloak
    address: https://keycloak.example.com
    credentials: keycloak-token
```

## Autenticação — obrigatória

O Keycloak é o único produto aqui **sem nenhum caminho anônimo para a
versão**: confirmado ao vivo, `/realms/<realm>/.well-known/openid-configuration`
(o endpoint que todo realm expõe sem token) não traz campo de versão em
lugar nenhum, e `/admin/serverinfo` — que traz — responde `401` sem um
token. Um alvo sem credencial configurada é **ignorado**, e não marcado
como falha, no momento da coleta.

```yaml
credentials:
  keycloak-token:
    kind: bearer
    value: "${KEYCLOAK_ACCESS_TOKEN}"
```

Apenas `bearer` é aceito. Obter esse access token — da forma padrão do
OpenID Connect, no endpoint de token do próprio realm — está fora do
escopo do enodia (as sondas cuidam do transporte, não de federação de
identidade): a configuração espera um token já emitido. Access tokens
normalmente têm vida curta, então o que quer que forneça
`KEYCLOAK_ACCESS_TOKEN` no momento da coleta precisa mantê-lo atualizado;
o próprio enodia não tem lógica de renovação de tokens.

## Campos registrados

- `version` — a partir de `systemInfo.version`
- `extra.javaVersion`

## Correlação de CVEs

Correlacionado com o NVD e o BDU FSTEC quando um [bloco `cve:`](/pt-br/cve/) está configurado.

## Resolvedor de ciclo de vida

`endoflife:keycloak`.
