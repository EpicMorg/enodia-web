---
title: Fortinet FortiOS (FortiGate)
description: Настройка enodia для опроса Fortinet FortiGate под управлением FortiOS.
---

Читает `GET /api/v2/monitor/system/status` — собственный REST API
FortiOS. Проверено на реальном FortiGate 601E с FortiOS 7.4.12.

```yaml
targets:
  - id: fw-edge
    product: fortios
    address: https://fw.example.com
    credentials: fortigate-api
```

## Аутентификация — обязательна

Нужен токен **REST API Admin**: создайте REST API Admin в веб-интерфейсе
FortiGate (System → Administrators) и скопируйте сгенерированный API-ключ
— FortiOS показывает его ровно один раз. Он передаётся как обычный
bearer-токен: без входа через сессию, без CSRF-токена, без параметра
`access_token` в запросе:

```yaml
credentials:
  fortigate-api:
    kind: bearer
    value: "${FORTIGATE_API_TOKEN}"
```

Отсутствующий или неверный токен получает `401` (с HTML-страницей
ошибки, а не JSON) — это сообщается как ошибка аутентификации, как и у
любой другой пробы. В самой FortiOS REST API Admin можно ограничить
доверенными хостами; если вы так делаете, добавьте туда адрес, с
которого подключается enodia.

## Записываемые поля

- `version` — как её сообщает FortiOS, например `v7.4.12` (ведущая `v`
  отбрасывается при сравнении, а не при записи)
- `extra.model` — например, `FG6H1E` (это 601E)
- `extra.build` — номер сборки FortiOS

Имя хоста устройства есть в том же ответе, но намеренно не
записывается.

## Сопоставление с CVE

Сверяется с NVD и БДУ ФСТЭК, если настроен [блок `cve:`](/ru/cve/).

## Резолвер жизненного цикла

`endoflife:fortios`. На странице FortiOS в endoflife.date есть циклы
релизов и даты, но ни для одного цикла нет «последней версии», поэтому
ось lifecycle работает, а `drift` показывает `LATEST: -` и
`PATCH: unknown` — это пробел в исходных данных, а не ошибка пробы.
