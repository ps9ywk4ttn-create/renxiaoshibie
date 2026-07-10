# 人效识别

本仓库包含两套本地工具：

- `实时人效看板/`：主看板，包含实时人效、入库实时看板、入库实效看板、异常处理工具、放单助手、打包状态分析、空库位查询、账号设备绑定后台等功能。
- 根目录 `app/` + `tools/`：早期的人效计算模型，保留日/周导出和拣选状态分析能力。

## 启动主看板

在 macOS 上双击：

```text
实时人效看板/启动实时人效看板.command
```

打开地址：

```text
http://127.0.0.1:5317
```

主看板的详细说明见 `实时人效看板/README.md`。

## 授权后台

账号设备绑定后台在：

```text
实时人效看板/license-worker/
```

按其中的 `README.md` 使用 Cloudflare Workers + D1 部署。部署完成后复制 `实时人效看板/.license.env.example` 为 `.license.env`，填入 Worker 地址和设备盐值。

## GitHub 发布说明

仓库已配置 `.gitignore`，默认不提交：

- Excel 导入/导出文件
- 运行汇总 JSON、班次名单和库区配置
- 运行日志
- 本机 `node_modules` 链接
- `.license.env` 和后台管理密钥
- Cloudflare 实际部署用的 `wrangler.toml`
- 生成的二维码图片和 macOS app bundle

需要分享业务样例数据时，单独脱敏后再加入仓库。
