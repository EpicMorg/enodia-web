---
title: Конфігурація
description: Кожне поле, яке приймають enodia.yaml, credentials.yaml і settings.yaml.
---

enodia читає до трьох файлів: **`enodia.yaml`** (обовʼязковий — інвентар
Ваших сервісів), необовʼязковий окремий **`credentials.yaml`** і
необовʼязковий **`settings.yaml`** (особисті налаштування відображення,
ніколи не обовʼязкові). Усі три — звичайний YAML.

## `enodia.yaml`

### Верхній рівень

```yaml
schemaVersion: 1
credentials_file: credentials.yaml   # необовʼязково, див. нижче
defaults:                            # необовʼязково
  timeout: 10s
  concurrency: 5
  retries: 2
  backoff: 500ms
cve:                                 # необовʼязково, див. «Зіставлення з CVE»
  bdu:
    path: vulxml.zip
  nvd:
    path: nvd/
credentials: {}                      # необовʼязково, див. «Облікові дані»
targets: []                          # Ваші сервіси
```

`schemaVersion` перевіряється під час читання — майбутня версія
відхиляється з порадою оновитися, а не розбирається в оптимістичному
режимі.

### `defaults`

Застосовується до кожної цілі, якщо не перевизначено для конкретної цілі.

| Поле | Тип | Значення |
|---|---|---|
| `timeout` | duration | Тайм-аут на запит (за замовчуванням: `10s`, якщо ніде не задано) |
| `concurrency` | int | Скільки цілей опитується одночасно |
| `retries` | int | Кількість повторних спроб — повторюється лише `ErrUnreachable`; відхилені облікові дані з другої спроби кращими не стануть |
| `backoff` | duration | Затримка між повторними спробами |

Тривалості записуються в синтаксисі duration мови Go: `500ms`, `10s`,
`2m`, `1h30m`.

### `cve`

Необовʼязково. Вказує enodia на вивантаження БДУ ФСТЕК (`cve.bdu.path`)
та/або JSON-фіди NVD (`cve.nvd.path`), які Ви завантажили самі, — enodia
ніколи не завантажує їх сама. Відносні шляхи обчислюються відносно
власного каталогу цієї конфігурації, а налаштований шлях, якого не
існує, є помилкою. Що це робить, як отримати файли та які продукти
зіставляються: [Зіставлення з CVE](/uk/cve/).

### `targets`

Один запис на сервіс:

```yaml
targets:
  - id: jira-main               # обовʼязково, стабільний при перейменуваннях - на ньому тримаються метрики та історія
    name: Jira (production)     # необовʼязково, за замовчуванням дорівнює id
    product: jira                # обовʼязково - див. «Підтримувані продукти»
    address: https://jira.example.com   # обовʼязково
    credentials: jira-token      # необовʼязково, імʼя запису в credentials:
    timeout: 15s                 # необовʼязково, перевизначає defaults.timeout
    path: /rest/api/2/serverInfo # необовʼязково, залежить від продукту - більшість проб мають розумне значення за замовчуванням
    method: GET                  # необовʼязково
    headers:                     # необовʼязково, додаткові заголовки, що надсилаються з кожним запитом
      X-Custom: value
    allow_insecure_transport: false   # необовʼязково - див. «Спершу HTTPS» у «Концепціях»
    tls:                          # необовʼязково, див. «TLS» нижче
      ca_file: /etc/enodia/ca.pem
    options:                      # необовʼязково, специфічні для продукту параметри ключ/значення
      key: value
    parser:                       # лише для product: generic - див. нижче
      type: regex
```

