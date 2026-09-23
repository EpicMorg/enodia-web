---
title: phpMyAdmin
description: Налаштування enodia для опитування phpMyAdmin.
---

Читає версію з власного ініціалізаційного виклику `CommonParams.setAll({...})`
сторінки входу — JS phpMyAdmin використовує цей обʼєкт для кожного свого
AJAX-запиту, тож він присутній на кожній сторінці, з автентифікацією чи без,
і окремий ендпоінт версії не потрібен.

```yaml
targets:
  - id: phpmyadmin-main
    product: phpmyadmin
    address: https://phpmyadmin.example.com
```

## Автентифікація

Немає — підтверджено наживо на справжньому контейнері `phpmyadmin/phpmyadmin`.

## Записувані поля

Лише `version` — ця проба не записує полів `extra`.

## Зіставлення з CVE

Зіставляється з NVD і БДУ ФСТЕК, якщо налаштовано [блок `cve:`](/uk/cve/).

## Резолвер життєвого циклу

`endoflife:phpmyadmin`.
