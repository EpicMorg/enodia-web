---
title: Начало работы
description: Установите enodia и запустите первую проверку.
---

## Установка

Самый простой путь — одна команда, сама подберёт нужный бинарник под
вашу ОС/архитектуру:

```bash
curl -fsSL https://get.enodia.sh/unix | sh   # Linux/macOS
```

```powershell
irm https://get.enodia.sh/windows | iex      # Windows
```

`enodia` сразу же доступна в том же самом окне PowerShell — установщик
патчит `PATH` текущей сессии напрямую, а не только сохранённое значение
в реестре, которое подхватил бы только новый терминал.

:::tip[Работает и в Termux (Android)]
Та же самая Unix-команда работает без изменений — каждый релизный
бинарник собран полностью статически (никакой зависимости от libc,
подтверждено через `readelf`: нет dynamic-секции, нет интерпретатора),
так что нужен только совместимый Linux-ядро, а не конкретно glibc, а
ядро Android этому требованию удовлетворяет. Сам install-скрипт
откатывается на `$PREFIX/bin`, когда обычная директория установки не
пишется и нет `sudo`, чтобы повторить попытку — это ровно ситуация
Termux — так что и переменная окружения не нужна.
:::

Либо пакет, если хотите, чтобы обновления отслеживал пакетный менеджер:

```bash
sudo dpkg -i enodia_linux_amd64.deb                # Debian/Ubuntu
sudo rpm -i enodia_linux_amd64.rpm                 # Fedora/RHEL
apk add --allow-untrusted enodia_linux_amd64.apk   # Alpine
sudo pacman -U enodia_linux_amd64.pkg.tar.zst      # Arch
```

Каждый пакет ставит бинарник в `/usr/bin/enodia`, man-страницы в
`/usr/share/man/man1/` и создаёт отдельного непривилегированного
системного пользователя `enodia` — для запуска ничего из этого не
требует root. Нужный файл — на странице
[последнего релиза](https://github.com/EpicMorg/enodia/releases/latest).

Либо контейнер:

```bash
docker run --rm \
  -v /etc/enodia:/config:ro \
  ghcr.io/epicmorg/enodia:1 check --config /config/config.yaml
```

### Сборка из исходников

Нужен Go — точную версию, на которую сейчас рассчитана enodia, смотрите
в `go.mod`.

```bash
git clone https://github.com/EpicMorg/enodia.git
cd enodia
go build -o enodia ./cmd/enodia
./enodia version
```

### Поддерживаемые платформы

| ОС | Архитектура | Минимальная версия |
|---|---|---|
| Linux | amd64, arm64 | Ядро 3.2 или новее — Debian 8+, Ubuntu 14.04+, RHEL/CentOS 7+ подходят с запасом |
| Windows | amd64, arm64, 386 | Windows 10 / Windows Server 2016 или новее |
| macOS | amd64, arm64 | macOS 12 Monterey или новее |

Это собственный минимум тулчейна Go, а не что-то, что enodia добавляет
сверху. Сборка из исходников более новым Go поднимает минимум для macOS
ещё выше — это решение тулчейна, а не проекта.

## Ваш первый конфиг

Создайте `enodia.yaml` рядом с бинарником (или в любом из мест,
перечисленных в
[Конфигурации](/ru/configuration/#расположение-файлов)):

```yaml title="enodia.yaml"
schemaVersion: 1
targets:
  - id: gitlab-main
    product: gitlab
    address: https://gitlab.example.com
```

Затем запустите:

```bash
enodia check
```

```console
ID           PRODUCT  PATCH  LIFECYCLE  BRANCH  SEVERITY  REASON
gitlab-main  gitlab   ...
```

`check` без `--from` собирает данные и оценивает их за один прогон —
enodia достучится до вашего таргета, затем до интернета за данными
жизненного цикла. Если у таргета есть сеть только до вашей
инфраструктуры (закрытый контур), а не до интернета — разделите фазы:

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
