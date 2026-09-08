---
title: TestRail
description: Настройка enodia для опроса TestRail.
---

Читает `GET /version.txt` — обычный статический файл, который TestRail
кладёт в свой веб-корень, а не ответ REST API. Собственный
документированный REST API TestRail (`get_current_user` и аналогичные)
требует credentials и вообще не содержит версию продукта, поэтому эта
проба читает вместо него статический файл.

```yaml
targets:
  - id: testrail-main
    product: testrail
    address: https://testrail.example.com
```

## Аутентификация

Отсутствует — эндпоинт не принимает никакого credential.

## Записываемые поля

Только `version` — обрезанное содержимое файла, ровно в том виде, как
оно отдаётся.

## Резолвер жизненного цикла

Отсутствует — у endoflife.date нет календаря для TestRail (подтверждено
404). Пока только инвентаризация.
