---
title: Початок роботи
description: Установіть enodia і запустіть свою першу перевірку.
---

## Установлення

Найпростіший шлях — одна команда, яка сама обирає потрібний бінарник для
Вашої ОС/архітектури:

```bash
curl -fsSL https://get.enodia.sh/unix | sh   # Linux/macOS/Android (Termux)
```

```powershell
irm https://get.enodia.sh/windows | iex      # Windows
```

`enodia` можна запускати одразу після цього в тому самому вікні
PowerShell — інсталятор оновлює `PATH` поточного сеансу напряму, а не лише
збережене значення в реєстрі, яке підхопив би новий термінал.

У Windows також працює [Chocolatey](https://community.chocolatey.org/packages/enodia),
якщо Ви бажаєте, щоб оновлення відстежував менеджер пакетів (пакет winget
на підході, але ще не опублікований):

```powershell
choco install enodia
```

:::tip[Працює й у Termux (Android)]
Та сама Unix-команда працює без змін — перевірено на реальному пристрої, —
але під капотом установлює інший бінарник, ніж на звичайному Linux.
Лінкер Bionic в Android відмовляється виконувати будь-що, крім бінарників
PIE (`ET_DYN`) (політика ядра/лінкера, починаючи з Android Lollipop), а
звичайна збірка enodia `linux/arm64` — це простий `ET_EXEC`, який із
першої спроби взагалі не запустився. `install.sh` визначає Termux за
`$TERMUX_VERSION` і натомість завантажує окрему збірку `android/arm64`
(`GOOS=android`, PIE, інтерпретатор `/system/bin/linker64` — шлях, який
гарантовано існує на будь-якому Android-пристрої, а не те, що має
надавати сам Termux). Він також використовує `$PREFIX/bin` як каталог
установлення, коли звичайний недоступний для запису, а `sudo` не є
реальним варіантом (власний необовʼязковий пакет `sudo` у Termux існує,
але на пристрої без root просто відмовляє), — тож для всього цього не
потрібно перевизначати жодних змінних середовища; arm64 наразі єдина
архітектура Android, для якої виконується збірка.
:::

:::caution[На Android-пристроях із root може знадобитися `su`]
Перевірено наживо: на пристрої **з root** (Magisk/KernelSU) навіть
правильний бінарник `android_arm64` може не запуститися від імені
звичайного користувача Termux — Cobra повідомляє щось на кшталт
`unknown command "<path-to-enodia>" for "enodia"`, що насправді означає:
ОС узагалі не передала бінарнику його власні аргументи. Запуск того
самого бінарника через `su` з повним шляхом працює. Це відома відкрита
помилка в upstream —
[termux-exec#40](https://github.com/termux/termux-exec/issues/40): власна
логіка винятків лінкера в `termux-exec` не розпізнає контексти процесів
Magisk/KernelSU/`run-as`/ADB, у які пристрій із root часто переводить
навіть звичайний сеанс Termux. Обійти це засобами збірки enodia чи
`install.sh` неможливо — на пристрої без root цієї проблеми не має
виникати взагалі.
:::

Або пакет, якщо Ви бажаєте, щоб оновлення відстежував менеджер пакетів:

```bash
sudo dpkg -i enodia_linux_amd64.deb                # Debian/Ubuntu
sudo rpm -i enodia_linux_amd64.rpm                 # Fedora/RHEL
apk add --allow-untrusted enodia_linux_amd64.apk   # Alpine
sudo pacman -U enodia_linux_amd64.pkg.tar.zst      # Arch
```

Кожен пакет установлює бінарник у `/usr/bin/enodia`, man-сторінки — у
`/usr/share/man/man1/` і створює окремого непривілейованого системного
користувача `enodia` — для роботи тут нічого не потребує root. Потрібний
пакет можна завантажити з
[останнього релізу](https://github.com/EpicMorg/enodia/releases/latest).

Або контейнер:

```bash
docker run --rm \
  -v /etc/enodia:/config:ro \
  ghcr.io/epicmorg/enodia:latest check --config /config/config.yaml
```

**Починаючи з 1.1.0, цей образ збирає та публікує супутній репозиторій**
[EpicMorg/docker](https://github.com/EpicMorg/docker/tree/master/linux/ecosystem/apps/enodia)
за власним розкладом — а не конвеєр релізів цього проєкту, хоча адреса
публікації та теги залишилися тими самими. Образ також публікується в
`docker.io/epicmorg/enodia` і Quay з тими самими тегами — `latest`, гола
мажорна версія (`2`) і точна версія без суфікса збірки (наприклад,
`2.0.0` — перевірено наживо в усіх трьох реєстрах; теги попереднього
конвеєра натомість мали вигляд `1.0.0-1`, їх досі можна завантажити, але
нові релізи відтепер так не позначаються). Дві реальні зміни, про які
варто знати: образ тепер **лише `linux/amd64`** (arm64 прибрали, коли
публікація переїхала), і він працює від імені **root**, а не окремого
користувача, на власній базі проєкту `debian:trixie-light` замість
`scratch`.

### Збирання з вихідного коду

Потрібен Go — точну версію, на яку наразі орієнтується enodia, дивіться в
`go.mod`.

```bash
git clone https://github.com/EpicMorg/enodia.git
cd enodia
go build -o enodia ./cmd/enodia
./enodia version
```

### Підтримувані платформи

| ОС | Архітектура | Мінімальна версія |
|---|---|---|
| Linux | amd64, arm64 | Ядро 3.2 або новіше — Debian 8+, Ubuntu 14.04+, RHEL/CentOS 7+ цілком підходять |
| Windows | amd64, arm64, 386 | Windows 10 / Windows Server 2016 або новіші |
| macOS | amd64, arm64 | macOS 12 Monterey або новіша |
| Android (Termux) | лише arm64 | Android 7 або новіший — [власна нижня межа Termux](https://github.com/termux/termux-app), суворіша за мінімум підтримки PIE в Android 5.0 Lollipop, який і зумовив окрему збірку (див. примітку про Termux вище). Пристроям із root може знадобитися `su` — див. застереження вище |

Це власна нижня межа інструментарію Go, а не те, що enodia додає зверху.
Збирання з вихідного коду новішою версією Go ще більше підіймає нижню
межу для macOS — це рішення інструментарію, а не проєкту.

## Ваша перша конфігурація

Створіть `enodia.yaml` поруч із бінарником (або в будь-якому з місць,
перелічених у розділі [Конфігурація](/uk/configuration/#розташування-файлів)):

```yaml title="enodia.yaml"
schemaVersion: 1
targets:
  - id: gitlab-main
    product: gitlab
    address: https://gitlab.example.com
```

Потім запустіть:

```bash
enodia check
```

```console
ID           PRODUCT  PATCH  LIFECYCLE  BRANCH  SEVERITY  REASON  CVES
gitlab-main  gitlab   ...
```

`check` без `--from` збирає дані та оцінює їх в одному процесі — enodia
звертається до Вашої цілі, а потім до інтернету, щоб перевірити дані її
життєвого циклу. Якщо з місця, де розташована Ваша ціль, є мережевий
доступ лише до Вашої інфраструктури (закрите середовище), а до інтернету
немає, розділіть ці дві фази:

```bash
# усередині закритої мережі - інтернет не потрібен
enodia collect --config enodia.yaml -o inventory.jsonl

# будь-де ще - доступ до Ваших сервісів не потрібен
enodia check --from inventory.jsonl
```

## Додавання облікових даних

Цілі з приватним API потрібні іменовані облікові дані, які беруться з
власної мапи `credentials:` в `enodia.yaml` (або з окремого
`credentials.yaml` — див. [Конфігурація](/uk/configuration/)):

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

`${GITLAB_TOKEN}` підставляється із середовища під час завантаження —
див. [Конфігурація](/uk/configuration/#підстановка-змінних-середовища).
Секретам ніколи не потрібно зберігатися в тому самому файлі, що й інвентар
Ваших сервісів.

## Далі

- [Концепції](/uk/concepts/) — архітектурні рішення, що стоять за всім
  цим.
- [Довідник CLI](/uk/cli-reference/) — кожна команда та прапорець.
- [Подання](/uk/views/) — `lifecycle`, `drift` і `fleet`, а не лише
  таблиця за замовчуванням.
