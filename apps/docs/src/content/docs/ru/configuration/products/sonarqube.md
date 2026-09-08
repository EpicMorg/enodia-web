---
title: SonarQube
description: Настройка enodia для опроса SonarQube.
---

Читает `GET /api/system/status` для получения версии.

```yaml
targets:
  - id: sonarqube-main
    product: sonarqube
    address: https://sonarqube.example.com
```

## Аутентификация

Отсутствует — этот эндпоинт (наравне с `/api/server/version` и
`/api/system/ping`) остаётся доступным без credentials даже после
включения глобальной настройки SonarQube «Force user authentication».
SonarQube считает его маршрутом для проверки живости, к которому
балансировщику нагрузки нужен доступ без входа, а не обычным защищённым
API.

## Записываемые поля

- `version`
- `extra.id`
- `extra.status` — одно из `UP`, `DOWN`, `STARTING`, `RESTARTING`,
  `DB_MIGRATION_NEEDED`, `DB_MIGRATION_RUNNING`; факт о состоянии
  сервера, записываемый как есть, а не превращаемый в ошибку, если он
  не `UP`

## Резолвер жизненного цикла

`endoflife:sonarqube-community` — именно календарь Community Edition;
отдельного маппинга резолвера для Developer/Enterprise/Datacenter нет.
