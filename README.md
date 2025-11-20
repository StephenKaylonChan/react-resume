# React 简历项目

基于 React + Vite + Tailwind CSS 的现代化单页简历应用，支持 A4 纸张尺寸和 PDF 导出功能。

## ✨ 特性

- 📄 **A4 纸张设计** - 精确的 210mm × 297mm 尺寸
- 🎨 **彩色渐变文字** - 29 种技术栈专属渐变配色
- 📥 **PDF 导出** - 双重降级方案，保证导出质量
- 🎯 **响应式布局** - 两栏设计，7:3 黄金比例
- ⚡ **快速开发** - Vite HMR，即时反馈
- 💅 **Tailwind CSS** - 实用优先的样式系统

## 🚀 快速开始

### 安装依赖
```bash
npm install
```

### 开发模式
```bash
npm run dev
```
访问 http://localhost:5173

### 生产构建
```bash
npm run build
```

### 预览构建
```bash
npm run preview
```

## 📁 项目结构

```
react-resume-app/
├── public/
│   └── resume_avatar.JPG          # 证件照
├── src/
│   ├── components/
│   │   ├── A4Page.jsx             # A4 纸张容器
│   │   ├── GradientText.jsx       # 渐变文字组件
│   │   ├── Resume.jsx             # 主内容
│   │   ├── ResumeHeader.jsx       # 头部信息
│   │   └── ResumeSidebar.jsx      # 侧边栏
│   ├── utils/
│   │   └── exportPDF.js           # PDF 导出工具
│   ├── App.jsx                    # 主应用
│   ├── index.css                  # 全局样式
│   └── main.jsx                   # 入口文件
├── resume-content/                # 📋 简历内容文档
│   ├── README.md
│   ├── personal-info.md           # 个人信息
│   ├── work-experience.md         # 工作经历
│   ├── projects.md                # 项目经验
│   ├── skills.md                  # 技能清单
│   └── education.md               # 教育背景
├── docs/                          # 📚 技术文档
│   ├── architecture.md            # 架构设计
│   ├── tech-stack.md              # 技术栈说明
│   ├── components.md              # 组件设计
│   ├── gradient-text.md           # 渐变文字方案
│   ├── pdf-export.md              # PDF 导出方案
│   ├── styling.md                 # 样式系统
│   ├── troubleshooting.md         # 问题解决记录
│   └── deployment.md              # 部署指南
├── tailwind.config.js             # Tailwind 配置
├── vite.config.js                 # Vite 配置
└── package.json
```

## 📋 简历内容管理

简历内容文档位于 `resume-content/` 文件夹：

- **personal-info.md** - 个人信息、联系方式、职位定位
- **work-experience.md** - 工作经历详细描述
- **projects.md** - 项目经验
- **skills.md** - 技能清单和学习成果
- **education.md** - 教育背景

更新简历时，修改对应 Markdown 文件，然后同步到 React 组件中。

## 📚 技术文档

技术实现文档位于 `docs/` 文件夹：

### 核心文档
- **[架构设计](./docs/architecture.md)** - 项目架构、组件层级、设计原则
- **[技术栈说明](./docs/tech-stack.md)** - 依赖版本、选择原因、配置说明
- **[组件设计](./docs/components.md)** - 每个组件的职责和实现细节

### 关键技术
- **[渐变文字实现](./docs/gradient-text.md)** - Tailwind JIT 问题解决方案
- **[PDF 导出方案](./docs/pdf-export.md)** - 双重降级策略，html-to-image + html2canvas
- **[样式系统](./docs/styling.md)** - Tailwind 配置、字体、颜色、间距

### 运维文档
- **[问题解决记录](./docs/troubleshooting.md)** - 开发过程中遇到的问题和解决方案
- **[部署指南](./docs/deployment.md)** - 多种部署方案（Vercel、Netlify、GitHub Pages）

## 🛠️ 技术栈

### 核心框架
- **React 19.2** - 最新版本，现代化特性
- **Vite 7.2** - 极快的开发服务器
- **Tailwind CSS v3.4.0** - 实用优先的 CSS 框架

### PDF 导出
- **html-to-image** - 主方案，支持渐变
- **html2canvas** - 降级方案
- **jsPDF** - PDF 生成

### 开发工具
- **ESLint** - 代码质量检查
- **PostCSS** - CSS 转换
- **Autoprefixer** - 浏览器前缀

