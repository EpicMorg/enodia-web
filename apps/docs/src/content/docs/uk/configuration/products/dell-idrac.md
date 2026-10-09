---
title: Dell iDRAC
description: Налаштування enodia для опитування Dell iDRAC через Redfish.
---

Два запити через Redfish: `GET /redfish/v1` — для ідентичності вендора,
потім `GET /redfish/v1/Managers/iDRAC.Embedded.1` — для версії
прошивки.

```yaml
targets:
  - id: blade-1a-idrac
    product: dell-idrac
    address: https://idrac-blade-1a.example.com
    credentials: idrac-ro
```

## Автентифікація — обовʼязкова

HTTP Basic auth; без неї точки входу відповідають `401` (підтверджено
наживо).

```yaml
credentials:
  idrac-ro:
    kind: basic
    username: enodia
    password: "${IDRAC_PASSWORD}"
```

Достатньо облікового запису iDRAC лише для читання. iDRAC зазвичай
віддають самопідписаний сертифікат — закріпіть його, а не вимикайте
перевірку, див. [Конфігурація → TLS](/uk/configuration/#tls-tls).

## Перевірка ідентичності вендора

Чому два запити: як підтверджено наживо на справжньому iDRAC 12G, сам
ресурс Manager взагалі не містить позначки вендора, тоді як корінь
сервісу `/redfish/v1` містить `Oem.Dell` (із сервісним тегом) і рядок
продукту «Integrated Dell Remote Access Controller». Перший запит
підтверджує, що це Dell; другий читає версію. `iDRAC.Embedded.1` —
стандартний ідентифікатор вбудованого контролера Dell, саме він і
перевіряється.

Dell **CMC** (контролер рівня шасі блейд-кошика) — інший продукт,
взагалі без точки входу Redfish, і він не охоплюється.

## Записувані поля

- `version` — `FirmwareVersion`, напр. `2.65.65.65`
- `extra.model`, якщо є
- `extra.serviceTag`, якщо є

## Зіставлення з CVE

Зіставляється з NVD і БДУ ФСТЕК, якщо налаштовано [блок `cve:`](/uk/cve/). Починаючи з 2.2. Обидві бази
називають кожне покоління iDRAC окремим продуктом, з номерами прошивок,
що перекриваються, тож покоління визначається з `extra.model` (модель
Redfish, напр. `12G Modular` → iDRAC7; 11G — iDRAC6, 13G — iDRAC8,
14G–16G — iDRAC9, 17G — iDRAC10). Без моделі шукається лише прошивка 3.x
і новіша (це може бути лише iDRAC9) — див.
[Dell iDRAC і Synology DSM](/uk/cve/#dell-idrac-і-synology-dsm).

## Резолвер життєвого циклу

Немає — прошивки BMC не мають публічного календаря життєвого циклу
(підтверджено 404 під кожним випробуваним slug). Лише для інвентаризації.
