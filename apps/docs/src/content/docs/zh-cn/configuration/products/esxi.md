---
title: VMware ESXi
description: 配置 enodia 探测 VMware ESXi。
---

通过 vSphere API 自身位于 `/sdk` 的
`RetrieveServiceContent` SOAP 发现调用来调用 `ServiceContent.about`——与[vCenter Server](/zh-cn/configuration/products/vcenter/)
响应的调用和端点相同，通过 `apiType` 字段加以区分。

```yaml
targets:
  - id: esxi-main
    product: esxi
    address: https://esxi-host.example.com
```

## 身份验证

无——已针对一台真实的生产环境 ESXi 8.0.3 主机实测确认，完全无需凭据。

## 厂商身份校验

`apiType` 会与 `"HostAgent"` 进行比较——真实的 vCenter Server
对完全相同的调用返回的是 `apiType=VirtualCenter`（参见[vCenter Server](/zh-cn/configuration/products/vcenter/)，它以相反方向执行同样的检查）。把 `product: esxi` 指向一个 vCenter 实例会明确报错失败，而不是被记录为错误的事实。

## 记录的字段

- `version` — 例如 `8.0.3`
- `extra.build`（如果存在）

## CVE 关联

不进行匹配——其几乎所有条目都是匹配器不读取的 `7.0` + `update_1` 式字面值，因此结果要么什么都匹配不到，要么全部匹配。参见 [CVE 关联](/zh-cn/cve/#哪些产品会被匹配)。

## 生命周期解析器

`endoflife:esxi`。
