---
title: vCenter Server
description: Настройка enodia для опроса VMware vCenter Server.
---

Вызывает `ServiceContent.about` через собственный SOAP-вызов
`RetrieveServiceContent` API vSphere по адресу `/sdk` — тот же вызов и
эндпоинт, на который отвечает [ESXi](/ru/configuration/products/esxi/),
различаются они по полю `apiType`.

```yaml
targets:
  - id: vcenter-main
    product: vcenter
    address: https://vcenter.example.com
```

## Аутентификация

Отсутствует — подтверждено вживую на реальном продакшн-инстансе vCenter
8.0.3, вообще без credentials.

## Проверка личности вендора

Поле `apiType` сверяется со строкой `"VirtualCenter"` — реальный хост
ESXi отвечает на идентичный вызов с `apiType=HostAgent` (см.
[ESXi](/ru/configuration/products/esxi/), где та же проверка выполняется
в обратную сторону). Если `product: vcenter` указать на хост ESXi, проба
громко откажет вместо того, чтобы записать это как неверный факт.

## Не то же самое, что более ранняя версия этой пробы

Раньше эта проба читала вместо этого `/sdk/vimServiceVersions.xml`,
который отвечает идентично и для ESXi, и для vCenter (то есть никогда
не мог их различить) и сообщает версию схемы API `vim25` (например,
`"8.0.3.0"`), а не настоящую маркетинговую версию продукта. Текущая
проба на основе `RetrieveServiceContent` решает обе проблемы —
настоящая версия, настоящая проверка личности.

## Записываемые поля

- `version` — настоящая маркетинговая версия, например `8.0.3`
- `extra.build`, если присутствует

## Резолвер жизненного цикла

`endoflife:vcenter`.
