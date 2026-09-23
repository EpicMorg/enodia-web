---
title: Configuração
description: Todos os campos aceitos por enodia.yaml, credentials.yaml e settings.yaml.
---

O enodia lê até três arquivos: **`enodia.yaml`** (obrigatório — o inventário
dos seus serviços), um **`credentials.yaml`** separado e opcional, e um
**`settings.yaml`** opcional (preferências pessoais de exibição, nunca
obrigatório). Os três são YAML simples.

## `enodia.yaml`

### Nível superior

```yaml
schemaVersion: 1
credentials_file: credentials.yaml   # opcional, veja abaixo
defaults:                            # opcional
  timeout: 10s
  concurrency: 5
  retries: 2
  backoff: 500ms
cve:                                 # opcional, veja "Correlação de CVEs"
  bdu:
    path: vulxml.zip
  nvd:
    path: nvd/
credentials: {}                      # opcional, veja "Credenciais"
targets: []                          # os seus serviços
```

O `schemaVersion` é verificado na leitura — uma versão futura é recusada
com a recomendação de atualizar, em vez de ser processada de forma
otimista.

### `defaults`

Aplica-se a todos os alvos, a menos que seja sobrescrito por alvo.

| Campo | Tipo | Significado |
|---|---|---|
| `timeout` | duration | Tempo limite por requisição (padrão: `10s` se não for definido em lugar nenhum) |
| `concurrency` | int | Quantos alvos são sondados ao mesmo tempo |
| `retries` | int | Número de novas tentativas — só `ErrUnreachable` é repetido; uma credencial rejeitada não melhora numa segunda tentativa |
| `backoff` | duration | Intervalo entre as novas tentativas |

As durações usam a sintaxe de duration do Go: `500ms`, `10s`, `2m`,
`1h30m`.

### `cve`

Opcional. Aponta o enodia para uma exportação do BDU FSTEC
(`cve.bdu.path`) e/ou para feeds JSON do NVD (`cve.nvd.path`) que você
mesmo baixou — o enodia nunca os busca. Caminhos relativos são resolvidos
em relação ao diretório desta própria configuração, e um caminho
configurado que não existe é um erro. O que ele faz, como obter os
arquivos e quais produtos têm correspondência:
[Correlação de CVEs](/pt-br/cve/).

### `targets`

Uma entrada por serviço:

```yaml
targets:
  - id: jira-main               # obrigatório, estável entre renomeações - métricas e histórico usam esta chave
    name: Jira (production)     # opcional, o padrão é o id
    product: jira                # obrigatório - veja Produtos suportados
    address: https://jira.example.com   # obrigatório
    credentials: jira-token      # opcional, nome de uma entrada em credentials:
    timeout: 15s                 # opcional, sobrescreve defaults.timeout
    path: /rest/api/2/serverInfo # opcional, específico do produto - a maioria das sondas tem um padrão sensato
    method: GET                  # opcional
    headers:                     # opcional, cabeçalhos extras enviados em toda requisição
      X-Custom: value
    allow_insecure_transport: false   # opcional - veja "HTTPS primeiro" em Conceitos
    tls:                          # opcional, veja "TLS" abaixo
      ca_file: /etc/enodia/ca.pem
    options:                      # opcional, parâmetros chave/valor específicos do produto
      key: value
    parser:                       # só para product: generic - veja abaixo
      type: regex
```

