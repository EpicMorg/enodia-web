---
title: CentOS Linux (застарілий)
description: Налаштування enodia для опитування застарілого CentOS Linux із завершеною підтримкою (EOL) через SSH.
---

Використовує той самий механізм SSH, облікові дані та перевірку ключа хоста,
що й сімейство [ідентифікації ОС через SSH](/uk/configuration/products/ssh-os-probes/),
але читає інший файл: `/etc/redhat-release`, а не `/etc/os-release`.

```yaml
targets:
  - id: centos-host
    product: centos
    address: host.example.com
    credentials: linux-host-ssh
```

## Чому не сімейство os-release

Це застарілий CentOS Linux (5/6/7/8), підтримку якого вже завершено (EOL), —
на відміну від [CentOS Stream](/uk/configuration/products/centos-stream/),
його досі актуального наступника. Підтверджено наживо, що CentOS 5 і 6
зʼявилися ще до конвенції os-release від systemd (файлу `/etc/os-release`
там немає взагалі), тоді як `/etc/redhat-release` існує в усьому сімействі
RHEL задовго до того. Реальні парки серверів досі їх використовують —
завершення підтримки CentOS не виводить з експлуатації машини, на яких він
досі працює, і саме таку ситуацію enodia має виявляти, а не приховувати.

Перевірено наживо на `centos:5` (`"CentOS release 5.11 (Final)"`),
`:6` (`"CentOS release 6.10 (Final)"`) і `:7` (`"CentOS Linux release
7.9.2009 (Core)"`). Власний `/etc/redhat-release` хоста CentOS Stream 9
(`"CentOS Stream release 9"`) цьому шаблону **не** відповідає — збіг
вимагає «CentOS release» або «CentOS Linux release» одразу після
«CentOS », тож екземпляр Stream ніколи не буде помилково визначено як
застарілий `centos`, хоча обидва файли існують в обох лініях продукту.

## Записувані поля

- `version` — номер релізу, розібраний з `/etc/redhat-release`
- `extra.hostKeyVerified`

## Зіставлення з CVE

Не зіставляється — CVE дистрибутива загального призначення є вразливостями пакетів, а номер релізу не показує, які пакети було виправлено відтоді. Див. [Зіставлення з CVE](/uk/cve/#які-продукти-зіставляються).

## Резолвер життєвого циклу

`endoflife:centos`.
