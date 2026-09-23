---
title: vCenter Server
description: 配置 enodia 探测 VMware vCenter Server。
---

通过 vSphere API 自身位于 `/sdk` 的
`RetrieveServiceContent` SOAP 发现调用来调用 `ServiceContent.about`——与[ESXi](/zh-cn/configuration/products/esxi/) 响应的调用和端点相同，通过 `apiType` 字段加以区分。

```yaml
targets:
  - id: vcenter-main
    product: vcenter
    address: https://vcenter.example.com
```

## 身份验证

无——已针对一个真实的生产环境 vCenter 8.0.3 实例实测确认，完全无需凭据。

## 厂商身份校验

`apiType` 会与 `"VirtualCenter"` 进行比较——真实的 ESXi 主机对完全相同的调用返回的是 `apiType=HostAgent`（参见[ESXi](/zh-cn/configuration/products/esxi/)，它以相反方向执行同样的检查）。把 `product: vcenter` 指向一台 ESXi 主机会明确报错失败，而不是被记录为错误的事实。

## 与本探针的早期版本不同

本探针以前读取的是 `/sdk/vimServiceVersions.xml`，它对 ESXi 和 vCenter 的响应完全相同（因此永远无法区分两者），而且报告的是 `vim25` API 架构版本（例如
`"8.0.3.0"`），而不是产品真实的对外发布版本。当前基于 `RetrieveServiceContent` 的探针同时解决了这两个问题——真实的版本，真实的身份校验。

## 记录的字段

- `version` — 真实的对外发布版本，例如 `8.0.3`
- `extra.build`（如果存在）

## CVE 关联

不进行匹配——其几乎所有条目都是匹配器不读取的 `7.0` + `update_1` 式字面值，因此结果要么什么都匹配不到，要么全部匹配。参见 [CVE 关联](/zh-cn/cve/#哪些产品会被匹配)。

## 生命周期解析器

`endoflife:vcenter`。
