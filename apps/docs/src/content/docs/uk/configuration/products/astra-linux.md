---
title: Astra Linux
description: Налаштування enodia для опитування Astra Linux через SSH.
---

Використовує той самий механізм SSH, облікові дані та перевірку ключа хоста,
що й сімейство [ідентифікації ОС через SSH](/uk/configuration/products/ssh-os-probes/),
але читає інший файл: `/etc/astra_version`, власний ідентифікаційний файл
Astra, а не `/etc/os-release`.

```yaml
targets:
  - id: astra-host
    product: astra-linux
    address: host.example.com
    credentials: linux-host-ssh
```

## Чому не `/etc/os-release`

Astra Linux базується на Debian і має `/etc/os-release`
(`ID_LIKE=debian`), але його `VERSION_ID` непридатний: підтверджено наживо
(`epicmorg/astralinux:1.7-main` і `:1.8-main`), що він має значення
`"1.8_x86-64"` — суфікс архітектури вшито прямо в рядок версії.
У `/etc/astra_version` нічого такого немає: просто `"1.8.6"`/`"1.7.9"` —
справжній точковий реліз, який відстежує сама Astra.

## Записувані поля

- `version` — з `/etc/astra_version`
- `extra.hostKeyVerified`

## Зіставлення з CVE

Зіставляється **за кожним встановленим пакетом** із власним OVAL Astra Linux для SE 1.7 або 1.8 (`oval-definitions-alse-<1.7|1.8>.xml`, у `cve.oval.path`) — дані Debian тут не підходять, бо версії пакетів Astra — це її власні перезбірки. Реліз визначається за major.minor версії (`1.8.6` → 1.8). Проба також отримує список встановлених бінарних пакетів (`dpkg-query`) за той самий обмін через SSH, що й `/etc/astra_version`, — це зберігається як `packages` спостереження, а також `extra.kernelRelease`, `extra.arch`, `extra.kernelVersion`. Знахідки посилаються на власний бюлетень Astra або на БДУ, якщо вендор його не наводить (1.7). Дані Astra не містять оцінки критичності, а її пакети ядра порівнюються як встановлені, а не як запущені. Див. [Зіставлення з CVE](/uk/cve/#cve-на-рівні-пакетів-для-дистрибутивів-linux).

## Резолвер життєвого циклу

Немає — endoflife.date не має календаря Astra Linux (підтверджено 404 під
`astra`, `astralinux` і `astra-linux`). Лише для інвентаризації.
