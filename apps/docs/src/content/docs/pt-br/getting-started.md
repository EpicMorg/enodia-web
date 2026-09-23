---
title: Primeiros passos
description: Instale o enodia e execute sua primeira verificação.
---

## Instalação

O caminho mais fácil — um único comando, que escolhe o binário certo para o
seu SO/arquitetura:

```bash
curl -fsSL https://get.enodia.sh/unix | sh   # Linux/macOS/Android (Termux)
```

```powershell
irm https://get.enodia.sh/windows | iex      # Windows
```

O `enodia` pode ser executado imediatamente depois, nessa mesma janela do
PowerShell — o instalador altera o `PATH` da sessão atual diretamente, e não
apenas o valor persistido no registro que um terminal novo carregaria.

No Windows, o [Chocolatey](https://community.chocolatey.org/packages/enodia)
também funciona, se você preferir que o gerenciador de pacotes acompanhe as
atualizações (um pacote winget está a caminho, ainda não publicado):

```powershell
choco install enodia
```

:::tip[Também funciona no Termux (Android)]
O mesmo one-liner Unix funciona sem modificações — confirmado em um
dispositivo real —, mas por baixo dos panos ele instala um binário diferente
do que instalaria em um Linux de verdade. O linker Bionic do Android se
recusa a executar qualquer coisa que não seja um binário PIE (`ET_DYN`) (uma
política do kernel/linker desde o Android Lollipop), e o build `linux/arm64`
normal do enodia é um `ET_EXEC` simples — que na primeira tentativa não
chegou nem a executar. O `install.sh` detecta o Termux pela variável
`$TERMUX_VERSION` e baixa em vez disso um build dedicado `android/arm64`
(`GOOS=android`, PIE, interpretador `/system/bin/linker64` — um caminho que
com certeza existe em qualquer dispositivo Android, e não algo que o próprio
Termux precise fornecer). Ele também recorre a `$PREFIX/bin` como diretório
de instalação quando o diretório habitual não é gravável e o `sudo` não é
uma opção real (o pacote opcional `sudo` do próprio Termux existe, mas
simplesmente recusa em um dispositivo sem root) — portanto, nada disso exige
sobrescrever variáveis de ambiente; arm64 é a única arquitetura Android para
a qual há build hoje.
:::

:::caution[Dispositivos Android com root podem precisar de `su`]
Confirmado na prática: em um dispositivo **com root** (Magisk/KernelSU), o
binário `android_arm64` correto ainda pode falhar ao executar como o usuário
comum do Termux — o Cobra informa algo como `unknown command "<path-to-enodia>"
for "enodia"`, o que na verdade significa que o SO nunca chegou a repassar ao
binário os seus próprios argumentos. Executar exatamente o mesmo binário via
`su` com o caminho completo funciona. Trata-se de um bug upstream conhecido e
ainda aberto —
[termux-exec#40](https://github.com/termux/termux-exec/issues/40): a lógica
de isenção do linker do próprio `termux-exec` não reconhece os contextos de
processo do Magisk/KernelSU/`run-as`/ADB, nos quais um dispositivo com root
costuma colocar até uma sessão comum do Termux. Não é algo que o build do
enodia ou o `install.sh` consigam contornar — um dispositivo sem root não
deve passar por isso.
:::

Ou um pacote, se você preferir que o gerenciador de pacotes acompanhe as
atualizações:

```bash
sudo dpkg -i enodia_linux_amd64.deb                # Debian/Ubuntu
sudo rpm -i enodia_linux_amd64.rpm                 # Fedora/RHEL
apk add --allow-untrusted enodia_linux_amd64.apk   # Alpine
sudo pacman -U enodia_linux_amd64.pkg.tar.zst      # Arch
```

Todos os pacotes instalam o binário em `/usr/bin/enodia` e as páginas de
manual em `/usr/share/man/man1/`, e criam um usuário de sistema `enodia`
dedicado e sem privilégios — nada aqui precisa de root para rodar. Baixe o
pacote certo na [versão mais recente](https://github.com/EpicMorg/enodia/releases/latest).

Ou um contêiner:

```bash
docker run --rm \
  -v /etc/enodia:/config:ro \
  ghcr.io/epicmorg/enodia:latest check --config /config/config.yaml
```

**Desde a 1.1.0, esta imagem é construída e publicada por um repositório
companheiro**,
[EpicMorg/docker](https://github.com/EpicMorg/docker/tree/master/linux/ecosystem/apps/enodia),
com seu próprio cronograma — e não mais pelo pipeline de release deste
projeto, embora o endereço publicado e as tags continuem os mesmos. Ela
também é publicada em `docker.io/epicmorg/enodia` e no Quay, com as mesmas
tags — `latest`, a versão major isolada (`2`) e a versão exata sem sufixo de
build (por exemplo, `2.0.0` — confirmado na prática nos três registries; as
tags de um pipeline anterior tinham o formato `1.0.0-1`, que ainda podem ser
baixadas, mas não é assim que as novas versões são marcadas daqui em diante).
Duas mudanças reais que vale conhecer: a imagem agora é **apenas
`linux/amd64`** (o arm64 foi descartado quando a publicação mudou de lugar)
e ela roda como **root** em vez de um usuário dedicado, sobre a base própria
do projeto, `debian:trixie-light`, em vez de `scratch`.

### Compilar a partir do código-fonte

Requer Go — verifique o `go.mod` para saber a versão exata que o enodia
usa atualmente.

```bash
git clone https://github.com/EpicMorg/enodia.git
cd enodia
go build -o enodia ./cmd/enodia
./enodia version
```

### Plataformas suportadas

| SO | Arquitetura | Versão mínima |
|---|---|---|
| Linux | amd64, arm64 | Kernel 3.2 ou posterior — Debian 8+, Ubuntu 14.04+, RHEL/CentOS 7+ atendem com folga |
| Windows | amd64, arm64, 386 | Windows 10 / Windows Server 2016 ou posterior |
| macOS | amd64, arm64 | macOS 12 Monterey ou posterior |
| Android (Termux) | somente arm64 | Android 7 ou posterior — [o piso do próprio Termux](https://github.com/termux/termux-app), mais restrito que o mínimo de suporte a PIE do Android 5.0 Lollipop, que foi o que de fato motivou o build separado (veja a nota sobre o Termux acima). Dispositivos com root podem precisar de `su` — veja o aviso acima |

Esses são os pisos do próprio toolchain do Go, e não algo que o enodia
acrescenta. Compilar a partir do código-fonte com um Go mais novo eleva
ainda mais o piso do macOS — essa é uma decisão do toolchain, não do
projeto.

## Sua primeira configuração

Crie um `enodia.yaml` ao lado do binário (ou em qualquer um dos locais
listados em [Configuração](/pt-br/configuration/#localização-dos-arquivos)):

```yaml title="enodia.yaml"
schemaVersion: 1
targets:
  - id: gitlab-main
    product: gitlab
    address: https://gitlab.example.com
```

Depois execute:

```bash
enodia check
```

```console
ID           PRODUCT  PATCH  LIFECYCLE  BRANCH  SEVERITY  REASON  CVES
gitlab-main  gitlab   ...
```

O `check` sem `--from` coleta e avalia em um único processo — o enodia
acessa o seu alvo e depois acessa a internet para consultar os dados de
ciclo de vida. Se o seu alvo só tem acesso de rede à sua infraestrutura (um
ambiente fechado) e não à internet, separe as duas fases:

```bash
# dentro da rede fechada - não precisa de internet
enodia collect --config enodia.yaml -o inventory.jsonl

# em qualquer outro lugar - não precisa de acesso aos seus serviços
enodia check --from inventory.jsonl
```

## Adicionando credenciais

Um alvo com uma API privada precisa de uma credencial nomeada, resolvida a
partir do mapa `credentials:` do próprio `enodia.yaml` (ou de um
`credentials.yaml` separado — consulte [Configuração](/pt-br/configuration/)):

```yaml title="enodia.yaml"
schemaVersion: 1
targets:
  - id: gitlab-main
    product: gitlab
    address: https://gitlab.example.com
    credentials: gitlab-token

credentials:
  gitlab-token:
    kind: token-header
    header: PRIVATE-TOKEN
    value: "${GITLAB_TOKEN}"
```

`${GITLAB_TOKEN}` é interpolado a partir do ambiente no momento do
carregamento — consulte [Configuração](/pt-br/configuration/#interpolação-de-variáveis-de-ambiente).
Os segredos nunca precisam ficar no mesmo arquivo que o inventário dos seus
serviços.

## Próximos passos

- [Conceitos](/pt-br/concepts/) para as decisões de design por trás de tudo
  isso.
- [Referência da CLI](/pt-br/cli-reference/) para todos os comandos e flags.
- [Visões](/pt-br/views/) para `lifecycle`, `drift` e `fleet` — não só a
  tabela padrão.
