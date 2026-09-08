---
title: VMware ESXi
description: Настройка enodia для опроса VMware ESXi.
---

Вызывает `ServiceContent.about` через собственный SOAP-вызов
`RetrieveServiceContent` API vSphere по адресу `/sdk` — тот же вызов и
эндпоинт, на который отвечает
[vCenter Server](/ru/configuration/products/vcenter/), различаются они
по полю `apiType`.

```yaml
targets:
  - id: esxi-main
    product: esxi
    address: https://esxi-host.example.com
```

## Аутентификация

Отсутствует — подтверждено вживую на реальном продакшн-хосте ESXi
8.0.3, вообще без credentials.

## Проверка личности вендора

Поле `apiType` сверяется со строкой `"HostAgent"` — реальный сервер
vCenter отвечает на идентичный вызов с `apiType=VirtualCenter` (см.
[vCenter Server](/ru/configuration/products/vcenter/), где та же
проверка выполняется в обратную сторону). Если `product: esxi` указать
на инстанс vCenter, проба громко откажет вместо того, чтобы записать
это как неверный факт.

## Записываемые поля

- `version` — например, `8.0.3`
- `extra.build`, если присутствует

## Резолвер жизненного цикла

`endoflife:esxi`.
