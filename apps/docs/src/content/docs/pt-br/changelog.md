---
title: Registro de alterações
description: Mudanças relevantes do enodia, versão por versão.
---

A fonte canônica é o próprio
[`CHANGELOG.md`](https://github.com/EpicMorg/enodia/blob/master/CHANGELOG.md)
do enodia — esta página o espelha, mantida em sincronia com o restante
deste site a cada versão, com links para o resto desta documentação sempre
que uma mudança afeta a forma como você de fato configuraria algo. As tags
seguem o formato `MAJOR.MINOR.PATCH+BUILD`, sem prefixo `v`; `+BUILD` são
metadados de build do semver, usados apenas para uma recompilação sem
mudança funcional, e não para evitar um incremento de versão real.

## 2.0.0+0 — 2026-09-23

Uma versão major por causa de um recurso importante, e não por uma quebra
de compatibilidade: a correlação de CVEs é o primeiro eixo de avaliação que
não trata do ciclo de vida. Os arquivos `enodia.yaml`, `settings.yaml` e de
inventário existentes funcionam sem alterações — o novo bloco `cve:` é
opcional, e uma configuração sem ele se comporta exatamente como na 1.2.

### Adicionado

- **[Correlação de CVEs](/pt-br/cve/)** com dois bancos de dados locais, o
  BDU FSTEC e o NIST NVD. O enodia nunca os baixa: você obtém o
  `vulxml.zip` do BDU e os arquivos anuais `nvdcve-2.0-<year>.json.gz` do
  NVD e aponta `cve.bdu.path` / `cve.nvd.path` no `enodia.yaml` para eles
  (um arquivo ou, no caso do NVD, um diretório de arquivos). Qualquer uma
  das fontes funciona sozinha. Ambas são processadas em streaming e ficam
  em cache: a primeira execução depois que um banco de dados muda leva
  cerca de um minuto para todo o NVD mais o BDU, e todas as execuções
  seguintes, menos de um segundo. Consulte
  [como baixá-los](/pt-br/cve/#o-enodia-nunca-baixa-os-bancos-de-dados-por-conta-própria),
  incluindo o certificado de CA adicional de que o bdu.fstec.ru precisa.
- **52 sondas com correspondência** (53 nomes de produto upstream — `ssh`
  conta como OpenSSH e como Dropbear), todas as sondas com dados utilizáveis
  em alguma das fontes. Deliberadamente sem correspondência, cada uma por
  um motivo declarado: distribuições Linux de uso geral (as CVEs delas são
  de nível de pacote), os BSDs e o Solaris, ESXi/vCenter e Synology DSM
  (níveis de patch e sufixos de build que o mecanismo de correspondência
  ainda não lê) — consulte
  [quais produtos têm correspondência](/pt-br/cve/#quais-produtos-têm-correspondência)
  e a página de cada produto.
- **Correspondência sensível à edição** para
  [GitLab](/pt-br/configuration/products/gitlab/),
  [Vault](/pt-br/configuration/products/vault/),
  [Nextcloud](/pt-br/configuration/products/nextcloud/) e
  [MongoDB](/pt-br/configuration/products/mongodb/): uma instância community
  deixa de ver achados exclusivos da enterprise (com dados reais, o GitLab
  19.2.2 CE vê 4 das 9 do NVD, e o Nextcloud 27.1.3 CE, 11 de 23). As quatro
  sondas agora registram a edição do servidor em `extra.enterprise`; uma
  edição desconhecida mantém todos os achados.
- Alvos [`ssh`](/pt-br/configuration/products/ssh/) têm correspondência como
  OpenSSH ou Dropbear pelo banner; qualquer outra pilha SSH não recebe
  consulta de CVEs, em vez de receber as do OpenSSH.
- Uma **coluna `CVES`** nas [visões compact e drift](/pt-br/views/) do
  `check`, contando as CVEs distintas.
- Uma **lista por CVE** no
  [`export --format html`](/pt-br/reporting/#a-lista-de-cves), em CSS puro e
  sem JavaScript, para que o relatório inline continue sendo um arquivo
  offline sem nenhum `<script>`: uma linha por CVE com links para o NVD, o
  cve.org e o bdu.fstec.ru, o texto em russo do BDU quando o BDU tem a CVE,
  uma classificação colorida `CRITICAL · CVSS 3.1 9.8`, da mais grave para
  a menos grave.
- O [`export --format json`](/pt-br/reporting/#--format-json) traz todos os
  achados por fonte no `cves` de cada avaliação, incluindo uma
  classificação CVSS estruturada extraída das duas fontes.
- Sonda [`fortios`](/pt-br/configuration/products/fortios/) para o Fortinet
  FortiGate, via a sua REST API com um token de REST API Admin.
- Os relatórios HTML em modo CDN lembram, por visitante, que o aviso de
  "precisa de acesso à internet" foi dispensado.

### Notas

- O bloco `cve:` é lido da configuração que a execução de fato usa —
  `--config`, `$ENODIA_CONFIG` ou os caminhos de busca padrão.
- Caminhos do Windows funcionam sem aspas, entre aspas simples, com barras
  normais ou como caminhos UNC. Entre aspas duplas do YAML, `\t` e `\n`
  viram uma tabulação e uma quebra de linha, então um caminho assim é
  rejeitado no carregamento, com uma dica.
- O `cisco-ios-xe` saiu do roadmap de vez.

## 1.2.1+0 — 2026-09-10

### Corrigido

- [`p4d`/`p4p`](/pt-br/configuration/products/p4d/#tempo-limite) não aplicavam o
  `timeout` ao subprocesso da CLI `p4` que elas chamam — todas as outras
  sondas desta árvore limitam o próprio transporte ao `timeout` antes de
  acessar a rede, e esta não fazia isso. Um processo `p4` travado tentando
  se conectar a um servidor direto inacessível (sem resposta, sem reset —
  exatamente o comportamento de rede que é o motivo de essas duas sondas
  chamarem o `p4`, para começo de conversa) ficava pendurado
  indefinidamente, travando uma execução de coleta inteira. Reportado
  diretamente a partir de um travamento real em produção.

## 1.2.0+0 — 2026-09-10

### Adicionado

- Sondas [`p4d`](/pt-br/configuration/products/p4d/) e
  [`p4p`](/pt-br/configuration/products/p4p/), para o Perforce Helix Core
  Server e o Perforce Proxy. O protocolo RPC do próprio Perforce foi
  totalmente submetido a engenharia reversa, e um cliente feito à mão
  reproduziu corretamente o seu handshake com um proxy real, mas esse mesmo
  handshake, verificado byte a byte como correto, é descartado em silêncio
  por servidores `p4d` diretos reais, por motivos que não são visíveis do
  lado do cliente. Em vez disso, as duas sondas chamam a CLI `p4` do
  próprio operador — as primeiras sondas do enodia a executar um processo
  externo em vez de falar um protocolo de rede diretamente. O caminho do
  binário é configurável por alvo via
  [`options.binary`](/pt-br/configuration/#targets) (com fallback para `p4`
  no `$PATH`); isso funciona da mesma forma no Windows, apontando para o
  `p4.exe`. A resposta de um proxy é diferenciada da de um servidor direto
  pela presença do seu próprio campo `proxyVersion` — cada sonda rejeita o
  formato da outra.

### Corrigido

- O parser da saída de `p4 -Ztag` não removia as quebras de linha do
  Windows: um `p4.exe` real escreve `\r\n`, deixando um `\r` no final de
  valores de campos como `ServerID`.
- `probe.Observation.Resolver` (adicionado na 1.1.0+0 para o
  [SonarQube](/pt-br/configuration/products/sonarqube/)) era uma struct
  simples, e não um ponteiro — o `omitempty` do `encoding/json` não tem
  noção de "vazio" para um valor de struct, então todas as observações,
  e não só as do SonarQube, serializavam um `"resolver":{}` espúrio nas
  exportações JSON. Corrigido para um ponteiro, pelo mesmo motivo pelo
  qual `tlsVerified` já é anulável em vez de um `false` simples.

## 1.1.1+0 — 2026-09-10

### Corrigido

- [`debian`](/pt-br/configuration/products/debian/) informava só a versão
  major (`13`) em vez da point release real (`13.6`) — o `VERSION_ID` do
  `/etc/os-release` do Debian nunca a inclui, nem em uma instalação
  totalmente atualizada; a point release fica apenas em
  `/etc/debian_version`. O `debian` saiu do mecanismo compartilhado
  `osReleaseFamilyProbe` para uma sonda dedicada própria, que lê os dois
  arquivos e só confia no `debian_version` depois de confirmar `ID=debian`
  e que o seu conteúdo é um número simples separado por pontos — foi
  confirmado que uma imagem real do Ubuntu traz o mesmo arquivo com um
  conteúdo herdado sem significado.
- [`ubuntu`](/pt-br/configuration/products/ubuntu/) tinha a mesma lacuna: o
  `VERSION_ID` nunca muda depois que uma versão é lançada, então um host
  `22.04` totalmente atualizado informava apenas `22.04`, e não `22.04.5`.
  O `ubuntu` também saiu do mecanismo compartilhado para uma sonda própria,
  preferindo a point release do próprio campo `VERSION` do `os-release`
  quando ela é estritamente mais precisa que o `VERSION_ID`. Todos os
  outros produtos da família compartilhada de
  [identificação de SO via SSH](/pt-br/configuration/products/ssh-os-probes/)
  foram auditados da mesma forma; nenhum dos demais tem essa lacuna.

Nenhuma mudança de configuração em nenhum dos dois — o mesmo valor de
`product:`, as mesmas credenciais, o mesmo endpoint. Só a `version`
informada ficou mais precisa.

## 1.1.0+0 — 2026-09-10

### Adicionado

- Um resolvedor de ciclo de vida `github-tags`, para um produto que não
  publica nenhuma GitHub Release, apenas tags em um formato sem pontos —
  deu ao [pgAdmin](/pt-br/configuration/products/pgadmin/) o seu primeiro
  resolvedor funcional (as tags de `pgadmin-org/pgadmin4` são `REL-9_17`,
  convertidas para `9.17`, escolhendo a tag de maior versão interpretável,
  e não a primeira).
- A variável de ambiente **`GITHUB_TOKEN`** — autentica todas as consultas
  de ciclo de vida baseadas no GitHub, elevando o limite não autenticado de
  60 requisições/hora para 5000/hora. Consulte
  [Produtos suportados](/pt-br/products/#aplicações-e-serviços-de-infraestrutura).
- Uma sonda agora pode sobrescrever o resolvedor de ciclo de vida do seu
  produto por observação, para o caso raro em que o calendário certo só
  pode ser conhecido depois de ver a própria resposta de versão do
  fornecedor. Usado pela primeira vez para dividir o
  [SonarQube](/pt-br/configuration/products/sonarqube/) entre SonarQube
  Server e SonarQube Community Build — dois produtos separados desde a
  divisão feita pela SonarSource no fim de 2024, acompanhados como duas
  páginas diferentes do endoflife.date, com dados de ciclo diferentes.

### Corrigido

- As falhas de resolvedor antes apareciam no relatório apenas como
  `resolver_error`, sem como distinguir um limite de taxa do GitHub de uma
  falha de DNS ou de uma API que mudou de formato. O `enodia check`/`export`
  agora exibem no stderr o erro subjacente real quando isso acontece.
- O SonarQube era sempre comparado com o calendário de ciclo de vida do
  Community Build, mesmo para uma instância SonarQube Server — a coleta da
  versão funcionava, mas o relatório mostrava um ciclo sem correspondência
  de qualquer forma. Agora é resolvido por instância a partir da própria
  string de versão.

### Alterado

- A publicação da imagem de contêiner (`ghcr.io/epicmorg/enodia`, também
  espelhada no Docker Hub e no Quay) saiu completamente do pipeline de
  release deste repositório e foi para o monorepo `EpicMorg/docker`, com o
  cronograma de build próprio daquele repositório. O endereço publicado da
  imagem e as tags (`latest`, `1`, a versão exata) não mudaram, mas a
  imagem agora é apenas `linux/amd64` e roda como root — consulte
  [Primeiros passos](/pt-br/getting-started/#instalação).

## 1.0.0+0 — 2026-09-09

Versão inicial. `collect → inventory.jsonl → evaluate → assessment →
render`, de ponta a ponta, verificado em infraestrutura de produção real:

- **87 sondas**, um arquivo cada, compiladas no binário e registradas
  explicitamente — a maioria falando HTTP, algumas
  ([Redis](/pt-br/configuration/products/redis/),
  [PostgreSQL](/pt-br/configuration/products/postgresql/),
  [MySQL](/pt-br/configuration/products/mysql/),
  [MongoDB](/pt-br/configuration/products/mongodb/)) o seu próprio
  protocolo de rede diretamente, e um conjunto crescente (todas as
  principais distribuições Linux, os BSDs, macOS, OPNsense, Proxmox VE,
  TrueNAS, Synology DSM, appliances de rede) acessado via
  [SSH](/pt-br/configuration/products/ssh-os-probes/) ou por uma API HTTP do
  fornecedor, em vez de presumir que existe um endpoint de versão.
- [`product: generic`](/pt-br/configuration/products/generic/) — uma sonda
  definida só pela configuração, para qualquer coisa interna, com um
  vocabulário deliberadamente congelado (sem condicionais, laços ou
  templates).
- Resolução de ciclo de vida com o endoflife.date e o GitHub Releases, em
  cache no disco, avaliada em três eixos independentes (defasagem de patch,
  fase do ciclo de vida, ramo mais novo) em vez de um único veredito
  condensado — consulte [Conceitos](/pt-br/concepts/).
- Quatro [visões de relatório](/pt-br/views/) nas saídas em tabela, HTML,
  JSON e Prometheus.
- [`enodia serve`](/pt-br/cli-reference/#enodia-serve) — um servidor HTTP que
  só serve snapshots; um ticker em segundo plano faz a coleta, e os
  handlers só leem o último snapshot.
- [Esquema de configuração](/pt-br/configuration/) com interpolação
  `${VAR}`/`${VAR:-default}`, um armazenamento de credenciais dedicado e
  fixação de TLS/opção explícita de modo inseguro por alvo.
- Empacotamento: `.deb`, `.rpm`, `.apk` e o `.pkg.tar.zst` do Arch, um
  usuário de sistema `enodia` dedicado e sem privilégios, páginas de manual
  para todos os comandos, arquivos compactados para
  Linux/Windows/macOS/Android (Termux) e uma imagem de contêiner — consulte
  [Primeiros passos](/pt-br/getting-started/). Checksums assinados com
  cosign keyless (OIDC, sem chave para gerenciar ou vazar).
