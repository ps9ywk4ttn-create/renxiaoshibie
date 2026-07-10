# 账号设备绑定后台

这个目录是 Cloudflare Workers + D1 免费授权后台。

## 部署

1. 登录 Cloudflare：

```bash
npx wrangler login
```

2. 创建 D1 数据库：

```bash
cd license-worker
npx wrangler d1 create realtime-license
```

3. 复制配置：

```bash
cp wrangler.toml.example wrangler.toml
```

把第 2 步返回的 `database_id` 填进 `wrangler.toml`。

4. 初始化数据库表：

```bash
npx wrangler d1 execute realtime-license --remote --file=./schema.sql
```

5. 设置密钥：

```bash
npx wrangler secret put ADMIN_KEY
npx wrangler secret put PASSWORD_PEPPER
```

`ADMIN_KEY` 是你以后创建账号、解绑设备用的管理密码。`PASSWORD_PEPPER` 随机填一串长字符。

6. 发布：

```bash
npx wrangler deploy
```

部署完成后会得到一个地址，例如：

```text
https://realtime-efficiency-license.xxx.workers.dev
```

## 创建账号

```bash
curl -X POST "https://你的worker地址/admin/users" \
  -H "content-type: application/json" \
  -H "x-admin-key: 你的ADMIN_KEY" \
  -d '{"username":"user001","password":"123456","role":"user"}'
```

## 用户换电脑时解绑

```bash
curl -X POST "https://你的worker地址/admin/users/reset-device" \
  -H "content-type: application/json" \
  -H "x-admin-key: 你的ADMIN_KEY" \
  -d '{"username":"user001"}'
```

## 查看账号列表

```bash
curl "https://你的worker地址/admin/users" \
  -H "x-admin-key: 你的ADMIN_KEY"
```

## 接到本地软件

复制 `.license.env.example` 为 `.license.env`，填入 Worker 地址：

```bash
cp ../.license.env.example ../.license.env
```

```text
LICENSE_API_URL=https://你的worker地址
LICENSE_APP_ID=realtime-efficiency-dashboard
LICENSE_DEVICE_SALT=发布前换成一串随机字符
```

重新启动实时人效看板后，就会强制账号登录，并在第一次登录时绑定设备。
