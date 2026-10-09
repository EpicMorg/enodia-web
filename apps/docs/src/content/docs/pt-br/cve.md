---
title: Correlação de CVEs
description: Comparação de cada versão sondada com o BDU FSTEC, o NIST NVD e os dados de segurança dos próprios fornecedores, e dos pacotes instalados em hosts Linux com os das suas distribuições — a partir de arquivos locais que o enodia cve update ou você mesmo baixa.
---

Desde a 2.0, o enodia consegue dizer quais vulnerabilidades conhecidas
afetam a versão exata que cada alvo informa — ao lado dos eixos
patch/ciclo de vida/ramo, e não no lugar deles. Ele faz a correspondência
com dois bancos de dados públicos:

- **BDU FSTEC** — o banco de dados de vulnerabilidades do FSTEC (Rússia),
  [bdu.fstec.ru](https://bdu.fstec.ru/).
- **NIST NVD** — o National Vulnerability Database dos EUA,
  [nvd.nist.gov](https://nvd.nist.gov/).

Qualquer um dos dois funciona sozinho; com ambos configurados, os achados
são mesclados por CVE.

Desde a 2.2, os dados de segurança de quatro fornecedores se juntam a
eles onde eles os publicam: MariaDB, Atlassian (Jira, Confluence,
Bitbucket, Bamboo), PostgreSQL e nginx — consulte
[Dados dos próprios fornecedores](#dados-dos-próprios-fornecedores).

Desde a 2.1, dez distribuições Linux também têm correspondência **por
pacote instalado** com os dados de segurança dos próprios fornecedores — o
Debian Security Tracker, arquivos OVAL dos fornecedores e o secdb do
Alpine (consulte
[CVEs por pacote para distribuições Linux](#cves-por-pacote-para-distribuições-linux)).

Tudo é opcional: uma configuração sem bloco `cve:` se comporta exatamente
como na 1.x, e cada fonte funciona por conta própria.

## Baixando os bancos de dados

O enodia faz a correspondência apenas com arquivos locais. `check`,
`collect` e `serve` nunca baixam nada — o mesmo raciocínio de rede fechada
do
[design em duas fases](/pt-br/concepts/#duas-fases-separáveis-de-propósito):
a máquina que executa o `check` não precisa de acesso à internet para a
correspondência de CVEs, apenas de uma cópia dos arquivos. Desde a 2.2, um
comando separado os busca, e só quando você o executa: `enodia cve update`.
Ou baixe-os você mesmo, como descrito abaixo para cada fonte — os arquivos
são os mesmos de qualquer forma.

### `enodia cve update`

```bash
enodia cve update                         # todo cve.*.path da configuração ativa
enodia cve update --from inventory.jsonl  # também o que os hosts desse inventário precisam
enodia cve update --dry-run               # lista o que seria buscado, não baixa nada
```

Para cada `cve.*.path` configurado, ele busca o que essa entrada lê:

- **BDU** — `vulxml.zip`. Aqui `cve.bdu.path` precisa ser um `.zip`; as
  formas `.xml` e `.tar.gz`, que a consulta também aceita, são um
  reempacotamento seu, que o `update` não produz.
- **NVD** — o arquivo deste ano, o do ano passado e qualquer ano que
  ainda não esteja no disco; `--all-years` atualiza todos os anos (o NVD
  recompila todos os arquivos anuais diariamente). `cve.nvd.path`
  precisa ser um diretório.
- **Debian** — o `.json` do tracker.
- **OVAL, secdb do Alpine, páginas por major do PostgreSQL** — um arquivo
  por versão, então as versões vêm de três lugares: os arquivos que já
  estão no diretório, os inventários passados com `--from` (as versões que
  os hosts deles executam) e `--oval`, `--alpine` e `--postgresql`.
  `cve.oval.path` e `cve.alpine.path` precisam ser diretórios; um
  `cve.postgresql.path` que é um arquivo recebe apenas a página principal.
- **MariaDB, Atlassian, nginx** e a página principal do PostgreSQL — um
  arquivo cada.

| Flag | Busca |
|---|---|
| `--from <inventory>` | as versões OVAL, os branches do Alpine e os majors do PostgreSQL de que os hosts desse inventário precisam (repetível) |
| `--oval <release>` | uma versão OVAL: `ubuntu:<codename>`, `rhel:<N>`, `almalinux:<N>`, `oracle-linux:<N>`, `astra-linux:<X.Y>`, `redos:<X.Y>` (repetível) |
| `--alpine <branch>` | o secdb de um branch do Alpine, por exemplo `v3.22` (repetível) |
| `--postgresql <major>` | a página de segurança própria de um major do PostgreSQL, por exemplo `13` (repetível) |
| `--all-years` | todos os anos do NVD, e não só este, o anterior e os ausentes |
| `--dry-run` | lista o que seria buscado, não baixa nada |

Cada arquivo é solicitado com If-Modified-Since da sua cópia no disco,
baixado em `.enodia-update/` ao lado dela, **carregado pelo mesmo código
que a consulta de CVEs usa** e só então movido por cima da cópia antiga —
um zip truncado ou uma página de erro HTML nunca substitui um arquivo que
funciona. Um arquivo inalterado custa uma requisição (MariaDB, PostgreSQL
e Atlassian não enviam Last-Modified, então esses são baixados de novo e
comparados). Erros de rede, 429 e 5xx são repetidos duas vezes. Uma falha
não interrompe o resto; o código de saída é `1` se algum arquivo falhou.
Execute-o via cron — o próximo ciclo de `check` ou `serve` pega os novos
arquivos.

O TLS é verificado com as raízes confiáveis do sistema, mais o que um
bloco `cve.update` adicionar:

```yaml title="enodia.yaml"
cve:
  update:
    ca_file: /etc/enodia/russian-trusted.pem  # adicionado às raízes do sistema: PEM (um ou vários) ou DER
    ca_dir: /etc/enodia/ca                    # todos os arquivos de certificado nele, da mesma forma
    tls_skip_verify: false                    # true: não verifica nada, em todos os downloads
```

O bdu.fstec.ru precisa disso: a sua cadeia termina na Russian Trusted Root
CA, que quase nenhum repositório de confiança traz, e o servidor não envia
o seu intermediário (consulte [BDU FSTEC](#bdu-fstec) abaixo). Sem nenhum
dos dois, o download do BDU falha com `certificate signed by unknown
authority` e os demais continuam. A Root CA e a Sub CA de 2024 são
publicadas em `http://nuc-cdp.digital.gov.ru/cdp/rootca_ssl_rsa2022.crt`
e `http://nuc-cdp.digital.gov.ru/cdp/subca_ssl_rsa2024.crt`; um arquivo
com as duas concatenadas funciona como `ca_file`.

Ele nomeia os arquivos da mesma forma que os comandos manuais abaixo
(`v3.22-main.json`, `13.html`, …), então os dois podem ser combinados. Os
hosts que ele contata estão listados na página de
[Privacidade](/pt-br/privacy/).

### BDU FSTEC

Um arquivo, a exportação completa do FSTEC (cerca de 33 MB compactado):

```bash
curl -fL --cacert ru-chain.pem \
  -o /var/lib/enodia/cve/bdu/vulxml.zip \
  https://bdu.fstec.ru/files/documents/vulxml.zip
```

O bdu.fstec.ru usa um certificado da CA nacional da Rússia (Mintsifry, o
Ministério do Desenvolvimento Digital), que não está nos repositórios de
confiança habituais do sistema — um `curl` simples falha com um erro de
certificado. Além disso, o servidor não envia o seu certificado
intermediário, e o `curl` (ao contrário de um navegador) não busca por
conta própria um intermediário ausente, então instalar apenas a raiz não é
suficiente. Monte um bundle com a raiz e o intermediário indicado pelo
certificado do site:

```bash
curl -fsS -o root.crt https://gu-st.ru/content/lending/russian_trusted_root_ca_pem.crt
curl -fsS -o sub.crt  http://nuc-cdp.digital.gov.ru/cdp/subca_ssl_rsa2024.crt
{ cat root.crt; echo; cat sub.crt; } > ru-chain.pem
```

Verificado na prática em 2026-09-23. Se deixar de funcionar, o mais
provável é que o intermediário tenha sido trocado: o próprio campo
*Authority Information Access* do certificado do site indica o atual
(`openssl s_client
-connect bdu.fstec.ru:443 | openssl x509 -noout -ext authorityInfoAccess`).
O `curl -k` também baixa o arquivo, mas deixa de verificar aquilo que você
está prestes a usar no seu relatório de segurança.

### NIST NVD

Um arquivo por ano, `nvdcve-2.0-<year>.json.gz`, de 2002 até o ano atual.
Coloque os que você quiser em um mesmo diretório:

```bash
mkdir -p /var/lib/enodia/cve/nvd && cd /var/lib/enodia/cve/nvd
for y in $(seq 2002 "$(date +%Y)"); do
  curl -fsSLO "https://nvd.nist.gov/feeds/json/cve/2.0/nvdcve-2.0-$y.json.gz"
done
```

O arquivo do ano atual é atualizado diariamente; os anos anteriores mudam
raramente. Cada arquivo tem um arquivo `.meta` associado
(`nvdcve-2.0-<year>.meta`) com o seu tamanho e `sha256` — observe que o
hash é do JSON *descompactado*, e não do `.gz`.

### Debian Security Tracker

Um arquivo, a exportação JSON completa do tracker (cerca de 80 MB), para
alvos `debian`:

```bash
curl -fsSL -o /var/lib/enodia/cve/debian.json \
  https://security-tracker.debian.org/tracker/data/json
```

Cópias `.json.gz` e `.json.zip` também funcionam.

### OVAL dos fornecedores

Um arquivo por versão de distribuição presente na sua frota, todos em um
mesmo diretório, para alvos `ubuntu`, `linuxmint`, `rhel`, `rocky-linux`,
`almalinux`, `oracle-linux`, `astra-linux` e `redos`:

| Alvos | Arquivo |
|---|---|
| Ubuntu, Linux Mint (a sua base Ubuntu) | `https://security-metadata.canonical.com/oval/com.ubuntu.<codename>.usn.oval.xml.bz2` |
| RHEL **e Rocky Linux** | `https://security.access.redhat.com/data/oval/v2/RHEL<N>/rhel-<N>.oval.xml.bz2` |
| AlmaLinux | `https://security.almalinux.org/oval/org.almalinux.alsa-<N>.xml.bz2` |
| Oracle Linux | `https://linux.oracle.com/security/oval/com.oracle.elsa-ol<N>.xml.bz2` |
| Astra Linux SE 1.7, 1.8 | `https://dl.astralinux.ru/astra/oval/<1.7\|1.8>_x86-64/oval-definitions-alse-<1.7\|1.8>.xml` |
| RED OS 7.3, 8.0 | `https://redos.red-soft.ru/support/secure/<7.3\|8.0>/redos.xml` |

```bash
mkdir -p /var/lib/enodia/cve/oval && cd /var/lib/enodia/cve/oval
curl -fsSLO https://security-metadata.canonical.com/oval/com.ubuntu.noble.usn.oval.xml.bz2
curl -fsSLO https://security.access.redhat.com/data/oval/v2/RHEL9/rhel-9.oval.xml.bz2
curl -fsSL -o redos-8.0.xml https://redos.red-soft.ru/support/secure/8.0/redos.xml
```

Os arquivos são usados como são publicados, `.xml` ou `.xml.bz2`. A versão
a que um arquivo se refere é lida do seu conteúdo, nunca do seu nome — por
isso os dois arquivos do RED OS, ambos publicados como `redos.xml`, só
precisam ter nomes distintos no disco. Dois arquivos são recusados de
propósito, com um erro que indica o arquivo a usar no lugar:

- **O OVAL próprio do Rocky Linux** (`org.rockylinux.rlsa-<N>.xml`) — ele
  contém uma pequena fração dos avisos do Rocky e não passa na validação do
  esquema OVAL. O Rocky recompila os pacotes da Red Hat com as mesmas
  versões, então os hosts Rocky são correlacionados com o arquivo da Red
  Hat.
- **A variante `oci.` do Ubuntu** — ela verifica o arquivo de status do
  dpkg com expressões regulares em vez de pacotes.

Todas as URLs verificadas na prática em 2026-10-02.

### secdb do Alpine

Dois arquivos por branch do Alpine presente na sua frota, `main` e
`community`, para alvos `alpine-linux`. Eles têm os mesmos nomes em todos
os branches, então salve-os com nomes distintos:

```bash
mkdir -p /var/lib/enodia/cve/alpine && cd /var/lib/enodia/cve/alpine
for b in v3.20 v3.22; do
  for r in main community; do
    curl -fsSL -o "$b-$r.json" "https://secdb.alpinelinux.org/$b/$r.json"
  done
done
```

### A própria tabela de CVEs do MariaDB

Um único arquivo, para alvos `mariadb`: a própria página do MariaDB
"Security Vulnerabilities (CVE) Fixed in MariaDB Community Server", salva
como está, no seu código-fonte Markdown (cerca de 320 KB):

```bash
curl -fsSL -o /var/lib/enodia/cve/mariadb.md \
  https://mariadb.com/docs/server/security/cve/community-server.md
```

Verificado na prática em 2026-10-09.

### Dados de vulnerabilidade da Atlassian

Um arquivo, para alvos `jira`, `confluence`, `bitbucket` e `bamboo`: a
exportação de transparência de vulnerabilidades da Atlassian, o JSON que
esta URL retorna, salvo como está (cerca de 2,3 MB, sem login):

```bash
curl -fsSL -o /var/lib/enodia/cve/atlassian.json \
  https://api.atlassian.com/vuln-transparency/v1/products
```

### Páginas de segurança do PostgreSQL

Para alvos `postgresql`: a página de segurança do projeto salva como HTML.
Ela indica apenas os majors suportados hoje — para um major mais antigo,
salve a sua própria página (`/support/security/<major>/`) no mesmo
diretório:

```bash
mkdir -p /var/lib/enodia/cve/postgresql && cd /var/lib/enodia/cve/postgresql
curl -fsSL -o security.html https://www.postgresql.org/support/security/
curl -fsSL -o 13.html   https://www.postgresql.org/support/security/13/
```

### Avisos de segurança do nginx

Um arquivo, para alvos `nginx`: a página de avisos salva como HTML:

```bash
curl -fsSL -o /var/lib/enodia/cve/nginx.html \
  https://nginx.org/en/security_advisories.html
```

Todas as três URLs verificadas na prática em 2026-10-09.

## Configuração

Um bloco `cve:` no `enodia.yaml` — e não no `settings.yaml`, já que ele
muda a avaliação, e não só a exibição:

```yaml title="enodia.yaml"
schemaVersion: 1
cve:
  bdu:
    path: /var/lib/enodia/cve/bdu/vulxml.zip
  nvd:
    path: /var/lib/enodia/cve/nvd
  debian:
    path: /var/lib/enodia/cve/debian.json
  oval:
    path: /var/lib/enodia/cve/oval
  alpine:
    path: /var/lib/enodia/cve/alpine
  mariadb:
    path: /var/lib/enodia/cve/mariadb.md
  atlassian:
    path: /var/lib/enodia/cve/atlassian.json
  postgresql:
    path: /var/lib/enodia/cve/postgresql
  nginx:
    path: /var/lib/enodia/cve/nginx.html
targets:
  - id: gitlab-main
    product: gitlab
    address: https://gitlab.example.com
    credentials: gitlab-token
```

| Campo | Aceita |
|---|---|
| `cve.bdu.path` | um `.xml`, um `.zip` (a exportação como é publicada) ou um `.tar.gz`/`.tgz` |
| `cve.nvd.path` | um único arquivo `.json`, `.json.gz` ou `.json.zip`, ou um diretório com eles |
| `cve.debian.path` | a exportação do tracker: `.json`, `.json.gz` ou `.json.zip` |
| `cve.oval.path` | um arquivo OVAL (`.xml` ou `.xml.bz2`), ou um diretório com eles |
| `cve.alpine.path` | um arquivo `.json` do secdb, ou um diretório com eles |
| `cve.mariadb.path` | o `community-server.md` do MariaDB, salvo como está |
| `cve.atlassian.path` | o JSON vuln-transparency da Atlassian, salvo como está |
| `cve.postgresql.path` | a página de segurança do PostgreSQL como HTML, ou um diretório com essas páginas |
| `cve.nginx.path` | o `security_advisories.html` do nginx, salvo como está |
| `cve.update` | opções de TLS apenas para o [`enodia cve update`](#enodia-cve-update): `ca_file`, `ca_dir`, `tls_skip_verify` |

Caminhos relativos são resolvidos em relação ao diretório do arquivo de
configuração que os menciona, assim como `credentials_file`. O bloco é lido
da configuração que a execução de fato usa — `--config`, `$ENODIA_CONFIG`
ou os [caminhos de busca padrão](/pt-br/configuration/#localização-dos-arquivos).
Isso inclui `check --from inventory.jsonl`: um inventário coletado dentro de
uma rede fechada é correlacionado onde quer que o `check` rode, desde que
lá seja encontrada uma configuração com bloco `cve:`. Sem nenhuma
configuração encontrada, o `check --from` continua funcionando, só que sem
CVEs.

**Um caminho configurado que não existe é um erro**, e não algo ignorado em
silêncio — o `check` termina com `stat ...: no such file or directory` em
vez de produzir um relatório que simplesmente não tem CVEs. Desde a 2.1,
o `enodia config validate` também verifica se cada caminho configurado
existe, então um erro de digitação aparece já ali (desde a 2.2, também
`cve.update.ca_file` e `ca_dir`). Se um arquivo de fato pode ser processado
continua sendo descoberto apenas quando uma execução o carrega — ou quando
o `enodia cve update` o baixa.

:::caution[Caminhos no Windows]
Escreva um caminho do Windows sem aspas, entre aspas simples, com barras
normais ou como caminho UNC. Entre aspas **duplas** do YAML, `\t` e `\n`
viram uma tabulação e uma quebra de linha — `"C:\tmp\bdu.zip"` apontaria
silenciosamente para outro lugar; por isso o enodia rejeita, no momento do
carregamento, um caminho que contenha um caractere de controle, com uma
dica.
:::

## Primeira execução e cache

O BDU e o NVD são processados em streaming e o resultado fica em cache no
diretório de cache do SO (`$XDG_CACHE_HOME/enodia/cve`, ou seja,
`~/.cache/enodia/cve` por padrão no Linux; `~/Library/Caches/enodia/cve` no
macOS; `%LocalAppData%\enodia\cve` no Windows). A primeira execução depois
que um arquivo muda o processa por completo — cerca de um minuto para todo
o NVD mais o BDU; medido em 2026-09-23 com o BDU mais apenas o arquivo de
2026 do NVD, 25 s. Todas as execuções seguintes leem o cache: 0,2 s para os
mesmos dados, um cache de 11 MB. Não há TTL — o cache é indexado pelos
próprios arquivos (tamanho e data de modificação) e pelas tabelas de
produtos do próprio enodia, então substituir um arquivo, adicionar um ano
ao diretório do NVD ou atualizar o enodia disparam, cada um por si, uma
reconstrução.

O OVAL processado fica em cache da mesma forma — cerca de 11 s para
processar juntos os arquivos do Ubuntu noble, do RHEL 9, do AlmaLinux 9 e
do Oracle Linux 9, a maior parte disso em bzip2. A exportação do tracker do
Debian (cerca de um segundo para processar) e o secdb do Alpine (algumas
centenas de KB) não ficam em cache. Com todas as fontes configuradas ao
mesmo tempo (BDU, NVD, Debian, oito arquivos OVAL, Alpine), o upstream
mediu o `check` em cerca de 22 s a frio e 3,4 s com cache, com pico de
0,5–0,6 GB de memória — menos se `cve.oval.path` contiver apenas as
versões que você de fato usa.

O `enodia serve` relê o bloco `cve:` e os arquivos a cada ciclo de
`--interval` (a baixo custo, a partir do cache), então substituir os
arquivos via cron passa a valer sem reiniciar o servidor.

## Onde os achados aparecem

- **`check`** — uma coluna `CVES` nas [visões `compact` e
  `drift`](/pt-br/views/): o número de CVEs distintas que afetam aquela
  versão exata. `-` significa nenhum achado — nenhuma afeta aquela versão,
  não há bloco `cve:` ou o enodia não faz correspondência para o produto
  (veja abaixo); a coluna em si está sempre presente. As visões
  `lifecycle` e `fleet` não têm essa coluna.
- **`export --format html`** — a mesma coluna, com um link que abre uma
  lista por alvo: uma linha por CVE, da mais grave para a menos grave, com
  links para o NVD, o cve.org e, para achados do BDU, a página em
  bdu.fstec.ru; o texto em russo do BDU quando o BDU tem a CVE, e a
  descrição em inglês do NVD caso contrário; e a classificação como badges
  coloridos, por exemplo `CRITICAL · CVSS 3.1
  9.8`. Os achados por pacote são, em vez disso, uma linha por pacote —
  `linux 6.12.107-1 → 6.12.111-1`, com link para o aviso que traz a
  correção e a sua lista de CVEs recolhida logo abaixo. É CSS puro — o
  relatório offline padrão continua sem nenhum JavaScript.
- **`export --format json`** — todos os achados por fonte, por completo, no
  array `cves` de cada avaliação: a fonte (`bdu`, `nvd` ou a de um
  fornecedor: `mariadb`, `atlassian`, `postgresql`, `nginx`), o ID do boletim,
  os IDs de CVE, o título, o texto de severidade da própria fonte, o nome do
  produto ou CPE correspondente, o intervalo de versões e uma classificação
  CVSS extraída. Ao contrário da tabela e da lista HTML, que contam uma
  linha por CVE, o JSON mantém separado o achado de cada fonte — a mesma
  CVE pode aparecer uma vez vinda do BDU e uma vez para cada CPE
  correspondente do NVD. Os achados por pacote (fonte `debian`, `oval` ou
  `alpine`) também trazem as versões instalada e corrigida — consulte
  [Relatórios](/pt-br/reporting/#--format-json).
- **`export --format prometheus`** — nenhum dado de CVE.

**As CVEs não afetam a severidade nem o código de saída.** A `SEVERITY`
continua sendo calculada apenas a partir dos eixos patch/ciclo de vida/ramo,
e o `--fail-on` também só conhece esses três eixos — um achado é um fato a
ser analisado, e não um veredito que o enodia deu em seu nome. Se e como
uma CVE deveria elevar a severidade é uma questão em aberto upstream.

## Quais produtos têm correspondência

91 dos 123 produtos: 81 pelo nome do produto no BDU e no NVD (seis deles
também com os dados do próprio fornecedor — veja
[abaixo](#dados-dos-próprios-fornecedores)), cada nome de fornecedor/produto conferido
literalmente contra as exportações completas reais, e 10 distribuições
Linux por pacote instalado (veja a próxima seção). Consulte a página de cada produto em
[Configuração de produtos](/pt-br/products/) para ver as suas fontes.

Sem correspondência, cada um por um motivo:

- **As demais distribuições Linux de uso geral** (Fedora, CentOS Stream,
  Amazon Linux, openSUSE, …) — as CVEs delas são vulnerabilidades de
  pacotes, um número de versão não diz quais pacotes foram corrigidos desde
  então, e ainda não há uma fonte por pacote para elas.
- **Os BSDs e o Oracle Solaris** — o NVD registra os seus níveis de patch
  (o `-p5` do FreeBSD, as erratas do OpenBSD) em um campo de CPE que este
  mecanismo de correspondência não lê; fazer a correspondência só pela
  versão marcaria um host totalmente corrigido com todas as CVEs já
  corrigidas naquela versão.
- **ESXi e vCenter** — o mesmo problema: quase todas as entradas deles são
  literais no estilo `7.0` + `update_1`.
- **TrueNAS** — entradas de menos, com um versionamento diferente do que a
  sonda informa.
- **Nenhum dado utilizável em nenhuma das fontes** — Kitsu, Zou,
  postgres_exporter, Perforce Proxy, Perforce Helix Swarm, Supermicro BMC,
  LibreTranslate, TorrServer e Euro-Office (um fork sem entradas próprias).
- **PostHog** — os limites dele no NVD são commits do git, e não versões.
- **`generic`** — um parser escrito à mão não tem uma identidade de produto
  para consultar.

## CVEs por pacote para distribuições Linux

Um número de versão não diz quais pacotes de um host foram corrigidos desde
então, por isso estas dez distribuições têm correspondência por pacote
instalado. As suas sondas leem os pacotes instalados e o kernel em execução
na mesma ida e volta SSH que a própria versão, e cada pacote é conferido
com os dados de segurança da sua própria distribuição:

| Sonda | Fonte | Chave |
|---|---|---|
| `debian` | Debian Security Tracker | `cve.debian.path` |
| `ubuntu` | OVAL da Canonical | `cve.oval.path` |
| `linuxmint` | OVAL da Canonical, para a sua base Ubuntu | `cve.oval.path` |
| `rhel`, `rocky-linux` | OVAL da Red Hat | `cve.oval.path` |
| `almalinux` | OVAL do AlmaLinux | `cve.oval.path` |
| `oracle-linux` | OVAL da Oracle | `cve.oval.path` |
| `astra-linux` | OVAL do Astra Linux (SE 1.7, 1.8) | `cve.oval.path` |
| `redos` | OVAL do RED OS (7.3, 8.0) | `cve.oval.path` |
| `alpine-linux` | secdb do Alpine | `cve.alpine.path` |

**Só são informadas as CVEs que já têm uma correção mais nova do que a
instalada** — o que uma atualização (e, para o kernel, uma reinicialização)
resolveria. As CVEs que o fornecedor ainda não corrigiu ficam de fora: elas
são as mesmas em todos os hosts de uma versão e ninguém pode agir sobre
elas, então soterrariam as que exigem ação.

**Um achado por pacote, e não por CVE.** Só um kernel desatualizado pode
trazer mais de mil CVEs; uma lista por CVE seria ilegível. Cada achado
indica o pacote, a sua versão instalada, a versão que resolve todas as
CVEs dele e o aviso que traz essa correção (USN, RHSA, ALSA, ELSA, boletim
do Astra, ROS ou a página do tracker do Debian/Alpine). A coluna `CVES`
continua contando CVEs, e não pacotes.

**As versões são comparadas pelas regras de cada gerenciador de pacotes** —
a ordenação do dpkg, do rpm e do apk, conferida upstream com `apt_pkg`, o
rpm e o apk-tools em milhares de pares de versões reais cada —, além dos
streams de módulos AppStream (um pacote só é correlacionado com as
correções do seu próprio stream), da arquitetura e das variantes FIPS e
Ksplice do Oracle Linux, e do kernel **em execução**, e não de quaisquer
pacotes de kernel que por acaso estejam instalados. Cada fonte foi
conferida upstream com `oscap oval eval`, `dnf updateinfo`, python3-apt ou
`apk version -t` em hosts e contêineres reais, com resultados idênticos.

**O Proxmox VE** recebe achados de pacotes como um segundo alvo: um alvo
SSH [`debian`](/pt-br/configuration/products/debian/) no mesmo host, ao
lado do seu alvo [`proxmox`](/pt-br/configuration/products/proxmox/) via
API. O pacote `linux` do Debian só é correlacionado com um kernel Debian em
execução, então o kernel próprio do Proxmox não é confundido com um.

### Correspondência sensível à edição

GitLab, HashiCorp Vault, Nextcloud e MongoDB publicam listas de CVEs
separadas para as edições community e enterprise. As sondas deles registram
a edição do próprio servidor em `extra.enterprise`, e uma instância
community deixa de ver achados exclusivos da enterprise — com dados reais,
o GitLab 19.2.2 CE vê 4 das 9 do NVD, e o Nextcloud 27.1.3 CE, 11 de 23.
Quando a edição é desconhecida (um servidor mais antigo que não a informa),
todos os achados são mantidos.

Desde a 2.2, as versões de mais alguns produtos dizem a qual linha ou
edição um intervalo se aplica:

- **Jenkins** — as versões weekly (`2.580`) e LTS (`2.568.3`) recebem a
  mesma correção com números diferentes, e os dois bancos de dados
  escrevem um intervalo para cada uma. O formato da versão escolhe a linha
  (duas partes weekly, três LTS), então uma LTS corrigida não é mais
  marcada pelo limite weekly da mesma correção.
- **Splunk** — só se aplicam os intervalos do Splunk Enterprise (o
  próprio `product_type` do splunkd diz qual é); o Splunk Cloud não é
  mapeado.
- **pfSense** — a sonda informa apenas a Community Edition, então os
  intervalos do pfSense Plus nunca se aplicam.
- **WAPT** — a própria edição do servidor (`community` ou `enterprise`) é
  repassada como está.
- **Kafka** — um build do Confluent Platform (`7.6.1-ccs`) não recebe
  consulta: a sua própria numeração pareceria mais nova do que todos os
  limites do Apache Kafka.

### Dell iDRAC e Synology DSM

**iDRAC**: os dois bancos de dados tratam cada geração do iDRAC como um
produto próprio, e os números de firmware delas se sobrepõem (o iDRAC7 e o
iDRAC8 rodam ambos a 2.x, com correções diferentes). A geração é lida do
`extra.model` da sonda, a própria string de modelo do Redfish: 11G é
iDRAC6, 12G iDRAC7, 13G iDRAC8, 14G–16G iDRAC9, 17G iDRAC10. Sem um
modelo, só o firmware 3.x e posterior é consultado — esse só pode ser um
iDRAC9.

**Synology DSM**: uma versão é versão, build e Update — a Synology
escreve `DSM 7.2.1-69057 Update 6`, o NVD e o BDU `7.2.1-69057-6`. Desde
a 2.2, a sonda também registra o Update em `extra.update`, e os dois lados
são combinados em uma única versão comparável. Um inventário coletado
antes da 2.2 não tem `extra.update` e é lido como Update 0: Updates
corrigidos podem ser marcados, nenhum é deixado de fora.

### SSH

A sonda [`ssh`](/pt-br/configuration/products/ssh/) cobre qualquer
implementação de SSH, então a correspondência é feita pelo banner:
`OpenSSH_…` consulta o OpenSSH, `dropbear_…` consulta o Dropbear, e qualquer
outra pilha SSH não recebe consulta alguma, em vez de herdar as CVEs do
OpenSSH.

## Dados dos próprios fornecedores

O BDU e o NVD frequentemente descrevem uma correção em um ramo como um
intervalo em aberto ("before 11.4.10"), que então cobre também todos os
ramos mais antigos — inclusive versões corrigidas e ramos que nunca
tiveram o bug. Quatro fornecedores publicam eles mesmos a verdade por
ramo, e o enodia a lê ao lado do BDU e do NVD, com uma regra a mais:
**quando os dados do fornecedor conhecem uma CVE, o veredito dele
prevalece** — um achado do BDU ou do NVD cujas CVEs o fornecedor cobre e
não marca para esta versão é descartado. CVEs que o fornecedor não lista
continuam vindo do BDU e do NVD.

| Chave | Produtos | Fonte |
|---|---|---|
| `cve.mariadb.path` | `mariadb` | a tabela de CVEs corrigidas do MariaDB |
| `cve.atlassian.path` | `jira`, `confluence`, `bitbucket`, `bamboo` | os dados de vulnerabilidade por versão da Atlassian |
| `cve.postgresql.path` | `postgresql` | as páginas de segurança do PostgreSQL |
| `cve.nginx.path` | `nginx` | os avisos de segurança do nginx |

Sem essas chaves, os produtos continuam sendo correlacionados apenas com o
BDU e o NVD — com o problema de sobreposição descrito acima.

### MariaDB

O MariaDB mantém cinco ou seis séries de versões ao mesmo tempo. Em
versões reais de uma frota, os intervalos do BDU e do NVD marcavam as
últimas versões, totalmente corrigidas, de séries mantidas (10.11.19,
11.4.13), enquanto esses mesmos dois bancos de dados deixavam passar 9 das
21 CVEs que o próprio MariaDB lista para a 10.11.8.

O `cve.mariadb.path` adiciona a própria tabela de CVEs corrigidas do
MariaDB, que indica a versão com a correção **por série**. CVEs que a
tabela não lista (mais novas que a sua cópia baixada, exclusivas do BDU ou
sem um ID de CVE) continuam vindo do BDU e do NVD.

Como a tabela é lida:

- Uma série com correção própria é vulnerável desde a sua primeira versão
  até essa correção.
- Uma série sem correção própria que ainda era mantida quando a CVE foi
  corrigida em outra série não é afetada — o MariaDB corrige todas as
  séries ativas juntas.
- Uma série que já tinha chegado ao fim nessa altura é marcada em todas as
  versões, com a menor correção em uma série mais nova como a versão para
  a qual migrar (o `FixStatus` informa isso). Isso tende de propósito a
  reportar a mais, e só para séries encerradas.

### Atlassian

A exportação da Atlassian lista todas as versões do Jira Software, Jira
Core, Confluence, Bitbucket e Bamboo (Server e Data Center) com as CVEs
que as afetam e a versão que corrige cada uma — **incluindo CVEs de
dependências de terceiros**, que as entradas da Atlassian no NVD nunca
listam. A sonda não consegue distinguir Server de Data Center, então as
duas listas são lidas. O Jira Service Management numera as suas versões
por conta própria e não é mapeado; release candidates e EAPs são
ignorados.

Um alvo é avaliado **dentro do seu próprio ramo major.minor**: de uma
versão afetada até a próxima listada como a que a corrige, ou até o fim
do ramo quando nenhuma correção vem depois. O Jira 10.3.26 não é marcado
por uma CVE que a Atlassian lista só para a 10.1 e a 11.3. Como a
Atlassian lista as versões uma a uma, o veredito dela só vale para uma
versão que ela lista — uma versão mais nova que a sua cópia do arquivo
mantém os achados do BDU e do NVD. O upstream mediu: a versão mais nova
de cada ramo mantido fica sem nenhum achado da Atlassian, enquanto as
mais antigas ganham muitos: o Jira 10.3.12 passou de 4 CVEs para 119,
quase todas de dependências corrigidas em versões 10.3 posteriores.

### PostgreSQL

A página de segurança indica, para cada CVE, os majors suportados que ela
afeta e a correção em cada um. O veredito dela cobre apenas os majors que
as páginas salvas indicam: a página principal lista apenas os majors
suportados hoje, então, para um major encerrado (13, 9.6), salve a sua
própria página no mesmo diretório — sem ela, esse major mantém os achados
do BDU e do NVD. Um major que já tinha sido encerrado antes de uma CVE
surgir é marcado sem correção quando a CVE retrocede até o major mais
antigo ainda suportado naquela época, como nas séries encerradas do
MariaDB. Linhas `packaging` (um instalador ou um build RPM) são
registradas, mas não marcadas. O upstream mediu as versões atuais
18/17/16/15/14 passando de até 55 achados do BDU cada para nenhum.

### nginx

Cada aviso lista as versões vulneráveis e, por ramo, a primeira versão
corrigida (`1.31.3+, 1.30.4+`): a stable 1.30.5 não é mais marcada por um
intervalo escrito até a correção da mainline. Os ramos que nunca
receberam a correção continuam marcados; avisos apenas para o
nginx/Windows são ignorados.

## Limitações conhecidas

- **O BDU pode reportar em excesso entre ramos.** Uma entrada do BDU
  frequentemente lista um intervalo separado por ramo de manutenção, todos
  com o mesmo limite inferior, então uma versão que já é a correção no seu
  próprio ramo ainda pode cair dentro do intervalo mais amplo de um ramo
  vizinho (o Confluence 8.3.3 em relação à CVE-2023-22515 é o exemplo
  documentado; os intervalos por ramo do Synology DSM fazem o mesmo — o
  DSM 7.2.1-69057 Update 8 recebe 5 achados do BDU). Os intervalos do NVD para a mesma CVE têm os seus próprios
  limites inferiores e não têm esse problema. O enodia deliberadamente
  prefere reportar um achado a ser conferido a deixar passar um real em
  silêncio.
- **Entradas do NVD sem nenhuma restrição de versão são descartadas.**
  Medido contra as exportações completas, eram quase todas CVEs de décadas
  atrás associadas a versões atuais; o custo é a rara CVE realmente não
  corrigida registrada dessa forma.
- **A cobertura por pacote tem as suas próprias lacunas.** O tracker do
  Debian só cobre as versões que a equipe de segurança do Debian ainda
  suporta (bookworm, trixie, testing, sid) — hosts mais antigos não recebem
  achados de pacotes. O Alpine edge não tem branch numerado e também não
  recebe nenhum. O OVAL não é avaliado como um interpretador completo: as
  chaves de assinatura dos pacotes não são verificadas, então um pacote de
  terceiros com o nome de um pacote da distribuição é comparado como se
  fosse da distribuição. Os pacotes de kernel do Astra Linux são comparados
  como instalados, e não como em execução.
- **As condições multiproduto do NVD** ("vulnerável apenas com a
  biblioteca Y") não são avaliadas — uma sonda informa um produto por alvo,
  então cada entrada vulnerável de um produto com correspondência conta por
  si só.