## 🎨 特色功能

### 1. 渐变文字效果
为技术关键词提供 29 种专属渐变配色：

```jsx
<GradientText gradient="gradient-react">React</GradientText>
<GradientText gradient="gradient-spring">Spring Boot</GradientText>
<GradientText gradient="gradient-python">Python</GradientText>
```

**技术亮点**：
- 使用 `background-clip: text` 实现渐变文字
- 显式类名映射解决 Tailwind JIT 动态类名问题
- 打印时自动降级为纯色

### 2. PDF 导出
双重降级策略确保导出质量：

1. **主方案**：html-to-image（保留渐变）
2. **降级**：html2canvas（纯色替代）

```javascript
const handleExportPDF = async () => {
  await exportToPDF('resume-content', '陈澄-简历.pdf');
};
```

### 3. A4 纸张精确控制
```css
/* Tailwind 配置 */
width: { 'a4': '210mm' },
height: { 'a4': '297mm' }
```

## 🔧 开发指南

### 添加新的渐变颜色

1. 在 `tailwind.config.js` 中添加：
```javascript
backgroundImage: {
  'gradient-newtech': 'linear-gradient(45deg, #color1, #color2)',
}
```

2. 在 `GradientText.jsx` 中添加映射：
```javascript
const gradientClasses = {
  'gradient-newtech': 'bg-gradient-newtech',
};
```

3. 使用：
```jsx
<GradientText gradient="gradient-newtech">NewTech</GradientText>
```

### 更新简历内容

1. 修改 `resume-content/` 中的对应 Markdown 文件
2. 将更新内容同步到 React 组件
3. 测试显示效果和 PDF 导出

### 调试技巧

```javascript
// 查看生成的 PDF 图片
const dataUrl = await toPng(element);
window.open(dataUrl);

// 检查渐变类名
console.log(gradientClasses['gradient-react']);
```

## 📦 构建和部署

### 构建生产版本
```bash
npm run build
```

### 部署选项

#### Vercel（推荐）
```bash
npm i -g vercel
vercel --prod
```

#### Netlify
```bash
npm install -D netlify-cli
npx netlify deploy --prod
```

#### GitHub Pages
```bash
npm run build
npx gh-pages -d dist
```

详细部署指南见 [docs/deployment.md](./docs/deployment.md)

## 🐛 常见问题

### 渐变文字不显示
- 检查类名映射是否完整
- 确认 Tailwind 配置包含该渐变
- 查看 [渐变文字文档](./docs/gradient-text.md)

### PDF 导出异常
- 检查 html-to-image 是否安装
- 查看控制台错误日志
- 参考 [PDF 导出文档](./docs/pdf-export.md)

### Tailwind 样式不生效
- 清除缓存：`rm -rf node_modules/.vite`
- 重启开发服务器：`npm run dev`
- 查看 [问题解决文档](./docs/troubleshooting.md)

## 📝 版本管理

### 简历版本
项目支持多个简历版本：
- **全栈版本** - 强调前后端全栈能力
- **后端版本** - 侧重 Java 后端开发
- **前端版本** - 突出 React 前端经验

切换版本只需修改 `resume-content/` 中的内容文件。

### Git 提交规范
```bash
feat: 添加新功能
fix: 修复问题
docs: 更新文档
style: 样式调整
refactor: 重构代码
```

## 📄 许可证

本项目仅供个人简历使用。

## 👤 作者

**陈澄 (Kaylon)**
- 邮箱: chenchengpre@163.com
- GitHub: [@isabellakiko](https://github.com/isabellakiko)
- 网站: [kaylonchan.com](https://kaylonchan.com)

## 🙏 致谢

- [React](https://react.dev/) - 强大的前端框架
- [Vite](https://vitejs.dev/) - 快速的构建工具
- [Tailwind CSS](https://tailwindcss.com/) - 实用的样式框架
- [html-to-image](https://github.com/bubkoo/html-to-image) - PDF 导出核心库
- [Claude Code](https://claude.com/claude-code) - AI 辅助开发工具

---

**📌 提示**:
- 首次使用请先阅读 [架构文档](./docs/architecture.md)
- 更新内容请参考 [简历内容文档](./resume-content/README.md)
- 遇到问题查看 [问题解决文档](./docs/troubleshooting.md)