O `address` é escrito exatamente como você o digitaria — cada sonda o
interpreta por conta própria. Um host sem prefixo `https://`/`http://` é
resolvido automaticamente (consulte [Conceitos](/pt-br/concepts/#https-primeiro-credenciais-nunca-enviadas-em-texto-claro-por-padrão)),
ou execute `enodia config resolve` para ver qual esquema cada alvo usaria,
sem enviar nenhuma credencial.

O `options` é um mapa livre por produto — a maioria das sondas o ignora
completamente. [`p4d`/`p4p`](/pt-br/configuration/products/p4d/) são as
primeiras a de fato ler um: `options.binary` sobrescreve o caminho da CLI
`p4` que elas chamam.

Consulte **Configuração de produtos** na barra lateral (ou a tabela de
[Produtos suportados](/pt-br/products/)) para o endpoint exato, os
requisitos de autenticação e os campos registrados de cada uma das 90
sondas embutidas — `path`, `credentials` e `options` acima são o formato
geral; a página de cada produto diz o que ele realmente precisa.

### TLS (`tls:`)

Três níveis, em ordem decrescente de correção:

```yaml
tls:
  ca_file: /etc/enodia/corp-ca.pem   # um bundle de CA corporativa - a maioria dos ambientes fechados roda a sua própria PKI
  pin_sha256:                         # impressão(ões) digital(is) fixada(s) do certificado folha
    - "AB:CD:...:EF"
  server_name: internal.example.com   # sobrescrita do SNI
  min_version: "1.2"                  # versão mínima do TLS
  insecure: true                      # último recurso - veja abaixo
```

O `insecure: true` emite um aviso em toda execução, e não só na validação,
porque ele tem o hábito de ser adicionado "temporariamente" e continuar lá
por anos. Ele também é levado para a observação, então um relatório serve
ao mesmo tempo como auditoria de TLS da frota inteira — dá para ver quais
serviços estão sendo verificados sem validação.

## Credenciais

Entradas nomeadas, referenciadas pelo nome no campo `credentials:` de um
alvo:

```yaml
credentials:
  jira-token:
    kind: bearer
    value: "${JIRA_TOKEN}"

  gitlab-token:
    kind: token-header
    header: PRIVATE-TOKEN
    value: "${GITLAB_TOKEN}"

  vault-basic:
    kind: basic
    username: enodia
    password: "${VAULT_PASSWORD}"

  redis-auth:
    kind: password
    password: "${REDIS_PASSWORD}"

  linux-host-ssh:
    kind: ssh-key
    username: enodia-ro
    private_key_file: /etc/enodia/ssh/id_ed25519
    passphrase: "${SSH_KEY_PASSPHRASE}"   # opcional, só se a chave estiver criptografada
```

| `kind` | Campos usados | Envia |
|---|---|---|
| `none` (padrão se omitido) | — | nenhuma credencial |
| `bearer` | `value` | `Authorization: Bearer <value>` |
| `token-header` | `header`, `value` | um cabeçalho personalizado, por exemplo `PRIVATE-TOKEN`, `X-Vault-Token` |
| `basic` | `username`, `password` | autenticação HTTP Basic |
| `password` | `password` (mais `username`, para os protocolos que usam um — Redis ACL, PostgreSQL) | autenticação nativa do protocolo (`AUTH` do Redis, a própria senha de uma conexão SQL, ...) |
| `ssh-key` | `username`, `private_key_file`, `passphrase` (opcional) | autenticação SSH por chave pública, para as sondas de identificação de SO via SSH (consulte [Produtos suportados](/pt-br/products/)) |

`username` com `kind: password` e sem `private_key_file` também funciona
para alvos SSH — as sondas SSH aceitam uma senha ou uma chave privada, como
qualquer cliente SSH aceitaria (`username` mais `password` em
`kind: password`, ou `username` mais `private_key_file` em
`kind: ssh-key`).

### Verificação da chave de host SSH

Todas as sondas baseadas em SSH reutilizam o mesmo bloco `tls:` que as
sondas HTTPS usam para a verificação de certificados — aqui, `pin_sha256`
contém o SHA-256 em hexadecimal da codificação de rede da própria chave de
host, e não de um certificado TLS, mas o formato é o mesmo: "fixe uma
impressão digital, ou diga `insecure` e receba um aviso":

```yaml
targets:
  - id: linux-host
    product: debian
    address: host.example.com
    credentials: linux-host-ssh
    tls:
      pin_sha256:
        - "AB:CD:...:EF"   # sha256 da chave de host, via ssh-keyscan ou similar
      # insecure: true      # último recurso — pula completamente a verificação da chave de host
```

Sem `pin_sha256` nem `insecure: true` definidos, a conexão é recusada
antes que qualquer credencial seja enviada.

### `credentials_file`

Um arquivo separado, com o mesmo formato do mapa `credentials:` embutido:

```yaml title="credentials.yaml"
jira-token:
  kind: bearer
  value: "${JIRA_TOKEN}"
```

```yaml title="enodia.yaml"
schemaVersion: 1
credentials_file: credentials.yaml
targets:
  - id: jira-main
    product: jira
    address: https://jira.example.com
    credentials: jira-token
```

É isso que permite versionar o inventário dos serviços no git enquanto os
segredos ficam totalmente fora dele. As entradas em `credentials_file` têm
precedência sobre uma entrada embutida com o mesmo nome. O
`credentials_file` é resolvido em relação ao arquivo de configuração que o
menciona, e não ao diretório atual.

### Interpolação de variáveis de ambiente

Qualquer valor de string em `enodia.yaml` ou `credentials.yaml` pode
referenciar uma variável de ambiente:

- `${VAR}` — substituído pelo valor de `$VAR`; se estiver ausente, é um
  erro.
- `${VAR:-default}` — substituído pelo valor de `$VAR`, ou por `default` se
  não estiver definida.

## Integração com o HashiCorp Vault Agent

Nem o mapa `credentials:` embutido no `enodia.yaml` nem um
`credentials.yaml` separado precisam ser escritos por uma pessoa. Ambos são
apenas arquivos que o enodia lê do zero a cada execução — confirmado no
código-fonte: o `enodia check` recarrega a configuração e as credenciais do
zero a cada invocação, e o `enodia serve --interval` faz o mesmo a cada
ciclo de atualização (`Config.Build` chama `LoadCredentials` toda vez que
`collectObservations` roda — nada fica em cache durante a vida do processo,
então editar qualquer um dos arquivos passa a valer sem reiniciar). É
exatamente para esse formato que a renderização de `template` do próprio
[Vault Agent](https://developer.hashicorp.com/vault/docs/agent-and-proxy/agent)
foi feita. O enodia não tem nenhuma integração própria específica com o
Vault — nenhuma é necessária, já que os dois mecanismos abaixo já se
combinam com ele diretamente.

### O Vault Agent renderiza variáveis de ambiente

Aponte a stanza `template` (ou `env_template`) do Vault Agent para os
segredos de que um alvo precisa e referencie-os da forma normal, por meio
da [interpolação de variáveis de ambiente](#interpolação-de-variáveis-de-ambiente)
acima:

```yaml title="credentials.yaml"
jira-token:
  kind: bearer
  value: "${JIRA_TOKEN}"
```

O modo `exec` do Vault Agent executa o próprio enodia (ou um script
wrapper que chama `enodia check`) como seu processo filho supervisionado,
injetando as variáveis renderizadas diretamente no ambiente desse processo
— nenhum segredo chega ao disco como um arquivo que o enodia precise ler. A
stanza `exec` do Vault Agent também suporta reiniciar o processo filho
quando um segredo de template muda, se você quiser que um `enodia serve` de
longa duração pegue imediatamente um token rotacionado, em vez de depender
de que ele simplesmente ainda seja válido no próximo tick de `--interval`
— consulte a documentação do próprio Vault Agent para a configuração exata
disso; fica inteiramente do lado do Vault Agent.

### O Vault Agent renderiza um `credentials.yaml` diretamente

Aponte `credentials_file:` para o caminho em que a stanza `template` do
Vault Agent grava, e monte no template exatamente o formato que o
[`credentials_file`](#credentials_file) espera:

```yaml title="enodia.yaml"
schemaVersion: 1
credentials_file: /run/enodia/credentials.yaml
targets:
  - id: jira-main
    product: jira
    address: https://jira.example.com
    credentials: jira-token
```

```hcl title="Vault Agent template stanza — illustrative; see Vault Agent's own docs for exact syntax"
template {
  destination = "/run/enodia/credentials.yaml"
  perms       = "0600"
  contents    = <<EOT
jira-token:
  kind: bearer
  value: "{{ with secret "secret/data/enodia/jira" }}{{ .Data.data.token }}{{ end }}"
EOT
}
```

Este caminho não precisa de nenhuma ligação de `exec`/reinício: o `enodia
check` relê o `credentials_file` do zero a cada invocação, e o `enodia
serve` o relê a cada ciclo de atualização, independentemente de como ele
mudou no disco. Um `enodia check` agendado via cron ou um `enodia serve` de
longa duração simplesmente pegam o que o Vault Agent gravou por último, no
seu próprio agendamento — não há nada específico do enodia a configurar
para isso.

### Em qualquer caso, siga o tratamento de credenciais do próprio enodia

Os dois padrões continuam dentro de tudo o que [Segurança](/pt-br/security/)
já cobre — as credenciais nunca aparecem no inventário, nos relatórios
exportados nem nos logs, e a verificação TLS continua ativada, a menos que
você a desative por alvo. São o `perms` e a escolha do diretório de destino
do próprio Vault Agent que mantêm o arquivo renderizado fora do alcance de
leitura de qualquer outra coisa; o próprio enodia não tem opinião sobre
onde o `credentials_file` fica, além de resolver um caminho relativo em
relação ao arquivo de configuração que o menciona.

## A sonda genérica

`product: generic` é a válvula de escape para um alvo que nunca vai ganhar
uma sonda dedicada. O seu vocabulário é deliberadamente pequeno e
congelado — sem condicionais, sem laços, sem requisições encadeadas, sem
templates. Um alvo que precise de qualquer uma dessas coisas precisa de uma
sonda de verdade escrita em Go, e não de mais recursos na sonda genérica.

```yaml
targets:
  - id: in-house-api
    product: generic
    address: https://internal.example.com
    parser:
      type: regex          # json | xml | header | plaintext | regex
      key: version          # caminho com pontos (json), caminho de tag/estilo XPath (xml) ou nome do cabeçalho
      regex: 'v(\d+\.\d+\.\d+)'
      clean_regex: '^v'     # o primeiro grupo de captura vence - snake_case, veja abaixo
      line: 1                # só plaintext - qual linha ler
```

:::caution[Grafia do campo: `clean_regex`, e não `cleanRegex` ou `cleanregex`]
O `ParserSpec` agora tem tags `yaml:` explícitas que seguem a mesma
convenção snake_case do restante do `enodia.yaml` (`ca_file`,
`min_version`, `allow_insecure_transport`, ...) — `clean_regex` é o
correto desde 2026-09-07. Antes dessa correção, a struct não tinha nenhuma
tag explícita, então valia o padrão do YAML sem tags (minúsculas, sem
separação de palavras) e a única grafia que funcionava era `cleanregex`; um
`cleanRegex` simples nunca funcionou em momento algum. Confirmado
diretamente contra o parser nas duas vezes em que isso foi verificado, e não
presumido a partir da documentação.
:::

## Localização dos arquivos

Tanto o `enodia.yaml` quanto o `settings.yaml` são encontrados da mesma
forma: um caminho explícito (`--config`/`--settings`, ou
`$ENODIA_CONFIG`/`$ENODIA_SETTINGS` para um arquivo exato) sempre
prevalece e precisa existir — um erro de digitação é um erro, e nunca uma
passagem silenciosa para algum outro arquivo. Na falta dele, é feita uma
busca na ordem abaixo; a primeira correspondência vence de imediato, e nada
é mesclado a partir de vários arquivos encontrados. O local vale mais que o
nome: uma correspondência no diretório atual sempre vence uma em
`$XDG_CONFIG_HOME`, que sempre vence uma em `/etc/enodia/`,
independentemente de qual nome correspondeu em cada lugar.

**`enodia.yaml`:**

1. `./enodia.yaml`
2. `./enodia.yml`
3. `./config.yaml`
4. `./config.yml`
5. `./.enodia.yaml`
6. `./.enodia.yml`
7. `./.config.yaml`
8. `./.config.yml`
9. `$XDG_CONFIG_HOME/enodia/enodia.yaml` (`~/.config/enodia/enodia.yaml` se `$XDG_CONFIG_HOME` não estiver definida)
10. `$XDG_CONFIG_HOME/enodia/enodia.yml`
11. `$XDG_CONFIG_HOME/enodia/config.yaml`
12. `$XDG_CONFIG_HOME/enodia/config.yml`
13. `/etc/enodia/enodia.yaml`
14. `/etc/enodia/enodia.yml`
15. `/etc/enodia/config.yaml`
16. `/etc/enodia/config.yml`

Não encontrar nada é um erro — vale a pena falhar de forma ruidosa quando
uma configuração não é encontrada, já que isso geralmente significa que o
arquivo errado (ou nenhum) está prestes a ser usado. Execute
`enodia config path` para ver qual arquivo seria de fato carregado.

**`settings.yaml`** — a mesma ideia, com algumas diferenças: ele também
procura um nome simples `settings.` (e não só `enodia.settings.`), procura
adicionalmente no diretório em que o executável em execução está (e não só
no diretório atual — veja abaixo), e não encontrar nada **não** é um erro —
cada campo simplesmente volta ao seu padrão embutido, já que este arquivo é
totalmente opcional:

1. `./enodia.settings.yaml`
2. `./enodia.settings.yml`
3. `./settings.yaml`
4. `./settings.yml`
5. `./.enodia.settings.yaml`
6. `./.enodia.settings.yml`
7. `./.settings.yaml`
8. `./.settings.yml`
9. `<directory containing the running executable>/settings.yaml`
10. `<same>/settings.yml`
11. `$XDG_CONFIG_HOME/enodia/settings.yaml` (`~/.config/enodia/settings.yaml` se `$XDG_CONFIG_HOME` não estiver definida)
12. `$XDG_CONFIG_HOME/enodia/settings.yml`
13. `/etc/enodia/settings.yaml`
14. `/etc/enodia/settings.yml`

Os passos 9-10 são diferentes do diretório atual (passos 1-8): uma
instalação portátil (descompactada em qualquer lugar, sem gerenciador de
pacotes) é executada a partir de qualquer diretório em que o operador
esteja, o que, no Windows em particular, praticamente nunca é o próprio
diretório de instalação (o `install.ps1` usa por padrão
`%LOCALAPPDATA%\enodia`, adicionado ao `PATH` — o objetivo do `PATH` é
justamente que o diretório atual deixe de importar). Este passo é
deliberadamente restrito ao `settings.yaml` — são preferências opcionais de
exibição, então um arquivo errado ou adulterado em um diretório de
instalação compartilhado é, no pior caso, um problema cosmético. O
`enodia.yaml` contém credenciais e não tem um passo equivalente.

## `settings.yaml`

Preferências de exibição pessoais, por operador — nunca alvos, nunca
credenciais, nunca compartilhadas da forma como o `enodia.yaml` geralmente
é.

```yaml title="settings.yaml"
schemaVersion: 1

render:
  # compact (padrão) | lifecycle | drift | fleet
  default_view: fleet

export:
  # json (padrão) | prometheus | html - usado sempre que o próprio `export`
  # é executado sem --format
  default_format: html

html:
  # inline (padrão, totalmente offline) | cdn (carrega Bootstrap/Bootswatch)
  assets: cdn

  # none (nenhuma folha de estilo) | default (Bootstrap puro) | qualquer um
  # dos 26 temas reais do Bootswatch: brite, cerulean, cosmo, cyborg, darkly,
  # flatly, journal, litera, lumen, lux, materia, minty, morph, pulse,
  # quartz, sandstone, simplex, sketchy, slate, solar, spacelab,
  # superhero, united, vapor, yeti, zephyr
  theme: lumen

  # auto (padrão: faz uma corrida entre jsdelivr e cdnjs e usa o que
  # responder primeiro) | jsdelivr | cdnjs
  cdn: auto

  # opcional: restringe a exportação a uma única visão em vez das quatro
  # view: fleet
```

O `render.default_view` se aplica ao `--view` do `check` sempre que a
própria flag não foi passada. O `export.default_format` faz o mesmo para o
`--format` do `export`. O `html.*` só importa para
`export --format html` — consulte [Relatórios](/pt-br/reporting/) para o que
cada campo de fato muda.