`address` записується точно так, як Ви б його набрали, — кожна проба
розбирає його сама. Голий хост без префікса `https://`/`http://`
визначається автоматично (див. [Концепції](/uk/concepts/#спершу-https-облікові-дані-за-замовчуванням-ніколи-не-передаються-відкритим-текстом)),
або ж запустіть `enodia config resolve`, щоб побачити, яку схему
використовуватиме кожна ціль, не надсилаючи жодних облікових даних.

`options` — довільна мапа для кожного продукту; більшість проб її
повністю ігнорують. [`p4d`/`p4p`](/uk/configuration/products/p4d/) —
перші, що справді її читають: `options.binary` перевизначає шлях до CLI
`p4`, який вони викликають.

Точний endpoint, вимоги до автентифікації та записувані поля для кожної
з 90 вбудованих проб див. у розділі **Налаштування продуктів** на бічній
панелі (або в таблиці [Підтримувані продукти](/uk/products/)) — `path`,
`credentials` і `options` вище показують загальну форму; на власній
сторінці кожного продукту сказано, що йому насправді потрібно.

### TLS (`tls:`)

Три рівні, у порядку спадання коректності:

```yaml
tls:
  ca_file: /etc/enodia/corp-ca.pem   # корпоративний bundle CA - більшість закритих середовищ мають власну PKI
  pin_sha256:                         # закріплені відбитки кінцевого сертифіката
    - "AB:CD:...:EF"
  server_name: internal.example.com   # перевизначення SNI
  min_version: "1.2"                  # мінімальна версія TLS
  insecure: true                      # крайній засіб - див. нижче
```

`insecure: true` видає попередження під час кожного запуску, а не лише
під час валідації, бо має звичку додаватися «тимчасово» й жити роками.
Він також потрапляє в спостереження, тож звіт водночас слугує аудитом TLS
для всього парку серверів — видно, які сервіси перевіряються без
верифікації.

## Облікові дані

Іменовані записи, на які ціль посилається за іменем у полі `credentials:`:

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
    passphrase: "${SSH_KEY_PASSPHRASE}"   # необовʼязково, лише якщо ключ зашифровано
```

| `kind` | Використовувані поля | Що надсилає |
|---|---|---|
| `none` (за замовчуванням, якщо не вказано) | — | жодних облікових даних |
| `bearer` | `value` | `Authorization: Bearer <value>` |
| `token-header` | `header`, `value` | власний заголовок, наприклад `PRIVATE-TOKEN`, `X-Vault-Token` |
| `basic` | `username`, `password` | HTTP Basic auth |
| `password` | `password` (плюс `username` для протоколів, які його використовують, — Redis ACL, PostgreSQL) | нативна автентифікація протоколу (Redis `AUTH`, власний пароль SQL-зʼєднання, ...) |
| `ssh-key` | `username`, `private_key_file`, `passphrase` (необовʼязково) | автентифікація SSH за відкритим ключем для проб ідентифікації ОС через SSH (див. [Підтримувані продукти](/uk/products/)) |

`username` з `kind: password` без `private_key_file` теж працює для
SSH-цілей — SSH-проби приймають або пароль, або приватний ключ, як і
будь-який SSH-клієнт (`username` плюс `password` у `kind: password` або
`username` плюс `private_key_file` у `kind: ssh-key`).

### Перевірка ключа хоста SSH

Кожна SSH-проба використовує той самий блок `tls:`, що й HTTPS-проби для
перевірки сертифіката, — `pin_sha256` тут містить hex SHA-256 власного
мережевого кодування ключа хоста, а не сертифіката TLS, але форма та
сама: «закріпіть відбиток або вкажіть `insecure` і отримайте
попередження»:

```yaml
targets:
  - id: linux-host
    product: debian
    address: host.example.com
    credentials: linux-host-ssh
    tls:
      pin_sha256:
        - "AB:CD:...:EF"   # sha256 ключа хоста, ssh-keyscan чи аналог
      # insecure: true      # крайній засіб — повністю пропускає перевірку ключа хоста
```

Якщо не задано ні `pin_sha256`, ні `insecure: true`, зʼєднання
відхиляється ще до надсилання будь-яких облікових даних.

### `credentials_file`

Окремий файл тієї самої форми, що й вбудована мапа `credentials:`:

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

Саме це дає змогу комітити інвентар сервісів у git, повністю тримаючи
секрети поза ним. Записи в `credentials_file` мають перевагу над
вбудованим записом з тим самим іменем. `credentials_file` обчислюється
відносно файлу конфігурації, у якому його вказано, а не поточного
каталогу.

### Підстановка змінних середовища

Будь-яке рядкове значення в `enodia.yaml` чи `credentials.yaml` може
посилатися на змінну середовища:

- `${VAR}` — замінюється значенням `$VAR`; відсутність змінної є помилкою.
- `${VAR:-default}` — замінюється значенням `$VAR` або `default`, якщо
  змінну не задано.

## Інтеграція з HashiCorp Vault Agent

Ні вбудовану мапу `credentials:` в `enodia.yaml`, ні окремий
`credentials.yaml` не обовʼязково має писати людина. Обидва — просто
файли, які enodia заново читає під час кожного запуску, — це перевірено у
вихідному коді: `enodia check` перезавантажує конфігурацію й облікові дані
з нуля під час кожного виклику, а `enodia serve --interval` робить те саме
на кожному циклі оновлення (`Config.Build` викликає `LoadCredentials`
щоразу, коли виконується `collectObservations`, — нічого не кешується на
весь час життя процесу, тож зміна будь-якого з файлів набуває чинності без
перезапуску). Саме під таку модель побудоване власне рендерування
`template` у [Vault Agent](https://developer.hashicorp.com/vault/docs/agent-and-proxy/agent).
Власної інтеграції саме з Vault в enodia немає — вона й не потрібна,
оскільки два механізми, описані нижче, уже безпосередньо з ним поєднуються.

### Vault Agent формує змінні середовища

Направте блок `template` (або `env_template`) Vault Agent на секрети,
потрібні цілі, і посилайтеся на них звичайним способом — через
[підстановку змінних середовища](#підстановка-змінних-середовища),
описану вище:

```yaml title="credentials.yaml"
jira-token:
  kind: bearer
  value: "${JIRA_TOKEN}"
```

Режим `exec` у Vault Agent запускає саму enodia (або скрипт-обгортку, що
викликає `enodia check`) як свій керований дочірній процес, передаючи
сформовані змінні безпосередньо в середовище цього процесу, — жоден
секрет ніколи не потрапляє на диск у вигляді файлу, який enodia мала б
читати. Блок `exec` у Vault Agent також підтримує перезапуск дочірнього
процесу, коли змінюється секрет із шаблону, — якщо Ви хочете, щоб
довготривалий `enodia serve` одразу підхоплював змінений токен, а не
просто покладався на те, що старий усе ще буде дійсним на наступному
такті `--interval`; точну конфігурацію для цього див. у власній
документації Vault Agent — це цілком налаштовується на боці Vault Agent.

### Vault Agent формує `credentials.yaml` безпосередньо

Направте `credentials_file:` на шлях, куди пише блок `template` Vault
Agent, і сформуйте в шаблоні саме ту форму, якої очікує
[`credentials_file`](#credentials_file):

```yaml title="enodia.yaml"
schemaVersion: 1
credentials_file: /run/enodia/credentials.yaml
targets:
  - id: jira-main
    product: jira
    address: https://jira.example.com
    credentials: jira-token
```

```hcl title="Блок template у Vault Agent — ілюстративний приклад; точний синтаксис див. у власній документації Vault Agent"
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

Цей шлях узагалі не потребує налаштування `exec`/перезапуску:
`enodia check` перечитує `credentials_file` з нуля під час кожного
виклику, а `enodia serve` перечитує його на кожному циклі оновлення
незалежно від того, як саме він змінився на диску. І `enodia check` за
розкладом cron, і довготривалий `enodia serve` просто підхоплюють те, що
Vault Agent записав останнім, за власним розкладом, — нічого специфічного
для enodia налаштовувати не потрібно.

### У будь-якому разі діють власні правила enodia щодо облікових даних

Обидва підходи однаково підпадають під усе, що вже описано в розділі
[Безпека](/uk/security/): облікові дані ніколи не потрапляють в інвентар,
експортовані звіти чи журнали, а перевірка TLS залишається ввімкненою,
якщо Ви не вимкнете її для конкретної цілі. Від доступу на читання будь-ким
іншим сформований файл захищають власні `perms` і вибір каталогу
призначення у Vault Agent; сама enodia не має жодної думки щодо того, де
лежить `credentials_file`, окрім того, що відносний шлях обчислюється
відносно файлу конфігурації, у якому його вказано.

## Проба generic

`product: generic` — запасний вихід для цілі, яка ніколи не отримає
окремої проби. Її словник свідомо малий і заморожений — жодних умов,
жодних циклів, жодних ланцюжків запитів, жодних шаблонів. Цілі, якій
потрібне щось із цього, потрібна справжня проба, написана на Go, а не
нові можливості generic-проби.

```yaml
targets:
  - id: in-house-api
    product: generic
    address: https://internal.example.com
    parser:
      type: regex          # json | xml | header | plaintext | regex
      key: version          # шлях через крапку (json), шлях до тегу в стилі XPath (xml) або імʼя заголовка
      regex: 'v(\d+\.\d+\.\d+)'
      clean_regex: '^v'     # перемагає перша група захоплення - snake_case, див. нижче
      line: 1                # лише plaintext - який рядок читати
```

:::caution[Написання поля: `clean_regex`, а не `cleanRegex` чи `cleanregex`]
`ParserSpec` тепер має явні теги `yaml:`, що відповідають загальній
домовленості snake_case в `enodia.yaml` (`ca_file`, `min_version`,
`allow_insecure_transport`, ...), — `clean_regex` коректне станом на
2026-09-07. До цього виправлення структура взагалі не мала явних тегів,
тож застосовувалося типове для YAML значення без тегів (нижній регістр,
без розбиття на слова), і єдиним робочим написанням було `cleanregex`;
голе `cleanRegex` не працювало ніколи. Обидва рази, коли це перевірялося,
результат підтверджено безпосередньо на парсері, а не припущено з опису.
:::

## Розташування файлів

І `enodia.yaml`, і `settings.yaml` шукаються однаково: явний шлях
(`--config`/`--settings` або `$ENODIA_CONFIG`/`$ENODIA_SETTINGS` для
точного файлу) завжди має перевагу й мусить існувати — одрук є помилкою,
а ніколи не мовчазним переходом до якогось іншого файлу. Якщо його немає,
виконується пошук у наведеному нижче порядку; перший збіг безумовно
перемагає, нічого не обʼєднується з кількох знайдених файлів.
Розташування важливіше за назву: збіг у поточному каталозі завжди
перемагає збіг у `$XDG_CONFIG_HOME`, який завжди перемагає збіг у
`/etc/enodia/`, незалежно від того, яка назва де збіглася.

**`enodia.yaml`:**

1. `./enodia.yaml`
2. `./enodia.yml`
3. `./config.yaml`
4. `./config.yml`
5. `./.enodia.yaml`
6. `./.enodia.yml`
7. `./.config.yaml`
8. `./.config.yml`
9. `$XDG_CONFIG_HOME/enodia/enodia.yaml` (`~/.config/enodia/enodia.yaml`, якщо `$XDG_CONFIG_HOME` не задано)
10. `$XDG_CONFIG_HOME/enodia/enodia.yml`
11. `$XDG_CONFIG_HOME/enodia/config.yaml`
12. `$XDG_CONFIG_HOME/enodia/config.yml`
13. `/etc/enodia/enodia.yaml`
14. `/etc/enodia/enodia.yml`
15. `/etc/enodia/config.yaml`
16. `/etc/enodia/config.yml`

Якщо не знайдено нічого, це помилка — конфігурація, яку неможливо знайти,
варта гучного збою, бо зазвичай це означає, що от-от буде використано не
той файл (або жодного). Запустіть `enodia config path`, щоб побачити, який
файл буде фактично обрано.

**`settings.yaml`** — та сама ідея з кількома відмінностями: перевіряється
також проста назва `settings.` (а не лише `enodia.settings.`), додатково
перевіряється каталог, у якому лежить запущений виконуваний файл (а не
лише поточний каталог — див. нижче), і відсутність будь-якого знайденого
файлу **не** є помилкою — кожне поле просто повертається до свого
вбудованого значення за замовчуванням, оскільки цей файл повністю
необовʼязковий:

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
11. `$XDG_CONFIG_HOME/enodia/settings.yaml` (`~/.config/enodia/settings.yaml`, якщо `$XDG_CONFIG_HOME` не задано)
12. `$XDG_CONFIG_HOME/enodia/settings.yml`
13. `/etc/enodia/settings.yaml`
14. `/etc/enodia/settings.yml`

Кроки 9-10 відрізняються від поточного каталогу (кроки 1-8): портативна
установка (розпакувати будь-куди, без менеджера пакетів) запускається з
того каталогу, у якому оператор випадково перебуває, а в Windows це
практично ніколи не сам каталог установлення (`install.ps1` за
замовчуванням використовує `%LOCALAPPDATA%\enodia`, доданий до `PATH`, —
увесь сенс `PATH` у тому, що поточний каталог перестає мати значення).
Цей крок свідомо обмежено `settings.yaml` — це лише необовʼязкові
налаштування відображення, тож хибний чи підмінений файл у спільному
каталозі установлення в найгіршому разі є косметичною проблемою.
`enodia.yaml` містить облікові дані, і еквівалентного кроку для нього
немає.

## `settings.yaml`

Особисті налаштування відображення для кожного оператора — ніколи не
цілі, ніколи не облікові дані, ніколи не спільні так, як зазвичай буває з
`enodia.yaml`.

```yaml title="settings.yaml"
schemaVersion: 1

render:
  # compact (за замовчуванням) | lifecycle | drift | fleet
  default_view: fleet

export:
  # json (за замовчуванням) | prometheus | html - використовується щоразу,
  # коли сам `export` запускається без --format
  default_format: html

html:
  # inline (за замовчуванням, повністю офлайн) | cdn (завантажує Bootstrap/Bootswatch)
  assets: cdn

  # none (без таблиці стилів узагалі) | default (звичайний Bootstrap) | будь-яка з
  # 26 справжніх тем Bootswatch: brite, cerulean, cosmo, cyborg, darkly,
  # flatly, journal, litera, lumen, lux, materia, minty, morph, pulse,
  # quartz, sandstone, simplex, sketchy, slate, solar, spacelab,
  # superhero, united, vapor, yeti, zephyr
  theme: lumen

  # auto (за замовчуванням: перегони між jsdelivr і cdnjs, використовується той,
  # що відповів першим) | jsdelivr | cdnjs
  cdn: auto

  # необовʼязково: обмежити експорт одним поданням замість усіх чотирьох
  # view: fleet
```

`render.default_view` застосовується до `--view` команди `check` щоразу,
коли сам прапорець не передано. `export.default_format` робить те саме
для `--format` команди `export`. `html.*` має значення лише для
`export --format html` — що саме змінює кожне поле, див. у розділі
[Звіти](/uk/reporting/).
