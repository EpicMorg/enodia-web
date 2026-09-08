---
title: phpMyAdmin
description: Настройка enodia для опроса phpMyAdmin.
---

Читает версию из собственного bootstrap-вызова `CommonParams.setAll({...})`
на странице входа — JS у phpMyAdmin использует этот объект для каждого
AJAX-запроса, поэтому он присутствует на любой странице, вошли вы в
систему или нет, без отдельного эндпоинта версии.

```yaml
targets:
  - id: phpmyadmin-main
    product: phpmyadmin
    address: https://phpmyadmin.example.com
```

## Аутентификация

Отсутствует — подтверждено вживую на реальном контейнере
`phpmyadmin/phpmyadmin`.

## Записываемые поля

Только `version` — эта проба не записывает никаких полей `extra`.

## Резолвер жизненного цикла

`endoflife:phpmyadmin`.
