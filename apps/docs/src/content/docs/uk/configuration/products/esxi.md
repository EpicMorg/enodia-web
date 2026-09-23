---
title: VMware ESXi
description: Налаштування enodia для опитування VMware ESXi.
---

Викликає `ServiceContent.about` через власний SOAP-виклик виявлення
`RetrieveServiceContent` API vSphere за адресою `/sdk` — той самий виклик
і ендпоінт, на який відповідає [vCenter Server](/uk/configuration/products/vcenter/);
їх розрізняє поле `apiType`.

```yaml
targets:
  - id: esxi-main
    product: esxi
    address: https://esxi-host.example.com
```

## Автентифікація

Немає — підтверджено наживо на справжньому продакшн-хості ESXi 8.0.3,
жодних облікових даних.

## Перевірка ідентичності вендора

`apiType` порівнюється з `"HostAgent"` — справжній vCenter Server
відповідає на ідентичний виклик натомість `apiType=VirtualCenter` (див.
[vCenter Server](/uk/configuration/products/vcenter/), де ця сама
перевірка виконується навпаки). Якщо спрямувати `product: esxi` на
екземпляр vCenter, проба явно завершиться помилкою, а не запише хибний факт.

## Записувані поля

- `version` — наприклад, `8.0.3`
- `extra.build`, якщо є

## Зіставлення з CVE

Не зіставляється — майже всі його записи є літералами на кшталт `7.0` + `update_1`, які зіставник не читає, тож результатом було б або нічого, або все. Див. [Зіставлення з CVE](/uk/cve/#які-продукти-зіставляються).

## Резолвер життєвого циклу

`endoflife:esxi`.
