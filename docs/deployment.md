# 部署指南

## 构建生产版本

### 1. 构建命令
```bash
npm run build
```

### 2. 输出目录
```
dist/
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── resume_avatar-[hash].JPG
└── index.html
```

### 3. 构建优化
- Tree-shaking 移除未使用代码
- CSS 压缩和优化
- 资源哈希化（缓存优化）
- 代码分割

---

## 本地预览

### 预览构建结果
```bash
npm run preview
```

默认地址: `http://localhost:4173`

### 自定义端口
```bash
npm run preview -- --port 8080
```

---

## 静态网站部署

### GitHub Pages

#### 方法 1: 手动部署
```bash
# 1. 构建
npm run build

# 2. 进入构建目录
cd dist

# 3. 初始化 Git
git init
git add -A
git commit -m 'deploy'

# 4. 推送到 gh-pages 分支
git push -f git@github.com:isabellakiko/react-resume.git main:gh-pages

cd -
```

#### 方法 2: 使用 gh-pages 包
```bash
# 安装
npm install -D gh-pages

# 添加部署脚本到 package.json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  }
}

# 部署
npm run deploy
```

#### 配置 base URL
```javascript
// vite.config.js
export default defineConfig({
  base: '/react-resume/',  // 仓库名称
  plugins: [react()],
})
```

#### GitHub Pages 设置
1. 仓库 Settings → Pages
2. Source: Deploy from a branch
3. Branch: gh-pages / (root)
4. Save

访问地址: `https://isabellakiko.github.io/react-resume/`

---

### Vercel

#### 1. 通过 Git 部署（推荐）

