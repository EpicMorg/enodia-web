---
title: qBittorrent
description: Настройка enodia для опроса qBittorrent.
---

Читает версию из API веб-интерфейса qBittorrent: входит через
`POST /api/v2/auth/login`, затем с cookie сессии читает
`GET /api/v2/app/version` и `GET /api/v2/app/buildInfo` и выходит из
системы.

```yaml
targets:
  - id: qbittorrent-main
    product: qbittorrent
    address: https://qbittorrent.example.com
    credentials: qbittorrent-monitor
```

## Аутентификация

Необязательна, но обычно нужна: без сессии веб-интерфейс отвечает `401`
на всё, включая `/` (подтверждено вживую на `linuxserver/qbittorrent`
5.2.4). Это вход через форму (поля `username` и `password`), а не HTTP
Basic, поэтому вид — `password`:

```yaml
credentials:
  qbittorrent-monitor:
    kind: password
    username: monitor
    password: "${QBITTORRENT_PASSWORD}"
```

Принимается только `password`; любой другой `kind` — ошибка
конфигурации. См. [Конфигурация → Credentials](/ru/configuration/#credentials).

Без учётных данных проба обращается к `/api/v2/app/version` напрямую —
для веб-интерфейса, настроенного пропускать аутентификацию для подсети,
из которой идёт опрос. Если ответ — `401`, ошибка предложит настроить
учётные данные.

Cookie сессии, выставленный при входе, возвращается как есть: 5.x
отвечает `204` и выставляет `QBT_SID_<port>`, 4.x отвечает `200 Ok.` и
выставляет `SID`. Неверный пароль — это `401` на 5.x и `200 Fails.` на
4.x; в обоих случаях сообщается об ошибке аутентификации.

## За reverse proxy

qBittorrent проверяет, что порт в заголовке `Host` совпадает с его
собственным, а `Referer`/`Origin` — с `Host`. При входе в качестве
`Referer` отправляется собственный origin таргета. За reverse proxy,
который переназначает порты, qBittorrent нужно настроить соответствующим
образом — иначе каждый запрос получит `401`; именно это показал живой
захват через переназначенный порт контейнера, пока порты не совпали.

## Записываемые поля

- `version` — `/api/v2/app/version` без ведущего `v`, например `5.2.4`
- `extra.libtorrent` — из `/api/v2/app/buildInfo`, например `2.0.15.0`
- `extra.qt` — из `/api/v2/app/buildInfo`, например `6.11.2`

## Сопоставление с CVE

Сверяется с NVD и БДУ ФСТЭК, если настроен [блок `cve:`](/ru/cve/).

## Резолвер жизненного цикла

`github:qbittorrent/qBittorrent` — у endoflife.date нет календаря для
qBittorrent (подтверждено 404), поэтому резолвинг идёт через GitHub
Releases: только последний опубликованный, не pre-release тег, без
данных по eol/support/lts (у GitHub нет мнения о политике жизненного
цикла, только «какой релиз последний»). Релизы помечаются тегами вида
`release-5.2.4`; резолвер отбрасывает префикс `release-` и читает
остаток как версию.
