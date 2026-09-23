---
title: Nextcloud
description: Налаштування enodia для опитування Nextcloud.
---

Читає версію з `GET /status.php` — ендпоінту перевірки стану для
балансувальника навантаження, доступного ще до початкового налаштування
та навіть у режимі обслуговування.

```yaml
targets:
  - id: nextcloud-main
    product: nextcloud
    address: https://nextcloud.example.com
```

## Автентифікація

Немає — ендпоінт не приймає жодного виду облікових даних.

## Яке поле версії

Повідомляється `versionstring` (напр. `34.0.3`), а не `version` (напр.
`34.0.3.2`) — підтверджено наживо: саме `versionstring` цикли
[endoflife.date](https://endoflife.date/nextcloud) використовують для
`latest`, а внутрішній четвертий компонент збірки з `version` у
календарі життєвого циклу не зʼявляється взагалі.

## Записувані поля

- `version` — з `versionstring`
- `extra.installed`, `extra.maintenance` — `"true"`/`"false"`
- `extra.buildVersion` — сире поле `version`, збережене для довідки
- `extra.enterprise` — з поля `edition` у `status.php`: порожнє (сервер
  community-редакції, підтверджено наживо) → `"false"`, `enterprise` → `"true"`;
  будь-яке інше значення не повідомляється, а не вгадується

## Зіставлення з CVE

Зіставляється з NVD і БДУ ФСТЕК, якщо налаштовано [блок `cve:`](/uk/cve/). З урахуванням редакції: проба записує власну редакцію сервера в `extra.enterprise`, і екземпляр community-редакції не бачить знахідок, що стосуються лише enterprise-редакції. Якщо редакція невідома, зберігаються всі знахідки.

## Резолвер життєвого циклу

`endoflife:nextcloud`.
