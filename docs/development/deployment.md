# 部署文档

## 构建

```bash
npm run build
# 输出目录：dist/
# 包含：index.html + 静态资源（JS/CSS/图片）
```

## 部署方式

### Vercel（推荐）

1. 连接 GitHub 仓库到 Vercel
2. 框架预设：Vite
3. 构建命令：`npm run build`
4. 输出目录：`dist`
5. 推送代码自动部署

### Netlify

1. 连接 GitHub 仓库
2. 构建命令：`npm run build`
3. 发布目录：`dist`

### GitHub Pages

```bash
npm run build
# 将 dist/ 内容推送到 gh-pages 分支
npx gh-pages -d dist
```

### 静态服务器

```bash
npm run build
# 用任意静态服务器托管 dist/ 目录
npx serve dist
```

## 环境变量

当前项目无环境变量需求（纯静态前端，无 API 调用）。