**步骤**:
1. 推送代码到 GitHub
2. 访问 [vercel.com](https://vercel.com)
3. Import Project
4. 选择 GitHub 仓库
5. 自动检测 Vite 配置
6. Deploy

**配置**:
```json
// vercel.json (可选)
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

#### 2. 通过 CLI 部署

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 部署
vercel

# 生产部署
vercel --prod
```

**优点**:
- 自动 CI/CD
- 免费 SSL
- 全球 CDN
- 预览部署

---

### Netlify

#### 1. 通过 Git 部署

**步骤**:
1. 访问 [netlify.com](https://netlify.com)
2. New site from Git
3. 连接 GitHub
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Deploy site

#### 2. 拖拽部署

```bash
npm run build
# 将 dist 文件夹拖到 Netlify Drop
```

#### 3. 通过 CLI 部署

```bash
# 安装
npm install -D netlify-cli

# 登录
npx netlify login

# 部署
npx netlify deploy --prod
```

**netlify.toml 配置**:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

### Cloudflare Pages

#### 通过 Git 部署

**步骤**:
1. 访问 [pages.cloudflare.com](https://pages.cloudflare.com)
2. 连接 GitHub
3. 配置构建:
   - Framework preset: Vite
   - Build command: `npm run build`
   - Build output: `dist`
4. Deploy

**优点**:
- 免费无限带宽
- 全球 CDN
- 快速部署

---

## 服务器部署

### Nginx

#### 1. 构建应用
```bash
npm run build
```

#### 2. 上传到服务器
```bash
scp -r dist/* user@server:/var/www/resume
```

#### 3. Nginx 配置
```nginx
server {
    listen 80;
    server_name resume.example.com;
    root /var/www/resume;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # 缓存静态资源
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Gzip 压缩
    gzip on;
    gzip_types text/css application/javascript image/svg+xml;
    gzip_min_length 1000;
}
```

#### 4. 重启 Nginx
```bash
sudo nginx -t
sudo systemctl reload nginx
```

---

### Docker

#### Dockerfile
```dockerfile
# 构建阶段
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# 生产阶段
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### nginx.conf
```nginx
server {
    listen 80;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

#### 构建和运行
```bash
# 构建镜像
docker build -t react-resume .

# 运行容器
docker run -p 8080:80 react-resume

# Docker Compose
docker-compose up -d
```

#### docker-compose.yml
```yaml
version: '3'
services:
  web:
    build: .
    ports:
      - "8080:80"
    restart: always
```

---

## 环境变量

### Vite 环境变量

#### .env 文件
```env
# .env
VITE_APP_TITLE=陈澄的简历

# .env.production
VITE_APP_TITLE=陈澄 - 全栈开发工程师
```

#### 使用环境变量
```javascript
console.log(import.meta.env.VITE_APP_TITLE);
```

#### 注意事项
- 必须以 `VITE_` 开头
- 不要暴露敏感信息
- .env 文件不要提交到 Git

---

## 性能优化

### 1. 资源压缩
```javascript
// vite.config.js
export default defineConfig({
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,  // 移除 console.log
      }
    }
  }
})
```

### 2. 图片优化
```bash
# 压缩图片
npm install -D vite-plugin-imagemin

# 使用 WebP 格式
```

### 3. 代码分割
```javascript
// 动态导入
const exportPDF = () => import('./utils/exportPDF.js');
```

### 4. CDN 加速
将静态资源托管到 CDN:
- jsDelivr
- Cloudflare CDN
- 阿里云 OSS

---

## 域名配置

### 自定义域名

#### GitHub Pages
```
# 创建 CNAME 文件
echo "resume.kaylonchan.com" > dist/CNAME

# 或在 vite.config.js 中配置
export default defineConfig({
  // ... 其他配置
})
```

#### DNS 设置
```
# A 记录
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153

# CNAME 记录
resume.kaylonchan.com -> isabellakiko.github.io
```

---

## HTTPS 配置

### 自动 HTTPS
Vercel、Netlify、Cloudflare Pages 自动提供免费 SSL

### 自签名证书（开发）
```bash
# 生成证书
openssl req -x509 -newkey rsa:4096 -nodes -keyout key.pem -out cert.pem -days 365

# Vite 配置
export default defineConfig({
  server: {
    https: {
      key: fs.readFileSync('key.pem'),
      cert: fs.readFileSync('cert.pem'),
    }
  }
})
```

### Let's Encrypt（生产）
```bash
# 安装 certbot
sudo apt install certbot python3-certbot-nginx

# 获取证书
sudo certbot --nginx -d resume.example.com

# 自动续期
sudo certbot renew --dry-run
```

---

## 监控和分析

### Google Analytics
```html
<!-- index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Sentry 错误监控
```bash
npm install @sentry/react
```

```javascript
// main.jsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: import.meta.env.MODE,
});
```

---

## CI/CD 自动化

### GitHub Actions

#### .github/workflows/deploy.yml
```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

---

## 回滚策略

### Vercel
```bash
# 查看部署历史
vercel ls

# 回滚到指定版本
vercel rollback <deployment-url>
```

### Git
```bash
# 回退到上一个版本
git revert HEAD

# 强制回退（慎用）
git reset --hard <commit-hash>
git push -f
```

---

## 备份策略

### 1. Git 版本控制
定期提交和推送代码

### 2. 备份构建产物
```bash
# 备份 dist 文件夹
tar -czf dist-backup-$(date +%Y%m%d).tar.gz dist/
```

### 3. 数据库备份（如果使用）
```bash
# 定期备份数据
```

---

## 部署检查清单

### 上线前检查
- [ ] 运行 `npm run build` 成功
- [ ] 本地预览正常 `npm run preview`
- [ ] 测试 PDF 导出功能
- [ ] 检查所有链接可点击
- [ ] 测试多种浏览器
- [ ] 检查移动端显示（如有）
- [ ] 验证图片加载
- [ ] 检查控制台无错误
- [ ] SEO 优化（如需要）

### 上线后检查
- [ ] 访问生产 URL 正常
- [ ] HTTPS 证书有效
- [ ] 所有功能正常
- [ ] 性能测试通过
- [ ] 监控配置正确

---

## 故障排查

### 白屏问题
1. 检查控制台错误
2. 检查资源路径（base URL）
3. 检查服务器配置

### 404 错误
配置 SPA 路由重定向到 index.html

### 样式丢失
检查 CSS 文件是否正确加载

### 图片 404
检查图片路径，使用相对路径或绝对路径
