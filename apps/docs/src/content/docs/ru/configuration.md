---
title: Конфигурация
description: Все поля, которые понимают enodia.yaml, credentials.yaml и settings.yaml.
---

enodia читает до трёх файлов: **`enodia.yaml`** (обязателен — инвентарь
ваших сервисов), опциональный отдельный **`credentials.yaml`** и
опциональный **`settings.yaml`** (личные настройки отображения, никогда
не обязателен). Все три — обычный YAML.

## `enodia.yaml`

### Верхний уровень

```yaml
schemaVersion: 1
credentials_file: credentials.yaml   # опционально, см. ниже
defaults:                            # опционально
  timeout: 10s
  concurrency: 5
  retries: 2
  backoff: 500ms
credentials: {}                      # опционально, см. «Credentials»
targets: []                          # ваши сервисы
```

`schemaVersion` проверяется при чтении — будущая версия схемы будет
отклонена с советом обновиться, а не разобрана «на авось».

### `defaults`

Применяется к каждому таргету, если не переопределено на его уровне.

| Поле | Тип | Значение |
|---|---|---|
| `timeout` | duration | Таймаут на запрос (по умолчанию `10s`, если нигде не задано) |
| `concurrency` | int | Сколько таргетов опрашивается одновременно |
| `retries` | int | Число повторов — повторяется только `ErrUnreachable`; отклонённый credential не станет лучше со второй попытки |
| `backoff` | duration | Задержка между повторами |

Длительности — в синтаксисе Go: `500ms`, `10s`, `2m`, `1h30m`.

### `targets`

Одна запись на сервис:

```yaml
targets:
  - id: jira-main               # обязательно, стабилен при переименованиях - на нём завязаны метрики и история
    name: Jira (production)     # опционально, по умолчанию = id
    product: jira                # обязательно - см. Поддерживаемые продукты
    address: https://jira.example.com   # обязательно
    credentials: jira-token      # опционально, имя записи в credentials:
    timeout: 15s                 # опционально, переопределяет defaults.timeout
    path: /rest/api/2/serverInfo # опционально, специфично для продукта - у большинства проб разумный дефолт уже есть
    method: GET                  # опционально
    headers:                     # опционально, доп. заголовки на каждый запрос
      X-Custom: value
    allow_insecure_transport: false   # опционально - см. «Сначала HTTPS» в Концепциях
    tls:                          # опционально, см. «TLS» ниже
      ca_file: /etc/enodia/ca.pem
    options:                      # опционально, специфичные для продукта настройки
      key: value
    parser:                       # только для product: generic - см. ниже
      type: regex
```

