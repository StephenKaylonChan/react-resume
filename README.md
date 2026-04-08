# React Resume

基于 React 19 + Vite + Tailwind CSS 的现代化单页简历应用，支持 A4 精确排版和多格式导出（PDF / PNG / Markdown）。

## 快速开始

```bash
npm install
npm run dev        # http://localhost:5173
```

## 功能

- A4 精确排版（210mm x 297mm）
- 17 种技术关键词渐变色
- 多格式导出：PDF（html-to-image + html2canvas 双重降级）、高清 PNG、Markdown
- 打印优化（渐变降级为纯色，背景色保留）
- 构建优化（manualChunks 拆分，主 chunk ~227KB）

## 项目结构

```
react-resume/
├── src/
│   ├── components/        # React 组件（A4Page, Resume, ResumeHeader, ResumeSidebar, GradientText）
│   ├── utils/             # 导出工具（exportPDF, exportImage, exportMarkdown）
│   ├── App.jsx            # 应用入口 + 工具栏
│   └── index.css          # 全局样式 + 打印媒体查询
├── resume-content/        # Markdown 简历内容源文件（同时被 Markdown 导出引用）
├── docs/
│   ├── architecture/      # 架构文档（总览 + 前端架构）
│   ├── development/       # 开发文档（上手指南 + 部署 + changelog）
│   ├── roadmap/           # 项目路线图（Phase 1-4）
│   └── reports/           # 诊断报告
├── tailwind.config.js     # Tailwind 配置（A4 尺寸 + 渐变色）
└── vite.config.js         # Vite 配置（manualChunks 拆分）
```

## 技术栈

- **前端**: React 19.2, Vite 7.2, Tailwind CSS 3.4
- **导出**: html-to-image, html2canvas (动态加载), jsPDF
- **代码质量**: ESLint 9, PropTypes

## 常用命令

```bash
npm run dev       # 开发服务器
npm run build     # 生产构建
npm run lint      # ESLint 检查
npm run preview   # 预览构建
```

## 文档

- [架构总览](./docs/architecture/README.md) — 模块划分、数据流、技术决策
- [前端架构](./docs/architecture/frontend.md) — 组件分层、导出系统、构建优化
- [上手指南](./docs/development/getting-started.md) — 环境要求、启动步骤
- [部署文档](./docs/development/deployment.md) — 构建和部署方式
- [项目路线图](./docs/roadmap/README.md) — Phase 1-4 规划

## 作者

**陈澄 (Kaylon)**
- GitHub: [@isabellakiko](https://github.com/isabellakiko)
- 网站: [kaylonchan.com](https://kaylonchan.com)
