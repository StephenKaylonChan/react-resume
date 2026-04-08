# 架构总览

## 模块划分

React Resume 是单页应用（SPA），采用组件化架构，无后端依赖。

```
src/
├── App.jsx              ← 应用入口：工具栏（PDF导出/打印按钮）+ A4Page 容器
├── components/
│   ├── A4Page.jsx       ← 布局容器：CSS Grid 7:3 两栏，固定 210mm × 297mm
│   ├── Resume.jsx       ← 左栏内容：个人简介/工作经历/项目/教育
│   ├── ResumeHeader.jsx ← 左栏头部：职位标题 + 联系信息网格
│   ├── ResumeSidebar.jsx← 右栏侧边栏：头像/技能/社区/兴趣（teal 背景）
│   └── GradientText.jsx ← 渐变文字：29 种技术关键词渐变色映射
├── utils/
│   └── exportPDF.js     ← PDF 导出：html-to-image 主策略 + html2canvas 降级
└── index.css            ← 全局样式 + Tailwind 指令 + 打印媒体查询
```

## 数据流

```
App (isExporting state)
 ├── Toolbar → 触发 exportToPDF() / window.print()
 └── A4Page
      ├── Resume → ResumeHeader + 各内容区块（含 GradientText 渐变词）
      └── ResumeSidebar → 头像 + 技能徽章
```

内容目前硬编码在 JSX 中，`resume-content/` 目录的 Markdown 文件作为内容管理参考源。

## 关键技术决策

- **CSS Grid 7:3**（非 Flexbox）：A4 精确尺寸需要严格的列宽控制
- **Tailwind 自定义 theme 渐变**（非动态 class 拼接）：JIT 编译器不支持运行时动态 class 名
- **html-to-image 优先**（非 html2canvas）：能保留 CSS 渐变效果
- **无状态管理库**：纯展示型应用，React state 已足够
