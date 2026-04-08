# 上手指南

## 环境要求

- **Node.js**: >= 18.x
- **npm**: >= 9.x
- **操作系统**: macOS / Linux / Windows

## 快速开始

```bash
# 1. 克隆仓库
git clone <repo-url>
cd react-resume

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev
```

## 关键 URL

| 名称 | 地址 |
|------|------|
| 开发服务器 | http://localhost:5173 |

## 常用命令

```bash
npm run dev       # 启动 Vite 开发服务器（HMR）
npm run build     # 生产构建（输出到 dist/）
npm run lint      # ESLint 代码检查
npm run preview   # 本地预览生产构建
```

## 项目结构概览

```
react-resume/
├── src/              # 源代码
│   ├── components/   # React 组件（5 个）
│   ├── utils/        # 工具函数（PDF 导出）
│   ├── App.jsx       # 应用入口
│   └── index.css     # 全局样式
├── resume-content/   # 简历内容 Markdown 源文件
├── docs/             # 开发文档
├── public/           # 静态资源（头像）
└── CLAUDE.md         # AI 协作配置
```
