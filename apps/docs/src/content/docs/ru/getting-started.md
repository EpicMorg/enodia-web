---
title: Начало работы
description: Установите enodia и запустите первую проверку.
---

## Установка

Самый простой путь — одна команда, сама подберёт нужный бинарник под
вашу ОС/архитектуру:

```bash
curl -fsSL https://get.enodia.sh/unix | sh   # Linux/macOS/Android (Termux)
```

```powershell
irm https://get.enodia.sh/windows | iex      # Windows
```

`enodia` сразу же доступна в том же самом окне PowerShell — установщик
патчит `PATH` текущей сессии напрямую, а не только сохранённое значение
в реестре, которое подхватил бы только новый терминал.

:::tip[Работает и в Termux (Android)]
Та же самая Unix-команда работает без изменений — подтверждено на
реальном устройстве, — но под капотом она ставит другой бинарник, не
тот, что на настоящем Linux. Линкер Bionic отказывается запускать
что-либо, кроме PIE-бинарника (`ET_DYN`) — это политика ядра/линкера,
действующая с Android Lollipop, — а обычная сборка enodia для
`linux/arm64` — это самый обычный `ET_EXEC`, который на первой же
попытке отказался запускаться вообще. `install.sh` определяет Termux
через `$TERMUX_VERSION` и вместо обычной скачивает отдельную сборку
`android/arm64` (`GOOS=android`, PIE, интерпретатор
`/system/bin/linker64` — путь, гарантированно существующий на любом
Android-устройстве, а не что-то, что должен предоставлять сам Termux).
Плюс откат на `$PREFIX/bin` для директории установки, когда обычная не
пишется, а `sudo` не работает по-настоящему (опциональный пакет `sudo`
в Termux есть, но на неrooted-устройстве просто отказывает) — так что
переменная окружения нигде не нужна; на сегодня под Android собирается
только arm64.
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
  ghcr.io/epicmorg/enodia:latest check --config /config/config.yaml
```

Тот же образ публикуется и в `docker.io/epicmorg/enodia`, и в Quay —
те же теги, тот же multi-arch манифест, бери тот registry, откуда уже
и так тянешь остальное. Кроме `latest`, каждый релиз публикует и полный
закреплённый номер версии (например `1.0.0-1` — `+` не разрешён в
Docker-теге, поэтому разделитель build-метаданных становится `-`), и
голый тег мажорной версии (`1`), если хочешь закрепиться не так жёстко,
как на `latest`.

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
| Android (Termux) | только arm64 | Android 5.0 Lollipop или новее — минимум для поддержки PIE (см. заметку про Termux выше); самому Termux на практике может требоваться более новая версия |

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
