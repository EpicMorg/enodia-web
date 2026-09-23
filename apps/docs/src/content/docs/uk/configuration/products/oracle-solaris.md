---
title: Oracle Solaris
description: Налаштування enodia для опитування Oracle Solaris через SSH.
---

Використовує той самий механізм SSH, облікові дані та перевірку ключа хоста,
що й сімейство [ідентифікації ОС через SSH](/uk/configuration/products/ssh-os-probes/),
але читає `/etc/release`, а не файл os-release чи `uname -sr`.

```yaml
targets:
  - id: solaris-host
    product: oracle-solaris
    address: host.example.com
    credentials: linux-host-ssh
```

## Чому не `uname -sr`

На відміну від OpenBSD/NetBSD, `uname -sr` тут не працює: у Solaris він
повідомляє лише версію ядра SunOS (`"SunOS 5.11"` для кожного релізу
Solaris 11.x — нумерація версій SunOS не повʼязана з версією продукту),
тож відрізнити 11.3 від 11.4 неможливо. Справжню версію містить власний
рядок `/etc/release` `"Oracle Solaris 11.4 X86"`.

Жоден образ для завантаження неможливо отримати без облікового запису
Oracle/ліцензії OTN, тому перевірку виконано через `vmactions/solaris-vm`,
який збирає й повторно публікує власний вільний для розповсюдження
Solaris 11.4 CBE від Oracle (Common Build Environment, призначений саме для
такого використання в CI).

## Записувані поля

- `version` — розібрана з `/etc/release`
- `extra.hostKeyVerified`

## Зіставлення з CVE

Не зіставляється — NVD записує рівні патчів у поле CPE, яке зіставник не читає, тож зіставлення лише за релізом позначило б повністю пропатчений хост усіма CVE, будь-коли виправленими в цьому релізі. Див. [Зіставлення з CVE](/uk/cve/#які-продукти-зіставляються).

## Резолвер життєвого циклу

`endoflife:oracle-solaris`.
