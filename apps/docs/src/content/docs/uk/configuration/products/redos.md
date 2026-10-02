---
title: RED OS
description: Налаштування enodia для опитування RED OS через SSH.
---

Належить до сімейства [ідентифікації ОС через SSH](/uk/configuration/products/ssh-os-probes/)
— спільний механізм, облікові дані та перевірку ключа хоста описано на
тій сторінці. Зіставляється за полем `ID` файлу `/etc/os-release`.

```yaml
targets:
  - id: redos-host
    product: redos
    address: host.example.com
    credentials: linux-host-ssh
```

Перевірено наживо на `alrdockerhub/redos:7.3.1` (справжній вміст RED OS —
`HOME_URL`/`BUG_REPORT_URL` вказують на red-soft.ru): `ID="redos"`,
`VERSION_ID="7.3.1"`.

## Зіставлення з CVE

Зіставляється **за кожним встановленим пакетом** із власним OVAL RED OS для 7.3 або 8.0 (`redos.xml` з `redos.red-soft.ru/support/secure/<7.3|8.0>/`, у `cve.oval.path`) — дані RHEL тут не підходять, бо версії пакетів RED OS власні (`.el7` на 7.3, `.red80` на 8.0). Реліз визначається за major.minor версії. Проба також отримує список встановлених бінарних пакетів (`rpm -qa`, з потоком модуля AppStream для кожного пакета) і читає `uname -r`/`-m`/`-v` за той самий обмін через SSH — це зберігається як `packages` і `modules` спостереження, а також `extra.kernelRelease`, `extra.arch`, `extra.kernelVersion`. Із кількох встановлених ядер порівнюється запущене. Знахідки посилаються на бюлетені RED OS `ROS-…` і несуть власну оцінку критичності вендора. Див. [Зіставлення з CVE](/uk/cve/#cve-на-рівні-пакетів-для-дистрибутивів-linux).

## Резолвер життєвого циклу

Немає — наразі endoflife.date не має календаря RED OS. Лише для інвентаризації.
