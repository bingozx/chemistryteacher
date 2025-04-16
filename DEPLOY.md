# 部署指南

## 准备工作

1. 注册 Cloudflare 账号
   - 访问 [Cloudflare](https://dash.cloudflare.com/sign-up) 注册账号
   - 记录您的 Account ID（在右侧边栏可以找到）

2. 创建 API Token
   - 访问 [API Tokens](https://dash.cloudflare.com/profile/api-tokens) 页面
   - 点击 "Create Token"
   - 选择 "Edit Cloudflare Pages" 模板
   - 设置权限范围并创建
   - 保存生成的 token

3. 配置 GitHub Secrets
   - 在项目仓库的 Settings > Secrets and variables > Actions 中添加以下 secrets：
     - `CLOUDFLARE_API_TOKEN`: 您的 API Token
     - `CLOUDFLARE_ACCOUNT_ID`: 您的 Account ID

## 部署步骤

1. 推送代码到 GitHub
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. 自动部署
   - 推送代码后，GitHub Actions 会自动触发部署流程
   - 可以在仓库的 Actions 标签页查看部署进度

3. 配置自定义域名（可选）
   - 在 Cloudflare Pages 的项目设置中添加自定义域名
   - 按照指引配置 DNS 记录

## 本地开发

1. 安装依赖
   ```bash
   pnpm install
   ```

2. 启动开发服务器
   ```bash
   pnpm dev
   ```

3. 构建项目
   ```bash
   pnpm build
   ```

## 环境变量配置

确保在 Cloudflare Pages 的项目设置中配置以下环境变量：

- `VITE_SITE_NAME`: 网站名称
- `VITE_SITE_AUTHOR`: 作者名称
- `VITE_SITE_KEYWORDS`: 网站关键词
- `VITE_SITE_DES`: 网站描述
- `VITE_SITE_URL`: 网站 URL

## 注意事项

1. 确保 `.env` 文件中的配置正确
2. 图片资源需要放在 `public` 目录下
3. 部署完成后，第一次访问可能需要等待几分钟才能生效
4. 如果遇到构建错误，请检查 GitHub Actions 日志 