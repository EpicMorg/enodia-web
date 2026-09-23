---
title: phpMyAdmin
description: 配置 enodia 探测 phpMyAdmin。
---

从登录页面自身的 `CommonParams.setAll({...})`
引导调用中读取版本——phpMyAdmin 的 JS 在发出的每个 AJAX 请求中都会使用这个对象，因此它出现在每个页面上，无论是否已登录，无需单独的版本端点。

```yaml
targets:
  - id: phpmyadmin-main
    product: phpmyadmin
    address: https://phpmyadmin.example.com
```

## 身份验证

无——已针对真实的 `phpmyadmin/phpmyadmin` 容器实测确认。

## 记录的字段

仅 `version`——本探针不记录任何 `extra` 字段。

## CVE 关联

配置了 [`cve:` 块](/zh-cn/cve/)时，会与 NVD 和 BDU FSTEC 进行匹配。

## 生命周期解析器

`endoflife:phpmyadmin`。
