---
title: Начало работы
description: Установи enodia и запусти первую проверку.
---

## Установка

:::caution[Релиза с тегом ещё нет]
enodia в статусе pre-1.0. Когда появится релиз, каждый будет нести
пакеты `.deb`, `.rpm`, `.apk` и Arch-овский `.pkg.tar.zst`
(linux/amd64+arm64), сырые архивы под все поддерживаемые платформы и
образ контейнера. До тех пор — сборка из исходников, см. ниже.
:::

Когда релизы появятся, установка будет выглядеть так:

```bash
sudo dpkg -i enodia_linux_amd64.deb                # Debian/Ubuntu
sudo rpm -i enodia_linux_amd64.rpm                 # Fedora/RHEL
apk add --allow-untrusted enodia_linux_amd64.apk   # Alpine
sudo pacman -U enodia_linux_amd64.pkg.tar.zst      # Arch
```

```bash
docker run --rm \
  -v /etc/enodia:/config:ro \
  ghcr.io/epicmorg/enodia:1 check --config /config/config.yaml
```

либо сырые install-скрипты, когда их опубликуют:

```bash
curl -sSL https://raw.githubusercontent.com/EpicMorg/enodia/master/install.sh | sh   # Linux/macOS
```

```powershell
irm https://raw.githubusercontent.com/EpicMorg/enodia/master/install.ps1 | iex        # Windows
```

### Сборка из исходников (работает уже сейчас)

Нужен Go — точную версию, на которую сейчас рассчитана enodia, смотри в
`go.mod`.

```bash
git clone https://github.com/EpicMorg/enodia.git
cd enodia
go build -o enodia ./cmd/enodia
./enodia version
```

### Поддерживаемые платформы (когда появится релиз)

| ОС | Архитектура | Минимальная версия |
|---|---|---|
| Linux | amd64, arm64 | Ядро 3.2 или новее — Debian 8+, Ubuntu 14.04+, RHEL/CentOS 7+ подходят с запасом |
| Windows | amd64, arm64, 386 | Windows 10 / Windows Server 2016 или новее |
| macOS | amd64, arm64 | macOS 12 Monterey или новее |

Это собственный минимум тулчейна Go, а не что-то, что enodia добавляет
сверху. Сборка из исходников более новым Go поднимает минимум для macOS
ещё выше — это решение тулчейна, а не проекта.

## Твой первый конфиг

Создай `enodia.yaml` рядом с бинарником (или в любом из мест, перечисленных
в [Конфигурации](/ru/configuration/#расположение-файлов)):

```yaml title="enodia.yaml"
schemaVersion: 1
targets:
  - id: gitlab-main
    product: gitlab
    address: https://gitlab.example.com
```

Затем запусти:

```bash
enodia check
```

```console
ID           PRODUCT  PATCH  LIFECYCLE  BRANCH  SEVERITY  REASON
gitlab-main  gitlab   ...
```

`check` без `--from` собирает данные и оценивает их за один прогон —
enodia достучится до твоего таргета, затем до интернета за данными
жизненного цикла. Если у таргета есть сеть только до твоей
инфраструктуры (закрытый контур), а не до интернета — раздели фазы:

```bash
# внутри закрытого контура - интернет не нужен
enodia collect --config enodia.yaml -o inventory.jsonl

# где угодно ещё - доступ к сервисам не нужен
enodia check --from inventory.jsonl
```

## Добавление учётных данных

Таргету с приватным API нужен именованный credential, который
резолвится из карты `credentials:` в `enodia.yaml` (либо из отдельного
`credentials.yaml` — см. [Конфигурацию](/ru/configuration/)):

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

`${GITLAB_TOKEN}` подставляется из окружения в момент загрузки — см.
[Конфигурацию](/ru/configuration/#подстановка-переменных-окружения).
Секретам не обязательно жить в одном файле с инвентарём сервисов.

## Дальше

- [Концепции](/ru/concepts/) — решения, которые стоят за всем этим.
- [Справочник CLI](/ru/cli-reference/) — все команды и флаги.
- [Представления](/ru/views/) — не только дефолтная таблица, но и
  `lifecycle`, `drift`, `fleet`.