`address` пишется ровно так, как вы бы его набрали — каждая проба
разбирает его сама. Голый хост без префикса `https://`/`http://`
резолвится автоматически (см.
[Концепции](/ru/concepts/#сначала-https-credentials-никогда-не-уходят-в-открытом-виде-по-умолчанию)),
либо запустите `enodia config resolve`, чтобы увидеть, какую схему
выберет каждый таргет, не отправляя ни одного credential.

### TLS (`tls:`)

Три уровня, в порядке убывания корректности:

```yaml
tls:
  ca_file: /etc/enodia/corp-ca.pem   # корпоративный CA-бандл - в большинстве закрытых контуров своя PKI
  pin_sha256:                         # отпечаток(и) закреплённого leaf-сертификата
    - "AB:CD:...:EF"
  server_name: internal.example.com   # переопределение SNI
  min_version: "1.2"                  # минимальная версия TLS
  insecure: true                      # последний резерв - см. ниже
```

`insecure: true` предупреждает при каждом запуске, а не только при
валидации, потому что у этой настройки есть привычка добавляться
«временно» и жить годами. Она же попадает в observation, так что отчёт
заодно становится аудитом TLS по всему флоту — видно, какие сервисы
проверяются без верификации.

## Credentials

Именованные записи, на которые ссылается поле `credentials:` таргета:

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
```

| `kind` | Используемые поля | Что отправляется |
|---|---|---|
| `none` (дефолт, если не указан) | — | никакой credential |
| `bearer` | `value` | `Authorization: Bearer <value>` |
| `token-header` | `header`, `value` | произвольный заголовок, напр. `PRIVATE-TOKEN`, `X-Vault-Token` |
| `basic` | `username`, `password` | HTTP Basic auth |
| `password` | `password` | нативная для протокола аутентификация (Redis `AUTH`, пароль SQL-подключения, ...) |

### `credentials_file`

Отдельный файл той же формы, что и инлайновая карта `credentials:`:

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

Именно это позволяет коммитить инвентарь сервисов в git, оставляя
секреты полностью снаружи. Записи из `credentials_file` имеют приоритет
над инлайновой записью с тем же именем. `credentials_file` резолвится
относительно файла конфига, который его называет, а не относительно
текущей директории.

### Подстановка переменных окружения

Любое строковое значение в `enodia.yaml` или `credentials.yaml` может
ссылаться на переменную окружения:

- `${VAR}` — заменяется значением `$VAR`; если переменная не задана —
  ошибка.
- `${VAR:-default}` — заменяется значением `$VAR`, либо `default`, если
  переменная не задана.

## Generic-проба

`product: generic` — аварийный выход для таргета, который никогда не
получит отдельную пробу. Его словарь намеренно небольшой и заморожен —
ни условий, ни циклов, ни цепочек запросов, ни шаблонизации. Таргету,
которому нужно что-то из этого, нужна настоящая проба на Go, а не
расширение словаря generic-пробы.

```yaml
targets:
  - id: in-house-api
    product: generic
    address: https://internal.example.com
    parser:
      type: regex          # json | xml | header | plaintext | regex
      key: version          # dotted path (json), путь вроде XPath (xml), или имя заголовка
      regex: 'v(\d+\.\d+\.\d+)'
      clean_regex: '^v'     # побеждает первая захватывающая группа - snake_case, см. ниже
      line: 1                # только для plaintext - какую строку читать
```

:::caution[Написание поля: `clean_regex`, а не `cleanRegex` или `cleanregex`]
У `ParserSpec` теперь явные `yaml:`-теги, соответствующие общей
snake_case-конвенции `enodia.yaml` (`ca_file`, `min_version`,
`allow_insecure_transport`, ...) — `clean_regex` верно по состоянию на
2026-09-07. До этого исправления у структуры вообще не было явных тегов,
так что действовало дефолтное поведение YAML (строчными, без разбиения
слов), и единственным рабочим написанием было `cleanregex`; голый
`cleanRegex` не работал никогда, ни на одном из этапов. Проверено
напрямую по парсеру оба раза, когда это проверялось, а не предположено
по прозе.
:::

## Расположение файлов

И `enodia.yaml`, и `settings.yaml` ищутся одинаково: явный путь
(`--config`/`--settings`, либо `$ENODIA_CONFIG`/`$ENODIA_SETTINGS` для
точного файла) всегда побеждает и обязан существовать — опечатка должна
быть ошибкой, а не тихим переключением на какой-то другой файл. Если
явного пути нет, запускается поиск в порядке ниже; первое совпадение
побеждает безоговорочно, ничего не сливается из нескольких найденных
файлов. Расположение важнее имени: совпадение в текущей директории всегда
побеждает совпадение в `$XDG_CONFIG_HOME`, которое всегда побеждает
совпадение в `/etc/enodia/`, независимо от того, какое имя где совпало.

**`enodia.yaml`:**

1. `./enodia.yaml`
2. `./enodia.yml`
3. `./config.yaml`
4. `./config.yml`
5. `./.enodia.yaml`
6. `./.enodia.yml`
7. `./.config.yaml`
8. `./.config.yml`
9. `$XDG_CONFIG_HOME/enodia/enodia.yaml` (`~/.config/enodia/enodia.yaml`, если `$XDG_CONFIG_HOME` не задан)
10. `$XDG_CONFIG_HOME/enodia/enodia.yml`
11. `$XDG_CONFIG_HOME/enodia/config.yaml`
12. `$XDG_CONFIG_HOME/enodia/config.yml`
13. `/etc/enodia/enodia.yaml`
14. `/etc/enodia/enodia.yml`
15. `/etc/enodia/config.yaml`
16. `/etc/enodia/config.yml`

Если не найдено ничего — это ошибка: конфиг, который не удалось найти,
стоит того, чтобы упасть громко, потому что это обычно значит, что вот-вот
будет использован не тот файл (или вообще никакой). Запустите
`enodia config path`, чтобы увидеть, какой файл реально будет
использован.

**`settings.yaml`** — та же идея, с несколькими отличиями: дополнительно
проверяется голое имя `settings.` (не только `enodia.settings.`),
дополнительно проверяется директория, где лежит сам исполняемый файл (не
только текущая директория — см. ниже), и отсутствие файла вообще — **не**
ошибка: каждое поле просто откатывается к встроенному значению по
умолчанию, поскольку этот файл полностью опционален:

1. `./enodia.settings.yaml`
2. `./enodia.settings.yml`
3. `./settings.yaml`
4. `./settings.yml`
5. `./.enodia.settings.yaml`
6. `./.enodia.settings.yml`
7. `./.settings.yaml`
8. `./.settings.yml`
9. `<директория, где лежит исполняемый файл>/settings.yaml`
10. `<та же>/settings.yml`
11. `$XDG_CONFIG_HOME/enodia/settings.yaml` (`~/.config/enodia/settings.yaml`, если `$XDG_CONFIG_HOME` не задан)
12. `$XDG_CONFIG_HOME/enodia/settings.yml`
13. `/etc/enodia/settings.yaml`
14. `/etc/enodia/settings.yml`

Шаг 9-10 отличается от текущей директории (шаги 1-8): портативная
установка (распаковал куда угодно, без пакетного менеджера) запускается
из той директории, где в данный момент стоит оператор, а это на Windows,
в частности, практически никогда не сама директория установки
(`install.ps1` по умолчанию ставит в `%LOCALAPPDATA%\enodia`, добавляя в
`PATH` — весь смысл `PATH` в том, что текущая директория перестаёт иметь
значение). Этот шаг намеренно ограничен только `settings.yaml` — это
опциональные настройки отображения, так что неверный или подменённый
файл в общей директории установки — в худшем случае косметическая
проблема. `enodia.yaml` несёт credentials и такого шага не получает.

## `settings.yaml`

Личные, персональные для оператора настройки отображения — никогда не
таргеты, никогда не credentials, никогда не то, чем обычно делятся так
же, как `enodia.yaml`.

```yaml title="settings.yaml"
schemaVersion: 1

render:
  # compact (по умолчанию) | lifecycle | drift | fleet
  default_view: fleet

export:
  # json (по умолчанию) | prometheus | html - используется, когда сам
  # export запущен без --format
  default_format: html

html:
  # inline (по умолчанию, полностью офлайн) | cdn (грузит Bootstrap/Bootswatch)
  assets: cdn

  # none (вообще без стилей) | default (чистый Bootstrap) | любая из
  # 26 настоящих тем Bootswatch: brite, cerulean, cosmo, cyborg, darkly,
  # flatly, journal, litera, lumen, lux, materia, minty, morph, pulse,
  # quartz, sandstone, simplex, sketchy, slate, solar, spacelab,
  # superhero, united, vapor, yeti, zephyr
  theme: lumen

  # auto (по умолчанию: гонка между jsdelivr и cdnjs, побеждает тот, кто
  # первым ответит) | jsdelivr | cdnjs
  cdn: auto

  # опционально: ограничить экспорт одним представлением вместо всех четырёх
  # view: fleet
```

`render.default_view` применяется к `--view` команды `check`, когда сам
флаг не передан. `export.default_format` делает то же самое для
`--format` команды `export`. `html.*` имеет значение только для
`export --format html` — см. [Отчёты](/ru/reporting/), что именно меняет
каждое поле.
