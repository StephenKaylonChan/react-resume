# 项目架构设计

## 技术栈
- **框架**: React 19.2 + Vite 7.2
- **样式**: Tailwind CSS v3.4.0
- **PDF导出**: html-to-image + html2canvas + jsPDF
- **语言**: JavaScript (非TypeScript)

## 项目结构

```
react-resume-app/
├── public/
│   └── resume_avatar.JPG          # 证件照
├── src/
│   ├── components/
│   │   ├── A4Page.jsx             # A4纸张容器
│   │   ├── GradientText.jsx       # 渐变文字组件
│   │   ├── Resume.jsx             # 左侧主内容
│   │   ├── ResumeHeader.jsx       # 头部信息
│   │   └── ResumeSidebar.jsx      # 右侧边栏
│   ├── utils/
│   │   └── exportPDF.js           # PDF导出工具
│   ├── App.jsx                    # 主应用组件
│   ├── index.css                  # 全局样式
│   └── main.jsx                   # 应用入口
├── resume-content/                # 简历内容文档
├── docs/                          # 技术文档
├── tailwind.config.js             # Tailwind 配置
├── postcss.config.js              # PostCSS 配置
└── vite.config.js                 # Vite 配置
```

## 组件架构

### 层级关系
```
App
  └── A4Page (A4纸张容器)
      ├── Resume (左侧主内容 - 70%宽度)
      │   ├── ResumeHeader (头部信息)
      │   ├── 个人简介
      │   ├── 工作经历
      │   ├── 项目经验
      │   └── 教育背景
      └── ResumeSidebar (右侧边栏 - 30%宽度, 青色背景)
          ├── 头像和姓名
          ├── 学习成果
          ├── 专业技能
          ├── 技术社区
          └── 个人兴趣
```

### 共享组件
- **GradientText**: 渐变文字组件，用于技术栈关键词高亮

## 设计原则

### 1. A4 纸张规格
- 宽度: 210mm
- 高度: 297mm
- 单页设计，避免分页

### 2. 布局设计
- 左右两栏布局 (Grid: 7:3 比例)
- 左侧: 白色背景，主要内容
- 右侧: 青色背景 (#0f766e)，技能和亮点

### 3. 响应式设计
- 屏幕显示: 带阴影效果
- 打印/PDF: 移除阴影，精确A4尺寸

### 4. 可维护性
- 组件化设计，职责单一
- 内容与样式分离
- 简历内容独立文档化

## 数据流

### 静态内容
- 所有简历内容直接写在组件中（未使用状态管理）
- 未来可考虑从 Markdown 文件读取内容

### PDF 导出流程
1. 用户点击"导出PDF"按钮
2. 调用 `exportToPDF()` 函数
3. 尝试使用 html-to-image (保留渐变)
4. 失败则降级到 html2canvas (纯色替代)
5. 生成 PDF 并下载

## 技术决策

### 为什么选择 Vite？
- 快速的开发服务器启动
- 高效的 HMR (热模块替换)
- 简洁的配置
- 现代化的构建工具

### 为什么选择 Tailwind CSS v3？
- 实用优先的CSS框架
- JIT模式编译速度快
- 易于定制和扩展
- 与 React 配合良好

### 为什么不用 TypeScript？
- 项目规模较小，复杂度低
- 快速开发，减少类型定义开销
- JavaScript 足够满足需求

### 为什么采用组件化？
- 提高代码复用性
- 便于维护和更新
- 职责清晰，易于理解
