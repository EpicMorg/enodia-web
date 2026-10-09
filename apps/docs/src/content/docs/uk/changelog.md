---
title: Журнал змін
description: Помітні зміни в enodia, реліз за релізом.
---

Канонічне джерело — власний
[`CHANGELOG.md`](https://github.com/EpicMorg/enodia/blob/master/CHANGELOG.md)
enodia; ця сторінка його віддзеркалює, синхронізується разом з рештою
сайту на кожному релізі й містить посилання на інші розділи цієї
документації там, де зміна впливає на те, як Ви насправді щось
налаштовуєте. Теги мають формат `MAJOR.MINOR.PATCH+BUILD`, без префікса
`v`; `+BUILD` — це метадані збірки semver, які використовуються лише для
перезбирання без функціональних змін, а не для того, щоб оминути реальне
підвищення версії.

## Не випущено

<!-- NEXT-RELEASE: replace this heading with "## X.Y.Z+0 — YYYY-MM-DD" when the release is published. -->

### Виправлено

- [`kafka`](/uk/configuration/products/kafka/) запускав `kafka-topics --version` (старт JVM, кілька секунд)
  під час кожного прогону, якщо він був у `PATH`, навіть коли jar брокера
  вже знайдено; тепер він запускається, лише якщо jar не знайдено.

## 2.2.0+0 — 2026-10-09

`enodia cve update` сама завантажує бази CVE, до БДУ і NVD долучаються
власні дані безпеки вендорів (MariaDB, Atlassian, PostgreSQL, nginx),
зіставлення з CVE охоплює iLO 4, iDRAC і Synology DSM, а також
зʼявляються 27 нових проб — загалом 123. Кожен новий ключ `cve:`
необовʼязковий, а конфігурації та інвентарі 2.1 працюють без змін — крім
облікових даних такого виду, якого їхній продукт ніколи не читає: це
тепер помилка (див. «Виправлено»).

### Додано

- **[`enodia cve update`](/uk/cve/#enodia-cve-update)** завантажує бази
  CVE, які називає кожен налаштований `cve.*.path`, — БДУ, NVD (поточний
  рік, минулий і відсутні роки; `--all-years` — усі), Debian, OVAL і
  Alpine (релізи, які вже є на диску, ті, що потрібні інвентарям із
  `--from`, `--oval`/`--alpine`), MariaDB, Atlassian, PostgreSQL
  (`--postgresql` — для сторінок окремих мажорних версій) і nginx.
  If-Modified-Since; завантаження замінює файл лише після того, як він
  успішно завантажиться. TLS перевіряється за системними кореневими
  сертифікатами плюс `cve.update.ca_file` і `cve.update.ca_dir` або не
  перевіряється зовсім із `cve.update.tls_skip_verify`. Усі інші команди
  й надалі ніколи нічого не завантажують.
- **27 нових проб:**
  - [`splunk`](/uk/configuration/products/splunk/) — management API splunkd на порту 8089, Basic або токен Splunk.
  - [`code-server`](/uk/configuration/products/code-server/) — `codeServerVersion` зі сторінки входу.
  - [`phpipam`](/uk/configuration/products/phpipam/) — футер сторінки входу та версія ресурсів.
  - [`domainmod`](/uk/configuration/products/domainmod/) — CHANGELOG у його вебкорені.
  - [`netdata`](/uk/configuration/products/netdata/) — анонімний `/api/v1/info` агента.
  - [`libretranslate`](/uk/configuration/products/libretranslate/) — публічний документ OpenAPI `/spec`.
  - [`torrserver`](/uk/configuration/products/torrserver/) — `/echo`.
  - [`kafka`](/uk/configuration/products/kafka/) — версія брокера через SSH з його власного jar-файлу, за потреби в контейнері; збірки Confluent Platform повідомляються як `confluent` разом із лінійкою Apache Kafka, яку вони містять.
  - [`home-assistant`](/uk/configuration/products/home-assistant/) — `/api/config` з довгостроковим токеном доступу, `kind: bearer`.
  - [`openhab`](/uk/configuration/products/openhab/) — анонімний корінь REST `/rest/`.
  - [`doxygen`](/uk/configuration/products/doxygen/) — яким Doxygen згенеровано сайт документації, за його позначкою генератора.
  - [`qbittorrent`](/uk/configuration/products/qbittorrent/) — API Web UI після входу через форму, `kind: password`.
  - [`netbox`](/uk/configuration/products/netbox/) — `data-netbox-version` анонімної сторінки входу.
  - [`greenbone`](/uk/configuration/products/greenbone/) — (псевдоніми `openvas`, `gsad`) версія gsad з його відповіді `/gmp`, без автентифікації.
  - [`posthog`](/uk/configuration/products/posthog/) — git-коміт self-hosted PostHog з його анонімної сторінки входу.
  - [`uptime-kuma`](/uk/configuration/products/uptime-kuma/) — входить через API socket.io Uptime Kuma (`kind: password`) і читає версію, яку той надсилає після входу.
  - [`wapt`](/uk/configuration/products/wapt/) — анонімний `/ping` сервера WAPT.
  - [`minio`](/uk/configuration/products/minio/) — `minio --version` через SSH, за потреби в контейнері; назви MinIO вигляду `RELEASE.<timestamp>` тепер порівнюються як версії.
  - [`sentry`](/uk/configuration/products/sentry/) — версія self-hosted Sentry з його анонімної сторінки входу.
  - [`zookeeper`](/uk/configuration/products/zookeeper/) — чотирилітерна команда `srvr`.
  - [`ghost`](/uk/configuration/products/ghost/) — анонімний `/ghost/api/admin/site/`, який дає major.minor.
  - [`onlyoffice`](/uk/configuration/products/onlyoffice/) — і [`euro-office`](/uk/configuration/products/euro-office/): ONLYOFFICE Docs і його форк Euro-Office, що читаються анонімно з `/index.html` сервера документів; сервер іншого бренду відхиляється із зазначенням продукту, який слід використати.
  - [`weblate`](/uk/configuration/products/weblate/) — анонімний футер «Powered by Weblate».
  - [`memcached`](/uk/configuration/products/memcached/) — команда `version` текстового протоколу, без облікових даних.
  - [`rabbitmq`](/uk/configuration/products/rabbitmq/) — `/api/overview` плагіна management, `kind: basic`.
  - [`cassandra`](/uk/configuration/products/cassandra/) — `release_version` через нативний протокол CQL v4, `kind: password`, якщо в кластері ввімкнено PasswordAuthenticator.

- **CVE для цілей [`mariadb`](/uk/configuration/products/mariadb/).**
  БДУ і NVD тепер охоплюють MariaDB, а новий `cve.mariadb.path` читає
  власну таблицю виправлених CVE від MariaDB (`community-server.md`),
  яка знає реліз із виправленням для кожної серії. Там, де таблиця
  MariaDB знає CVE, її висновок замінює відкриті діапазони БДУ і NVD, тож
  останній реліз підтримуваної серії більше не позначається CVE,
  виправленими лише в новіших серіях, — див. [Власні дані
  вендорів](/uk/cve/#власні-дані-вендорів).
- **`cve.atlassian.path`**: власні дані Atlassian про CVE для кожного
  релізу `jira`, `confluence`, `bitbucket` і `bamboo`, включно з CVE
  сторонніх залежностей. Оцінюється в межах кожної гілки; для релізу,
  який перелічує Atlassian, переважає її висновок, — див.
  [Atlassian](/uk/cve/#atlassian).
- **`cve.postgresql.path` і `cve.nginx.path`**: власні сторінки безпеки
  проєктів із релізом-виправленням для кожної гілки. Поточні релізи
  PostgreSQL 17/16/15/14 і nginx 1.30.5 більше не показують діапазонів
  БДУ без привʼязки до гілок — див. [PostgreSQL](/uk/cve/#postgresql) і
  [nginx](/uk/cve/#nginx).
- **CVE ще для 24 продуктів**: cassandra, code-server, domainmod,
  doxygen, ghost, greenbone, home-assistant, kafka, memcached, minio,
  netbox, netdata, onlyoffice, openhab, pfsense, phpipam, qbittorrent,
  rabbitmq, sentry, splunk, uptime-kuma, wapt, weblate, zookeeper. Версії
  MinIO у вигляді часових позначок порівнюються; для pfSense CE і Splunk
  Enterprise діапазони інших редакцій пропускаються; збірки Confluent
  Kafka не шукаються.
- **CVE для [`hp-ilo4`](/uk/configuration/products/hp-ilo4/),
  [`dell-idrac`](/uk/configuration/products/dell-idrac/) і
  [`synology-dsm`](/uk/configuration/products/synology-dsm/).** iDRAC
  зіставляється окремо для кожного покоління (його визначає модель
  Redfish); DSM порівнює версію, збірку й Update (`7.2.1-69057-6`), а
  проба тепер записує Update в `extra.update`, — див.
  [Dell iDRAC і Synology DSM](/uk/cve/#dell-idrac-і-synology-dsm).
  Загалом тепер зіставляється 91 зі 123 продуктів — див.
  [які продукти зіставляються](/uk/cve/#які-продукти-зіставляються).
- Сторінка [Конфіденційність](/uk/privacy/): до чого підключається
  enodia (Ваші цілі, endoflife.date, GitHub API — лише назви продуктів і
  репозиторіїв, — а також, лише для `enodia cve update`, видавці баз
  CVE) і що вона зберігає (лише Ваші власні файли та локальний кеш).
  Жодної телеметрії.

### Змінено

- Резолвер `github` пропускає релізи, тег яких позначає передреліз
  (`5.3.0.M2`, `2026.10.0b7`, `-rc1`, `-beta.1`), навіть якщо GitHub їх так
  не позначає; читає теги з підкресленнями (`Release_1_18_0`) і з
  префіксом `release-` (`release-5.2.4`) як версії; а також відкидає
  початкові `<repo>-`/`<repo>_` у тегах, тож `weblate-2026.10` читається
  як `2026.10`, — див. [Підтримувані продукти](/uk/products/).
- [`teamcity`](/uk/configuration/products/teamcity/) працює без
  облікових даних: якщо їх не налаштовано, проба читає анонімний
  `/app/rest/server/version`, відкритий на кожному перевіреному TeamCity
  від 2017.2 до 2026.1 навіть із вимкненим гостьовим входом. Токен, як і
  раніше, обирає `/app/rest/server`.

### Виправлено

- CVE для [`jenkins`](/uk/configuration/products/jenkins/): виправлений
  LTS-реліз більше не позначається щотижневим діапазоном того самого
  виправлення (LTS 2.568.3 — через «before 2.580»). Щотижневі та
  LTS-діапазони тепер застосовуються лише до власної лінійки релізів.
- Резолвер `github` більше не збоїть на репозиторіях, список релізів
  яких перевищує 1 MiB (у minio/minio — 3,4 MB): тепер він читає до
  8 MiB.
- **Облікові дані такого виду, якого їхній продукт ніколи не надсилає,
  тепер є помилкою конфігурації**, а не мовчки відкидаються. `kind:
  password` на HTTP-продукті (RouterOS, Harbor, …) раніше призводив до
  надсилання запиту взагалі без заголовка `Authorization`; тепер `config
  validate` називає види, які продукт приймає, — для вебвходу це `kind:
  basic`. **Перевірте конфігурацію перед оновленням**: запуск із такими
  обліковими даними тепер відмовляється стартувати. Див. [Конфігурація →
  Облікові дані](/uk/configuration/#облікові-дані).

## 2.1.1+0 — 2026-10-08

### Виправлено

- MariaDB 11.0+ більше не приховує свою версію за префіксом `5.5.5-`
  (`11.4.9-MariaDB-…`), тож [`mysql`](/uk/configuration/products/mysql/)
  записувала такі сервери як MySQL, а
  [`mariadb`](/uk/configuration/products/mariadb/) їх відхиляла. Тепер
  обидві проби розпізнають MariaDB в будь-якому з двох виглядів. Ціль
  `product: mysql`, спрямована на MariaDB 11.0+, тепер завершується
  помилкою — переключіть її на `product: mariadb`.

## 2.1.0+0 — 2026-10-01

Зіставлення з CVE опускається до рівня встановлених пакетів на десяти
дистрибутивах Linux, а також зʼявляються шість нових проб. Нічого не
ламається: нові ключі `cve:` необовʼязкові, а інвентарі лише отримують
необовʼязкові поля, тож конфігурації та інвентарі 2.0 працюють без змін.

### Додано

- **[CVE на рівні пакетів для дистрибутивів Linux](/uk/cve/#cve-на-рівні-пакетів-для-дистрибутивів-linux).**
  Проби ОС тепер за той самий один обмін через SSH також читають
  встановлені пакети й запущене ядро, а кожен пакет зіставляється з
  власними даними безпеки його дистрибутива. Кожне джерело — файл, який
  Ви завантажуєте самі, як БДУ і NVD:
  - `cve.debian.path` — JSON від Debian Security Tracker, для
    [`debian`](/uk/configuration/products/debian/).
  - `cve.oval.path` — OVAL-файли вендорів, по одному на реліз, для
    [`ubuntu`](/uk/configuration/products/ubuntu/),
    [`linuxmint`](/uk/configuration/products/linuxmint/) (через його
    базу Ubuntu), [`rhel`](/uk/configuration/products/rhel/),
    [`rocky-linux`](/uk/configuration/products/rocky-linux/) (за файлом
    Red Hat — власний файл Rocky відхиляється як непридатний),
    [`almalinux`](/uk/configuration/products/almalinux/),
    [`oracle-linux`](/uk/configuration/products/oracle-linux/),
    [`astra-linux`](/uk/configuration/products/astra-linux/) (SE 1.7/1.8)
    і [`redos`](/uk/configuration/products/redos/) (7.3/8.0). Розібраний
    OVAL кешується так само, як БДУ і NVD.
  - `cve.alpine.path` — secdb Alpine, для
    [`alpine-linux`](/uk/configuration/products/alpine-linux/).
- Повідомляються лише CVE, для яких уже є виправлення, новіше за
  встановлену версію, — те, що закрило б оновлення (а для ядра —
  перезавантаження). Одна знахідка на пакет із посиланням на бюлетень,
  що містить виправлення (USN, RHSA, ALSA, ELSA, бюлетень Astra, ROS,
  сторінка трекера Debian/Alpine), а в HTML-звіті під нею згорнуто всі
  її CVE.
- Зіставлення дотримується власних правил кожного менеджера пакетів:
  порядку версій dpkg, rpm і apk, потоків модулів AppStream, варіантів
  архітектури, FIPS і Ksplice в Oracle, а також запущеного ядра, а не
  будь-яких встановлених пакетів ядра. Кожне джерело звірено з
  еталонним інструментом (`oscap oval eval`, `dnf updateinfo`,
  python3-apt, `apk version -t`) на реальних контейнерах, з ідентичними
  результатами.
- Нові проби: [`mariadb`](/uk/configuration/products/mariadb/),
  [`pfsense`](/uk/configuration/products/pfsense/) (Community Edition,
  через SSH), [`supermicro-bmc`](/uk/configuration/products/supermicro-bmc/),
  [`dell-idrac`](/uk/configuration/products/dell-idrac/) і
  [`hp-ilo4`](/uk/configuration/products/hp-ilo4/) (через Redfish), а
  також [`freeradius`](/uk/configuration/products/freeradius/) (через SSH,
  з `options.container` для FreeRADIUS у Docker або Podman). Загалом 96
  проб.
- Резолвер `github-tag-branches`: один цикл підтримки на кожну
  гілку major.minor за тегами GitHub, для проєктів, що підтримують
  кілька гілок одночасно (FreeRADIUS 3.0.x і 3.2.x).
- FreeRADIUS зіставляється і з NVD, і з БДУ.

### Виправлено

- Скорочення VMware «8.0 U3k» у календарі життєвого циклу тепер
  вважається рівним «8.0.3»: пропатчений хост
  [vCenter](/uk/configuration/products/vcenter/) або
  [ESXi](/uk/configuration/products/esxi/) 8.0 більше не показується як
  `ahead`.
- Стовпці LATEST/CYCLE показують очищені версії для продуктів, що
  резолвляться через GitHub, а не сирий тег (`2026.9.1`, а не
  `v2026.9.1`).
- `config validate` повідомляє про відсутній файл `cve.*.path`, а не
  проходить, щоб потім завершитися помилкою в `check`.

### Примітки

- Хост [Proxmox VE](/uk/configuration/products/proxmox/) отримує
  знахідки за пакетами як друга, SSH-ціль `debian` поруч із його
  API-ціллю `proxmox`; пакет Debian `linux` зіставляється лише із
  запущеним ядром Debian, тож власне ядро Proxmox не сприймається за
  нього.
- З усіма джерелами, налаштованими одночасно (БДУ, NVD, Debian, вісім
  OVAL-файлів, Alpine), `check` тривав ~22 с на холодну і ~3,4 с з
  кешем, з піковим споживанням ~0,5–0,6 ГБ — менше, якщо `cve.oval.path`
  містить лише ті релізи, які у Вас працюють.
- Історію репозиторію було переписано й повторно підписано, щоб
  прибрати внутрішні імена хостів; кожен тег створено заново на
  переписаній історії. Бінарні файли релізів до 2.0.0+0 включно
  повідомляють хеші комітів з історії до переписування.
- MariaDB, pfSense і BMC-проби поки не мають зіставлення з CVE.

## 2.0.0+0 — 2026-09-23

Мажорна версія заради великої функції, а не через несумісність:
зіставлення з CVE — перша вісь оцінювання, яка не стосується життєвого
циклу. Наявні `enodia.yaml`, `settings.yaml` і файли інвентарю працюють
без змін — новий блок `cve:` необовʼязковий, а конфігурація без нього
поводиться точно так само, як у 1.2.

### Додано

- **[Зіставлення з CVE](/uk/cve/)** з двома локальними базами даних, БДУ
  ФСТЕК і NIST NVD. enodia ніколи не завантажує їх сама: Ви отримуєте
  `vulxml.zip` від БДУ та щорічні файли NVD `nvdcve-2.0-<year>.json.gz` і
  вказуєте на них у `cve.bdu.path` / `cve.nvd.path` в `enodia.yaml` (файл
  або, для NVD, каталог файлів). Кожне джерело працює і саме по собі.
  Обидва розбираються потоково й кешуються: перший запуск після зміни
  бази даних триває близько хвилини для всього NVD разом із БДУ, кожен
  наступний — менше секунди. Див. [як їх завантажити](/uk/cve/#завантаження-баз-даних),
  зокрема додатковий сертифікат CA, потрібний для bdu.fstec.ru.
- **Зіставляється 52 проби** (53 назви продуктів в upstream — `ssh`
  рахується і як OpenSSH, і як Dropbear) — кожна проба, для якої є
  придатні дані в будь-якому з джерел. Свідомо не зіставляються, кожен з
  указаною причиною: дистрибутиви Linux загального призначення (їхні CVE
  стосуються рівня пакетів), BSD-системи та Solaris, ESXi/vCenter і
  Synology DSM (рівні патчів і суфікси збірок, які механізм зіставлення
  поки не читає), — див.
  [які продукти зіставляються](/uk/cve/#які-продукти-зіставляються), а
  також власну сторінку кожного продукту.
- **Зіставлення з урахуванням редакції** для [GitLab](/uk/configuration/products/gitlab/),
  [Vault](/uk/configuration/products/vault/),
  [Nextcloud](/uk/configuration/products/nextcloud/) і
  [MongoDB](/uk/configuration/products/mongodb/): community-екземпляр
  більше не бачить знахідок, що стосуються лише enterprise (на реальних
  даних GitLab 19.2.2 CE бачить 4 з 9 записів NVD, Nextcloud 27.1.3 CE —
  11 з 23). Ці чотири проби тепер записують редакцію свого сервера в
  `extra.enterprise`; за невідомої редакції зберігаються всі знахідки.
- Цілі [`ssh`](/uk/configuration/products/ssh/) зіставляються як OpenSSH
  або Dropbear за своїм банером; для будь-якого іншого SSH-стека пошук CVE
  не виконується, замість того щоб брати CVE OpenSSH.
- **Стовпець `CVES`** у [поданнях compact і drift](/uk/views/) команди
  `check`, що рахує різні CVE.
- **Список за кожною CVE** в [`export --format html`](/uk/reporting/#список-cve),
  на чистому CSS без JavaScript, тож inline-звіт залишається офлайн-файлом
  без жодного `<script>`: по рядку на CVE з посиланнями на NVD, cve.org і
  bdu.fstec.ru, російський текст БДУ, якщо БДУ містить цю CVE, кольорова
  оцінка `CRITICAL · CVSS 3.1 9.8`, найкритичніші першими.
- [`export --format json`](/uk/reporting/#--format-json) містить кожну
  знахідку з кожного джерела в масиві `cves` кожної оцінки, зокрема
  структуровану оцінку CVSS, розібрану з обох джерел.
- Проба [`fortios`](/uk/configuration/products/fortios/) для Fortinet
  FortiGate — через його REST API з токеном REST API Admin.
- HTML-звіти в режимі CDN запамʼятовують для кожного глядача закрите
  попередження «потрібен доступ до інтернету».

### Примітки

- Блок `cve:` читається з тієї конфігурації, яку фактично використовує
  запуск, — `--config`, `$ENODIA_CONFIG` або стандартні шляхи пошуку.
- Шляхи Windows працюють без лапок, в одинарних лапках, з прямими
  скісними рисками або як UNC-шляхи. У подвійних лапках YAML `\t` і `\n`
  стають табуляцією та переведенням рядка, тому такий шлях відхиляється
  під час завантаження з підказкою.
- `cisco-ios-xe` остаточно вилучено з дорожньої карти.

## 1.2.1+0 — 2026-09-10

### Виправлено

- [`p4d`/`p4p`](/uk/configuration/products/p4d/#тайм-аут) не застосовували
  `timeout` до підпроцесу CLI `p4`, який вони викликають, — кожна інша
  проба в цьому дереві обмежує власний транспорт значенням `timeout`,
  перш ніж звертатися до мережі, а ця — ні. Процес `p4`, що завис на
  зʼєднанні з недосяжним прямим сервером (без відповіді, без скидання
  зʼєднання — саме та мережева поведінка, через яку ці дві проби взагалі
  викликають `p4`), висів нескінченно, зупиняючи весь прогін збирання.
  Повідомлено безпосередньо за реальним зависанням у продакшені.

## 1.2.0+0 — 2026-09-10

### Додано

- Проби [`p4d`](/uk/configuration/products/p4d/) і
  [`p4p`](/uk/configuration/products/p4p/) для Perforce Helix Core Server
  і Perforce Proxy. Власний мережевий RPC-протокол Perforce було повністю
  розібрано методом зворотної розробки, і власноруч написаний клієнт
  коректно відтворив його рукостискання з реальним проксі, але саме це
  рукостискання, коректність якого перевірено до байта, реальні прямі
  сервери `p4d` мовчки відкидають із причин, невидимих з боку клієнта.
  Натомість обидві проби викликають власний CLI `p4` оператора — це перші
  проби в enodia, що запускають зовнішній процес, а не говорять мережевим
  протоколом напряму. Шлях до бінарника налаштовується для кожної цілі
  через [`options.binary`](/uk/configuration/#targets) (за замовчуванням —
  `p4` з `$PATH`); у Windows це працює так само, якщо вказати `p4.exe`.
  Відповідь проксі відрізняється від відповіді прямого сервера наявністю
  власного поля `proxyVersion` — кожна проба відхиляє відповідь іншого
  вигляду.

### Виправлено

- Парсер виводу `p4 -Ztag` не прибирав закінчення рядків Windows:
  справжній `p4.exe` пише `\r\n`, залишаючи кінцевий `\r` усередині
  значень полів на кшталт `ServerID`.
- `probe.Observation.Resolver` (додано в 1.1.0+0 для
  [SonarQube](/uk/configuration/products/sonarqube/)) був звичайною
  структурою, а не вказівником — `omitempty` в `encoding/json` не має
  поняття «порожньо» для значення-структури, тож кожне спостереження, а
  не лише від SonarQube, серіалізувало в JSON-експортах зайве
  `"resolver":{}`. Виправлено на вказівник — з тієї ж причини
  `tlsVerified` уже може мати значення null, а не просто `false`.

## 1.1.1+0 — 2026-09-10

### Виправлено

- [`debian`](/uk/configuration/products/debian/) повідомляв лише мажорну
  версію (`13`) замість фактичного точкового релізу (`13.6`) — `VERSION_ID`
  у `/etc/os-release` Debian ніколи його не містить, навіть на повністю
  оновленій системі; точковий реліз є лише в `/etc/debian_version`.
  `debian` перейшов зі спільного механізму `osReleaseFamilyProbe` на
  власну окрему пробу, яка читає обидва файли й довіряє `debian_version`
  лише після підтвердження `ID=debian` і того, що його вміст — звичайне
  число з крапками: було підтверджено, що реальний образ Ubuntu містить
  такий самий файл із безглуздим успадкованим вмістом.
- [`ubuntu`](/uk/configuration/products/ubuntu/) мав ту саму прогалину:
  `VERSION_ID` ніколи не змінюється після виходу релізу, тож повністю
  оновлений хост `22.04` повідомляв просто `22.04`, а не `22.04.5`.
  `ubuntu` теж перейшов зі спільного механізму на власну пробу, яка
  віддає перевагу точковому релізу з власного поля `VERSION` в
  `os-release`, коли воно строго точніше за `VERSION_ID`. Кожен інший
  продукт спільного сімейства
  [ідентифікації ОС через SSH](/uk/configuration/products/ssh-os-probes/)
  перевірено так само; жоден з решти такої прогалини не має.

Змін у конфігурації для жодного з них немає — те саме значення
`product:`, ті самі облікові дані, той самий endpoint. Точнішою стала
лише повідомлювана `version`.

## 1.1.0+0 — 2026-09-10

### Додано

- Резолвер життєвого циклу `github-tags` для продукту, який не публікує
  GitHub Releases зовсім, лише теги не у форматі з крапками, — дав
  [pgAdmin](/uk/configuration/products/pgadmin/) його перший робочий
  резолвер (теги `pgadmin-org/pgadmin4` мають вигляд `REL-9_17`,
  перетворюються на `9.17`, і обирається тег з найвищою розібраною
  версією, а не перший).
- Змінна середовища **`GITHUB_TOKEN`** — автентифікує кожен запит до
  життєвого циклу на основі GitHub, піднімаючи ліміт без автентифікації з
  60 запитів на годину до 5000 на годину. Див.
  [Підтримувані продукти](/uk/products/#застосунки-та-інфраструктурні-сервіси).
- Проба тепер може перевизначати резолвер життєвого циклу свого продукту
  для окремого спостереження — для рідкісного випадку, коли правильний
  календар можна визначити лише після того, як побачено власну відповідь
  вендора з версією. Уперше використано, щоб розділити
  [SonarQube](/uk/configuration/products/sonarqube/) на SonarQube Server і
  SonarQube Community Build — два окремі продукти після розділення
  SonarSource наприкінці 2024 року, що відстежуються як дві різні сторінки
  endoflife.date з різними даними циклів.

### Виправлено

- Раніше збої резолвера показувалися у звіті лише як `resolver_error`,
  без жодної можливості відрізнити ліміт запитів GitHub від збою DNS чи
  зміненого API. Тепер `enodia check`/`export` у такому разі виводять
  справжню першопричину помилки в stderr.
- SonarQube завжди порівнювався з календарем життєвого циклу Community
  Build, навіть для екземпляра SonarQube Server, — збирання його версії
  працювало, але звіт у будь-якому разі показував незіставлений цикл.
  Тепер резолвер визначається для кожного екземпляра за самим рядком
  версії.

### Змінено

- Публікацію образу контейнера (`ghcr.io/epicmorg/enodia`, також
  віддзеркалюється на Docker Hub і Quay) повністю винесено з власного
  конвеєра релізів цього репозиторію в монорепозиторій `EpicMorg/docker`
  з власним розкладом збирання цього репозиторію. Адреса опублікованого
  образу та теги (`latest`, `1`, точна версія) не змінилися, але сам
  образ тепер лише `linux/amd64` і працює від імені root — див.
  [Початок роботи](/uk/getting-started/#установлення).

## 1.0.0+0 — 2026-09-09

Перший реліз. `collect → inventory.jsonl → evaluate → assessment →
render` від початку до кінця, перевірено на реальній продакшен-інфраструктурі:

- **87 проб**, по одному файлу на кожну, вкомпільовані та явно
  зареєстровані — більшість говорить HTTP, деякі
  ([Redis](/uk/configuration/products/redis/),
  [PostgreSQL](/uk/configuration/products/postgresql/),
  [MySQL](/uk/configuration/products/mysql/),
  [MongoDB](/uk/configuration/products/mongodb/)) — напряму власним
  мережевим протоколом, а дедалі більший набір (усі поширені дистрибутиви
  Linux, BSD-системи, macOS, OPNsense, Proxmox VE, TrueNAS, Synology DSM,
  мережеві пристрої) опитується через
  [SSH](/uk/configuration/products/ssh-os-probes/) або HTTP API вендора,
  замість того щоб припускати, що endpoint із версією взагалі існує.
- [`product: generic`](/uk/configuration/products/generic/) — проба, що
  задається лише конфігурацією, для будь-яких внутрішніх систем, зі
  свідомо замороженим словником (без умов, циклів чи шаблонів).
- Визначення життєвого циклу за endoflife.date і GitHub Releases, з
  кешуванням на диску, з оцінюванням за трьома незалежними осями
  (відставання патча, фаза життєвого циклу, новіша гілка), а не одним
  згорнутим вердиктом, — див. [Концепції](/uk/concepts/).
- Чотири [подання звіту](/uk/views/) для табличного, HTML-, JSON- і
  Prometheus-виводу.
- [`enodia serve`](/uk/cli-reference/#enodia-serve) — HTTP-сервер, що
  віддає лише знімки; фоновий таймер збирає дані, а обробники запитів
  тільки читають останній знімок.
- [Схема конфігурації](/uk/configuration/) з підстановкою
  `${VAR}`/`${VAR:-default}`, окремим сховищем облікових даних і
  закріпленням TLS/явним дозволом на insecure для кожної цілі.
- Пакування: `.deb`, `.rpm`, `.apk` і `.pkg.tar.zst` для Arch, окремий
  непривілейований системний користувач `enodia`, man-сторінки для кожної
  команди, звичайні архіви для Linux/Windows/macOS/Android (Termux) і
  образ контейнера — див. [Початок роботи](/uk/getting-started/).
  Контрольні суми підписано cosign keyless (OIDC, жодного ключа, яким
  треба керувати чи який може витекти).
