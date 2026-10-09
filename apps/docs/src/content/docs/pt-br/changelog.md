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

## Não lançado

<!-- NEXT-RELEASE: replace this heading with "## X.Y.Z+0 — YYYY-MM-DD" when the release is published. -->

### Corrigido

- [`kafka`](/pt-br/configuration/products/kafka/) executava `kafka-topics --version` (uma inicialização da
  JVM, alguns segundos) a cada execução quando ele estava no `PATH`, mesmo
  com o jar do broker já encontrado; agora ele só roda quando nenhum jar é
  encontrado.

## 2.2.0+0 — 2026-10-09

O `enodia cve update` baixa ele mesmo os bancos de dados de CVEs, os dados
de segurança dos próprios fornecedores (MariaDB, Atlassian, PostgreSQL,
nginx) se juntam ao BDU e ao NVD, a correspondência de CVEs chega ao iLO 4,
ao iDRAC e ao Synology DSM, e chegam 27 novas sondas — 123 no total. Toda
nova chave de `cve:` é opcional, e as configurações e os inventários da
2.1 funcionam sem alterações — exceto uma credencial de um tipo que o seu
produto nunca lê, que agora é um erro (consulte Corrigido).

### Adicionado

- **[`enodia cve update`](/pt-br/cve/#enodia-cve-update)** baixa os
  bancos de dados de CVEs indicados por cada `cve.*.path` configurado —
  BDU, NVD (este ano, o ano passado e os anos ausentes; `--all-years` para
  todos), Debian, OVAL e Alpine (as versões que já estão no disco, as de
  que os inventários de `--from` precisam, `--oval`/`--alpine`), MariaDB,
  Atlassian, PostgreSQL (`--postgresql` para as páginas por major) e
  nginx. If-Modified-Since; um download só substitui um arquivo depois de
  ser carregado. O TLS é verificado com as raízes do sistema mais
  `cve.update.ca_file` e `cve.update.ca_dir`, ou não é verificado com
  `cve.update.tls_skip_verify`. Todos os outros comandos continuam sem
  baixar nada.
- **27 novas sondas:**
  - [`splunk`](/pt-br/configuration/products/splunk/) — a API de gerenciamento do splunkd na 8089, Basic ou um token do Splunk.
  - [`code-server`](/pt-br/configuration/products/code-server/) — `codeServerVersion` da página de login.
  - [`phpipam`](/pt-br/configuration/products/phpipam/) — o rodapé e a versão dos assets da página de login.
  - [`domainmod`](/pt-br/configuration/products/domainmod/) — o CHANGELOG na sua raiz web.
  - [`netdata`](/pt-br/configuration/products/netdata/) — o `/api/v1/info` anônimo do agente.
  - [`libretranslate`](/pt-br/configuration/products/libretranslate/) — o documento OpenAPI público `/spec`.
  - [`torrserver`](/pt-br/configuration/products/torrserver/) — `/echo`.
  - [`kafka`](/pt-br/configuration/products/kafka/) — a versão do broker via SSH, a partir do seu próprio jar, opcionalmente em um contêiner; os builds do Confluent Platform são informados como `confluent`, com a linha do Apache Kafka que trazem.
  - [`home-assistant`](/pt-br/configuration/products/home-assistant/) — `/api/config` com um token de acesso de longa duração, `kind: bearer`.
  - [`openhab`](/pt-br/configuration/products/openhab/) — a raiz REST anônima `/rest/`.
  - [`doxygen`](/pt-br/configuration/products/doxygen/) — qual Doxygen gerou um site de documentação, a partir da sua marca de gerador.
  - [`qbittorrent`](/pt-br/configuration/products/qbittorrent/) — a API da Web UI após um login por formulário, `kind: password`.
  - [`netbox`](/pt-br/configuration/products/netbox/) — o `data-netbox-version` da página de login anônima.
  - [`greenbone`](/pt-br/configuration/products/greenbone/) — (aliases `openvas`, `gsad`) a versão do gsad a partir da sua resposta em `/gmp`, sem autenticação.
  - [`posthog`](/pt-br/configuration/products/posthog/) — o commit do git do PostHog self-hosted, a partir da sua página de login anônima.
  - [`uptime-kuma`](/pt-br/configuration/products/uptime-kuma/) — faz login pela API socket.io do Uptime Kuma (`kind: password`) e lê a versão que ele envia após o login.
  - [`wapt`](/pt-br/configuration/products/wapt/) — o `/ping` anônimo do servidor WAPT.
  - [`minio`](/pt-br/configuration/products/minio/) — `minio --version` via SSH, opcionalmente em um contêiner; os nomes `RELEASE.<timestamp>` do MinIO agora são comparados como versões.
  - [`sentry`](/pt-br/configuration/products/sentry/) — a versão do Sentry self-hosted, a partir da sua página de login anônima.
  - [`zookeeper`](/pt-br/configuration/products/zookeeper/) — a four-letter word `srvr`.
  - [`ghost`](/pt-br/configuration/products/ghost/) — o `/ghost/api/admin/site/` anônimo, que fornece major.minor.
  - [`onlyoffice`](/pt-br/configuration/products/onlyoffice/) — e [`euro-office`](/pt-br/configuration/products/euro-office/): o ONLYOFFICE Docs e o seu fork Euro-Office, lidos anonimamente do `/index.html` do servidor de documentos; um servidor da outra marca é recusado, com a indicação do produto a usar.
  - [`weblate`](/pt-br/configuration/products/weblate/) — o rodapé anônimo "Powered by Weblate".
  - [`memcached`](/pt-br/configuration/products/memcached/) — o comando `version` do protocolo de texto, sem credenciais.
  - [`rabbitmq`](/pt-br/configuration/products/rabbitmq/) — o `/api/overview` do plugin de gerenciamento, `kind: basic`.
  - [`cassandra`](/pt-br/configuration/products/cassandra/) — `release_version` pelo protocolo nativo CQL v4, `kind: password` quando o cluster tem PasswordAuthenticator.
- **CVEs para alvos [`mariadb`](/pt-br/configuration/products/mariadb/).**
  O BDU e o NVD agora cobrem o MariaDB, e um novo `cve.mariadb.path` lê a
  própria tabela de CVEs corrigidas do MariaDB (`community-server.md`),
  que conhece a versão com a correção por série. Quando a tabela do
  MariaDB conhece uma CVE, o veredito dela substitui os intervalos em
  aberto do BDU e do NVD, então a última versão de uma série mantida não é
  mais marcada por CVEs corrigidas apenas em séries mais novas — consulte
  [Dados dos próprios fornecedores](/pt-br/cve/#dados-dos-próprios-fornecedores).
- **`cve.atlassian.path`**: os próprios dados de CVEs por versão da
  Atlassian para `jira`, `confluence`, `bitbucket` e `bamboo`, incluindo
  CVEs de dependências de terceiros. Avaliados dentro de cada ramo; para
  uma versão que a Atlassian lista, o veredito dela prevalece — consulte
  [Atlassian](/pt-br/cve/#atlassian).
- **`cve.postgresql.path` e `cve.nginx.path`**: as próprias páginas de
  segurança dos projetos, com a versão da correção por ramo. As versões
  atuais 17/16/15/14 do PostgreSQL e o nginx 1.30.5 não mostram mais os
  intervalos sem ramo do BDU — consulte [PostgreSQL](/pt-br/cve/#postgresql)
  e [nginx](/pt-br/cve/#nginx).
- **CVEs para mais 24 produtos**: cassandra, code-server, domainmod,
  doxygen, ghost, greenbone, home-assistant, kafka, memcached, minio,
  netbox, netdata, onlyoffice, openhab, pfsense, phpipam, qbittorrent,
  rabbitmq, sentry, splunk, uptime-kuma, wapt, weblate, zookeeper. As
  versões com timestamp do MinIO são comparadas; o pfSense CE e o Splunk
  Enterprise ignoram intervalos de outras edições; os builds do Kafka da
  Confluent não recebem consulta.
- **CVEs para [`hp-ilo4`](/pt-br/configuration/products/hp-ilo4/),
  [`dell-idrac`](/pt-br/configuration/products/dell-idrac/) e
  [`synology-dsm`](/pt-br/configuration/products/synology-dsm/).** O iDRAC
  é correlacionado por geração, lida do modelo do Redfish; o DSM compara
  versão, build e Update (`7.2.1-69057-6`), e a sonda agora registra o
  Update em `extra.update` — consulte
  [Dell iDRAC e Synology DSM](/pt-br/cve/#dell-idrac-e-synology-dsm).
  No total, 91 dos 123 produtos agora têm correspondência — consulte
  [quais produtos têm correspondência](/pt-br/cve/#quais-produtos-têm-correspondência).
- Uma página de [Privacidade](/pt-br/privacy/): a que o enodia se conecta
  (os seus alvos, endoflife.date, a API do GitHub — só nomes de produtos e
  de repositórios — e, apenas para o `enodia cve update`, os publicadores
  dos bancos de dados de CVEs) e o que ele armazena (só os seus próprios
  arquivos e um cache local). Sem telemetria.

### Alterado

- O resolvedor `github` ignora versões cuja tag indica uma pré-versão
  (`5.3.0.M2`, `2026.10.0b7`, `-rc1`, `-beta.1`) mesmo quando o GitHub não
  as marca; lê como versões tags escritas com sublinhados
  (`Release_1_18_0`) e com o prefixo `release-` (`release-5.2.4`); e remove
  um `<repo>-`/`<repo>_` inicial das tags, então `weblate-2026.10` é lida
  como `2026.10` — consulte [Produtos suportados](/pt-br/products/).
- O [`teamcity`](/pt-br/configuration/products/teamcity/) funciona sem
  credenciais: sem nenhuma configurada, ele lê o
  `/app/rest/server/version` anônimo, aberto em todos os TeamCity
  verificados da 2017.2 à 2026.1, mesmo com o login de convidado
  desativado. Um token continua selecionando `/app/rest/server` como
  antes.

### Corrigido

- CVEs do [`jenkins`](/pt-br/configuration/products/jenkins/): uma versão
  LTS corrigida não é mais marcada pelo intervalo weekly da mesma correção
  (LTS 2.568.3 por "before 2.580"). Os intervalos weekly e LTS agora se
  aplicam apenas à sua própria linha de versões.
- O resolvedor `github` não falha mais em repositórios cuja lista de
  releases passa de 1 MiB (a do minio/minio tem 3,4 MB): agora ele lê até
  8 MiB.
- **Uma credencial de um tipo que o seu produto nunca envia agora é um
  erro de configuração**, em vez de ser descartada silenciosamente.
  `kind: password` em um produto HTTP (RouterOS, Harbor, …) enviava a
  requisição sem cabeçalho `Authorization` algum; o `config validate`
  agora cita os tipos que o produto aceita — para um login web, é
  `kind: basic`. **Verifique a sua configuração antes de atualizar**: uma
  execução com uma credencial assim agora se recusa a iniciar. Consulte
  [Configuração → Credenciais](/pt-br/configuration/#credenciais).

## 2.1.1+0 — 2026-10-08

### Corrigido

- O MariaDB 11.0+ não mascara mais a sua versão atrás de `5.5.5-`
  (`11.4.9-MariaDB-…`), então o [`mysql`](/pt-br/configuration/products/mysql/)
  registrava esses servidores como MySQL e o
  [`mariadb`](/pt-br/configuration/products/mariadb/) os recusava. Agora
  as duas sondas reconhecem o MariaDB em qualquer um dos dois formatos.
  Um alvo `product: mysql` apontado para um MariaDB 11.0+ agora falha —
  troque-o para `product: mariadb`.

## 2.1.0+0 — 2026-10-01

A correlação de CVEs desce até os pacotes instalados em dez distribuições
Linux, e chegam seis novas sondas. Nada quebra: as novas chaves de `cve:`
são opcionais, e os inventários apenas ganham campos opcionais, então as
configurações e os inventários da 2.0 funcionam sem alterações.

### Adicionado

- **[CVEs por pacote para distribuições Linux](/pt-br/cve/#cves-por-pacote-para-distribuições-linux).**
  As sondas de SO agora também leem os pacotes instalados e o kernel em
  execução na sua única ida e volta SSH, e os dados de segurança próprios
  de cada distribuição são correlacionados pacote a pacote. Cada fonte é
  um arquivo que você baixa, como o BDU e o NVD:
  - `cve.debian.path` — o JSON do Debian Security Tracker, para
    [`debian`](/pt-br/configuration/products/debian/).
  - `cve.oval.path` — arquivos OVAL dos fornecedores, um por versão, para
    [`ubuntu`](/pt-br/configuration/products/ubuntu/),
    [`linuxmint`](/pt-br/configuration/products/linuxmint/) (pela sua base
    Ubuntu), [`rhel`](/pt-br/configuration/products/rhel/),
    [`rocky-linux`](/pt-br/configuration/products/rocky-linux/) (com o
    arquivo da Red Hat — o próprio do Rocky é recusado por ser inutilizável),
    [`almalinux`](/pt-br/configuration/products/almalinux/),
    [`oracle-linux`](/pt-br/configuration/products/oracle-linux/),
    [`astra-linux`](/pt-br/configuration/products/astra-linux/) (SE 1.7/1.8)
    e [`redos`](/pt-br/configuration/products/redos/) (7.3/8.0). O OVAL
    processado fica em cache, como o BDU e o NVD.
  - `cve.alpine.path` — o secdb do Alpine, para
    [`alpine-linux`](/pt-br/configuration/products/alpine-linux/).
- Só são informadas as CVEs que já têm uma correção mais nova do que a
  instalada — o que uma atualização (e, para o kernel, uma reinicialização)
  resolveria. Um achado por pacote, com link para o aviso que traz a
  correção (USN, RHSA, ALSA, ELSA, boletim do Astra, ROS, página do tracker
  do Debian/Alpine), com todas as CVEs agrupadas sob ele no relatório HTML.
- A correlação segue as regras de cada gerenciador de pacotes: a ordenação
  de versões do dpkg, do rpm e do apk, os streams de módulos AppStream, as
  variantes de arquitetura, FIPS e Ksplice da Oracle, e o kernel em
  execução em vez de quaisquer pacotes de kernel instalados. Cada fonte foi
  conferida com a ferramenta de referência (`oscap oval eval`,
  `dnf updateinfo`, python3-apt, `apk version -t`) em contêineres reais,
  com resultados idênticos.
- Novas sondas: [`mariadb`](/pt-br/configuration/products/mariadb/),
  [`pfsense`](/pt-br/configuration/products/pfsense/) (Community Edition,
  via SSH), [`supermicro-bmc`](/pt-br/configuration/products/supermicro-bmc/),
  [`dell-idrac`](/pt-br/configuration/products/dell-idrac/) e
  [`hp-ilo4`](/pt-br/configuration/products/hp-ilo4/) (via Redfish), e
  [`freeradius`](/pt-br/configuration/products/freeradius/) (via SSH, com
  `options.container` para um FreeRADIUS no Docker ou no Podman). 96 sondas
  no total.
- Resolvedor `github-tag-branches`: um ciclo de vida por major.minor a
  partir das tags do GitHub, para projetos que mantêm vários branches ao
  mesmo tempo (FreeRADIUS 3.0.x e 3.2.x).
- O FreeRADIUS é correlacionado tanto no NVD quanto no BDU.

### Corrigido

- A abreviação "8.0 U3k" da VMware no calendário de ciclo de vida agora é
  considerada igual a "8.0.3": um host [vCenter](/pt-br/configuration/products/vcenter/)
  ou [ESXi](/pt-br/configuration/products/esxi/) 8.0 atualizado não aparece
  mais como `ahead`.
- As colunas LATEST/CYCLE mostram versões limpas para produtos resolvidos
  pelo GitHub, e não a tag bruta (`2026.9.1`, e não `v2026.9.1`).
- `config validate` informa um arquivo `cve.*.path` ausente, em vez de
  passar e falhar depois, no `check`.

### Notas

- Um host [Proxmox VE](/pt-br/configuration/products/proxmox/) recebe
  achados de pacotes como um segundo alvo `debian` via SSH, ao lado do seu
  alvo `proxmox` via API; o `linux` do Debian só é correlacionado com um
  kernel Debian em execução, então o kernel próprio do Proxmox não é
  confundido com um.
- Com todas as fontes configuradas ao mesmo tempo (BDU, NVD, Debian, oito
  arquivos OVAL, Alpine), o `check` levou ~22 s a frio e ~3,4 s com cache,
  com pico de ~0,5–0,6 GB — menos se `cve.oval.path` contiver apenas as
  versões que você usa.
- O histórico do repositório foi reescrito e assinado novamente para
  remover nomes de host internos; todas as tags foram recriadas sobre o
  histórico reescrito. Os binários das versões até a 2.0.0+0 informam
  hashes de commit anteriores à reescrita.
- MariaDB, pfSense e as sondas de BMC ainda não têm mapeamento de CVEs.

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
  [como baixá-los](/pt-br/cve/#baixando-os-bancos-de-dados),
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
