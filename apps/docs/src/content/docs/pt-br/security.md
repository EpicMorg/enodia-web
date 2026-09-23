---
title: Segurança
description: Como o enodia lida com as credenciais que ele mantém para a sua infraestrutura.
---

O enodia mantém credenciais para a sua infraestrutura. Algumas
consequências disso são deliberadas, e não acidentais:

- **As credenciais nunca aparecem** no inventário, nos relatórios
  exportados nem nos logs.
- **HTTPS é tentado antes de HTTP.** As credenciais nunca são enviadas por
  HTTP simples, a menos que você habilite isso explicitamente, por serviço,
  com `allow_insecure_transport: true` — consulte
  [Conceitos](/pt-br/concepts/#https-primeiro-credenciais-nunca-enviadas-em-texto-claro-por-padrão).
- **A verificação TLS vem ativada por padrão.** Uma CA personalizada
  (`tls.ca_file`) e a fixação de certificado (`tls.pin_sha256`) são
  suportadas para que `tls.insecure: true` continue sendo um verdadeiro
  último recurso — consulte
  [Configuração](/pt-br/configuration/#tls-tls). Os serviços verificados sem
  validação são sinalizados no relatório, e não aceitos silenciosamente.
- **Os segredos ficam separados.** Uma entrada nomeada em `credentials:`, ou
  um `credentials.yaml` independente referenciado via `credentials_file` —
  consulte [Configuração](/pt-br/configuration/#credentials_file) —, para que
  o inventário dos seus serviços (`enodia.yaml`) possa ser versionado no git
  enquanto os seus segredos não.

Encontrou um problema de segurança? Consulte o
[SECURITY.md](https://github.com/EpicMorg/enodia/blob/master/SECURITY.md)
do enodia no GitHub para saber como reportá-lo de forma responsável.

## Licença

O enodia é licenciado sob **AGPL-3.0-or-later**. Se a AGPL não se encaixar
na sua situação, há uma licença comercial disponível — entre em contato
pelo [developer@epicm.org](mailto:developer@epicm.org).

Contribuir exige assinar o CLA do enodia (o bot cuida disso no seu primeiro
pull request) — ele existe para que o projeto possa ser oferecido sob termos
comerciais junto com a AGPL, e você mantém os direitos autorais sobre o seu
próprio trabalho.
