---
title: Generic
description: 为自研或不受支持的系统配置 enodia 的通用探针。
---

适用于没有专用探针的任何系统的退路——用手写的
`parser:` 块代替编译进程序的 Go 逻辑。完整的字段参考、固定不变的 `json`/`xml`/`header`/`plaintext`/`regex` 词汇表，以及
`clean_regex` 字段拼写说明，请参阅[配置 → 通用探针](/zh-cn/configuration/#通用探针)；本页面的存在只是为了让 `generic` 与其他 89 个产品一起显示在侧边栏中。

```yaml
targets:
  - id: in-house-api
    product: generic
    address: https://internal.example.com
    parser:
      type: regex
      regex: 'v(\d+\.\d+\.\d+)'
```

## 身份验证

`none`、`bearer`、`token-header` 和 `basic` 均可使用——取决于您的自研服务实际需要什么。

## CVE 关联

不进行匹配——手写的解析器没有可用于查找 CVE 的产品身份。参见 [CVE 关联](/zh-cn/cve/#哪些产品会被匹配)。

## 生命周期解析器

无——手工定义的目标按定义就没有可查询的日历。在 89 个专用探针的列表中没有找到您的产品？请参阅[支持的产品](/zh-cn/products/#没有找到您的产品)，了解两种可行方案：使用这个退路，或申请一个真正的探针。
