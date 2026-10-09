---
title: Greenbone / OpenVAS
description: Настройка enodia для опроса Greenbone / OpenVAS.
---

Читает версию gsad — веб-демона Greenbone Security Assistant перед
OpenVAS — из `GET /gmp`. Схема по умолчанию — `https`. `product: openvas`
и `product: gsad` принимаются как алиасы.

```yaml
targets:
  - id: greenbone-main
    product: greenbone
    address: https://greenbone.example.com
```

## Почему 401 от `/gmp`

gsad оборачивает каждый ответ `/gmp` в конверт с собственной версией —
включая 401 на запрос без сессии:
`<envelope><version>24.12.0</version><vendor_version></vendor_version>…`
(«Authentication required … (GSA 24.12.0)»). Проба принимает этот 401 и
читает конверт. Сам веб-интерфейс — статический бандл React без версии.

Версия — это версия gsad. Сканер (openvas-scanner) и gvmd за ним имеют
свои версии и без входа не видны.

## Аутентификация

Отсутствует — эндпоинт не принимает никакого credential.

## Записываемые поля

- `version` — например, `24.12.0`, из `<envelope><version>`
- `extra.vendorVersion` — `<vendor_version>`, если не пустой

## Сопоставление с CVE

Сверяется с NVD, если настроен [блок `cve:`](/ru/cve/) — как gsad
(`greenbone_security_assistant`), а не демон `openvas_manager`.

## Резолвер жизненного цикла

`github:greenbone/gsad` — у endoflife.date нет календаря для Greenbone
(подтверждено 404), поэтому резолвинг идёт через GitHub Releases:
только последний опубликованный, не pre-release тег, без данных по
eol/support/lts (у GitHub нет мнения о политике жизненного цикла,
только «какой релиз последний»).
